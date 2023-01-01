const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const fetch = require('node-fetch');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const path = require('path');



app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/diagnosis', async (req, res) => {
    let { symptoms, sex, otherHealthInfo, regionId, dob } = req.body;
    //Formatting input
    console.log(symptoms.split(', '))
    formattedSymptoms = symptoms.split(', ');
    formattedHealthInfo = otherHealthInfo.split(', ');
    regionId = parseInt(regionId);
    dob = parseInt(dob);

    let queries = createAddOn(formattedSymptoms, sex, formattedHealthInfo, regionId, dob);
    let url = `https:/www.medifind.com/api/symptom-checker/diagnose${queries}`;
    let response = await fetch(url);
    console.log(await response.json());
    console.log(url)
    res.render('index', {
        url: url
    })
    // console.log(cor.html.body[0]);
    // console.log(cor.html.body[0].script);
    // console.log(await diagnosis);
    // console.log("Version");
})

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

function createAddOn(symptoms, sex, otherHealthInfo, regionId, dob) {
    let addOn = `?sex=${sex}&regionId=${regionId}&dob=${dob}&`;
    symptoms.forEach((symptom) => {
        addOn += `symptoms[]=${symptom}&`;
    })
    otherHealthInfo.forEach((condition) => {
        addOn += `otherHealthInfo[]=condition&`;
    })
    return addOn.slice(0, addOn.length-1);
}