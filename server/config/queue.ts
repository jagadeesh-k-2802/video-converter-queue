import amqp from 'amqplib';
export const queue = 'video-conversion';

export const getQueueChannel = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: false });
  return channel;
};
