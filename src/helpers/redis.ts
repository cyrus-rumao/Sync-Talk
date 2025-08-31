const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN;

type Command = 'zrange' | 'sismember' | 'get' | 'smembers';

export async function fetchRedis(
  command: Command,
  ...args: (string | number)[]
) {
  const Response = await fetch(
    `${process.env.UPSTASH_REDIS_REST_URL}/${command}/${args.join('/')}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      // method: 'GET',
      cache: 'no-store',
    }
  );

  if (!Response.ok) {
    throw new Error(`Error fetching Redis command: ${Response.statusText}`);
  }
  const data = await Response.json() as { result: string | string[] | null };
  return data.result;
  // return Response.json();
}
