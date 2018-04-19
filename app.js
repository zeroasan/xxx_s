var spider = require('./spider');
var translate = require('./translate').translate

var MAX = 50;
var current = 0;

var levelOneHander = function(doc) {
    // new page crawled
    console.log("levelOneRequest:" + doc.url); // page url
    // uses cheerio, check its docs for more info
    doc.$(doc.$('aside ul.nav').eq(1)).find('li a').each(function(i, elem) {
        // do stuff with element
        var href = doc.$(elem).attr('href');
        if(href) {
            var url = doc.resolve(href);
            // crawl more
            spider.queue(url, levelTwoHander);
        }
    });
};


var levelTwoHander = function(doc) {
    console.log("levelTwoHander:" + doc.url); // page url

    doc.$('.content p').each(function(i, elem) {
        // do stuff with element
        var paragraph = doc.$(elem).html();
        translate(paragraph).then(function (body) {
            console.log(paragraph);
            var json = JSON.parse(body);
            console.log("source: " + json[0][0][1]);
            console.log("target: " + json[0][0][0]);
        })
    });
}

// start crawling
//spider.queue('https://www.tutorialspoint.com/jquery/index.htm', levelOneHander);
//spider.queue('https://www.tutorialspoint.com/jquery/jquery-overview.htm', levelTwoHander);