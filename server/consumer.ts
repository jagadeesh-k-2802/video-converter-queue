import ffmpeg from 'fluent-ffmpeg';
import db from './config/db';
import { getQueueChannel, queue } from './config/queue';
import { formatMapper } from './utils/functions';

(async () => {
  try {
    const channel = await getQueueChannel();

    await channel.consume(
      queue,
      message => {
        if (message) {
          const data = JSON.parse(message.content.toString());
          const outputFilename = `./public/${data.id}/output.${data.to}`;

          ffmpeg(data.path)
            .audioCodec('copy')
            .videoCodec('copy')
            .format(formatMapper(data.to))
            .save(outputFilename)
            .on('end', () => {
              const output = { isDone: true, url: outputFilename };

              (async () => {
                const database = await db();
                await database.update(({ jobs }) => (jobs[data.id] = output));
                console.log(`[+] Converted video ${data.id}`);
              })();
            });
        }
      },
      { noAck: true }
    );

    process.once('SIGINT', async () => {
      await channel.close();
    });

    console.log('[*] Waiting for messages. To exit press CTRL+C');
  } catch (err) {
    console.warn(err);
  }
})();
