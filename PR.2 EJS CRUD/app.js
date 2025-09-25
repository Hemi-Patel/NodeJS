const express = require('express');
const port = 8001;
const app = express();
const fs = require('fs');
const path = require('path');


app.use(express.urlencoded())
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

let data = [{
        name: "hemi",
        age: 23,
    },
    {
        name: "urvi",
        age: 25,
    }
];

app.post('/addPerson', (req, res) => {
    data.push(req.body);
    return res.redirect('/');
})
app.get('/deletePerson/:pid', (req, res) => {

    data.splice(req.params.pid, 1);
    return res.redirect('/');
})

app.get('/UpdatePerson', (req, res) => {
    let index = req.query.pos;
    let singleData = data[req.query.pos];
    return res.render('edit', { singleData, index });
})

app.post('/editPerson', (req, res) => {
    data[req.body.id] = req.body;
    return res.redirect('/');
})


app.get("/", (req, res) => {
    return res.render('home', { data });
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log("server running on port : ", port);
})