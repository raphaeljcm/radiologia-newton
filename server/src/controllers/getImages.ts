import { Request, Response } from 'express';
import { queryDatabase } from '../db';
import * as messages from "./messages";

export const getImages = async (req: Request, res: Response) => {
  const accesGroup = req.query.accessGroup;

  try {
    if (!accesGroup || accesGroup === '' || accesGroup === 'undefined') {
      return res
        .status(400)
        .json({ error: messages.REQUIRED_ACCESS_GROUP_ERROR_MESSAGE });
    }

    const images = await queryDatabase(
      'SELECT * FROM images i WHERE i.access_group = ?',
      [accesGroup],
    );

    const foundAccessGroup = images.find(
      images => images.access_group === accesGroup,
    );

    if (!foundAccessGroup) {
      return res
        .status(404)
        .json({ error: messages.ACCESS_GROUP_NOT_EXIST_ERROR_MESSAGE });
    }

    if (!images) {
      return res.status(404).json({ error: messages.IMAGE_NOT_FOUND_ERROR_MESSAGE });
    }

    return res.json(images);
  } catch (err) {
    return res.status(500).json({ error: messages.INTERNAL_SERVER_ERROR_MESSAGE });
  }
};
