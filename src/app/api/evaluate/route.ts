import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildEvaluationPrompt, parseGeminiResponse } from "@/lib/gemini";
import type { EvaluateRequest, EvaluateResponse } from "@/types/evaluation";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest): Promise<NextResponse<EvaluateResponse>> {
  const startTime = Date.now();

  try {
    // Parse request body
    let body: EvaluateRequest;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_INPUT",
            message: "Request body must be valid JSON.",
          },
        },
        { status: 400 }
      );
    }

    const { resumeText, jobDescription } = body;

    // Validate inputs
    if (!resumeText || typeof resumeText !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_INPUT",
            message: "resumeText is required and must be a string.",
          },
        },
        { status: 400 }
      );
    }

    if (!jobDescription || typeof jobDescription !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_INPUT",
            message: "jobDescription is required and must be a string.",
          },
        },
        { status: 400 }
      );
    }

    if (resumeText.trim().length < 100) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_INPUT",
            message: "Resume text is too short. Please provide at least 100 characters.",
          },
        },
        { status: 400 }
      );
    }

    if (jobDescription.trim().length < 50) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_INPUT",
            message: "Job description is too short. Please provide at least 50 characters.",
          },
        },
        { status: 400 }
      );
    }

    if (resumeText.length > 15000) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_INPUT",
            message: "Resume text is too long. Please limit to 15,000 characters.",
          },
        },
        { status: 400 }
      );
    }

    // Build prompt and call Gemini
    const prompt = buildEvaluationPrompt(resumeText.trim(), jobDescription.trim());

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.2,
        topP: 0.8,
      },
    });

    let rawText: string;
    try {
      // 🐛 DEBUG: Logging the attempt to call Gemini
      console.log(`🚀 Sending request to Gemini using model: gemini-2.0-flash`);
      const result = await model.generateContent(prompt);
      rawText = result.response.text();
    } catch (err: any) {
      console.error("❌ Gemini API Request Failed:");
      console.error(err);
      
      // 🐛 DEBUG: Extract the actual error message to send to the frontend
      const errorMessage = err?.message || "Unknown Gemini API error occurred.";
      
      return NextResponse.json(
        { 
          success: false, 
          error: {
            code: "API_ERROR",
            message: `Gemini API Error: ${errorMessage}`,
            details: process.env.NODE_ENV === "development" ? String(err) : undefined
          }
        },
        { status: 500 }
      );
    }

    // Parse and validate Gemini response
    let evaluationResult;
    try {
      evaluationResult = parseGeminiResponse(rawText);
      console.log("✅ Successfully parsed Gemini response.");
    } catch (err: any) {
      console.error("❌ Failed to parse Gemini JSON:", err);
      console.error("Raw Text received:", rawText);
      return NextResponse.json(
        { 
          success: false, 
          error: {
            code: "PARSE_ERROR",
            message: "Failed to parse the AI evaluation report. The AI may have returned malformed data.",
            details: process.env.NODE_ENV === "development" ? err?.message : undefined
          }
        },
        { status: 500 }
      );
    }

    const processingTimeMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      data: {
        ...evaluationResult,
        metadata: {
          evaluatedAt: new Date().toISOString(),
          model: "gemini-2.5-flash",
          processingTimeMs,
        },
      },
    });
  } catch (err: any) {
    console.error("❌ Unexpected error in /api/evaluate:", err);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: `Server Error: ${err?.message || "An unexpected error occurred. Please try again."}`,
          details: process.env.NODE_ENV === "development" ? String(err) : undefined
        }
      },
      { status: 500 }
    );
  }
}

// 🐛 DEBUG: Advanced test endpoint to verify API Key and find a working model
export async function GET() {
  console.log("🔍 Testing Gemini API Connectivity and available models...");
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ status: "error", message: "GEMINI_API_KEY is missing from environment variables." }, { status: 400 });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // First, list all models available to this key
    const modelsResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const modelsData = await modelsResponse.json();
    
    // Try a few different models to see if ANY of them bypass the quota
    const modelsToTest = ["gemini-2.0-flash", "gemini-1.5-pro", "gemini-1.5-flash", "gemini-1.5-flash-8b", "gemini-1.0-pro"];
    const testResults: Record<string, any> = {};
    let workingModel = null;

    for (const modelName of modelsToTest) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Respond with 'OK'");
        testResults[modelName] = { status: "success", response: result.response.text() };
        if (!workingModel) workingModel = modelName;
      } catch (err: any) {
        testResults[modelName] = { status: "failed", reason: err?.message || "Unknown error" };
      }
    }
    
    return NextResponse.json({
      status: workingModel ? "success" : "all_failed",
      message: workingModel 
        ? `Found a working model! You should switch your code to use: ${workingModel}`
        : "Every single model hit a quota limit or failed. You MUST use a different Google account.",
      workingModel,
      testResults,
      availableModelsFromGoogle: modelsData.models?.map((m: any) => m.name) || modelsData
    });
  } catch (error: any) {
    console.error("❌ Connectivity Test Failed:", error);
    return NextResponse.json({
      status: "error",
      message: error?.message || "Failed to connect to Gemini API.",
      fullError: error
    }, { status: 500 });
  }
}
