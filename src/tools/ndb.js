/*************************
*    包装nedb接口
*/
const electron = require('electron');
const Datastore = require('nedb');
const path = require('path')

const REUSERDATA = new RegExp("^(/D|D)ata/")

class NDB {
    constructor(filename='Data/default.db'){
        if(!REUSERDATA.test(filename)){
            filename = filename.replace(/^\/*/, '')
            filename = `Data/${filename}`;
        }
        this.app = electron.app || electron.remote.app;
        this.filename = path.join(this.app.getPath('userData'), filename);
        this.db = null;
    }
    init(){
        this.db = new Datastore({filename: this.filename, autoload: true});
        this.db.loadDatabase();
    }
}


/****
*   根据库名封装所有数据库
*/
class DBS {
    constructor(){
        this._DBS = {};
    }
    /****
    *  没有则直接创建
    */
    getdb (dbName){
        if(!dbName){
            return null;
        }
        if(!(dbName in this._DBS)){
            let ndb = new NDB(`Data/${dbName}.db`);
            ndb.init();
            this._DBS[dbName] = ndb.db;
            return this._DBS[dbName];
        }else{
            return this._DBS[dbName];
        }
    }
}
export let dbs = new DBS();
