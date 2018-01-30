const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
        user: '927195249@qq.com',
        pass: 'zksylghutoogbfeh'//授权码,通过QQ获取
    }
})


function sendMail(feedbackInfo) {

    let mailOptions = {
        from: '"微Yue" <927195249@qq.com>',
        to: '1327995362@qq.com',
        subject: '意见反馈',
        text: '意见反馈人QQ：' + feedbackInfo.qq + '\n' + '意见反馈内容：' + feedbackInfo.feedback,
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            return
        }

        console.log('发送成功' + JSON.stringify(info));

    })

}

exports.sendMail = sendMail;




