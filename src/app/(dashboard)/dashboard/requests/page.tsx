import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { getServerSession, User } from 'next-auth';
import { notFound } from 'next/navigation';
import { User } from '@/types/db';
import React from 'react';
import FriendRequests from '@/components/FriendRequests';

const page = async () => {
	const session = await getServerSession(authOptions);
	if (!session) {
		notFound();
	}
	const incomingSenderIds = (await fetchRedis(
		'smembers',
		`user:${session.user.id}:incoming_friend_requests`
	)) as string[] | null;

	const incomingRequests = await Promise.all(
		(incomingSenderIds ?? []).map(async (senderId) => {
			const sender = (await fetchRedis(
				'get',
				`user:${senderId}`
      )) as string;
      const senderParsed = JSON.parse(sender) as User;

			return {
				senderId,
				senderEmail: senderParsed?.email,
				senderName: senderParsed?.name,
				senderImage: senderParsed?.image,
			};
		})
	);

	return (
		// <div>
			<FriendRequests incomingFriendRequests={incomingRequests} sessionId={session.user.id} />
		// </div>
	);
};

export default page;
