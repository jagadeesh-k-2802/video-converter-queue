import amqp from 'amqplib';
export const queue = 'video-conversion';

export const getQueueChannel = async () => {
  const connection = await amqp.connect(process.env.RABBIT_MQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: false });
  return channel;
};
