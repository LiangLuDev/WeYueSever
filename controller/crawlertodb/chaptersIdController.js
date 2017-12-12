const chaptersIdInfo = require('../../model/chaptersIdInfo');


//过滤的字段
const video_filter = {
    __v: 0,
};

/**
 * 保存或者更新目录id
 * @param bookinfo
 */
function saveOrUpdateChaptersId(bookinfo) {
    chaptersIdInfo.findOne({bookId: bookinfo.bookId}, (err, res) => {
        if (err) {
            console.log('查询chaptersIdInfo出错');
            return;
        }
        if (res == null) {
            chaptersIdInfo.create(bookinfo, (err, res) => {
                if (err) {
                    console.log(err);
                    console.log('插入目录id信息失败');
                }
                console.log(res);
                console.log('插入目录id信息成功');
            })
        } else {
            chaptersIdInfo.findByIdAndUpdate(bookinfo.bookId, bookinfo, (err, res) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('更新目录id成功');
            })
        }
    })
}

/**
 * 根据id查询目录id
 * @param id
 * @param callback
 */
function findChaptersIdById(id, callback) {
    chaptersIdInfo.findOne({"_id": id}, video_filter, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        callback(res);
    })
}


/**
 * 查询所有目录id
 * @param callback
 */
function findAllChaptersId(callback) {
    chaptersIdInfo.find({}, video_filter, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        callback(res);
    })
}

exports.saveOrUpdateChaptersId = saveOrUpdateChaptersId;
exports.findChaptersIdById = findChaptersIdById;
exports.findAllChaptersId = findAllChaptersId;



