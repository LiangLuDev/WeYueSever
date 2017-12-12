const bookChaptersInfo = require('../../model/bookChaptersInfo');


//过滤的字段
const video_filter = {
    __v: 0,
};

/**
 * 保存或者更新书籍目录
 * @param bookinfo
 */
function saveOrUpdateBookChapters(bookinfo) {
    bookChaptersInfo.findOne({_id: bookinfo._id}, (err, res) => {
        if (err) {
            console.log('查询bookChaptersInfo出错');
            return;
        }
        if (res == null) {
            bookChaptersInfo.create(bookinfo, (err, res) => {
                if (err) {
                    console.log(err);
                    console.log('插入书籍目录信息失败');
                    return;
                }
                console.log(res);
                console.log('插入书籍目录信息成功');
            })
        } else {
            bookChaptersInfo.findByIdAndUpdate(bookinfo._id, bookinfo, (err, res) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('更新书籍目录成功');
            })
        }
    })
}

/**
 * 根据id查询书籍目录
 * @param id
 * @param callback
 */
function findBookChaptersById(id, callback) {
    bookChaptersInfo.findOne({"book": id}, video_filter, (err, res) => {
        if (err) {
            callback(err,null)
            return;
        }
        callback(null,res);
    })
}


exports.saveOrUpdateBookChapters = saveOrUpdateBookChapters;
exports.findBookChaptersById = findBookChaptersById;

