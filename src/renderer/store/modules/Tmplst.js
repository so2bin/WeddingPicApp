/*
*    项目规格数据定义
*   尺寸即为实际打印照片纸张的比例
*/

// 真实处理时的模板像素尺寸
const realsize = [
    { w: 1204, h: 1806 },  // 4*6
    { w: 1204, h: 2408 },  // 4*8
]
// 界面用户使用缩小后的模板像素尺寸
const tmpsize = [
    {w: 320, h: 480},  // 4*6
    {w: 240, h: 480},  // 4*8
]

const tmplts = {
    lng: [
        {
            name: '4×6英寸（竖）',
            showW: tmpsize[0].w,
            showH: tmpsize[0].h,
            rw: 2,
            rh: 3,
            rlsize: {w: realsize[0].w, h: realsize[0].h}
        },
        {
            name: '4×8英寸（竖）',
            showW: tmpsize[1].w,
            showH: tmpsize[1].h,
            rw: 1,
            rh: 2,
            rlsize: {w: realsize[1].w, h: realsize[1].h}
        },
    ],
    hr: [
        {
            name: '6×4英寸（横）',
            showW: tmpsize[0].h,
            showH: tmpsize[0].w,
            rw: 3,
            rh: 2,
            rlsize: {w: realsize[0].h, h: realsize[0].w}
        },
        {
            name: '8×4英寸（横）',
            showW: tmpsize[1].h,
            showH: tmpsize[1].w,
            rw: 2,
            rh: 1,
            rlsize: {w: realsize[1].h, h: realsize[1].w}
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
            url: "/static/img/template/hr_tmp_32.png",
        },
        {
            name: "2×1默认模板",
            url: "/static/img/template/hr_tmp_21.png",
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
            url: "/static/img/template/lng_tmp_23.png",
        },
        {
            name: "1×2默认模板",
            url: "/static/img/template/lng_tmp_12.png",
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
    defTmps: DefaultTemplates,
    tmpRealSize: realsize
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
