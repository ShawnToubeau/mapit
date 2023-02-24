import { useMemo } from "react";
import { ServiceType } from "@bufbuild/protobuf";
import {
	createConnectTransport,
	createPromiseClient,
	PromiseClient,
} from "@bufbuild/connect-web";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
if (backendUrl == undefined) {
	throw new Error("backend url undefined");
}

const transport = createConnectTransport({
	baseUrl: backendUrl,
});

export function useClient<T extends ServiceType>(service: T): PromiseClient<T> {
	// we memoize the client, so that we only create one instance per service
	return useMemo(() => createPromiseClient(service, transport), [service]);
}

export function Client<T extends ServiceType>(service: T): PromiseClient<T> {
	return createPromiseClient(service, transport);
}
