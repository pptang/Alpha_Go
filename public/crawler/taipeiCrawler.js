var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");
request({
	url: "http://taipei.network.com.tw/taipei-city/",
	method: "GET"
}, function(err, r, data) {
	if(!err) console.log(data);

	$ = cheerio.load(data);
	var titles = $("div.introduction ul li a");
	var result = [];
	for (var i = 0; i < titles.length; i++) {
		result.push($(titles[i]).text());
	}
	//console.log("result:" + JSON.stringify(result));
	fs.writeFileSync("../attractions.json", JSON.stringify(result));
});
