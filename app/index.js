const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routers/export-router');
const swaggerDoc = require('./middleware/swagger/user')

mongoose.connect("mongodb://localhost:27017/", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

const app = express();

swaggerDoc(app);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/api-docs/city', router.cityRouter);

app.use('/users', router.userRouter);



app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});