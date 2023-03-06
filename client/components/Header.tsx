"use client";

import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
	Bars3Icon,
	UserCircleIcon,
	XMarkIcon,
	MapIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import AccountDropdown from "./AccountDropdown";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSupabase } from "../context/supabase-provider";

const solutions = [
	{
		name: "My maps",
		href: "/maps",
		icon: MapIcon,
	},
];

interface HeaderProps {
	mapName?: string;
}

export default function Header(props: HeaderProps) {
	const router = useRouter();
	const { supabase, session } = useSupabase();

	return (
		<Popover className="relative bg-white flex">
			<div className="flex items-center justify-between p-6 w-full">
				<HeaderLogo {...props} />

				<div className="flex md:hidden">
					{session?.user ? (
						<Popover.Button className="inline-flex items-center justify-center rounded-md bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
							<span className="sr-only">Open menu</span>
							<Bars3Icon className="h-8 w-8" aria-hidden="true" />
						</Popover.Button>
					) : (
						<Link
							href="/auth"
							className="ml-8 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer"
						>
							Sign in
						</Link>
					)}
				</div>
				<div className="hidden md:flex md:items-center md:justify-end">
					<div className="flex items-center">
						{session?.user ? (
							<AccountDropdown user={session.user} />
						) : (
							<Link
								href="/auth"
								className="ml-8 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer"
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
					className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden z-20"
				>
					<div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
						<div className="px-5 pt-5 pb-6">
							<div className="flex items-center justify-between">
								<HeaderLogo {...props} />

								<div className="-mr-2">
									<Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
										<span className="sr-only">Close menu</span>
										<XMarkIcon className="h-6 w-6" aria-hidden="true" />
									</Popover.Button>
								</div>
							</div>
							<div className="mt-6">
								<nav className="grid gap-6">
									{session?.user && (
										<Link
											href="/#"
											className="-m-3 flex items-center rounded-lg p-3 cursor-default"
										>
											<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-indigo-500 text-white">
												<UserCircleIcon
													className="h-6 w-6"
													aria-hidden="true"
												/>
											</div>
											<div className="ml-4 text-base font-medium text-gray-900 flex flex-col">
												<div>My Account</div>
												<div className="text-gray-400">
													({session.user.email})
												</div>
											</div>
										</Link>
									)}
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
							<div className="text-center">
								{session?.user ? (
									<button
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
										className="text-indigo-600 hover:text-indigo-500"
									>
										Sign out
									</button>
								) : (
									<Link
										href="/auth"
										className="text-indigo-600 hover:text-indigo-500 cursor-pointer"
									>
										Sign in
									</Link>
								)}
							</div>
						</div>
					</div>
				</Popover.Panel>
			</Transition>
		</Popover>
	);
}

function HeaderLogo(props: HeaderProps) {
	return (
		<Link href="/">
			<div className="flex cursor-pointer">
				<Image src="/header-icon.svg" alt="Logo" width={38} height={38} />
				<div className="flex items-center">
					<div className="text-2xl ml-2 font-bold">Mapit</div>
					{props.mapName && (
						<>
							<div className="mx-1">&#65372;</div>
							<div className="text-lg lg:text-xl font-bold">
								{props.mapName}
							</div>
						</>
					)}
				</div>
			</div>
		</Link>
	);
}
