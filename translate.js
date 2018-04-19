var request = require('request');

translate = function(sourceText, sourceLang='en', targetLang='cn') {
    return new Promise(function(resolve, reject){
        var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
            + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);

        var options = {
            url: url,
            headers: {
                'User-Agent': 'IE',
                'Content-Type': 'application/json',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
            }
        };

        request(options, function (error, response, body) {
            if(error) {
                reject(error);
            } else {
                JSON.parse(body);
                resolve(body);
            }
        });
    })

    //fetch(url).then(res => res.text()).then(body => console.log(body));
}

module.exports = {
    translate: translate
}
//
var text = "jQuery is a fast and concise JavaScript Library created by John Resig in 2006 with a nice motto: <b>Write less, do more</ b>. jQuery simplifies HTML document traversing, event handling, animating, and Ajax interactions for rapid web development. jQuery is a JavaScript toolkit designed to simplify various tasks by writing less code. Here is the list of important core features supported by jQuery \n";
translate(text).then(function (content) {
    console.log(content);
})