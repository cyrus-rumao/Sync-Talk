import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { messageArrayValidator } from '@/lib/validations/message';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import React from 'react';
interface PageProps {
	params: {
		chatId: string;
	};
}
const page = async ({ params }: PageProps) => {
	const { chatId } = params;
	const session = await getServerSession(authOptions);
	if (!session) {
		return notFound();
	}
	const { user } = session;
	const [userID1, userID2] = chatId.split('--');
	if (user.id !== userID1 && user.id !== userID2) {
		return notFound();
	}

	const chatPartnerId = user.id === userID1 ? userID2 : userID1;
	const chatPartner = (await db.get(`user:${chatPartnerId}`)) as User;
	const initialMessages = await getMessages(chatId);
	async function getMessages(chatId: string) {
		try {
			const results: string[] = await fetchRedis(
				'zrange',
				`chat:${chatId}:messages`,
				0,
				-1
			);
			const dbMessages = results.map(
				(message) => JSON.parse(message) as Message
			);

			const reversedMessages = dbMessages.reverse();
			const messages = messageArrayValidator.parse(reversedMessages);
			return messages;
		} catch (error) {
			return notFound();
		}
	}
	return <div>{params.chatId}</div>;
};

export default page;
