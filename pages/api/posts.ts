import { NextApiRequest, NextApiResponse } from 'next';
import { getAllPosts } from '../../utils/posts';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const posts = getAllPosts();

  res.status(200).json(posts);
};
