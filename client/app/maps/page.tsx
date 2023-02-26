import UserMaps from "./UserMaps";
import { createServerClient } from "../../utils/supabase-server";

export default async function Page() {
	const supabase = createServerClient();
	const { data } = await supabase.auth.getSession();

	if (!data.session) {
		return <div>Unable to get user session</div>;
	}

	return <UserMaps session={data.session} />;
}
