import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../lib/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { _id, name, mail, comment } = JSON.parse(req.body)

    try {
        await client.create({
            _type: 'comment',
            post: {
                _type: 'reference',
                _ref: _id
            },
            name,
            mail,
            comment
        })
    } catch (error) {
        res.status(500).json({ msg: 'could not submit comment', error })
    }

    res.status(200).json({ msg: 'Message is Submitted' });
}