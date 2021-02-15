const express = require('express');
const app = express();
const fs = require('fs')
const open = require('open');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    if (fs.existsSync(__dirname + '/file.txt')) {
        fs.readFile(__dirname + '/file.txt', async (err, file) => {
            if (err) {
                res.status(200).render('index', { data: '' });
            } else if (file == '') {
                res.status(200).render('index', { data: '' });
            } else {
                const text = file.toString()
                res.status(200).render('index', { data: text });
            }
        })
    } else {
        res.status(200).render('index', {data: ''});
    }
});

app.post('/write', async (req, res) => {
    const data = await (req.body.text).toString();
    const spaces = "---------------"+ (new Date).toLocaleString() + "-------------"
    fs.writeFileSync(__dirname + '/file.txt', spaces + '\n', { flag: 'a+' });
    fs.writeFileSync(__dirname + '/file.txt', data + '\n', { flag: 'a+' });
    res.redirect('/');
})
app.post('/clr', async (req, res) => {
    fs.writeFileSync(__dirname + '/file.txt', '');
    res.redirect('/');
})


app.listen(3000, async () => {
    console.info('started server at http://localhost:3000');
    // await open('http://localhost:3000');
})