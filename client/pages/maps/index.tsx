import { PlusIcon } from "@heroicons/react/24/outline";
import Header from "../../components/Header";
import { useState } from "react";
import { Session } from "@supabase/auth-helpers-react";
import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
} from "next/types";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import MapList from "../../components/MapList";
import MapModal, {
	MapModalMode,
	MapModalData,
} from "../../components/MapModal";

interface PageProps {
	session: Session;
}

export default function Page(props: PageProps) {
	const [modalData, setModalData] = useState<MapModalData | null>(null);

	return (
		<div>
			<div className="border-b-gray-400 border-b">
				<Header />
			</div>

			<div className="p-6">
				<MapList
					session={props.session}
					onMapSelect={(eventMap, action) => {
						setModalData({
							modalMode: action,
							mapData: eventMap,
						});
					}}
				/>

				<MapModal
					session={props.session}
					modalData={modalData}
					onClose={() => setModalData(null)}
				/>

				<button
					type="button"
					className="absolute bottom-4 right-4 inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-3 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					onClick={() =>
						setModalData({ modalMode: MapModalMode.CREATE, mapData: null })
					}
				>
					<PlusIcon className="h-6 w-6" aria-hidden="true" />
				</button>
			</div>
		</div>
	);
}

export async function getServerSideProps(
	ctx: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<PageProps>> {
	const supabase = createServerSupabaseClient(ctx);
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session)
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};

	return {
		props: {
			session,
		},
	};
}
