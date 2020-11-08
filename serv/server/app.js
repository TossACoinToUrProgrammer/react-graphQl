const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3005;

mongoose.connect('mongodb+srv://Arlen:putinloh4509@cluster0.0tkub.mongodb.net/graphQLProj?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    //предостовляет UI в браузере для работы с запросами
    graphiql: true
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err=>console.log('Connection error ', err));
dbConnection.once('open', ()=>console.log('Connected to DB'));

app.listen(PORT, err => {
    err ? console.log(err) : console.log('Server started');
})