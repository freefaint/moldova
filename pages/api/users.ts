// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { readFileSync } from 'fs';
import { resolve } from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  users: any,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = JSON.parse(readFileSync(resolve(__dirname, '../../../../db/people.json'), 'utf8')) as any[];
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ users: data });
}
