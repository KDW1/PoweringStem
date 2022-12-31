const fetch = require('node-fetch');
const axios = require('axios');

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
let countries = [];

async function yeah() {
    alphabet.forEach(async (letter) => {
        let data = await fetch('https://www.medifind.com/api/autocomplete/country?input=' + letter);
        let formatted = await data.json();
        formatted.forEach((country) => {
            if(!countries.includes(country)) {
                countries.push(country);
                if(country.country == 'Taiwan') {
                    console.log(letter);
                }
            }
        })
    })
}

yeah()