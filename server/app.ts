import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import * as controllers from './controllers/controllers';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.post('/upload', controllers.uploadFile);
app.get('/status/:id', controllers.getStatus)

export default app;
