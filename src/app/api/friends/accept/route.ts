import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';

export async function POST(req: Request) {
	try {
		const body = await req.json();
		console.log(body);
		const session = await getServerSession(authOptions);
		if (!session) {
			return new Response('Unauthorized', { status: 401 });
		}

		const isAlreadyFriends = await fetchRedis(
			'sismember',
			`user:${session.user.id}:friends`,
			body.id
		);
		if (isAlreadyFriends) {
			return new Response('Already friends', { status: 400 });
		}
		const hasFriendRequest = await fetchRedis(
			'sismember',
			`user:${session.user.id}:incoming_friend_requests`,
			body.id
		);
		if (!hasFriendRequest) {
			return new Response('No friend request', { status: 400 });
		}
		await db.sadd(`user:${session.user.id}:friends`, body.id);
		await db.sadd(`user:${body.id}:friends`, session.user.id);
		await db.srem(`user:${session.user.id}:incoming_friend_requests`, body.id);

		return new Response('Friend request Accepted', { status: 200  });
	} catch (error) {
		console.log(error);
		return new Response('Internal Server Error', { status: 500 });
	}
}
