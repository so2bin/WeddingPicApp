let electron = require('electron')
let printer = require('printer');

let ipcMain = electron.ipcMain;

module.exports.funcs = ()=>{
  // printer events
  ipcMain.on('ipc-printer-list', (event, arg)=>{
    let prntlst = printer.getPrinters();
    let prntrs = []
    prntlst.forEach(elem => {
      prntrs.push(elem.name);
    });
     event.sender.send('ipc-printer-list', prntrs);
  })
}
