/***********************************
 *   upload imgs
 */
import axios from 'axios'
const fs = require('fs');
const electron = require('electron');
const urlConf = require('../renderer/store/modules/conf').default.state;
import {UUFile} from './uufile'
const COS = require('./cos');
let ipcMain = electron.ipcMain;

/**
 * 上传到腾讯云
 */
export let uploadToSOC = function(userId, suiteId, imgUrl, code, key=null){
    let uuf = new UUFile(userId, suiteId);
    key = key || uuf.generate(code);
    let onPro = function(proData){
        console.log(proData);
    }
    return new Promise((resolve, reject)=>{
        COS.upload(key, imgUrl, onPro, (err, data)=>{
            if(err){
                reject(err);
            }else{
                let url = COS.getObjectUrl(key);
                resolve({
                    url: url,
                    key
                });
            }
        })
    })
}

/**
 * 上传到服务器
 */
export let uploadToSvr = function(userId, suiteId, oriUrl, oriKey, oriSize,
    code, beautor=''){
    return axios.post(urlConf.PIC_UPLOAD, {
        suite_id: suiteId,
        code: code,
        origin_url: oriUrl,
        origin_key: oriKey,
        origin_size: oriSize,
        beautor: beautor
    })
}

/**
 *  upload one image
 */
let _uploadImg = function(event, userId, suiteId, imgUrl, code, key=null){
    let oriSize = fs.statSync(imgUrl).size;
    uploadToSOC(userId, suiteId, imgUrl, code, key)
        .then((res)=>{
            return uploadToSvr(userId, suiteId, res.url,
                res.key, oriSize, code)
        })
        .then((res)=>{
            if(!res){
                throw new Error('运行错误，返回空');
            }
            if(res.status !== 200 || res.data.status !== 0){
                throw new Error(res.data.msg);
            }else{
                // success
                console.log('上传成功，返回：', res.data.data);
                event.sender.send('ipc-upload-img', res.data.data);
            }
        })
        .catch((err)=>{
            console.error('上传图片失败：',err);
            event.sender.send('ipc-upload-img', err);
        })
}

export let uploadImg = function(){
    ipcMain.on('ipc-upload-img', (event, arg)=>{
        console.log('检测到上传任务：', arg);
        _uploadImg(event, arg.userId, arg.suiteId, arg.imgUrl, arg.code, arg.key);
    })
}
