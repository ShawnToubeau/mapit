import Header from "../components/Header";

export default function Page() {
	return (
		<div>
			<div className="border-b-gray-400 border-b">
				<Header />
			</div>

			<div className="flex flex-col justify-center items-center pt-4">
				<div className="text-2xl">Welcome!</div>
				<div>
					This section is still under construction but feel free to create an
					account and take a look around.
				</div>
			</div>
		</div>
	);
}
