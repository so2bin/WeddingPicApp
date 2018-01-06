/**
 *  tengxu cos object
 */
import {config} from '../conf'
const COS = require('cos-nodejs-sdk-v5');
const fs = require('fs');
const url = require("url");

let cos = new COS({
    SecretId: config.SecretId,
    SecretKey: config.SecretKey,
    AppId: config.APPID,
});


export let upload = function(key, filePath, onProgress, callback) {
    cos.putObject({
        Bucket: config.Bucket,
        Region: config.Region,
        Key: key,
        ContentLength : fs.statSync(filePath).size,
        Body: fs.createReadStream(filePath),
        onProgress: onProgress,
    }, callback)
}

export let getObjectUrl = function(key) {
    let url = cos.getObjectUrl({
        Bucket: config.Bucket,
        Region: config.Region,
        Key: key
    });
    return url.split('?')[0];
}

export let deleteObject = function(key, callback) {
    cos.deleteObject({
        Bucket: config.Bucket,
        Region: config.Region,
        Key: key
    }, callback)
}

export let deleteMultipleObject = function(keyArr, callback) {
    cos.deleteMultipleObject({
        Bucket: config.Bucket,
        Region: config.Region,
        Objects: keyArr
    }, callback)
}
