import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { ReactNode } from 'react';
import Image from 'next/image';
import { LogsIcon } from 'lucide-react';
import { Plus } from 'lucide-react';
import SignOutButton from '@/components/SignOutButton';
import RequestsButton from '@/components/RequestsButton';
import { fetchRedis } from '@/helpers/redis';
// import FriendRequests from '@/components/FriendRequests';
interface layoutProps {
	children: ReactNode;
}

interface SidebarOption {
	id: number;
	name: string;
	href: string;
	Icon: ReactNode;
}

const SidebarItems: SidebarOption[] = [
	{
		id: 1,
		name: 'Add Friend',
		href: '/dashboard/add',
		Icon: <Plus />,
	},
];
const layout = async ({ children }: layoutProps) => {
	const session = await getServerSession(authOptions);
	if (!session) {
		notFound();
	}
	const incomingRequests = (await fetchRedis(
		'smembers',
		`user:${session.user.id}:incoming_friend_requests`
	)) as string[] | null;
// console.log(incomingRequests?.length);
	return (
		<div className="w-full flex h-screen bg-gray-50">
			{/* Sidebar */}
			<aside className="flex h-full w-74 flex-col bg-white shadow-md border-r border-gray-200">
				{/* Logo / Header */}
				<Link
					href="/dashboard"
					className="flex items-center gap-2 px-6 h-16 shrink-0 border-b border-gray-200">
					<LogsIcon
						aria-label="Logo"
						width={30}
						height={40}
						className="text-black"
					/>
					<span className="text-lg font-bold">Dashboard</span>
				</Link>

				{/* Other contents */}
				<div className="px-6 py-4 text-sm text-gray-500 uppercase tracking-wide">
					Other Contents
				</div>

				{/* Nav */}
				<nav className="flex-1 overflow-y-auto">
					<ul className="flex flex-col space-y-2 px-4 py-2">
						{SidebarItems.map((item) => (
							<li key={item.id}>
								<Link
									href={item.href}
									className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 
                         hover:bg-gray-100 hover:text-black transition-all duration-200 group">
									<span className="text-xl text-gray-400 group-hover:text-black">
										{item.Icon}
									</span>
									<span className="font-medium">{item.name}</span>
								</Link>
							</li>
						))}
					</ul>
					<RequestsButton requestCount={incomingRequests?.length} />
				</nav>

				{/* Footer / User */}	
				<div className="flex flex-row items-center justify-center">
					<Link
						href="/dashboard"
						className="flex items-center gap-3  rounded-lg text-gray-600 hover:bg-gray-100 hover:text-black transition-all duration-200">
						<div className="px-6 py-4 border-t border-gray-200 flex flex-row">
							<div className="flex items-center gap-3">
								<Image
									src={session.user.image || ''}
									alt="User"
									width={50}
									height={50}
									className="w-10 h-10 rounded-full"
								/>
								<div>
									<p className="text-sm font-medium text-gray-700">
										{session.user.name}
									</p>
									<p className="text-xs text-gray-500">{session.user.email}</p>
								</div>
							</div>
						</div>
					</Link>
					<SignOutButton />
				</div>
			</aside>

			{/* Main Content */}
			<main className="flex-1 p-6 overflow-y-auto">{children}</main>
		</div>
	);
};

export default layout;
