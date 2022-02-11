// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { readFileSync, writeFile, writeFileSync, } from 'fs';
import { resolve } from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  ok: boolean
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name, phone, address } = JSON.parse(req.body);
  const data = JSON.parse(readFileSync(resolve(__dirname, '../../../../db/people.json'), 'utf8')) as any[];
  writeFileSync(resolve(__dirname, '../../../../db/people.json'), JSON.stringify([ ...data, { name, phone, address } ]));
  res.status(200).json({ ok: true });
}
