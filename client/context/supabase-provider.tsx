"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

type SupabaseContext = {
	supabase: SupabaseClient;
	session: Session | null;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
	children,
	session,
}: {
	children: ReactNode;
	session: Session | null;
}) {
	const [supabase] = useState(() => createBrowserSupabaseClient());

	return (
		<Context.Provider value={{ supabase, session }}>
			<>{children}</>
		</Context.Provider>
	);
}

export const useSupabase = () => {
	const context = useContext(Context);
	if (context === undefined) {
		throw new Error("useSupabase must be used inside SupabaseProvider");
	} else {
		return context;
	}
};
