const express = require('express')
const request = require('request'); // make HTTP requests
const cheerio = require('cheerio'); // Implementation of core jQuery specifically for the server
const phantom = require('phantom');

const fs = require('fs');
const app = express();

app.use(express.static('public'));
app.use(express.static(__dirname + '/node_modules'));

app.get('/get_weather/:location', function(req, res) {
  try {
    const url = `https://www.theweathernetwork.com/ca/search?q=${req.params.location}`;
    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var exact_match = $('.exact_match');
            if (exact_match.length > 0) {
                var url1 = $($('ul .result')[1]).find('a').attr('href');
            } else {
                var url1 = $($('ul .result')[0]).find('a').attr('href');
            }
            console.log(url1);
        } // TODO: handle error
        const url_next = `https://www.theweathernetwork.com${url1}`;
        console.log(url_next);

      (async function() {
        const instance = await phantom.create();
        const page = await instance.createPage();
        const status = await page.open(url_next);
        page.evaluate(function() {
          var weatherObj = { metrics: {}, icons: {} };
          var metrics = document.getElementsByClassName('metric');
          weatherObj.metrics.temperature = document.getElementsByClassName('temperature')[0].textContent;
          weatherObj.icons.temperature = document.getElementsByClassName('weather-icon')[0].children[0].src;
          weatherObj.metrics.title = document.getElementById('h1_title').innerText;
          for (var i = 0; i < metrics.length - 2; i++) { // NOTE: no UV
            weatherObj.metrics[metrics[i].textContent.toLowerCase().replace(" ", "_")] = metrics[i].nextSibling.textContent;
          }
          return weatherObj;
        }).then(function(weather) {
          console.log(JSON.stringify(weather));
          instance.exit();
          res.send(weather);
      }); // TODO: add catch statement
    })();

    })
  }
  catch(err) {
    res.status(500).send(err);
  }
});

app.listen('8080', function() {
  console.log("Moveo weather app");
});
