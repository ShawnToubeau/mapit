import "server-only";

import { ReactNode } from "react";
import "../styles/global.scss";
import SupabaseProvider from "../context/supabase-provider";
import { createServerClient } from "../utils/supabase-server";
import SupabaseListener from "../components/SupabaseListener";

// do not cache this layout
export const revalidate = 0;

export default async function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	const supabase = createServerClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	return (
		<html lang="en">
			<body>
				<SupabaseProvider session={session}>
					<SupabaseListener serverAccessToken={session?.access_token} />
					{children}
				</SupabaseProvider>
			</body>
		</html>
	);
}
