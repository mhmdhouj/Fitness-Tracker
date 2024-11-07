const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const workoutRouters = require('./routes/workouts');
const userRouters = require('./routes/user');

app.use(express.json());

app.use((req,res,next) => {
    console.log(req.path,req.method);
    next();
})

app.use('/api/workouts',workoutRouters);
app.use('/api/user', userRouters);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("connected to database and server is running on port 4000");
        });
    })
    .catch((error) => {
        console.log(error);
    });


