import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

export default function Page() {
	const supabaseClient = useSupabaseClient();
	const user = useUser();
	const router = useRouter();

	// the redirectTo prop on Auth doesn't seem to work, so we handle redirects here
	if (user) {
		router.push("/");
	}

	return (
		<Auth
			redirectTo="/"
			appearance={{ theme: ThemeSupa }}
			supabaseClient={supabaseClient}
			providers={["google", "github"]}
			socialLayout="horizontal"
		/>
	);
}
