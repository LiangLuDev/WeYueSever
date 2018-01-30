
const BOOK_CLASSIFY = {
    male: [
        {
            icon: "/images/icon/玄幻.png",
            monthlyCount: 14297,
            bookCount: 491899,
            name: "玄幻"
        },
        {
            icon: "/images/icon/奇幻.png",
            monthlyCount: 1480,
            bookCount: 45889,
            name: "奇幻"
        },
        {
            icon: "/images/icon/武侠.png",
            monthlyCount: 1006,
            bookCount: 40716,
            name: "武侠"
        },
        {
            icon: "/images/icon/仙侠.png",
            monthlyCount: 5795,
            bookCount: 131973,
            name: "仙侠"
        },
        {
            icon: "/images/icon/都市.png",
            monthlyCount: 10424,
            bookCount: 350719,
            name: "都市"
        },
        {
            icon: "/images/icon/职场.png",
            monthlyCount: 671,
            bookCount: 16152,
            name: "职场"
        },
        {
            icon: "/images/icon/历史.png",
            monthlyCount: 2281,
            bookCount: 69622,
            name: "历史"
        },
        {
            icon: "/images/icon/军事.png",
            monthlyCount: 1102,
            bookCount: 14804,
            name: "军事"
        },
        {
            icon: "/images/icon/游戏.png",
            monthlyCount: 1967,
            bookCount: 80173,
            name: "游戏"
        },
        {
            icon: "/images/icon/竞技.png",
            monthlyCount: 243,
            bookCount: 5612,
            name: "竞技"
        },
        {
            icon: "/images/icon/科幻.png",
            monthlyCount: 1764,
            bookCount: 116004,
            name: "科幻"
        },
        {
            icon: "/images/icon/灵异.png",
            monthlyCount: 2783,
            bookCount: 37214,
            name: "灵异"
        },
        {
            icon: "/images/icon/同人.png",
            monthlyCount: 339,
            bookCount: 38679,
            name: "同人"
        },
        {
            icon: "/images/icon/轻小说.png",
            monthlyCount: 388,
            bookCount: 4768,
            name: "轻小说"
        }
    ],
    female: [
        {
            icon: "/images/icon/古代言情.png",
            monthlyCount: 9247,
            bookCount: 459198,
            name: "古代言情"
        },
        {
            icon: "/images/icon/现代言情.png",
            monthlyCount: 15686,
            bookCount: 587782,
            name: "现代言情"
        },
        {
            icon: "/images/icon/青春校园.png",
            monthlyCount: 2600,
            bookCount: 115176,
            name: "青春校园"
        },
        {
            icon: "/images/icon/纯爱.png",
            monthlyCount: 1089,
            bookCount: 132967,
            name: "纯爱"
        },
        {
            icon: "/images/icon/玄幻奇幻.png",
            monthlyCount: 458,
            bookCount: 126395,
            name: "玄幻奇幻"
        },
        {
            icon: "/images/icon/武侠仙侠.png",
            monthlyCount: 1294,
            bookCount: 62975,
            name: "武侠仙侠"
        },
        {
            icon: "/images/icon/科幻.png",
            monthlyCount: 253,
            bookCount: 9638,
            name: "科幻"
        },
        {
            icon: "/images/icon/游戏竞技.png",
            monthlyCount: 139,
            bookCount: 6509,
            name: "游戏竞技"
        },
        {
            icon: "/images/icon/悬疑灵异.png",
            monthlyCount: 568,
            bookCount: 13585,
            name: "悬疑灵异"
        },
        {
            icon: "/images/icon/同人.png",
            monthlyCount: 160,
            bookCount: 118859,
            name: "同人"
        },
        {
            icon: "/images/icon/女尊.png",
            monthlyCount: 875,
            bookCount: 20306,
            name: "女尊"
        },
        {
            icon: "/images/icon/莉莉.png",
            monthlyCount: 72,
            bookCount: 25882,
            name: "莉莉"
        }
    ],
    press: [
        {
            icon: "/images/icon/传记名著.png",
            monthlyCount: 1387,
            bookCount: 4280,
            name: "传记名著"
        },
        {
            icon: "/images/icon/出版小说.png",
            monthlyCount: 2433,
            bookCount: 10610,
            name: "出版小说"
        },
        {
            icon: "/images/icon/人文社科.png",
            monthlyCount: 8912,
            bookCount: 54617,
            name: "人文社科"
        },
        {
            icon: "/images/icon/生活时尚.png",
            monthlyCount: 522,
            bookCount: 2731,
            name: "生活时尚"
        },
        {
            icon: "/images/icon/经管理财.png",
            monthlyCount: 2129,
            bookCount: 5336,
            name: "经管理财"
        },
        {
            icon: "/images/icon/青春言情.png",
            monthlyCount: 1145,
            bookCount: 10289,
            name: "青春言情"
        },
        {
            icon: "/images/icon/外文原版.png",
            monthlyCount: 394,
            bookCount: 1117,
            name: "外文原版"
        },
        {
            icon: "/images/icon/政治军事.png",
            monthlyCount: 180,
            bookCount: 544,
            name: "政治军事"
        },
        {
            icon: "/images/icon/成功励志.png",
            monthlyCount: 2208,
            bookCount: 9166,
            name: "成功励志"
        },
        {
            icon: "/images/icon/育儿健康.png",
            monthlyCount: 2311,
            bookCount: 10218,
            name: "育儿健康"
        }
    ]
}


const RESULT_CODE = {
    SUCCESS: {code: 10000, msg: '请求成功'},
    CREATE_SUCCESS: {code: 10001, msg: '创建成功'},
    UPDATE_SUCCESS: {code: 10002, msg: '修改成功'},
    DELETE_SUCCESS: {code: 10004, msg: '删除成功'},
    NO_DATA: {code: 10005, msg: '查询不到数据'},
    ARG_ERROR: {code: 40000, msg: '参数错误'},
    NO_LOGIN: {code: 40001, msg: '未登录'},
    FORBIDDEN: {code: 40003, msg: '禁止访问'},
    NOT_FOUND: {code: 40004, msg: '未找到'},
    UPLOAD_ERR: {code: 40005, msg: '上传失败'},
    INTERNAL_ERROR: {code: 50000, msg: '服务器内部错误'},
    FAILD: {code: 50003, msg: '请求失败'},
    TOKEN_NO_FIND: {code: 60001, msg: 'token找不到,请重新登录'},
    TOKEN_ERR: {code: 60002, msg: 'token无效,请重新登录'},
};

exports.RESULT_CODE = RESULT_CODE;
exports.BOOK_CLASSIFY = BOOK_CLASSIFY;