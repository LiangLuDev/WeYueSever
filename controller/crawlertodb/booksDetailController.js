const booksDetailInfo = require('../../model/booksDetailInfo');


//过滤的字段
const video_filter = {
    __v: 0,
};

/**
 * 保存或者更新书籍信息
 * @param bookinfo
 */
function saveOrUpdateBooksDetail(bookinfo) {
    booksDetailInfo.findOne({_id: bookinfo._id}, (err, res) => {
        if (err) {
            console.log('查询booksDetailInfo出错');
            return;
        }
        if (res == null) {
            booksDetailInfo.create(bookinfo, (err, res) => {
                if (err) {
                    console.log(err);
                    console.log('插入书籍详情信息失败');
                }
                console.log(res);
                console.log('插入书籍详情信息成功');
            })
        } else {

            booksDetailInfo.findByIdAndUpdate(bookinfo._id, bookinfo, (err, res) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('更新书籍详情成功');
            })
        }
    })
}

/**
 * 根据id查询书籍
 * @param id
 * @param callback
 */
function findBookDetailById(id, callback) {
    booksDetailInfo.findOne({"_id": id}, video_filter, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        callback(res);
    })
}


/**
 * 查询所有书籍
 * @param callback
 */
function findAllBooksDetail(callback) {
    booksDetailInfo.find({}, video_filter, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        callback(res);
    })
}

exports.saveOrUpdateBooksDetail = saveOrUpdateBooksDetail;
exports.findBookDetailById = findBookDetailById;
exports.findAllBooksDetail = findAllBooksDetail;



