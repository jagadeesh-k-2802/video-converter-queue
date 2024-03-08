# Video Converter 🎥

Video Converter Web Application built with React, Node.js, Express.js, FFmpeg, RabbitMQ

## Features 📲

- Convert from any selected video format to preffered format
- Uses Queue to process large volume of requests with fault tolerance and scalability

## Running The Application 🧑🏻‍💻

- `git clone https://github.com/jagadeesh-k-2802/video-converter-queue`
- `cd server && npm i`
- Configure all required environment variables in `server/config/config.env.example`
- Remove `.example` from the filename it should be `config.env`
- Install RabbitMQ Message Queue
- `npm run dev:server` to start the node server
- `npm run dev:consumer` to start queue consumer node process
- `cd client` and run `npm i` to install npm packages
- `npm run dev` to start local development server
