import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
} from "next/types";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Page() {
	const supabaseClient = useSupabaseClient();
	const user = useUser();
	const router = useRouter();
	const emailPlaceholderText = "Enter your email address";

	// the redirectTo prop on Auth doesn't work, so we handle redirects here
	// @SEE fix https://github.com/supabase/auth-ui/pull/128
	if (user) {
		// TODO figure out how to navigate to the last user location
		// ran into bug with history stack not recording navigation to dynamic map urls
		router.push("/maps");
	}

	return (
		<div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-md space-y-8">
				<div className="flex justify-center">
					<Image src="/header-icon.svg" alt="Logo" width={38} height={38} />
					<span className="flex self-center text-2xl ml-2 font-bold cursor-default">
						Mapit
					</span>
				</div>
				<Auth
					showLinks
					magicLink
					redirectTo="http://localhost:3000/maps"
					socialLayout="horizontal"
					supabaseClient={supabaseClient}
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

export async function getServerSideProps(
	ctx: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Record<string, never>>> {
	const supabase = createServerSupabaseClient(ctx);
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (session) {
		return {
			redirect: {
				destination: "/maps",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}
