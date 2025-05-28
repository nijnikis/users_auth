import mongoose from 'mongoose';
import app from './app';
import config from './config/config';

const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${config.dbUser}:${config.dbPass}@cluster0.aopuzcc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
    app.listen(config.port, () => console.log(`server started on port: ${config.port}`));
  } catch (error) {
    console.log('start error:', error);
  }
}

start();
