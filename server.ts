import 'dotenv/config';
import mongoose from 'mongoose';
import config from './config';
import app from './src/app';


const port = config.PORT || 3000;
const dbUrl = `mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@cluster0.ntzames.mongodb.net/${config.DB}?retryWrites=true&w=majority`;

mongoose
.connect(dbUrl)
.then(()=> {
    app.listen(port, () => console.log('[SERVER]: Server is running on port', port));
  })
  .catch((err: any)=> console.error('🛑Error Connecting to database', err.message));
 
