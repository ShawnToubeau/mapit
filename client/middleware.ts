import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const supabase = createMiddlewareSupabaseClient({ req, res });

	const {
		data: { session },
	} = await supabase.auth.getSession();
	// handle authentication redirects
	if (req.nextUrl.pathname === "/maps" && !session) {
		const url = req.nextUrl.clone();
		url.pathname = "/";
		return NextResponse.redirect(url);
	}
	if (req.nextUrl.pathname === "/auth" && !!session) {
		const url = req.nextUrl.clone();
		url.pathname = "/maps";
		return NextResponse.redirect(url);
	}

	return res;
}
