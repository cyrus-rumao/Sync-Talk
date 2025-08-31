import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const { email } = await req.json();

		console.log('Adding friend with email:', email);
		// const Response = await fetch(
		// 	`${process.env.UPSTASH_REDIS_REST_URL}/get/user:email${email}`,
		// 	{
		// 		headers: {
		// 			Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
		// 		},
		// 		method: 'GET',
		// 		cache: 'no-store',
		// 	}
		// );

		// const data = (await Response.json()) as { result: string | null };
		// console.log(data);
		// const idToAdd = data.result;

		const idToAdd = await fetchRedis('get', `user:email:${email}`);
		if (!idToAdd) {
			return NextResponse.json(
				{ error: 'This person does not have an account' },
				{ status: 400 }
			);
		}
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		if (idToAdd === session.user.id) {
			return NextResponse.json(
				{ error: 'You cannot add yourself as a friend' },
				{ status: 400 }
			);
		}

		const isAlreadyAdded = await fetchRedis(
			'sismember',
			`user:${idToAdd}:incoming_friend_requests`,
			session.user.id
		);
		if (isAlreadyAdded) {
			return NextResponse.json(
				{ error: 'Friend request already sent' },
				{ status: 400 }
			);
		}

		const isALreadyFriends = await fetchRedis(
			'sismember',
			`user:${session.user.id}:friends`,
			email
		);
		if (isALreadyFriends) {
			return NextResponse.json(
				{ error: 'Yall are already Friends' },
				{ status: 400 }
			);
		}

		//send friend request

		db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id);
		return NextResponse.json({ message: 'Friend added successfully' });
	} catch (error) {
		console.error('Error adding friend:', error);
		return NextResponse.json(
			{ error: 'Failed to add friend' },
			{ status: 500 }
		);
	}
}
