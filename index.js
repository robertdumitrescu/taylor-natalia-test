const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser');
const list = require('./List');
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    let name = req.query.name;
    let password = req.query.password;
    if (
        (name === 'taylor' && password === "bla") ||
        (name === 'natalia' && password === "lorem") ) {
        res.send(`You're in ${name}. `)
    } else {
        res.send(`Fuck off`)
    }
});

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/test', (req, res) => {
    res.send(`${JSON.stringify(list)}`)
});

app.post('/form', (req, res) => {
    console.log(req.body)
    let searchField = req.body.fname;

    if (searchField.length > 0) {
        let results = [];
        for (let i = 0; i < list.length; i++) {
            const globalRegex = RegExp(`${searchField}*`,'g');
            if (globalRegex.test(list[i].name) || globalRegex.test(list[i].lastname)) {
                results.push(list[i])
            }
        }

        if(results.length > 0) {
            res.send(`${JSON.stringify(results)}`)
        } else {
            res.send(`Couldn't find it bro`)
        }
    } else {
        res.send(`${JSON.stringify(list)}`)
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))