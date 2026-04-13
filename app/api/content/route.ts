import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD ||
  (process.env.NODE_ENV === "production" ? null : "stateswap2025");

export async function POST(request: NextRequest) {
  // Block in production if no password is configured
  if (!ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin password not configured. Set ADMIN_PASSWORD env var." },
      { status: 503 }
    );
  }

  const authHeader = request.headers.get("x-admin-password");
  if (!authHeader || authHeader !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Validate body is an object (prevent overwriting with garbage)
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return NextResponse.json({ error: "Body must be a JSON object" }, { status: 400 });
  }

  try {
    // Resolve path safely — never allow path traversal
    const CONTENT_PATH = path.resolve(process.cwd(), "content.json");
    await writeFile(CONTENT_PATH, JSON.stringify(body, null, 2), "utf-8");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to write file" }, { status: 500 });
  }
}
