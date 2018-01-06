
/*************************************************
*   上传到腾讯云的文件guid编码规则与实现
*    user_id(base64) + suite_id(base64) + Date.now() + picname + Math.randomInt(0, 10000)
*/

let LEN_TIME = Date.now().toString().length;
let LEN_PIC_CODE = 4;
let CONNECTOR = `&`;
let SUFFIX_RE = `([0-9]{${LEN_TIME}})([0-9A-Z]{${LEN_PIC_CODE}})([0-9]+)`;
let BASE64_CHARS = `[0-9a-zA-Z+/=]`
let UUFILE_RE = new RegExp(`(${BASE64_CHARS}+)${CONNECTOR}(${BASE64_CHARS}+)${CONNECTOR}${SUFFIX_RE}`);

export let randomInt = function(min=0, max=10000){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min) + min);
}

export class UUFile {
    constructor(userid, suiteid){
        this.userid = userid.toString();
        this.suiteid = suiteid.toString();
        this._userid_base64 = new Buffer(this.userid).toString('base64');
        this._suiteid_base64 = new Buffer(this.suiteid).toString('base64');
        this.prefix = `${this._userid_base64}${CONNECTOR}${this._suiteid_base64}`;
        this.re = new RegExp(`${this.prefix}${CONNECTOR}${SUFFIX_RE}`);
    }
    generate(picname) {
        return `${this.prefix}${CONNECTOR}${Date.now()}${picname}${randomInt()}`
    }
    parse(ufile){
        let mt = ufile.match(this.re);
        if(!mt){
            return null;
        }else{
            return { time: mt[1], picname:mt[2], rint: mt[3] };
        }
    }
    static Parse(ufile) {
        let mt = ufile.match(UUFILE_RE);
        if(!mt){
            return null;
        }else{
            let userid_base64 = mt[1];
            let suiteid_base64 = mt[2];
            let userid = parseInt(new Buffer(userid_base64, 'base64').toString('utf8'));
            let suiteid = parseInt(new Buffer(suiteid_base64, 'base64').toString('utf8'));
            return { userid, suiteid, time: parseInt(mt[3]), picname: mt[4], rint: parseInt(mt[5]) };
        }
    }
}
