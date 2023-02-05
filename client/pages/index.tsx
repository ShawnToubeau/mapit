import dynamic from "next/dynamic";
import Head from "next/head";
import Header from "../components/Header";

export default function Page() {
	const EventsListWithNoSSR = dynamic(
		() => import("../components/EventsList"),
		{
			ssr: false,
		},
	);
	const EventMapWithNoSSR = dynamic(() => import("../components/EventMap"), {
		ssr: false,
	});

	return (
		<div>
			<Head>
				<title>MapIt</title>
				<meta content="width=device-width, initial-scale=1" name="viewport" />
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div
				className="grid"
				style={{
					height: "100dvh",
					gridTemplateRows: "90px auto",
				}}
			>
				<Header />

				<div className="flex">
					<div className="w-2/6 hidden lg:block">
						<EventsListWithNoSSR />
					</div>
					<EventMapWithNoSSR />
				</div>
			</div>
		</div>
	);
}
