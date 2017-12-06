const classifyInfo = require('../../model/bookClassifyInfo');



/**
 * 获取图书所有分类
 */
function saveOrupdateClassify(info) {

    classifyInfo.findOne({}, (err, res) => {
        if (res == null) {
            let data = newInfo(info);
            //添加数据
            classifyInfo.create(data, (err, res) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('插入书籍分类成功');
            });
        } else {

            let data = newInfo(info);
            //更新数据
            classifyInfo.findByIdAndUpdate(res._id, data, function (err, res) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('更新书籍分类成功');
            })
        }
    })
}

const newInfo = function (info) {
    info.male = setIcon(info.male);
    info.female = setIcon(info.female);
    info.picture = setIcon(info.picture);
    info.press = setIcon(info.press);
    return info;
}

/**
 * @param classifyInfo
 * @returns {*}
 */
const setIcon = function (classifyInfo) {
    let dirpath = '/images/icon/';
    classifyInfo.forEach((obj, index) => {
        obj.icon = dirpath + obj.name + '.png';
    })
    return classifyInfo;
}


exports.saveOrupdateClassify = saveOrupdateClassify;

