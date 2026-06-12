import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword");

  if (!keyword) {
    return NextResponse.json({ error: "Keyword is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(keyword)}`
    );

    if (!response.ok) {
      throw new Error(`Jisho API returned ${response.status}`);
    }

    const json = await response.json();
    
    // Format the response to limit data and make it easy for frontend
    const results = (json.data || []).slice(0, 20).map((item: any, index: number) => {
      // Get primary Japanese word and reading
      const primaryJp = item.japanese[0] || { word: "", reading: "" };
      
      // Get primary English definitions
      const primarySense = item.senses[0] || { english_definitions: [], parts_of_speech: [] };
      
      return {
        id: item.slug || `word-${index}`,
        word: primaryJp.word || primaryJp.reading || item.slug,
        reading: primaryJp.reading || "",
        meaning: primarySense.english_definitions.join(", "),
        tags: primarySense.parts_of_speech,
        jlpt: item.jlpt || [],
      };
    });

    return NextResponse.json(results);
  } catch (error: any) {
    console.error("[Dictionary Search API Error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch from dictionary service" },
      { status: 500 }
    );
  }
}
