import { Session } from "@supabase/auth-helpers-react";

export default function GenerateAuthHeader(session: Session) {
	const requestHeaders = new Headers();
	requestHeaders.set("Authorization", `Bearer ${session.access_token}`);
	return requestHeaders;
}

export function AnonAuthHeader() {
	const requestHeaders = new Headers();
	requestHeaders.set(
		"Authorization",
		`Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
	);
	return requestHeaders;
}
