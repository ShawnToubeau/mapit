import Image from "next/image";
import Link from "next/link";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

const emailPlaceholderText = "Enter your email address";

export default function Page() {
	const supabase = createBrowserSupabaseClient();

	return (
		<div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-md space-y-8">
				<div className="flex items-center">
					<Link href="/" className="flex justify-center cursor-pointer">
						<Image src="/header-icon.svg" alt="Logo" width={38} height={38} />
						<span className="flex self-center text-2xl ml-2 font-bold">
							Mapit
						</span>
					</Link>
				</div>
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
			</div>
		</div>
	);
}
