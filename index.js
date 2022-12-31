const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const fetch = require('node-fetch')


app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // res.render('index');
})

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});