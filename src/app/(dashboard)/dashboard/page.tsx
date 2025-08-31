

import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { notFound } from 'next/navigation';


type session = {
	image: string;
	name: string;
	email: string;
};

export default async function DashboardPage() {

	const session = await getServerSession(authOptions);
	  if (!session) notFound();
	return (
		<div className="flex flex-col gap-6 p-6">
			{/* Topbar */}
			<header className="flex items-center justify-between">
				<h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

				<div className="flex items-center gap-4">
					<input
						type="text"
						placeholder="Search..."
						className="px-4 py-2 rounded-lg border border-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-black"
					/>

					{/* User profile */}
					<div className="flex items-center gap-3">
						<Image
							src={session.user.image ?? ''}
							alt={session.user.name ?? ''}
							width={40}
							height={40}
							className="rounded-full border border-gray-300"
						/>
						<div className="hidden sm:block">
							<p className="text-sm font-medium text-gray-800">{session.user.name}</p>
							<p className="text-xs text-gray-500">{session.user.email}</p>
						</div>
					</div>
				</div>
			</header>

			{/* Welcome Banner */}
			<section className="bg-white shadow-sm rounded-xl p-6">
				<h2 className="text-lg font-semibold">Welcome back, {session.user.name} 👋</h2>
				<p className="text-gray-500 text-sm mt-2">
					Here’s a quick look at what’s happening today.
				</p>
			</section>

			{/* Quick Stats */}
			<section className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
					<p className="text-sm text-gray-500">Active Projects</p>
					<h3 className="text-2xl font-bold">12</h3>
				</div>

				<div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
					<p className="text-sm text-gray-500">Tasks Completed</p>
					<h3 className="text-2xl font-bold">87%</h3>
				</div>

				<div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
					<p className="text-sm text-gray-500">Messages</p>
					<h3 className="text-2xl font-bold">24</h3>
				</div>
			</section>

			{/* Recent Activity */}
			<section className="bg-white rounded-xl shadow-sm p-6">
				<h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
				<ul className="space-y-3 text-sm text-gray-700">
					<li className="flex justify-between">
						<span>New project created</span>
						<span className="text-gray-500">2h ago</span>
					</li>
					<li className="flex justify-between">
						<span>Completed “UI Revamp”</span>
						<span className="text-gray-500">5h ago</span>
					</li>
					<li className="flex justify-between">
						<span>Invited Jane Smith</span>
						<span className="text-gray-500">1d ago</span>
					</li>
				</ul>
			</section>
		</div>
	);
}
