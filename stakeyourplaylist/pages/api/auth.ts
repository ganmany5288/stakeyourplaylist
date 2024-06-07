import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '../../lib/spotify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code as string;

  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' });
  }

  try {
    const accessToken = await getAccessToken(code);
    res.status(200).json({ accessToken });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
}
