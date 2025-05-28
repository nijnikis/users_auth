const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter')
const { dbUser, dbPass, port } = require('./config');

const app = express();

app.use(express.json());
app.use('/api', authRouter);

const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.aopuzcc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
    app.listen(port, () => console.log(`server started on port: ${port}`));
  } catch (error) {
    console.log('start error:', error);
  }
}

start();
