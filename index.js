const express = require("express");
const mongoose = require("mongoose");
const url = 'mongodb://localhost:27017/tohdb';
const PORT = 3000;
const app = express();

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((db) => {
        console.log("Successfully connected to Mongodb server");

    }, (err) => console.log(err));

const heroesSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },

    description: {
        type : String,
    }
}, {timestamps: true});

const Heroes = mongoose.model('heroes', heroesSchema);

app.use(express.json()); 
// app.use(express.static(__dirname + ))

app.post('/heroes', (req, res) => {
    // res.send("Post all task");
    Heroes.create(req.body)
        .then((reply) => {
            res.statusCode = 201;
            res.json(reply);
        });
});

app.post('/heroes/:id', (req, res) => {
    res.statusCode = 405;
    res.send("Method not supported");
});

app.get('/heroes', (req, res) => {
    Heroes.find({})
        .then((reply) => {
            res.json(reply);
        });
});

app.get('/heroes/:id', (req, res) => {
    Heroes.findById(req.params.id)
        .then((reply) => {
            res.json(reply);
        });
    // res.send("Request all task");
});

app.put('/heroes', (req, res) => {
    res.statusCode = 405;
    res.send("Method not supported"); 
});

app.put('/heroes/:id', (req, res) => {
    Heroes.findByIdAndUpdate(req.params.id, {$set:req.body}, new true)
        .then((reply) => {
            res.json(reply);
        });
});

app.delete('/heroes', (req, res) => {
    res.statusCode = 405;
    res.send("Method not supported");
});

app.delete('/heroes/:id', (req, res) => {
    Heroes.findByIdAndDelete(req.params.id)
        .then((reply) => {
            res.json(reply);
        });
});

app.listen(PORT, () => {
    console.log(`App is running at localhost: ${PORT}`);
});
