const https = require('request');
const classifyInfo = require('../../model/bookClassifyInfo');

const baseUrl = 'https://api.zhuishushenqi.com';

https(baseUrl + '/cats/lv2/statistics', (err, res, body) => {
    console.log(body);
    let stringify = JSON.parse(body);
    console.log(stringify);
    classifyInfo.create(stringify, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log(res);

    });


});