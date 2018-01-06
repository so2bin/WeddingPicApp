const electron = require('electron');
let printer = require('printer');
let fs = require('fs');
// let NDB = require('./ndb');
let ipcMain = electron.ipcMain;
import {dbs} from './ndb'
import {uploadImg} from './uploadimg'

// APP启动时在主进程里运行该函数
export let funcs = ()=>{
  uploadImg();
}

// module.exports.saveBase64 = ()=>{
//     ipcMain.on('ipc-savebase64', (event, arg)=>{
//         let data = arg.data;
//         let filepath = arg.filepath;
//         let base64Data = data.replace(/^data:image\/\w+;base64,/, "");
//         let dataBuffer = new Buffer(base64Data, 'base64');
//         fs.writeFile(filepath, dataBuffer, function(err) {
//             if(err){
//                 event.sender.send('ipc-savebase64', {'status': 1, msg: err});
//             }else{
//                 event.sender.send('ipc-savebase64', {'status': 0, filepath: filepath});
//             }
//         });
//     })
// }

/***************************************************************/
