import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let useInjection = false;
  if (req.query.inject !== undefined) useInjection = true;

  res
    .status(200)
    .send(
      (await (await fetch(`https://playentry.org/iframe/${req.query.id}`)).text()).replace(/\/_next/gi, 'https://playentry.org/_next').replace(/\/lib/gi, 'https://playentry.org/lib') +
        (useInjection ? `\n<script>${await (await fetch((req.query.inject ?? 'https://playentry.org').toString())).text()}</script>` : '')
    );
};
