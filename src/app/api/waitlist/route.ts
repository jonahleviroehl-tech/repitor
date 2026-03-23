import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.NOTION_API_KEY;
    const databaseId = process.env.NOTION_WAITLIST_DB_ID;

    if (!apiKey || !databaseId) {
      console.error("Missing env vars:", { hasApiKey: !!apiKey, hasDbId: !!databaseId });
      return NextResponse.json(
        { error: "Server-Konfiguration fehlt.", debug: { hasApiKey: !!apiKey, hasDbId: !!databaseId } },
        { status: 500 }
      );
    }

    const notion = new Client({ auth: apiKey });

    const { email } = (await request.json()) as { email?: string };

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Ungültige E-Mail-Adresse." },
        { status: 400 }
      );
    }

    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [{ text: { content: email } }],
        },
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Waitlist signup failed:", msg);
    return NextResponse.json(
      { error: "Eintragung fehlgeschlagen. Bitte versuche es erneut.", debug: msg },
      { status: 500 }
    );
  }
}
