import Image from "next/image";
import Link from "next/link";
import AuthForm from "./AuthForm";

export default function Page() {
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
				<AuthForm />
			</div>
		</div>
	);
}
