import { createContext, useContext } from "react";
import { Session } from "@supabase/auth-helpers-react";

export type AuthState = {
	session: Session | null;
};

export const AuthContext = createContext<AuthState>({
	session: null,
});

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within a AuthProvider");
	}
	return context;
}
