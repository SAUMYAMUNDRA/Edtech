import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';



const app = express();




app.use(cors({
  origin: 'http://localhost:4000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));


dotenv.config();


app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});