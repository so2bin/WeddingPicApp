const electron = require('electron');
let printer = require('printer');
let fs = require('fs');
// let NDB = require('./ndb');
let ipcMain = electron.ipcMain;
import {dbs} from './ndb'
export let funcs = ()=>{
  // printer events
  // ipcMain.on('ipc-printer-list', (event, arg)=>{
  //   let prntlst = printer.getPrinters();
  //   let prntrs = []
  //   prntlst.forEach(elem => {
  //     prntrs.push(elem.name);
  //   });
  //    event.sender.send('ipc-printer-list', prntrs);
  // })
  let db = dbs.getdb('test');
  // db.insert({'name': 'hello world'}, (err, newDoc)=>{
  //     if(err){
  //         console.error(err);
  //     }
  // })
  // db.update({name: 'test'}, {$set: {No: "555"}},
  //   { upsert: true }, (err, numAffected)=>{
  //       if(err){
  //           console.error(err);
  //       }else{
  //           console.log('111 ', numAffected);
  //       }
  //   })
  //       db.findOne({name: 'test'}, (err, doc)=>{
  //           console.log(doc, err);
  //       })
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
