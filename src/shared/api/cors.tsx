import { NextApiRequest, NextApiResponse } from 'next';

export function cors(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
}