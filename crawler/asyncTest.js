const async = require("async");
const http = require('request');
console.time('series');


function net1(done) {
    http('http://api.zhuishushenqi.com/cats/lv2/statistics', (err, res, data) => {
        if (!err) {
            console.log('net1==' + data);
            let s = new Array({p1: [1, 2, 3], p2: 'a'}, {p1: [4, 5, 6], p2: 'b'})

            async.mapSeries(s, net4, (err, datas) => {
                if (err) {
                    console.log(err);
                }
                done(null, "success")
                console.log('success' + datas);
            })
        } else {
            done(err, null)
        }
    })
}


function net4(p, cb) {

    async.mapSeries(p.p1, net5, (err, datas) => {
        if (err) {
            console.log(err);
            cb(err, null)
        }
        cb(null, 'net4==' + datas)
        console.log('success==net4' + datas);
    })


    // http('http://api.zhuishushenqi.com/cats/lv2/statistics', (err, res, data) => {
    //     if (!err) {
    //         // if (i == 3) {
    //         cb(null, 'net4=='  + p.p1+p.p2 + data)
    //         // }
    //         console.log('net4==' + p.p1+p.p2 + data);
    //     } else {
    //         cb(err, null)
    //     }
    // })
}


function net5(p, cb) {
    http('http://api.zhuishushenqi.com/cats/lv2/statistics', (err, res, data) => {
        if (!err) {
            cb(null, 'net5==' + p + data)
            console.log('net5==' + p + data);
        } else {
            cb(err, null)
        }
    })
}


async.series({
    net1: net1,
    net2: (done) => {
        http('http://api.zhuishushenqi.com/cats/lv2/statistics', (err, res, data) => {
            if (!err) {
                done(null, 'net2==' + data)
                console.log('net2==' + data);
            } else {
                done(err, null)
            }
        })
    },
    net3: (done) => {
        http('http://api.zhuishushenqi.com/cats/lv2/statistics', (err, res, data) => {
            if (!err) {
                done(null, 'net3==' + data)
                console.log('net3==' + data);
            } else {
                done(err, null)
            }
        })
    }


}, (err, datas) => {
    if (!err) {
        // console.log(datas);
        // console.log('net1', datas.net1);
        // console.log('net2', datas.net2);
        // console.log('net3', datas.net3);
        console.timeEnd('series')
    }
})