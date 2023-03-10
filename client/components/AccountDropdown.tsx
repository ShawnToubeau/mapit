import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { User } from "@supabase/auth-helpers-react";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSupabase } from "../context/supabase-provider";

interface AccountDropdownProps {
	user: User;
}

export default function AccountDropdown(props: AccountDropdownProps) {
	const router = useRouter();
	const { supabase } = useSupabase();
	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
					Account
					<ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100">
					<div className="py-1">
						<Menu.Item>
							{() => (
								<Link
									href="#"
									className={clsx(
										"block px-4 py-2 text-sm text-gray-700 cursor-default",
									)}
								>
									<div>My Account</div>
									<div className="text-gray-400">({props.user.email})</div>
								</Link>
							)}
						</Menu.Item>
					</div>
					<div className="py-1">
						<Menu.Item>
							{({ active }) => (
								<Link
									href="/maps"
									className={clsx(
										active ? "bg-gray-100 text-gray-900" : "text-gray-700",
										"block px-4 py-2 text-sm",
									)}
								>
									My maps
								</Link>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<button
									className={clsx(
										active ? "bg-gray-100 text-gray-900" : "text-gray-700",
										"block w-full px-4 py-2 text-left text-sm",
									)}
									onClick={() => {
										supabase.auth
											.signOut()
											.then(() => {
												// redirect if we're on a protected route
												if (location.pathname === "/maps") {
													router.push("/");
												}
											})
											.catch((error) =>
												console.error("error signing out", error),
											);
									}}
								>
									Sign out
								</button>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
