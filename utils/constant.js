const RESULT_CODE = {
    SUCCESS:        {code: 10000, msg: '请求成功'},
    CREATE_SUCCESS: {code: 10001, msg: '创建成功'},
    UPDATE_SUCCESS: {code: 10002, msg: '修改成功'},
    DELETE_SUCCESS: {code: 10004, msg: '删除成功'},
    NO_DATA:        {code: 10005, msg: '查询不到数据'},
    ARG_ERROR:      {code: 40000, msg: '参数错误'},
    NO_LOGIN:       {code: 40001, msg: '未登录'},
    FORBIDDEN:      {code: 40003, msg: '禁止访问'},
    NOT_FOUND:      {code: 40004, msg: '未找到'},
    INTERNAL_ERROR: {code: 50000, msg: '服务器内部错误'},
    FAILD:          {code: 50003, msg: '请求失败'}
};

exports.RESULT_CODE = RESULT_CODE;