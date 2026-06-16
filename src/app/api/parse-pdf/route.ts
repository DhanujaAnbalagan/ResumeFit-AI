import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("resume") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { success: false, error: "File must be a PDF" },
        { status: 400 }
      );
    }

    // Convert File to Uint8Array
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Use pdfjs-dist directly — reliable buffer support
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

    // Disable worker (server-side)
    pdfjsLib.GlobalWorkerOptions.workerSrc = "";

    const loadingTask = pdfjsLib.getDocument({ data: uint8Array, disableWorker: true });
    const pdfDoc = await loadingTask.promise;

    const numPages = pdfDoc.numPages;
    const textParts: string[] = [];

    for (let i = 1; i <= numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((item: any) => item.str ?? "")
        .join(" ");
      textParts.push(pageText);
    }

    const fullText = textParts.join("\n").trim();

    if (!fullText || fullText.length < 50) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Could not extract text from this PDF. It may be scanned or image-based. Please use the 'Paste Text' tab instead.",
        },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      text: fullText,
      pages: numPages,
      wordCount: fullText.split(/\s+/).length,
    });
  } catch (err) {
    console.error("PDF parse error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to parse PDF. Please use the 'Paste Text' tab instead.",
      },
      { status: 500 }
    );
  }
}
