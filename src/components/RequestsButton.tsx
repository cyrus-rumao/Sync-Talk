import Link from 'next/link';
import React from 'react';
import { User } from 'lucide-react';

interface requestCountInterface {
	requestCount: number;
}
const FriendRequests = ({ requestCount }: requestCountInterface) => {
	// Replace with actual request count
	return (
		<Link
			href="/dashboard/requests"
			className="flex items-center ml-4 gap-3 px-4 py-3 rounded-lg text-gray-600 
                 hover:bg-gray-100 hover:text-black transition-all duration-200 group">
			{/* Icon wrapper with badge */}
			<div className="relative flex items-center">
				{requestCount > 0 && (
					<span
						className="absolute -left-3 -top-0 -translate-y-1/2 flex items-center justify-center 
            w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full shadow">
						{requestCount}
					</span>
				)}
				<User className="w-6 h-6" />
			</div>
			Requests
		</Link>
	);
};

export default FriendRequests;
