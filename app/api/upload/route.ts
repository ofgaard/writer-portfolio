import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Add console.log for debugging
console.log("AWS Credentials Check:", {
  keyId: process.env.AWS_ACCESS_KEY_ID?.slice(0, 5), // Show only first 5 chars for security
  hasSecret: !!process.env.AWS_SECRET_ACCESS_KEY,
  bucket: process.env.AWS_BUCKET_NAME
});

const s3 = new S3Client({
  region: "eu-north-1", // Stockholm region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Log file details for debugging
    console.log("File details:", {
      name: file.name,
      type: file.type,
      size: file.size
    });

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;

    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: fileName,
          Body: buffer,
          ContentType: file.type,
        })
      );
    } catch (s3Error) {
      console.error("S3 Upload Error:", s3Error);
      throw s3Error;
    }

    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${fileName}`;
    
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload route error:", error);
    return NextResponse.json(
      { error: "Upload failed: " + (error as Error).message },
      { status: 500 }
    );
  }
}