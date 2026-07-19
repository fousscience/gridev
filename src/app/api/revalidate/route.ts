import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const url = new URL(request.url);
  const fromQuery = url.searchParams.get("secret");
  const body = await request.json().catch(() => ({}));
  const fromBody =
    typeof body === "object" && body && "secret" in body
      ? String((body as { secret?: string }).secret || "")
      : "";

  if (!secret || (fromQuery !== secret && fromBody !== secret)) {
    return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
  }

  revalidateTag("sanity", "max");
  revalidatePath("/", "layout");
  revalidatePath("/actualites");
  revalidatePath("/projets");
  revalidatePath("/a-propos");
  revalidatePath("/opportunites");
  revalidatePath("/contact");

  return NextResponse.json({ ok: true, revalidated: true, now: Date.now() });
}
