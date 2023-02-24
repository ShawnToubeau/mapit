import Header from "../../components/Header";
import { FooterHeight, HeaderHeight } from "../../constants";
import dynamic from "next/dynamic";
import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
} from "next/types";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { AuthContext, AuthState } from "../../context/auth-context";
import { Client } from "../../hooks/use-client";
import { EventMapService } from "../../gen/proto/event_map_api/v1/event_map_api_connectweb";
import { AnonAuthHeader } from "../../utils/generate-auth-header";

interface PageProps extends AuthState {
	mapId: string;
	mapName: string;
}

export default function Page(props: PageProps) {
	const ResponsiveEventMapWithNoSSR = dynamic(
		() => import("../../components/ResponsiveEventMap"),
		{
			ssr: false,
		},
	);

	return (
		<AuthContext.Provider
			value={{
				session: props.session,
			}}
		>
			<div
				className="grid"
				style={{
					height: "100dvh",
					gridTemplateRows: `${HeaderHeight}px auto ${FooterHeight}px`,
				}}
			>
				<Header mapName={props.mapName} />
				<ResponsiveEventMapWithNoSSR mapId={props.mapId} />
			</div>
		</AuthContext.Provider>
	);
}

export async function getServerSideProps(
	ctx: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<PageProps>> {
	if (!ctx.params || typeof ctx.params.mapId !== "string") {
		throw new Error("unable to get map ID from query parameter", ctx.params);
	}
	const supabase = createServerSupabaseClient(ctx);
	const {
		data: { session },
	} = await supabase.auth.getSession();
	const eventMap = await Client(EventMapService).getEventMap(
		{
			id: ctx.params.mapId,
		},
		{
			headers: AnonAuthHeader(),
		},
	);

	return {
		props: {
			mapId: eventMap.id,
			mapName: eventMap.name,
			// pass along the session if this map belongs to the user.
			// this seems error-prone, and we should address this when we can. once we can
			// utilize the Next.js app directory we can have a finer grained composition of
			// SSR components
			session: session?.user.id === eventMap.ownerId ? session : null,
		},
	};
}
