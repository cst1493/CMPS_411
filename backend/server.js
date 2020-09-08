const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

//Require Schema Files
require('./models/food.model');

app.use(cors());
app.use(express.json());

const uri = 'mongodb://application:Hl2kegai2x5ForxF@selu285eahmgroup-shard-00-00-iwnjg.gcp.mongodb.net:27017,selu285eahmgroup-shard-00-01-iwnjg.gcp.mongodb.net:27017,selu285eahmgroup-shard-00-02-iwnjg.gcp.mongodb.net:27017/test?ssl=true&replicaSet=SELU285EAHMGroup-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection successful");
});

const foodRouter = require('./routes/food');

app.use('/food', foodRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


