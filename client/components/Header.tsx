import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
	Bars3Icon,
	UserCircleIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import AccountDropdown from "./AccountDropdown";

const solutions = [
	{
		name: "Account Settings",
		description: "Speak directly to your customers in a more meaningful way.",
		href: "#",
		icon: UserCircleIcon,
	},
];

export default function Header() {
	const supabaseClient = useSupabaseClient();
	const user = useUser();

	return (
		<Popover className="relative bg-white">
			<div className="flex items-center justify-between p-6 md:justify-start md:space-x-10">
				<div>
					<a href="#" className="flex">
						<span className="sr-only">Your Company</span>
						<img
							className="h-8 w-auto sm:h-10"
							src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
							alt=""
						/>
					</a>
				</div>
				<div className="-my-2 -mr-2 md:hidden">
					<Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
						<span className="sr-only">Open menu</span>
						<Bars3Icon className="h-6 w-6" aria-hidden="true" />
					</Popover.Button>
				</div>
				<div className="hidden md:flex md:flex-1 md:items-center md:justify-end">
					<div className="flex items-center md:ml-12">
						{user ? (
							<AccountDropdown />
						) : (
							<Link
								href="/auth"
								className="ml-8 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
							>
								Sign in
							</Link>
						)}
					</div>
				</div>
			</div>

			<Transition
				as={Fragment}
				enter="duration-200 ease-out"
				enterFrom="opacity-0 scale-95"
				enterTo="opacity-100 scale-100"
				leave="duration-100 ease-in"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-95"
			>
				<Popover.Panel
					focus
					className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden z-10"
				>
					<div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
						<div className="px-5 pt-5 pb-6">
							<div className="flex items-center justify-between">
								<div>
									<img
										className="h-8 w-auto"
										src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
										alt="Your Company"
									/>
								</div>
								<div className="-mr-2">
									<Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
										<span className="sr-only">Close menu</span>
										<XMarkIcon className="h-6 w-6" aria-hidden="true" />
									</Popover.Button>
								</div>
							</div>
							<div className="mt-6">
								<nav className="grid gap-6">
									{solutions.map((item) => (
										<a
											key={item.name}
											href={item.href}
											className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
										>
											<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-indigo-500 text-white">
												<item.icon className="h-6 w-6" aria-hidden="true" />
											</div>
											<div className="ml-4 text-base font-medium text-gray-900">
												{item.name}
											</div>
										</a>
									))}
								</nav>
							</div>
						</div>
						<div className="py-6 px-5">
							<p className="text-center">
								{user ? (
									<button
										onClick={() => {
											supabaseClient.auth.signOut();
										}}
										className="text-indigo-600 hover:text-indigo-500"
									>
										Sign out
									</button>
								) : (
									<Link
										href="/auth"
										className="text-indigo-600 hover:text-indigo-500"
									>
										Sign in
									</Link>
								)}
							</p>
						</div>
					</div>
				</Popover.Panel>
			</Transition>
		</Popover>
	);
}
