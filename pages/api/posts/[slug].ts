import { NextApiRequest, NextApiResponse } from 'next';
import { getPost } from '../../../utils/posts';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const post = getPost(req.query.slug.toString() ?? '');

  res.status(post === undefined ? 404 : 200).json(post ?? {});
};
