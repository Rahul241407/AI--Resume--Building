import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { connectDb } from './config/db.js';
import userRouter from './routes/userRoute.js';

import path from 'path';
import { fileURLToPath } from 'url';
import resumeRouter from './routes/resumeRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const app = express();
const PORT=4000;

app.use(cors())


// MIDDLEWARE
app.use(express.json());

app.use('/api/auth',userRouter)
app.use('/api/resume',resumeRouter)

app.use(
  '/uploads',
  express.static(path.join(__dirname,'uploads'),{
    setHeaders: (res, _path) => {
      res.set('Access-control-allow-origin','http://localhost:4000/')
    }
  })
)

// CONNECT DB
connectDb();

// ROUTES
app.get('/',(req,res)=>{
  res.send('api works');
});

app.listen(PORT,()=>{
  console.log(`server is running http://localhost:${PORT}`);
});

    

