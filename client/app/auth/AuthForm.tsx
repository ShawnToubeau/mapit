"use client";

import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

const emailPlaceholderText = "Enter your email address";

export default function AuthForm() {
	const supabase = createBrowserSupabaseClient();

	return (
		<Auth
			showLinks
			magicLink
			redirectTo="http://localhost:3000/maps"
			socialLayout="horizontal"
			supabaseClient={supabase}
			appearance={{ theme: ThemeSupa }}
			localization={{
				variables: {
					magic_link: {
						email_input_placeholder: emailPlaceholderText,
					},
					forgotten_password: {
						email_input_placeholder: emailPlaceholderText,
					},
					sign_up: {
						email_input_placeholder: emailPlaceholderText,
						password_input_placeholder: "Enter a password",
					},
					sign_in: {
						email_input_placeholder: emailPlaceholderText,
						password_input_placeholder: "Enter your password",
					},
				},
			}}
		/>
	);
}
