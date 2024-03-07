import path from 'path';
import mv from 'mv';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { formidable } from 'formidable';
import db from '../config/db';
import { queue, getQueueChannel } from '../config/queue';

/**
 * POST /upload
 * Upload file to server
 */
export const uploadFile = async (req: Request, res: Response) => {
  const form = formidable();
  const [fields, files] = await form.parse(req);
  const file = files.file?.at(0);

  const transformedFields = {
    from: fields?.from?.at(0),
    to: fields?.to?.at(0)
  };

  // Check for file
  if (file === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Upload a file'
    });
  }

  const uniqueId = uuidv4();
  const regex = file.originalFilename?.match(/\.[^/]+$/);
  const ext = regex != null ? regex[0] : '';
  const newFilename = `${file.newFilename}${ext}`;
  const dest = path.join(__dirname, `../public/${uniqueId}`, newFilename);

  mv(file.filepath, dest, { mkdirp: true }, () => {
    // Do Nothing
  });

  const data = { id: uniqueId, path: dest, ...transformedFields };
  const channel = await getQueueChannel();
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
  res.status(200).json({ success: true, id: uniqueId });
};

/**
 * GET /status/:id
 * Fetch status of upload
 */
export const getStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const database = await db();
  const output = database.data.jobs[id];

  if (output !== null) {
    res.status(200).json({ success: true, ...output });
  } else {
    res.status(200).json({ success: true, ...output });
  }
};
