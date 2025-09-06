'use client';
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
interface FriendRequestsProps {
	incomingFriendRequests: IncomingFriendRequests[];
	sessionId: string;
}
const FriendRequests = ({
	incomingFriendRequests,
	sessionId,
}: FriendRequestsProps) => {
	const [friendRequests, setFriendRequests] = useState<
		IncomingFriendRequests[]
	>(incomingFriendRequests);
	const router = useRouter();
	console.log('Incoming Friend Requests:', friendRequests);

	const acceptFriendRequest = async (senderId: string) => {
		await axios.post('/api/friends/accept', {
			id: senderId,
		});
		setFriendRequests((prev) =>
			prev.filter((request) => request.senderId !== senderId)
		);
		router.refresh();
		toast.success('Friend request accepted!');
	};

	const denyFriendRequest = async (senderId: string) => {
		await axios.post('/api/friends/deny', {
			id: senderId,
		});
		setFriendRequests((prev) =>
			prev.filter((request) => request.senderId !== senderId)
		);
		// console.log(data)
		router.refresh();
		toast.success('Friend request denied!');
	};
	return (
		<div className="flex justify-center mt-12">
			<div className="w-full max-w-lg space-y-5">
				{friendRequests.length > 0 ? (
					friendRequests.map((request) => (
						<div
							key={request.senderId}
							className="flex items-center justify-between bg-zinc-100 p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
							{/* Left Side: Avatar + Info */}
							<div className="flex items-center gap-4">
								<div>
									<p className="font-medium text-gray-900 text-xl">
										{request.senderName}
									</p>
									<p className="text-sm text-gray-600">{request.senderEmail}</p>
								</div>
							</div>

							{/* Right Side: Buttons */}
							<div className="flex gap-2">
								<button
									onClick={() => acceptFriendRequest(request.senderId)}
									className="flex items-center justify-center w-9 h-9 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-sm transition">
									<Check size={18} />
								</button>
								<button
									onClick={() => denyFriendRequest(request.senderId)}
									className="flex items-center justify-center w-9 h-9 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-sm transition">
									<X size={18} />
								</button>
							</div>
						</div>
					))
				) : (
					<div className="text-center text-gray-500">
						No pending friend requests 🚀
					</div>
				)}
			</div>
		</div>
	);
};

export default FriendRequests;
