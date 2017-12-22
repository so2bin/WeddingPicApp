/*
*    项目规格数据定义
*   尺寸即为实际打印照片纸张的比例
*/

const tmplts = {
    lng: [
        {
            name: '4×6英寸（竖）',
            showW: 320,
            showH: 480,
            rw: 2,
            rh: 3
        },
        {
            name: '4×8英寸（竖）',
            showW: 240,
            showH: 480,
            rw: 1,
            rh: 2
        },
    ],
    hr: [
        {
            name: '6×4英寸（横）',
            showW: 480,
            showH: 320,
            rw: 3,
            rh: 2
        },
        {
            name: '8×4英寸（横）',
            showW: 480,
            showH: 240,
            rw: 2,
            rh: 1
        },
    ]
}

const ImgRate = [
    {
        name: '3 : 2',
        rw: 3,
        rh: 2
    },
    {
        name: '4 : 3',
        rw: 4,
        rh: 3
    },
    {
        name: '1 : 1',
        rw: 1,
        rh: 1
    },
    {
        name: '16 : 9',
        rw: 16,
        rh: 9
    },
]


const DefaultTemplates = {
    hr: [
        {
            name: "无",
            url: null,
        },
        {
            name: "3×2默认模板",
            url: "\\static\\img\\template\\hr_tmp_32.png",
        },
        {
            name: "2×1默认模板",
            url: "\\static\\img\\template\\hr_tmp_21.png",
        },
        {
            name: "自定义",
            url: null,
        },
    ],
    lng: [
        {
            name: "无",
            url: null,
        },
        {
            name: "2×3默认模板",
            url: "\\static\\img\\template\\lng_tmp_23.png",
        },
        {
            name: "1×2默认模板",
            url: "\\static\\img\\template\\lng_tmp_12.png",
        },
        {
            name: "自定义",
            url: null,
        },
    ]
}


const state = {
    tmpLst: tmplts,
    imgRate: ImgRate,
    defTmps: DefaultTemplates
}

const mutations = {

}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
