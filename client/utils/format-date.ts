export default function FormatDate(unixMilli: bigint): string {
	return new Date(Number(unixMilli)).toLocaleString([], {
		dateStyle: "short",
		timeStyle: "short",
	});
}
