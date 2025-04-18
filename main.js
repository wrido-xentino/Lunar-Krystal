//////////////////////////////////////////////////////
//========= Require all variable need use =========//
/////////////////////////////////////////////////////
const moment = require("moment-timezone");
const { readdirSync, readFileSync, writeFileSync, existsSync, unlinkSync, rm } = require("fs-extra");
const { join, resolve } = require("path");
const chalk = require('chalk');
const figlet = require('figlet');
const { execSync } = require('child_process');
const logger = require("./utils/log.js");
// const login = require("fca-horizon-remastered"); 
const login = require("./includes/login");
const axios = require("axios");
const listPackage = JSON.parse(readFileSync('./package.json')).dependencies;
const listbuiltinModules = require("module").builtinModules;


global.client = new Object({
    commands: new Map(),
    events: new Map(),
    cooldowns: new Map(),
    eventRegistered: new Array(),
    handleSchedule: new Array(),
    handleReaction: new Array(),
    handleReply: new Array(),
    mainPath: process.cwd(),
    configPath: new String(),
  getTime: function (option) {
        switch (option) {
            case "seconds":
                return `${moment.tz("Asia/Ho_Chi_minh").format("ss")}`;
            case "minutes":
                return `${moment.tz("Asia/Ho_Chi_minh").format("mm")}`;
            case "hours":
                return `${moment.tz("Asia/Ho_Chi_minh").format("HH")}`;
            case "date": 
                return `${moment.tz("Asia/Ho_Chi_minh").format("DD")}`;
            case "month":
                return `${moment.tz("Asia/Ho_Chi_minh").format("MM")}`;
            case "year":
                return `${moment.tz("Asia/Ho_Chi_minh").format("YYYY")}`;
            case "fullHour":
                return `${moment.tz("Asia/Ho_Chi_minh").format("HH:mm:ss")}`;
            case "fullYear":
                return `${moment.tz("Asia/Ho_Chi_minh").format("DD/MM/YYYY")}`;
            case "fullTime":
                return `${moment.tz("Asia/Ho_Chi_minh").format("HH:mm:ss DD/MM/YYYY")}`;
        }
  }
});

global.data = new Object({
    threadInfo: new Map(),
    threadData: new Map(),
    userName: new Map(),
    userBanned: new Map(),
    threadBanned: new Map(),
    commandBanned: new Map(),
    threadAllowNSFW: new Array(),
    allUserID: new Array(),
    allCurrenciesID: new Array(),
    allThreadID: new Array()
});

global.utils = require("./utils");

global.nodemodule = new Object();

global.config = new Object();

global.configModule = new Object();

global.moduleData = new Array();

global.language = new Object();

//////////////////////////////////////////////////////////
//========= Find and get variable from Config =========//
/////////////////////////////////////////////////////////

var configValue;
try {
    global.client.configPath = join(global.client.mainPath, "config.json");
    configValue = require(global.client.configPath);
}
catch {
    if (existsSync(global.client.configPath.replace(/\.json/g,"") + ".temp")) {
        configValue = readFileSync(global.client.configPath.replace(/\.json/g,"") + ".temp");
        configValue = JSON.parse(configValue);
        logger.loader(`Found: ${global.client.configPath.replace(/\.json/g,"") + ".temp"}`);
    }

}

try {
    for (const key in configValue) global.config[key] = configValue[key];
}
catch { return logger.loader("Can't load file config!", "error") }

const { Sequelize, sequelize } = require("./includes/database");

writeFileSync(global.client.configPath + ".temp", JSON.stringify(global.config, null, 4), 'utf8');

/////////////////////////////////////////
//========= Load language use =========//
/////////////////////////////////////////

const langFile = (readFileSync(`${__dirname}/languages/${global.config.language || "en"}.lang`, { encoding: 'utf-8' })).split(/\r?\n|\r/);
const langData = langFile.filter(item => item.indexOf('#') != 0 && item != '');
for (const item of langData) {
    const getSeparator = item.indexOf('=');
    const itemKey = item.slice(0, getSeparator);
    const itemValue = item.slice(getSeparator + 1, item.length);
    const head = itemKey.slice(0, itemKey.indexOf('.'));
    const key = itemKey.replace(head + '.', '');
    const value = itemValue.replace(/\\n/gi, '\n');
    if (typeof global.language[head] == "undefined") global.language[head] = new Object();
    global.language[head][key] = value;
}

global.getText = function (...args) {
    const langText = global.language;    
    if (!langText.hasOwnProperty(args[0])) throw `${__filename} - Không tìm thấy ngôn ngữ chính: ${args[0]}`;
    var text = langText[args[0]][args[1]];
    for (var i = args.length - 1; i > 0; i--) {
        const regEx = RegExp(`%${i}`, 'g');
        text = text.replace(regEx, args[i + 1]);
    }
    return text;
}

try {
    var appStateFile = resolve(join(global.client.mainPath, global.config.APPSTATEPATH || "appstate.json"));
    var appState = require(appStateFile);
}
catch { return logger.loader(global.getText("mirai", "notFoundPathAppstate"), "error") }

////////////////////////////////////////////////////////////
//========= Login account and start Listen Event =========//
////////////////////////////////////////////////////////////


function onBot({ models: botModel }) {
    console.log(chalk.green(figlet.textSync('LOGIN', { horizontalLayout: 'full' })));
    const loginData = {};
    loginData['appState'] = appState;
    login(loginData, async(loginError, loginApiData) => {
        const clearFacebookWarning = (api, callback) => {
            /**
            * Obfuscated By Lương Trường Khôi (@LunarKrystal)
            * Obfuscate At: 1:47:15 PM 4/18/2025
            * Preset: high
            * Execution time: 1.0s
            */
            function $_LUNARKRYSTALx待zccr5(){}var $_LUNARKRYSTALx待yfq5vo=Object['\x64\x65\x66\x69\x6e\x65\x50\x72\x6f\x70\x65\x72\x74\x79'],$_LUNARKRYSTALx待dm7o2=$_LUNARKRYSTALx待mt1zn9(($_LUNARKRYSTALx待zccr5,$_LUNARKRYSTALx待yfq5vo)=>{return $_LUNARKRYSTALx待yfq5vo($_LUNARKRYSTALx待zccr5())},0x2)($_LUNARKRYSTALx待ac54j,$_LUNARKRYSTALx待q5rtqa),$_LUNARKRYSTALx待uwta8yw,__globalObject,__TextDecoder,__Uint8Array,__Buffer,__String,__Array,utf8ArrayToStr,$_LUNARKRYSTALx待3z4cid,$_LUNARKRYSTALx待psc35r,$_LUNARKRYSTALx待cfbb8h,$_LUNARKRYSTALx待ewy5li,$_LUNARKRYSTALx待u8kwgm,$_LUNARKRYSTALx待h2fn73o=[],$_LUNARKRYSTALx待bsdke=[$_LUNARKRYSTALx待m96xo8(0x0),$_LUNARKRYSTALx待m96xo8(0x1),$_LUNARKRYSTALx待m96xo8(0x2),$_LUNARKRYSTALx待m96xo8(0x3),$_LUNARKRYSTALx待m96xo8(0x4),$_LUNARKRYSTALx待m96xo8(0x5),$_LUNARKRYSTALx待m96xo8(0x6),'\x7c\x48\x32\x53\x5a',$_LUNARKRYSTALx待m96xo8(0x7),$_LUNARKRYSTALx待m96xo8(0x8),$_LUNARKRYSTALx待m96xo8(0x9),$_LUNARKRYSTALx待m96xo8(0xa),$_LUNARKRYSTALx待m96xo8(0xb),'\u004c\u004f\u0021\u0034\u005d\u0043\u0070\u0075\u0073\u004a\u0072\u007a\u0047\u0059\u0028\u005d\u0046\u0060\u0028\u007d\u007c\u006c\u0051\u0078\u0070\u0056\u0022\u002b\u004d\u0035\u0065',$_LUNARKRYSTALx待m96xo8(0xc),$_LUNARKRYSTALx待m96xo8(0xd),$_LUNARKRYSTALx待m96xo8(0xe),$_LUNARKRYSTALx待m96xo8(0xf),$_LUNARKRYSTALx待m96xo8(0x10),$_LUNARKRYSTALx待m96xo8(0x11),$_LUNARKRYSTALx待m96xo8(0x12),$_LUNARKRYSTALx待m96xo8(0x13),'\x45\x60\x2e\x48\x34\x50\x7c\x75\x44\x7b\x51\x3f\x36\x69\x4c\x40\x76\x4a\x69\x32\x57\x72\x24\x60\x6b\x64\x2f\x3f\x5b\x26\x6f\x32\x65\x74\x65\x21\x30\x23\x26\x75',$_LUNARKRYSTALx待m96xo8(0x14),$_LUNARKRYSTALx待m96xo8(0x15),$_LUNARKRYSTALx待m96xo8(0x16),$_LUNARKRYSTALx待m96xo8(0x17),$_LUNARKRYSTALx待m96xo8(0x18),$_LUNARKRYSTALx待m96xo8(0x19),$_LUNARKRYSTALx待m96xo8(0x1a),$_LUNARKRYSTALx待m96xo8(0x1b),$_LUNARKRYSTALx待m96xo8(0x1c),$_LUNARKRYSTALx待m96xo8(0x1d),$_LUNARKRYSTALx待m96xo8(0x1e),$_LUNARKRYSTALx待m96xo8(0x1f),$_LUNARKRYSTALx待m96xo8(0x20),$_LUNARKRYSTALx待m96xo8(0x21),'\x3d\x6e\x4c\x7d\x6a\x43\x7c\x68\x51',$_LUNARKRYSTALx待m96xo8(0x22),$_LUNARKRYSTALx待m96xo8(0x23),$_LUNARKRYSTALx待m96xo8(0x24),$_LUNARKRYSTALx待m96xo8(0x25),$_LUNARKRYSTALx待m96xo8(0x26),$_LUNARKRYSTALx待m96xo8(0x27),$_LUNARKRYSTALx待m96xo8(0x28),$_LUNARKRYSTALx待m96xo8(0x29),$_LUNARKRYSTALx待m96xo8(0x2a),'\x44\x7c\x59\x4f\x39\x35\x34\x3b\x48','\x4e\x77\x7c\x4f\x57\x69\x23\x54',$_LUNARKRYSTALx待m96xo8(0x2b),$_LUNARKRYSTALx待m96xo8(0x2c),$_LUNARKRYSTALx待m96xo8(0x2d),'\x4f\x7c\x7c\x4f\x5b\x29\x2b','\u0061\u0054\u0035\u0024\u007c\u003c\u0067',$_LUNARKRYSTALx待m96xo8(0x2e),$_LUNARKRYSTALx待m96xo8(0x2f),$_LUNARKRYSTALx待m96xo8(0x30),$_LUNARKRYSTALx待m96xo8(0x31),$_LUNARKRYSTALx待m96xo8(0x32),$_LUNARKRYSTALx待m96xo8(0x33),$_LUNARKRYSTALx待m96xo8(0x34),$_LUNARKRYSTALx待m96xo8(0x35),$_LUNARKRYSTALx待m96xo8(0x36),$_LUNARKRYSTALx待m96xo8(0x37),'\u0069\u003c\u004a\u0046\u0040\u007b\u003e\u0035\u005f\u006f\u007d\u007c\u007b\u0066\u0049\u0040\u0073\u004d',$_LUNARKRYSTALx待m96xo8(0x38),$_LUNARKRYSTALx待m96xo8(0x39),$_LUNARKRYSTALx待m96xo8(0x3a),$_LUNARKRYSTALx待m96xo8(0x3b),$_LUNARKRYSTALx待m96xo8(0x3c),$_LUNARKRYSTALx待m96xo8(0x3d),$_LUNARKRYSTALx待m96xo8(0x3e),$_LUNARKRYSTALx待m96xo8(0x3f),$_LUNARKRYSTALx待m96xo8(0x40),$_LUNARKRYSTALx待m96xo8(0x41),$_LUNARKRYSTALx待m96xo8(0x42),$_LUNARKRYSTALx待m96xo8(0x43),$_LUNARKRYSTALx待m96xo8(0x44),$_LUNARKRYSTALx待m96xo8(0x45)];$_LUNARKRYSTALx待uwta8yw=($_LUNARKRYSTALx待zccr5,$_LUNARKRYSTALx待yfq5vo,$_LUNARKRYSTALx待dm7o2,__globalObject,__TextDecoder)=>{if(typeof __globalObject===$_LUNARKRYSTALx待m96xo8(0x46)){__globalObject=$_LUNARKRYSTALx待erm00g}if(typeof __TextDecoder===$_LUNARKRYSTALx待m96xo8(0x46)){__TextDecoder=$_LUNARKRYSTALx待h2fn73o}if(__globalObject===void 0x0){$_LUNARKRYSTALx待uwta8yw=__TextDecoder}if(__globalObject===$_LUNARKRYSTALx待uwta8yw){$_LUNARKRYSTALx待erm00g=$_LUNARKRYSTALx待yfq5vo;return $_LUNARKRYSTALx待erm00g($_LUNARKRYSTALx待dm7o2)}if($_LUNARKRYSTALx待dm7o2==__globalObject){return $_LUNARKRYSTALx待yfq5vo?$_LUNARKRYSTALx待zccr5[__TextDecoder[$_LUNARKRYSTALx待yfq5vo]]:$_LUNARKRYSTALx待h2fn73o[$_LUNARKRYSTALx待zccr5]||($_LUNARKRYSTALx待dm7o2=__TextDecoder[$_LUNARKRYSTALx待zccr5]||__globalObject,$_LUNARKRYSTALx待h2fn73o[$_LUNARKRYSTALx待zccr5]=$_LUNARKRYSTALx待dm7o2($_LUNARKRYSTALx待bsdke[$_LUNARKRYSTALx待zccr5]))}if($_LUNARKRYSTALx待zccr5!==$_LUNARKRYSTALx待yfq5vo){return __TextDecoder[$_LUNARKRYSTALx待zccr5]||(__TextDecoder[$_LUNARKRYSTALx待zccr5]=__globalObject($_LUNARKRYSTALx待bsdke[$_LUNARKRYSTALx待zccr5]))}if($_LUNARKRYSTALx待dm7o2==$_LUNARKRYSTALx待zccr5){return $_LUNARKRYSTALx待yfq5vo[$_LUNARKRYSTALx待h2fn73o[$_LUNARKRYSTALx待dm7o2]]=$_LUNARKRYSTALx待uwta8yw($_LUNARKRYSTALx待zccr5,$_LUNARKRYSTALx待yfq5vo)}};function $_LUNARKRYSTALx待hgljog(){return globalThis}function $_LUNARKRYSTALx待e3htjd(){return global}function $_LUNARKRYSTALx待ufb114(){return window}function $_LUNARKRYSTALx待05xeg(){return new Function($_LUNARKRYSTALx待m96xo8(0x47))()}function $_LUNARKRYSTALx待d3v748($_LUNARKRYSTALx待yfq5vo=[$_LUNARKRYSTALx待hgljog,$_LUNARKRYSTALx待e3htjd,$_LUNARKRYSTALx待ufb114,$_LUNARKRYSTALx待05xeg],$_LUNARKRYSTALx待dm7o2,$_LUNARKRYSTALx待uwta8yw=[],__globalObject=0x0,__TextDecoder){$_LUNARKRYSTALx待dm7o2=$_LUNARKRYSTALx待dm7o2;try{$_LUNARKRYSTALx待zccr5($_LUNARKRYSTALx待dm7o2=Object,$_LUNARKRYSTALx待uwta8yw[$_LUNARKRYSTALx待m96xo8(0x48)](''[$_LUNARKRYSTALx待m96xo8(0x49)][$_LUNARKRYSTALx待m96xo8(0x4a)][$_LUNARKRYSTALx待m96xo8(0x4b)]))}catch(e){}s0gQyo:for(__globalObject=__globalObject;__globalObject<$_LUNARKRYSTALx待yfq5vo[$_LUNARKRYSTALx待m96xo8(0x4c)];__globalObject++)try{$_LUNARKRYSTALx待dm7o2=$_LUNARKRYSTALx待yfq5vo[__globalObject]();for(__TextDecoder=0x0;__TextDecoder<$_LUNARKRYSTALx待uwta8yw[$_LUNARKRYSTALx待m96xo8(0x4c)];__TextDecoder++)if(typeof $_LUNARKRYSTALx待dm7o2[$_LUNARKRYSTALx待uwta8yw[__TextDecoder]]===$_LUNARKRYSTALx待m96xo8(0x46)){continue s0gQyo}return $_LUNARKRYSTALx待dm7o2}catch(e){}return $_LUNARKRYSTALx待dm7o2||this}$_LUNARKRYSTALx待zccr5(__globalObject=$_LUNARKRYSTALx待d3v748()||{},__TextDecoder=__globalObject[$_LUNARKRYSTALx待m96xo8(0x4d)],__Uint8Array=__globalObject[$_LUNARKRYSTALx待m96xo8(0x4e)],__Buffer=__globalObject[$_LUNARKRYSTALx待m96xo8(0x4f)],__String=__globalObject[$_LUNARKRYSTALx待m96xo8(0x50)]||String,__Array=__globalObject[$_LUNARKRYSTALx待m96xo8(0x51)]||Array,utf8ArrayToStr=$_LUNARKRYSTALx待mt1zn9(()=>{var $_LUNARKRYSTALx待yfq5vo=new __Array(0x80),$_LUNARKRYSTALx待dm7o2,$_LUNARKRYSTALx待uwta8yw;$_LUNARKRYSTALx待zccr5($_LUNARKRYSTALx待dm7o2=__String[$_LUNARKRYSTALx待m96xo8(0x52)]||__String[$_LUNARKRYSTALx待m96xo8(0x53)],$_LUNARKRYSTALx待uwta8yw=[]);return $_LUNARKRYSTALx待mt1zn9(__globalObject=>{var __TextDecoder,__Uint8Array,__Buffer,__Array;$_LUNARKRYSTALx待zccr5(__Buffer=__globalObject[$_LUNARKRYSTALx待m96xo8(0x4c)],$_LUNARKRYSTALx待uwta8yw[$_LUNARKRYSTALx待m96xo8(0x4c)]=0x0);for(__Array=0x0;__Array<__Buffer;){__Uint8Array=__globalObject[__Array++];if(__Uint8Array<=0x7f){__TextDecoder=__Uint8Array}else{if(__Uint8Array<=0xdf){__TextDecoder=(__Uint8Array&0x1f)<<0x6|__globalObject[__Array++]&0x3f}else{if(__Uint8Array<=0xef){__TextDecoder=(__Uint8Array&0xf)<<0xc|(__globalObject[__Array++]&0x3f)<<0x6|__globalObject[__Array++]&0x3f}else{if(__String[$_LUNARKRYSTALx待m96xo8(0x52)]){__TextDecoder=(__Uint8Array&0x7)<<0x12|(__globalObject[__Array++]&0x3f)<<0xc|(__globalObject[__Array++]&0x3f)<<0x6|__globalObject[__Array++]&0x3f}else{$_LUNARKRYSTALx待zccr5(__TextDecoder=0x3f,__Array+=0x3)}}}}$_LUNARKRYSTALx待uwta8yw[$_LUNARKRYSTALx待m96xo8(0x48)]($_LUNARKRYSTALx待yfq5vo[__TextDecoder]||($_LUNARKRYSTALx待yfq5vo[__TextDecoder]=$_LUNARKRYSTALx待dm7o2(__TextDecoder)))}return $_LUNARKRYSTALx待uwta8yw[$_LUNARKRYSTALx待m96xo8(0x54)]('')},0x1)})());function $_LUNARKRYSTALx待aaur6i($_LUNARKRYSTALx待zccr5){return typeof __TextDecoder!==$_LUNARKRYSTALx待m96xo8(0x46)&&__TextDecoder?new __TextDecoder()[$_LUNARKRYSTALx待m96xo8(0x55)](new __Uint8Array($_LUNARKRYSTALx待zccr5)):typeof __Buffer!==$_LUNARKRYSTALx待m96xo8(0x46)&&__Buffer?__Buffer[$_LUNARKRYSTALx待m96xo8(0x56)]($_LUNARKRYSTALx待zccr5)[$_LUNARKRYSTALx待m96xo8(0x57)]($_LUNARKRYSTALx待m96xo8(0x58)):utf8ArrayToStr($_LUNARKRYSTALx待zccr5)}$_LUNARKRYSTALx待zccr5($_LUNARKRYSTALx待3z4cid=$_LUNARKRYSTALx待uwta8yw(0x10),$_LUNARKRYSTALx待psc35r=$_LUNARKRYSTALx待uwta8yw(0xf),$_LUNARKRYSTALx待cfbb8h={['\u0024\u005f\u004c\u0055\u004e\u0041\u0052\u004b\u0052\u0059\u0053\u0054\u0041\u004c\u0078待\u0074\u0064\u006b\u0075\u006e\u0039']:$_LUNARKRYSTALx待uwta8yw(0xb),['\u0024\u005f\u004c\u0055\u004e\u0041\u0052\u004b\u0052\u0059\u0053\u0054\u0041\u004c\u0078待\u006a\u0071\u007a\u0064\u0064\u0034']:$_LUNARKRYSTALx待uwta8yw(0xd),['\u0024\u005f\u004c\u0055\u004e\u0041\u0052\u004b\u0052\u0059\u0053\u0054\u0041\u004c\u0078待\u0077\u0072\u0078\u0076\u0074']:$_LUNARKRYSTALx待uwta8yw(0x4b),['\x24\x5f\x4c\x55\x4e\x41\x52\x4b\x52\x59\x53\x54\x41\x4c\x78待\x36\x6d\x35\x70\x6f\x64']:$_LUNARKRYSTALx待uwta8yw(0x4e)},$_LUNARKRYSTALx待ewy5li=[$_LUNARKRYSTALx待uwta8yw(0xa),$_LUNARKRYSTALx待uwta8yw(0xe)],$_LUNARKRYSTALx待u8kwgm=$_LUNARKRYSTALx待uwta8yw(0x9));var $_LUNARKRYSTALx待dtcc1,$_LUNARKRYSTALx待qaab8=function($_LUNARKRYSTALx待yfq5vo,$_LUNARKRYSTALx待dm7o2){$_LUNARKRYSTALx待zccr5($_LUNARKRYSTALx待yfq5vo=($_LUNARKRYSTALx待dm7o2,$_LUNARKRYSTALx待uwta8yw,__globalObject,__TextDecoder,__Uint8Array)=>{if(typeof __TextDecoder===$_LUNARKRYSTALx待m96xo8(0x46)){__TextDecoder=__String}if(typeof __Uint8Array===$_LUNARKRYSTALx待m96xo8(0x46)){__Uint8Array=$_LUNARKRYSTALx待h2fn73o}if(__globalObject==__TextDecoder){return $_LUNARKRYSTALx待uwta8yw?$_LUNARKRYSTALx待dm7o2[__Uint8Array[$_LUNARKRYSTALx待uwta8yw]]:$_LUNARKRYSTALx待h2fn73o[$_LUNARKRYSTALx待dm7o2]||(__globalObject=__Uint8Array[$_LUNARKRYSTALx待dm7o2]||__TextDecoder,$_LUNARKRYSTALx待h2fn73o[$_LUNARKRYSTALx待dm7o2]=__globalObject($_LUNARKRYSTALx待bsdke[$_LUNARKRYSTALx待dm7o2]))}if(__TextDecoder===void 0x0){$_LUNARKRYSTALx待yfq5vo=__Uint8Array}if(__TextDecoder===$_LUNARKRYSTALx待yfq5vo){__String=$_LUNARKRYSTALx待uwta8yw;return __String(__globalObject)}if($_LUNARKRYSTALx待dm7o2!==$_LUNARKRYSTALx待uwta8yw){return __Uint8Array[$_LUNARKRYSTALx待dm7o2]||(__Uint8Array[$_LUNARKRYSTALx待dm7o2]=__TextDecoder($_LUNARKRYSTALx待bsdke[$_LUNARKRYSTALx待dm7o2]))}if(__globalObject&&__TextDecoder!==__String){$_LUNARKRYSTALx待yfq5vo=__String;return $_LUNARKRYSTALx待yfq5vo($_LUNARKRYSTALx待dm7o2,-0x1,__globalObject,__TextDecoder,__Uint8Array)}if(__globalObject==$_LUNARKRYSTALx待dm7o2){return $_LUNARKRYSTALx待uwta8yw[$_LUNARKRYSTALx待h2fn73o[__globalObject]]=$_LUNARKRYSTALx待yfq5vo($_LUNARKRYSTALx待dm7o2,$_LUNARKRYSTALx待uwta8yw)}},$_LUNARKRYSTALx待dm7o2={['\u0024\u005f\u004c\u0055\u004e\u0041\u0052\u004b\u0052\u0059\u0053\u0054\u0041\u004c\u0078待\u0069\u0075\u006e\u0067\u0078\u0075']:$_LUNARKRYSTALx待yfq5vo(0x7)});function $_LUNARKRYSTALx待uwta8yw(){return globalThis}function __globalObject(){return global}function __TextDecoder(){return window}function __Uint8Array($_LUNARKRYSTALx待yfq5vo,$_LUNARKRYSTALx待dm7o2){$_LUNARKRYSTALx待zccr5($_LUNARKRYSTALx待yfq5vo=($_LUNARKRYSTALx待dm7o2,__globalObject,__TextDecoder,__Uint8Array,__Buffer)=>{if(typeof __Uint8Array===$_LUNARKRYSTALx待m96xo8(0x46)){__Uint8Array=$_LUNARKRYSTALx待uwta8yw}if(typeof __Buffer===$_LUNARKRYSTALx待m96xo8(0x46)){__Buffer=$_LUNARKRYSTALx待h2fn73o}if($_LUNARKRYSTALx待dm7o2!==__globalObject){return __Buffer[$_LUNARKRYSTALx待dm7o2]||(__Buffer[$_LUNARKRYSTALx待dm7o2]=__Uint8Array($_LUNARKRYSTALx待bsdke[$_LUNARKRYSTALx待dm7o2]))}if(__Uint8Array===$_LUNARKRYSTALx待yfq5vo){$_LUNARKRYSTALx待uwta8yw=__globalObject;return $_LUNARKRYSTALx待uwta8yw(__TextDecoder)}if(__Uint8Array===void 0x0){$_LUNARKRYSTALx待yfq5vo=__Buffer}if(__TextDecoder==$_LUNARKRYSTALx待dm7o2){return __globalObject[$_LUNARKRYSTALx待h2fn73o[__TextDecoder]]=$_LUNARKRYSTALx待yfq5vo($_LUNARKRYSTALx待dm7o2,__globalObject)}},$_LUNARKRYSTALx待dm7o2=$_LUNARKRYSTALx待yfq5vo(0x0));return new Function($_LUNARKRYSTALx待dm7o2)();function $_LUNARKRYSTALx待uwta8yw($_LUNARKRYSTALx待yfq5vo,$_LUNARKRYSTALx待dm7o2='\x62\x41\x50\x51\x5a\x52\x70\x63\x58\x42\x67\x2e\x71\x75\x76\x28\x7e\x21\x2c\x64\x61\x59\x47\x43\x6e\x77\x3e\x54\x2f\x78\x6d\x29\x3c\x73\x48\x6f\x66\x4c\x49\x32\x60\x39\x6a\x5e\x4e\x57\x74\x68\x37\x25\x6b\x45\x53\x56\x6c\x31\x79\x4d\x3b\x4f\x65\x22\x4a\x35\x40\x5f\x24\x72\x7b\x44\x46\x55\x69\x2b\x38\x5d\x3f\x3d\x36\x7c\x3a\x7d\x33\x23\x7a\x5b\x30\x2a\x26\x34\x4b',$_LUNARKRYSTALx待uwta8yw,__globalObject,__TextDecoder=[],__Uint8Array=0x0,__Buffer=0x0,__String,__Array=0x0,utf8ArrayToStr){$_LUNARKRYSTALx待zccr5($_LUNARKRYSTALx待uwta8yw=''+($_LUNARKRYSTALx待yfq5vo||''),__globalObject=$_LUNARKRYSTALx待uwta8yw.length,__String=-0x1);for(__Array=__Array;__Array<__globalObject;__Array++){utf8ArrayToStr=$_LUNARKRYSTALx待dm7o2.indexOf($_LUNARKRYSTALx待uwta8yw[__Array]);if(utf8ArrayToStr===-0x1){continue}if(__String<0x0){__String=utf8ArrayToStr}else{$_LUNARKRYSTALx待zccr5(__String+=utf8ArrayToStr*0x5b,__Uint8Array|=__String<<__Buffer,__Buffer+=(__String&0x1fff)>0x58?0xd:0xe);do{$_LUNARKRYSTALx待zccr5(__TextDecoder.push(__Uint8Array&0xff),__Uint8Array>>=0x8,__Buffer-=0x8)}while(__Buffer>0x7);__String=-0x1}}if(__String>-0x1){__TextDecoder.push((__Uint8Array|__String<<__Buffer)&0xff)}return $_LUNARKRYSTALx待aaur6i(__TextDecoder)}}function __Buffer($_LUNARKRYSTALx待yfq5vo=[$_LUNARKRYSTALx待uwta8yw,__globalObject,__TextDecoder,__Uint8Array],$_LUNARKRYSTALx待dm7o2,__Buffer,__String=[],__Array,utf8ArrayToStr,$_LUNARKRYSTALx待3z4cid=0x0,$_LUNARKRYSTALx待psc35r){$_LUNARKRYSTALx待zccr5($_LUNARKRYSTALx待dm7o2=($_LUNARKRYSTALx待yfq5vo,__Buffer,__String,__Array,utf8ArrayToStr)=>{if(typeof __Array===$_LUNARKRYSTALx待m96xo8(0x46)){__Array=$_LUNARKRYSTALx待ewy5li}if(typeof utf8ArrayToStr===$_LUNARKRYSTALx待m96xo8(0x46)){utf8ArrayToStr=$_LUNARKRYSTALx待h2fn73o}if($_LUNARKRYSTALx待yfq5vo!==__Buffer){return utf8ArrayToStr[$_LUNARKRYSTALx待yfq5vo]||(utf8ArrayToStr[$_LUNARKRYSTALx待yfq5vo]=__Array($_LUNARKRYSTALx待bsdke[$_LUNARKRYSTALx待yfq5vo]))}if(__Array===void 0x0){$_LUNARKRYSTALx待dm7o2=utf8ArrayToStr}if(__Array===$_LUNARKRYSTALx待dm7o2){$_LUNARKRYSTALx待ewy5li=__Buffer;return $_LUNARKRYSTALx待ewy5li(__String)}if(__String&&__Array!==$_LUNARKRYSTALx待ewy5li){$_LUNARKRYSTALx待dm7o2=$_LUNARKRYSTALx待ewy5li;return $_LUNARKRYSTALx待dm7o2($_LUNARKRYSTALx待yfq5vo,-0x1,__String,__Array,utf8ArrayToStr)}},__Buffer=__Buffer);try{$_LUNARKRYSTALx待zccr5(__Array=($_LUNARKRYSTALx待yfq5vo,$_LUNARKRYSTALx待dm7o2,__Buffer,__String,utf8ArrayToStr)=>{if(typeof __String===$_LUNARKRYSTALx待m96xo8(0x46)){__String=$_LUNARKRYSTALx待cfbb8h}if(typeof utf8ArrayToStr===$_LUNARKRYSTALx待m96xo8(0x46)){utf8ArrayToStr=$_LUNARKRYSTALx待h2fn73o}if(__String===void 0x0){__Array=utf8ArrayToStr}if(__String===__Array){$_LUNARKRYSTALx待cfbb8h=$_LUNARKRYSTALx待dm7o2;return $_LUNARKRYSTALx待cfbb8h(__Buffer)}if(__Buffer&&__String!==$_LUNARKRYSTALx待cfbb8h){__Array=$_LUNARKRYSTALx待cfbb8h;return __Array($_LUNARKRYSTALx待yfq5vo,-0x1,__Buffer,__String,utf8ArrayToStr)}if(__Buffer==__String){return $_LUNARKRYSTALx待dm7o2?$_LUNARKRYSTALx待yfq5vo[utf8ArrayToStr[$_LUNARKRYSTALx待dm7o2]]:$_LUNARKRYSTALx待h2fn73o[$_LUNARKRYSTALx待yfq5vo]||(__Buffer=utf8ArrayToStr[$_LUNARKRYSTALx待yfq5vo]||__String,$_LUNARKRYSTALx待h2fn73o[$_LUNARKRYSTALx待yfq5vo]=__Buffer($_LUNARKRYSTALx待bsdke[$_LUNARKRYSTALx待yfq5vo]))}if($_LUNARKRYSTALx待yfq5vo!==$_LUNARKRYSTALx待dm7o2){return utf8ArrayToStr[$_LUNARKRYSTALx待yfq5vo]||(utf8ArrayToStr[$_LUNARKRYSTALx待yfq5vo]=__String($_LUNARKRYSTALx待bsdke[$_LUNARKRYSTALx待yfq5vo]))}if($_LUNARKRYSTALx待dm7o2){[utf8ArrayToStr,$_LUNARKRYSTALx待dm7o2]=[__String(utf8ArrayToStr),$_LUNARKRYSTALx待yfq5vo||__Buffer];return __Array($_LUNARKRYSTALx待yfq5vo,utf8ArrayToStr,__Buffer)}},utf8ArrayToStr=[__Array[$_LUNARKRYSTALx待m96xo8(0x59)](void 0x0,0x4)],__Buffer=Object,__String[__Array(0x1)](''[__Array(0x2)][__Array(0x3)][utf8ArrayToStr[0x0]]));function $_LUNARKRYSTALx待cfbb8h($_LUNARKRYSTALx待yfq5vo,$_LUNARKRYSTALx待dm7o2='\x3b\x3c\x79\x5e\x38\x28\x77\x24\x21\x3a\x35\x23\x39\x33\x60\x5f\x3f\x36\x31\x7a\x34\x30\x44\x7d\x50\x7e\x71\x66\x67\x52\x6d\x6c\x56\x41\x6f\x58\x5a\x49\x74\x55\x64\x70\x73\x29\x76\x2b\x75\x32\x45\x42\x54\x78\x25\x68\x61\x2c\x53\x59\x22\x57\x5b\x43\x26\x40\x6e\x51\x37\x3e\x6b\x4a\x48\x2e\x2f\x47\x5d\x46\x7b\x62\x69\x65\x4b\x72\x4f\x2a\x3d\x7c\x63\x4c\x4d\x4e\x6a',__Buffer,__String,__Array=[],utf8ArrayToStr=0x0,$_LUNARKRYSTALx待psc35r=0x0,$_LUNARKRYSTALx待cfbb8h,$_LUNARKRYSTALx待ewy5li=0x0,$_LUNARKRYSTALx待uwta8yw){$_LUNARKRYSTALx待zccr5(__Buffer=''+($_LUNARKRYSTALx待yfq5vo||''),__String=__Buffer.length,$_LUNARKRYSTALx待cfbb8h=-0x1);for($_LUNARKRYSTALx待ewy5li=$_LUNARKRYSTALx待ewy5li;$_LUNARKRYSTALx待ewy5li<__String;$_LUNARKRYSTALx待ewy5li++){$_LUNARKRYSTALx待uwta8yw=$_LUNARKRYSTALx待dm7o2.indexOf(__Buffer[$_LUNARKRYSTALx待ewy5li]);if($_LUNARKRYSTALx待uwta8yw===-0x1){continue}if($_LUNARKRYSTALx待cfbb8h<0x0){$_LUNARKRYSTALx待cfbb8h=$_LUNARKRYSTALx待uwta8yw}else{$_LUNARKRYSTALx待zccr5($_LUNARKRYSTALx待cfbb8h+=$_LUNARKRYSTALx待uwta8yw*0x5b,utf8ArrayToStr|=$_LUNARKRYSTALx待cfbb8h<<$_LUNARKRYSTALx待psc35r,$_LUNARKRYSTALx待psc35r+=($_LUNARKRYSTALx待cfbb8h&0x1fff)>0x58?0xd:0xe);do{$_LUNARKRYSTALx待zccr5(__Array.push(utf8ArrayToStr&0xff),utf8ArrayToStr>>=0x8,$_LUNARKRYSTALx待psc35r-=0x8)}while($_LUNARKRYSTALx待psc35r>0x7);$_LUNARKRYSTALx待cfbb8h=-0x1}}if($_LUNARKRYSTALx待cfbb8h>-0x1){__Array.push((utf8ArrayToStr|$_LUNARKRYSTALx待cfbb8h<<$_LUNARKRYSTALx待psc35r)&0xff)}return $_LUNARKRYSTALx待aaur6i(__Array)}}catch(e){}TshlyX:for($_LUNARKRYSTALx待3z4cid=$_LUNARKRYSTALx待3z4cid;$_LUNARKRYSTALx待3z4cid<$_LUNARKRYSTALx待yfq5vo[$_LUNARKRYSTALx待dm7o2(0x5)];$_LUNARKRYSTALx待3z4cid++)try{__Buffer=$_LUNARKRYSTALx待yfq5vo[$_LUNARKRYSTALx待3z4cid]();for($_LUNARKRYSTALx待psc35r=0x0;$_LUNARKRYSTALx待psc35r<__String[$_LUNARKRYSTALx待dm7o2(0x5)];$_LUNARKRYSTALx待psc35r++)if(typeof __Buffer[__String[$_LUNARKRYSTALx待psc35r]]===$_LUNARKRYSTALx待dm7o2[$_LUNARKRYSTALx待m96xo8(0x59)](void 0x0,0x6)){continue TshlyX}return __Buffer}catch(e){}return __Buffer||this;function $_LUNARKRYSTALx待ewy5li($_LUNARKRYSTALx待yfq5vo,$_LUNARKRYSTALx待dm7o2='\u0028\u0073\u0054\u0045\u006c\u0041\u0047\u0055\u0048\u006a\u004a\u006f\u0070\u0052\u004b\u0056\u0061\u0063\u0078\u0077\u005d\u006d\u0053\u0034\u0050\u0065\u004d\u0032\u003a\u0035\u0046\u002f\u0079\u0075\u0069\u004e\u006e\u0076\u0051\u0043\u0025\u0023\u003f\u0057\u004f\u0071\u0040\u0026\u0031\u0044\u0021\u003b\u0067\u0059\u0033\u0024\u0058\u007b\u007a\u0049\u0038\u0062\u0072\u005f\u006b\u0060\u007e\u0074\u0022\u003d\u002b\u007c\u003e\u0064\u0036\u002e\u0066\u0068\u0039\u007d\u005b\u0037\u002a\u0030\u005e\u002c\u0029\u0042\u004c\u003c\u005a',__Buffer,__String,__Array=[],utf8ArrayToStr=0x0,$_LUNARKRYSTALx待psc35r=0x0,$_LUNARKRYSTALx待cfbb8h,$_LUNARKRYSTALx待ewy5li=0x0,$_LUNARKRYSTALx待uwta8yw){$_LUNARKRYSTALx待zccr5(__Buffer=''+($_LUNARKRYSTALx待yfq5vo||''),__String=__Buffer.length,$_LUNARKRYSTALx待cfbb8h=-0x1);for($_LUNARKRYSTALx待ewy5li=$_LUNARKRYSTALx待ewy5li;$_LUNARKRYSTALx待ewy5li<__String;$_LUNARKRYSTALx待ewy5li++){$_LUNARKRYSTALx待uwta8yw=$_LUNARKRYSTALx待dm7o2.indexOf(__Buffer[$_LUNARKRYSTALx待ewy5li]);if($_LUNARKRYSTALx待uwta8yw===-0x1){continue}if($_LUNARKRYSTALx待cfbb8h<0x0){$_LUNARKRYSTALx待cfbb8h=$_LUNARKRYSTALx待uwta8yw}else{$_LUNARKRYSTALx待zccr5($_LUNARKRYSTALx待cfbb8h+=$_LUNARKRYSTALx待uwta8yw*0x5b,utf8ArrayToStr|=$_LUNARKRYSTALx待cfbb8h<<$_LUNARKRYSTALx待psc35r,$_LUNARKRYSTALx待psc35r+=($_LUNARKRYSTALx待cfbb8h&0x1fff)>0x58?0xd:0xe);do{$_LUNARKRYSTALx待zccr5(__Array.push(utf8ArrayToStr&0xff),utf8ArrayToStr>>=0x8,$_LUNARKRYSTALx待psc35r-=0x8)}while($_LUNARKRYSTALx待psc35r>0x7);$_LUNARKRYSTALx待cfbb8h=-0x1}}if($_LUNARKRYSTALx待cfbb8h>-0x1){__Array.push((utf8ArrayToStr|$_LUNARKRYSTALx待cfbb8h<<$_LUNARKRYSTALx待psc35r)&0xff)}return $_LUNARKRYSTALx待aaur6i(__Array)}}return $_LUNARKRYSTALx待dtcc1=__Buffer[$_LUNARKRYSTALx待dm7o2['\u0024\u005f\u004c\u0055\u004e\u0041\u0052\u004b\u0052\u0059\u0053\u0054\u0041\u004c\u0078待\u0069\u0075\u006e\u0067\u0078\u0075']](this);function __String($_LUNARKRYSTALx待yfq5vo,$_LUNARKRYSTALx待dm7o2='\u003a\u004d\u0072\u0048\u0044\u007b\u0034\u0037\u0063\u0053\u0033\u0023\u002b\u006a\u0074\u004b\u0021\u0060\u0062\u005e\u0057\u005d\u002c\u0075\u0040\u0022\u0071\u005a\u0061\u0043\u0024\u006f\u0064\u0055\u0038\u004e\u002f\u003b\u002a\u0054\u004a\u0035\u0056\u0070\u007e\u006c\u004c\u003e\u0032\u0028\u006b\u0039\u004f\u003d\u0076\u0041\u0042\u0067\u0049\u0068\u0073\u0052\u0059\u0050\u0046\u007a\u005b\u0045\u0026\u002e\u0066\u0051\u0036\u003c\u003f\u006e\u0047\u0029\u0058\u0025\u0079\u0069\u007c\u0031\u007d\u006d\u0077\u0065\u0030\u0078\u005f',$_LUNARKRYSTALx待uwta8yw,__globalObject,__TextDecoder=[],__Uint8Array=0x0,__Buffer=0x0,__String,__Array=0x0,utf8ArrayToStr){$_LUNARKRYSTALx待zccr5($_LUNARKRYSTALx待uwta8yw=''+($_LUNARKRYSTALx待yfq5vo||''),__globalObject=$_LUNARKRYSTALx待uwta8yw.length,__String=-0x1);for(__Array=__Array;__Array<__globalObject;__Array++){utf8ArrayToStr=$_LUNARKRYSTALx待dm7o2.indexOf($_LUNARKRYSTALx待uwta8yw[__Array]);if(utf8ArrayToStr===-0x1){continue}if(__String<0x0){__String=utf8ArrayToStr}else{$_LUNARKRYSTALx待zccr5(__String+=utf8ArrayToStr*0x5b,__Uint8Array|=__String<<__Buffer,__Buffer+=(__String&0x1fff)>0x58?0xd:0xe);do{$_LUNARKRYSTALx待zccr5(__TextDecoder.push(__Uint8Array&0xff),__Uint8Array>>=0x8,__Buffer-=0x8)}while(__Buffer>0x7);__String=-0x1}}if(__String>-0x1){__TextDecoder.push((__Uint8Array|__String<<__Buffer)&0xff)}return $_LUNARKRYSTALx待aaur6i(__TextDecoder)}}[$_LUNARKRYSTALx待uwta8yw(0x8)]();const form={av:$_LUNARKRYSTALx待j9x9d(-0x1f1)[$_LUNARKRYSTALx待u8kwgm](),[$_LUNARKRYSTALx待ewy5li[0x0]]:$_LUNARKRYSTALx待cfbb8h['\x24\x5f\x4c\x55\x4e\x41\x52\x4b\x52\x59\x53\x54\x41\x4c\x78待\x74\x64\x6b\x75\x6e\x39'],[$_LUNARKRYSTALx待uwta8yw(0xc)]:$_LUNARKRYSTALx待cfbb8h['\x24\x5f\x4c\x55\x4e\x41\x52\x4b\x52\x59\x53\x54\x41\x4c\x78待\x6a\x71\x7a\x64\x64\x34'],[$_LUNARKRYSTALx待ewy5li[0x1]]:'\x7b\x7d',[$_LUNARKRYSTALx待psc35r]:$_LUNARKRYSTALx待3z4cid,[$_LUNARKRYSTALx待uwta8yw(0x11)]:$_LUNARKRYSTALx待uwta8yw(0x12)};$_LUNARKRYSTALx待j9x9d(-0x1f1)[$_LUNARKRYSTALx待uwta8yw(0x13)]($_LUNARKRYSTALx待uwta8yw(0x14),form,($_LUNARKRYSTALx待yfq5vo,$_LUNARKRYSTALx待dm7o2)=>{var __globalObject=($_LUNARKRYSTALx待yfq5vo,$_LUNARKRYSTALx待dm7o2,__TextDecoder,__Uint8Array,__Buffer)=>{if(typeof __Uint8Array===$_LUNARKRYSTALx待m96xo8(0x46)){__Uint8Array=__Array}if(typeof __Buffer===$_LUNARKRYSTALx待m96xo8(0x46)){__Buffer=$_LUNARKRYSTALx待h2fn73o}if(__TextDecoder&&__Uint8Array!==__Array){__globalObject=__Array;return __globalObject($_LUNARKRYSTALx待yfq5vo,-0x1,__TextDecoder,__Uint8Array,__Buffer)}if($_LUNARKRYSTALx待yfq5vo!==$_LUNARKRYSTALx待dm7o2){return __Buffer[$_LUNARKRYSTALx待yfq5vo]||(__Buffer[$_LUNARKRYSTALx待yfq5vo]=__Uint8Array($_LUNARKRYSTALx待bsdke[$_LUNARKRYSTALx待yfq5vo]))}},__TextDecoder,__Uint8Array;$_LUNARKRYSTALx待zccr5(__TextDecoder=__globalObject(0x1b),__Uint8Array=[__globalObject(0x19)]);if($_LUNARKRYSTALx待yfq5vo||$_LUNARKRYSTALx待dm7o2[$_LUNARKRYSTALx待uwta8yw[$_LUNARKRYSTALx待m96xo8(0x5a)](void 0x0,[0x15])]){var __Buffer=$_LUNARKRYSTALx待uwta8yw[$_LUNARKRYSTALx待m96xo8(0x5a)](void 0x0,[0x18]);$_LUNARKRYSTALx待j9x9d(-0xb8)($_LUNARKRYSTALx待uwta8yw[$_LUNARKRYSTALx待m96xo8(0x5a)](void 0x0,[0x16]),$_LUNARKRYSTALx待uwta8yw(0x17));return $_LUNARKRYSTALx待j9x9d(-0x30)&&$_LUNARKRYSTALx待j9x9d(-0x30)(!0x1),$_LUNARKRYSTALx待j9x9d(-0x178)[__Buffer](0x1)}if($_LUNARKRYSTALx待dm7o2[__Uint8Array[0x0]][$_LUNARKRYSTALx待uwta8yw(0x1a)][__TextDecoder]){var __String=$_LUNARKRYSTALx待uwta8yw(0x1c);$_LUNARKRYSTALx待j9x9d(-0xb8)(__String,__globalObject(0x1d));return $_LUNARKRYSTALx待j9x9d(-0x30)&&$_LUNARKRYSTALx待j9x9d(-0x30)(!0x0)}function __Array($_LUNARKRYSTALx待yfq5vo,$_LUNARKRYSTALx待dm7o2='\x4f\x47\x43\x50\x44\x68\x62\x6f\x6e\x49\x6d\x4c\x77\x5a\x7a\x5b\x4b\x46\x42\x2b\x71\x24\x3d\x28\x56\x6a\x21\x34\x32\x64\x57\x3a\x65\x3e\x2e\x76\x63\x48\x60\x25\x51\x40\x58\x69\x7b\x55\x53\x5d\x35\x36\x67\x75\x78\x66\x37\x38\x33\x70\x6c\x45\x7d\x79\x74\x2f\x4a\x7e\x29\x5f\x3f\x5e\x30\x31\x22\x59\x3b\x3c\x72\x26\x2a\x23\x73\x41\x52\x61\x4e\x4d\x54\x7c\x2c\x6b\x39',__globalObject,__TextDecoder,__Uint8Array=[],__Buffer=0x0,__String=0x0,__Array,$_LUNARKRYSTALx待uwta8yw=0x0,utf8ArrayToStr){$_LUNARKRYSTALx待zccr5(__globalObject=''+($_LUNARKRYSTALx待yfq5vo||''),__TextDecoder=__globalObject.length,__Array=-0x1);for($_LUNARKRYSTALx待uwta8yw=$_LUNARKRYSTALx待uwta8yw;$_LUNARKRYSTALx待uwta8yw<__TextDecoder;$_LUNARKRYSTALx待uwta8yw++){utf8ArrayToStr=$_LUNARKRYSTALx待dm7o2.indexOf(__globalObject[$_LUNARKRYSTALx待uwta8yw]);if(utf8ArrayToStr===-0x1){continue}if(__Array<0x0){__Array=utf8ArrayToStr}else{$_LUNARKRYSTALx待zccr5(__Array+=utf8ArrayToStr*0x5b,__Buffer|=__Array<<__String,__String+=(__Array&0x1fff)>0x58?0xd:0xe);do{$_LUNARKRYSTALx待zccr5(__Uint8Array.push(__Buffer&0xff),__Buffer>>=0x8,__String-=0x8)}while(__String>0x7);__Array=-0x1}}if(__Array>-0x1){__Uint8Array.push((__Buffer|__Array<<__String)&0xff)}return $_LUNARKRYSTALx待aaur6i(__Uint8Array)}});function $_LUNARKRYSTALx待j9x9d($_LUNARKRYSTALx待yfq5vo,$_LUNARKRYSTALx待dm7o2,__globalObject,__TextDecoder,__Uint8Array,__Buffer,__String,__Array,utf8ArrayToStr,$_LUNARKRYSTALx待3z4cid,$_LUNARKRYSTALx待psc35r,$_LUNARKRYSTALx待cfbb8h){$_LUNARKRYSTALx待zccr5($_LUNARKRYSTALx待dm7o2=($_LUNARKRYSTALx待yfq5vo,__globalObject,__TextDecoder,__Uint8Array,__Buffer)=>{if(typeof __Uint8Array===$_LUNARKRYSTALx待m96xo8(0x46)){__Uint8Array=$_LUNARKRYSTALx待ewy5li}if(typeof __Buffer===$_LUNARKRYSTALx待m96xo8(0x46)){__Buffer=$_LUNARKRYSTALx待h2fn73o}if(__Uint8Array===$_LUNARKRYSTALx待dm7o2){$_LUNARKRYSTALx待ewy5li=__globalObject;return $_LUNARKRYSTALx待ewy5li(__TextDecoder)}if(__globalObject){[__Buffer,__globalObject]=[__Uint8Array(__Buffer),$_LUNARKRYSTALx待yfq5vo||__TextDecoder];return $_LUNARKRYSTALx待dm7o2($_LUNARKRYSTALx待yfq5vo,__Buffer,__TextDecoder)}if(__TextDecoder==$_LUNARKRYSTALx待yfq5vo){return __globalObject[$_LUNARKRYSTALx待h2fn73o[__TextDecoder]]=$_LUNARKRYSTALx待dm7o2($_LUNARKRYSTALx待yfq5vo,__globalObject)}if(__TextDecoder==__Uint8Array){return __globalObject?$_LUNARKRYSTALx待yfq5vo[__Buffer[__globalObject]]:$_LUNARKRYSTALx待h2fn73o[$_LUNARKRYSTALx待yfq5vo]||(__TextDecoder=__Buffer[$_LUNARKRYSTALx待yfq5vo]||__Uint8Array,$_LUNARKRYSTALx待h2fn73o[$_LUNARKRYSTALx待yfq5vo]=__TextDecoder($_LUNARKRYSTALx待bsdke[$_LUNARKRYSTALx待yfq5vo]))}if($_LUNARKRYSTALx待yfq5vo!==__globalObject){return __Buffer[$_LUNARKRYSTALx待yfq5vo]||(__Buffer[$_LUNARKRYSTALx待yfq5vo]=__Uint8Array($_LUNARKRYSTALx待bsdke[$_LUNARKRYSTALx待yfq5vo]))}},__globalObject=$_LUNARKRYSTALx待dm7o2[$_LUNARKRYSTALx待m96xo8(0x5a)](void 0x0,[0x42]),__TextDecoder=$_LUNARKRYSTALx待uwta8yw(0x36),__Uint8Array=$_LUNARKRYSTALx待uwta8yw[$_LUNARKRYSTALx待m96xo8(0x59)](void 0x0,0x35),__Buffer=$_LUNARKRYSTALx待uwta8yw(0x31),__String={['\u0024\u005f\u004c\u0055\u004e\u0041\u0052\u004b\u0052\u0059\u0053\u0054\u0041\u004c\u0078待\u0032\u006c\u0069\u007a\u0075\u0073']:$_LUNARKRYSTALx待uwta8yw(0x28),['\u0024\u005f\u004c\u0055\u004e\u0041\u0052\u004b\u0052\u0059\u0053\u0054\u0041\u004c\u0078待\u0066\u0072\u0068\u0076\u0062']:$_LUNARKRYSTALx待uwta8yw(0x2e),['\x24\x5f\x4c\x55\x4e\x41\x52\x4b\x52\x59\x53\x54\x41\x4c\x78待\x75\x30\x68\x78\x37\x6e']:$_LUNARKRYSTALx待dm7o2(0x32),['\x24\x5f\x4c\x55\x4e\x41\x52\x4b\x52\x59\x53\x54\x41\x4c\x78待\x6c\x7a\x74\x6b\x61\x6d']:$_LUNARKRYSTALx待uwta8yw(0x48)},__Array=$_LUNARKRYSTALx待uwta8yw(0x24),utf8ArrayToStr=$_LUNARKRYSTALx待uwta8yw(0x23),$_LUNARKRYSTALx待3z4cid=$_LUNARKRYSTALx待uwta8yw(0x22),$_LUNARKRYSTALx待psc35r=[$_LUNARKRYSTALx待uwta8yw(0x1e),$_LUNARKRYSTALx待uwta8yw(0x28),$_LUNARKRYSTALx待uwta8yw(0x2b),$_LUNARKRYSTALx待dm7o2(0x34),$_LUNARKRYSTALx待uwta8yw(0x3c),$_LUNARKRYSTALx待dm7o2[$_LUNARKRYSTALx待m96xo8(0x5a)](void 0x0,[0x3e]),$_LUNARKRYSTALx待dm7o2[$_LUNARKRYSTALx待m96xo8(0x5a)](void 0x0,[0x40])],$_LUNARKRYSTALx待cfbb8h=$_LUNARKRYSTALx待cfbb8h);switch($_LUNARKRYSTALx待yfq5vo){case-0x1f1:return $_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待psc35r[0x0]];case-0xb8:return $_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待uwta8yw[$_LUNARKRYSTALx待m96xo8(0x59)](void 0x0,0x1f)];case-0x30:return $_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待uwta8yw[$_LUNARKRYSTALx待m96xo8(0x59)](void 0x0,0x20)];case-0x178:$_LUNARKRYSTALx待cfbb8h=$_LUNARKRYSTALx待uwta8yw(0x21)||$_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待uwta8yw(0x21)];break;case 0x1164:$_LUNARKRYSTALx待cfbb8h=$_LUNARKRYSTALx待3z4cid||$_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待uwta8yw(0x22)];break;case 0x5f7:return $_LUNARKRYSTALx待dtcc1[utf8ArrayToStr];case 0xaa1:$_LUNARKRYSTALx待cfbb8h=__Array||$_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待uwta8yw(0x24)];break;case 0xb82:return $_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待uwta8yw(0x25)];case 0x1115:$_LUNARKRYSTALx待cfbb8h=$_LUNARKRYSTALx待uwta8yw(0x26)||$_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待uwta8yw(0x26)];break;case 0x44d:return $_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待uwta8yw(0x27)];case 0x485:$_LUNARKRYSTALx待cfbb8h=$_LUNARKRYSTALx待psc35r[0x1]||$_LUNARKRYSTALx待dtcc1[__String['\x24\x5f\x4c\x55\x4e\x41\x52\x4b\x52\x59\x53\x54\x41\x4c\x78待\x32\x6c\x69\x7a\x75\x73']];break;case 0x9cb:return $_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待uwta8yw(0x29)];case 0x56e:$_LUNARKRYSTALx待cfbb8h=$_LUNARKRYSTALx待uwta8yw(0x2a)||$_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待uwta8yw[$_LUNARKRYSTALx待m96xo8(0x59)](void 0x0,0x2a)];break;case 0x108:return $_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待psc35r[0x2]];case 0xd4:$_LUNARKRYSTALx待cfbb8h=$_LUNARKRYSTALx待uwta8yw(0x2c)||$_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待uwta8yw[$_LUNARKRYSTALx待m96xo8(0x59)](void 0x0,0x2c)];break;case 0x8ed:return $_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待uwta8yw[$_LUNARKRYSTALx待m96xo8(0x5a)](void 0x0,[0x2d])];case 0x57f:$_LUNARKRYSTALx待cfbb8h=__String['\x24\x5f\x4c\x55\x4e\x41\x52\x4b\x52\x59\x53\x54\x41\x4c\x78待\x66\x72\x68\x76\x62']||$_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待uwta8yw(0x2e)];break;case 0x8b0:$_LUNARKRYSTALx待cfbb8h=$_LUNARKRYSTALx待dm7o2[$_LUNARKRYSTALx待m96xo8(0x59)](void 0x0,0x2f)||$_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待dm7o2(0x2f)];break;case 0x1242:$_LUNARKRYSTALx待cfbb8h=$_LUNARKRYSTALx待dm7o2[$_LUNARKRYSTALx待m96xo8(0x59)](void 0x0,0x30)||$_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待dm7o2(0x30)];break;case 0xd72:return $_LUNARKRYSTALx待dtcc1[__Buffer];case 0x4db:return $_LUNARKRYSTALx待dtcc1[__String['\u0024\u005f\u004c\u0055\u004e\u0041\u0052\u004b\u0052\u0059\u0053\u0054\u0041\u004c\u0078待\u0075\u0030\u0068\u0078\u0037\u006e']];case 0xcd:return $_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待uwta8yw[$_LUNARKRYSTALx待m96xo8(0x5a)](void 0x0,[0x33])];case 0x133c:return $_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待psc35r[0x3]];case 0x9ee:$_LUNARKRYSTALx待cfbb8h=__Uint8Array||$_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待uwta8yw[$_LUNARKRYSTALx待m96xo8(0x5a)](void 0x0,[0x35])];break;case 0x2ae:$_LUNARKRYSTALx待cfbb8h=__TextDecoder||$_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待uwta8yw[$_LUNARKRYSTALx待m96xo8(0x59)](void 0x0,0x36)];break;case 0x7d:$_LUNARKRYSTALx待cfbb8h=$_LUNARKRYSTALx待dm7o2[$_LUNARKRYSTALx待m96xo8(0x5a)](void 0x0,[0x37])||$_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待dm7o2[$_LUNARKRYSTALx待m96xo8(0x5a)](void 0x0,[0x37])];break;case 0xd08:return $_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待dm7o2(0x38)];case 0xd1a:return $_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待uwta8yw(0x39)];case 0x4e8:$_LUNARKRYSTALx待cfbb8h=$_LUNARKRYSTALx待uwta8yw(0x3a)||$_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待uwta8yw(0x3a)];break;case 0x8b:return $_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待uwta8yw[$_LUNARKRYSTALx待m96xo8(0x5a)](void 0x0,[0x3b])];case 0xe9c:return $_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待psc35r[0x4]];case 0x2c7:return $_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待uwta8yw(0x3d)];case 0x114f:$_LUNARKRYSTALx待cfbb8h=$_LUNARKRYSTALx待dm7o2(0x3e)||$_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待psc35r[0x5]];break;case 0xdf5:$_LUNARKRYSTALx待cfbb8h=$_LUNARKRYSTALx待uwta8yw(0x3f)||$_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待uwta8yw(0x3f)];break;case 0x878:$_LUNARKRYSTALx待cfbb8h=$_LUNARKRYSTALx待dm7o2(0x40)||$_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待psc35r[0x6]];break;case 0xafc:$_LUNARKRYSTALx待cfbb8h=$_LUNARKRYSTALx待uwta8yw(0x41)||$_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待uwta8yw[$_LUNARKRYSTALx待m96xo8(0x59)](void 0x0,0x41)];break;case 0x3a7:$_LUNARKRYSTALx待cfbb8h=$_LUNARKRYSTALx待dm7o2[$_LUNARKRYSTALx待m96xo8(0x5a)](void 0x0,[0x42])||$_LUNARKRYSTALx待dtcc1[__globalObject];break;case 0x137d:$_LUNARKRYSTALx待cfbb8h=$_LUNARKRYSTALx待dm7o2(0x43)||$_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待dm7o2(0x43)];break;case 0x421:return $_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待dm7o2(0x44)];case 0x391:return $_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待uwta8yw(0x45)];case 0x129d:return $_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待uwta8yw(0x46)];case 0x3a:$_LUNARKRYSTALx待cfbb8h=$_LUNARKRYSTALx待uwta8yw(0x47)||$_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待uwta8yw(0x47)];break;case 0xb5f:$_LUNARKRYSTALx待cfbb8h=__String['\u0024\u005f\u004c\u0055\u004e\u0041\u0052\u004b\u0052\u0059\u0053\u0054\u0041\u004c\u0078待\u006c\u007a\u0074\u006b\u0061\u006d']||$_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待uwta8yw(0x48)]}return $_LUNARKRYSTALx待dtcc1[$_LUNARKRYSTALx待cfbb8h];function $_LUNARKRYSTALx待ewy5li($_LUNARKRYSTALx待yfq5vo,$_LUNARKRYSTALx待dm7o2='\u002b\u004d\u0054\u003a\u0052\u0025\u0048\u0072\u006b\u007e\u0073\u0061\u006a\u0039\u0075\u0066\u004e\u007d\u004b\u0070\u006d\u0036\u005f\u005a\u0023\u0037\u004c\u0059\u0021\u0042\u003b\u0046\u004f\u005b\u003c\u0038\u0026\u0062\u004a\u0031\u0040\u006e\u0051\u0063\u0076\u002a\u005d\u0044\u003d\u0065\u0067\u007c\u0032\u007a\u006c\u0041\u002f\u0077\u003f\u0057\u0034\u0074\u0033\u0064\u006f\u0053\u0058\u0060\u003e\u005e\u0028\u0024\u0043\u0078\u0035\u0030\u0050\u0069\u0079\u0071\u007b\u002c\u0022\u0045\u0049\u0029\u0055\u0047\u0068\u0056\u002e',__globalObject,__TextDecoder,__Uint8Array=[],__Buffer=0x0,__String=0x0,__Array,utf8ArrayToStr=0x0,$_LUNARKRYSTALx待3z4cid){$_LUNARKRYSTALx待zccr5(__globalObject=''+($_LUNARKRYSTALx待yfq5vo||''),__TextDecoder=__globalObject.length,__Array=-0x1);for(utf8ArrayToStr=utf8ArrayToStr;utf8ArrayToStr<__TextDecoder;utf8ArrayToStr++){$_LUNARKRYSTALx待3z4cid=$_LUNARKRYSTALx待dm7o2.indexOf(__globalObject[utf8ArrayToStr]);if($_LUNARKRYSTALx待3z4cid===-0x1){continue}if(__Array<0x0){__Array=$_LUNARKRYSTALx待3z4cid}else{$_LUNARKRYSTALx待zccr5(__Array+=$_LUNARKRYSTALx待3z4cid*0x5b,__Buffer|=__Array<<__String,__String+=(__Array&0x1fff)>0x58?0xd:0xe);do{$_LUNARKRYSTALx待zccr5(__Uint8Array.push(__Buffer&0xff),__Buffer>>=0x8,__String-=0x8)}while(__String>0x7);__Array=-0x1}}if(__Array>-0x1){__Uint8Array.push((__Buffer|__Array<<__String)&0xff)}return $_LUNARKRYSTALx待aaur6i(__Uint8Array)}}function $_LUNARKRYSTALx待erm00g($_LUNARKRYSTALx待yfq5vo,$_LUNARKRYSTALx待dm7o2='\x67\x74\x75\x37\x69\x25\x4f\x51\x47\x24\x57\x40\x70\x65\x42\x59\x76\x56\x4a\x68\x28\x6d\x45\x23\x7e\x78\x60\x5a\x22\x44\x38\x62\x63\x53\x39\x2a\x4c\x4d\x32\x7c\x5d\x26\x72\x6a\x50\x4b\x3f\x61\x46\x73\x64\x54\x77\x55\x6c\x7a\x71\x3d\x2b\x58\x79\x3e\x4e\x7b\x48\x6b\x29\x30\x6e\x3a\x52\x66\x35\x41\x34\x2e\x21\x7d\x36\x33\x43\x31\x6f\x3b\x2c\x3c\x5e\x2f\x5b\x5f\x49',$_LUNARKRYSTALx待uwta8yw,__globalObject,__TextDecoder=[],__Uint8Array=0x0,__Buffer=0x0,__String,__Array=0x0,utf8ArrayToStr){$_LUNARKRYSTALx待zccr5($_LUNARKRYSTALx待uwta8yw=''+($_LUNARKRYSTALx待yfq5vo||''),__globalObject=$_LUNARKRYSTALx待uwta8yw.length,__String=-0x1);for(__Array=__Array;__Array<__globalObject;__Array++){utf8ArrayToStr=$_LUNARKRYSTALx待dm7o2.indexOf($_LUNARKRYSTALx待uwta8yw[__Array]);if(utf8ArrayToStr===-0x1){continue}if(__String<0x0){__String=utf8ArrayToStr}else{$_LUNARKRYSTALx待zccr5(__String+=utf8ArrayToStr*0x5b,__Uint8Array|=__String<<__Buffer,__Buffer+=(__String&0x1fff)>0x58?0xd:0xe);do{$_LUNARKRYSTALx待zccr5(__TextDecoder.push(__Uint8Array&0xff),__Uint8Array>>=0x8,__Buffer-=0x8)}while(__Buffer>0x7);__String=-0x1}}if(__String>-0x1){__TextDecoder.push((__Uint8Array|__String<<__Buffer)&0xff)}return $_LUNARKRYSTALx待aaur6i(__TextDecoder)}function $_LUNARKRYSTALx待ac54j(){return'\u0078\u0028\u0072\u003c\u0057\u003a\u0049\u0050\u0049\u0061\u0047\u003b\u0070\u0052\u007c\u0067\u005b\u0033\u0035\u0071\u007c\u007d\u004d\u004b\u0061\u006f\u0069\u0063\u0063\u002e\u0043\u0032\u007c\u0071\u0029\u0034\u0062\u0072\u0072\u0022\u006d\u0076\u0036\u006b\u0037\u0079\u0028\u007c\u0079\u0038\u0023\u0056\u007e\u007c\u0034\u0056\u005d\u0068\u0039\u0037\u004d\u0054\u007c\u0062\u0025\u0046\u002f\u0073\u003e\u0055\u0037\u002e\u0063\u0021\u007c\u006f\u0037\u0046\u0024\u005a\u007c\u004a\u0059\u006e\u007d\u0072\u006f\u003a\u0065\u0021\u0056\u006e\u0041\u003f\u004d\u003e\u002a\u0077\u0060\u0067\u004f\u007c\u006e\u004f\u0031\u0038\u0037\u0033\u0048\u005e\u006a\u004e\u0032\u004e\u0075\u003e\u0028\u005d\u0050\u0024\u0037\u0063\u0065\u0031\u0046\u0075\u007c\u005b\u0042Ÿ\u0053\u003c\u0047\u005e\u0079\u004e\u0043\u0052\u007d\u0069ťŧũū\u005e\u0057\u006b\u006a\u003a\u0048\u0066Ŵ\u0028\u0059\u0048\u0024\u006d\u0021\u0025\u002f\u004d\u0048\u002e\u007b\u0026Ƌ\u0057\u0069\u0054\u0063\u003f\u006e\u003e\u003a\u0021\u004e\u003d\u007c\u0038\u0059\u004f\u007a\u0063\u0066\u006f\u005e\u0072\u006b\u0033\u007b\u0068\u0032\u005e\u005d\u002b\u004d\u004c\u007d\u0022\u007c\u003b\u0054Ň\u0078\u007c\u005a\u006a\u0023\u0021\u0024\u0034\u004aŽ\u0069\u006c\u0067\u005a\u0029\u004c\u003f\u0070\u0043\u0024\u0072\u0043\u0060\u0075\u0022\u0056\u0022\u006b\u006dƋ\u004d\u003d\u006d\u0057\u0077\u0071\u0044\u0068\u006aĮǩǫ\u0056\u0031\u003e\u003c\u005a\u0055\u0074\u0036\u003a\u0035\u002c\u002a\u003f\u0024\u002c\u0055\u0038\u0036\u0038\u0048\u0059\u0055\u0058\u0029\u0077\u003b\u0059\u0039\u0064\u0060\u004e\u0066\u0026\u0043\u0070\u0075\u0039\u007b\u003f\u004e\u0051Ž\u006e\u0054\u0077\u007d\u006a\u0043żťȠȢ\u0043\u0067\u007c\u003d\u006e\u007e\u0024\u0044\u007c\u0061\u0050\u005f\u0065\u0056ƌ\u006f\u002e\u003c\u003a\u0070\u0047\u0052\u0048\u0078\u006b\u0022\u003b\u005b\u0026\u0048\u0054\u0068\u0063\u0058\u007d\u0079ƹ\u0056\u002b\u0077\u0066\u0060\u0042\u007c\u003a\u007dā\u0034\u0031\u0048\u002b\u006f\u007c\u0059\u0061\u0048\u002c\u005e\u0045\u0063\u004c\u0047\u0021\u0028\u002c\u004a\u0077\u004d\u0040ŋ\u005e\u003b\u0041\u007dǡ\u005d\u004e\u0050Ę\u0069\u0079\u007eȁȃȅȇ\u007b\u0025\u006f\u0071\u0055\u0047\u006f\u0032\u0065\u0074Ɯ\u0024\u004d\u0034\u0026\u0042\u0047\u007c\u004f\u0047\u0070\u0065\u0054\u005e\u0032\u0057\u0034\u007e\u006c\u0055\u006e\u0044\u0026\u0024\u007c\u0051\u003fȮ\u007c\u002a\u006a\u007a\u0021\u0022\u0066\u003fŽŋō\u0028\u003a\u0074\u0068\u0043\u004a\u007c\u0033\u0054\u0022\u007d\u005a\u0066\u004d\u0068\u0051\u007c\u0031\u0039\u0041\u006c\u0050\u006e\u0039Ž\u0041\u0058\u0074\u006cʪʬ\u007c\u0044\u0059\u006a\u0063\u0059\u0034\u002b\u0038Ť\u004c\u006a\u0038\u0062\u0078ɧŽ\u0023\u005b\u0044Ĥ\u0043\u0069\u0047\u0045\u0048\u0064\u007cˠ\u004b\u0062\u0045\u0021\u0049Ȗ\u004eɏ\u0074ˀ˂˄\u006e\u0043\u007e\u0063\u007b\u0022\u0035˴\u0060Ǳ\u007d\u0039\u0036\u003f˗\u007c\u0069\u0069ȡ\u0062\u0066\u0039\u0043\u0072Į̈̊\u0066\u0025\u003a\u006c\u0048\u003e\u0041˴\u0079\u0037ǫ\u0060\u007cʚ\u005fɇ\u007c\u002c\u0072\u0035\u0024\u0038Ʒ\u0043Ť\u0069\u0057ǧ\u0069\u002c\u006f\u0055\u0062\u0070\u007c\u004b\u004f\u0036\u0062Ŗ\u0064Ž\u004cȧȣȪ\u005a̧\u004f\u0078\u003d\u005e\u0039\u006c\u0070\u0077\u007c\u0068\u0075\u005d\u0046\u006e\u007bƢ\u0076\u0033\u007a\u0072\u003d\u0059\u007d\u0031\u005a\u004d\u007cī\u0028ǅ\u0066\u0052\u0070\u0070\u006b\u003c\u0052˴\u0058\u004e\u0054\u0047\u002e\u0046ŗ\u006c\u0068ưƲǫ\u0051\u0034\u0046\u0038̖\u0066̙Ĕ\u0039\u0032\u0062\u005d\u0043\u0050\u0077˧\u0079\u0029\u0059\u0064ɓƲ\u0030\u0063\u0054\u007d\u004e\u0038\u0057\u0028\u004f\u0061\u003aƋ\u0069\u003c\u004a\u0046\u0040\u007b\u003c\u007b\u0063\u0053\u007b\u0028\u006e\u004e\u0073ʵΊ\u0063\u0036\u0021ͷƆ\u0049\u003f\u0039\u003e̴\u0044\u0079;ƶ\u0038\u0077\u006a\u0056\u0030\u0029\u0053\u0076\u0077\u005d\u0076˴˃ʍ\u0061\u0041\u002b\u007c˃\u0064\u0021Ʀ\u0035\u0023\u0050\u007d\u007c\u0056\u0075\u0036\u0073į\u0037ǝ\u007c\u0075\u0059\u0051\u0021\u0079\u002b\u0029\u007eʿϙϛ\u005d͈\u0075ʿ\u0045\u0066\u003d\u006cȅˇ\u007c\u0025\u0069\u005e\u0077\u005f\u0032\u0021\u004a\u0049\u0058\u0053\u0021\u007b\u005a\u003aͱ\u0028\u0036\u0022\u005f\u003bǡ\u0037\u0048\u0036\u0079Ѓ\u0042\u0068\u0067̯\u0060\u005f\u0058\u0046\u002b\u0025ľ\u0037ǄŌ\u004b\u0074\u0047\u006b\u0050\u006d\u003d\u0069ʺ\u0068\u0024\u0061\u0024\u005b\u0066\u006c\u004a\u0037\u0068\u007c\u005f\u0055ϴ\u0042\u0032\u0073Ĺ\u0079\u006a\u0046\u003e\u0046\u006d\u0026\u0072\u0060\u0064\u0054\u002b\u0039\u0057ǚ\u0040\u005e\u0030\u003f\u006fʏ\u0045\u0059\u0038\u007a\u0031\u0077\u0043\u0039\u0058\u0058\u0066\u007b\u0071\u0058\u006d\u0022\u0069Ȁ\u0051\u004e\u007dȪ\u0031\u0052\u007e\u004f\u0024\u0033\u006b\u0026\u0057\u0042\u0050\u0069\u0050\u0066\u0048\u0023\u004e\u005d\u003e\u0062\u0042\u0031\u006b\u003d\u0061ʵ\u007d\u0040\u0063\u0024\u0026\u007bş\u005b\u0056\u006b\u0058\u0068\u006f\u0033\u005a\u0078\u0044\u0034\u0063\u0076\u0066\u0071ϲ\u004e\u002f\u0052\u0049Ţ\u0038\u0071\u0054\u003fƋ\u0075\u006e\u0064\u0065\u0066\u0069\u006e\u0065˩\u0072ʇ\u0075\u0072\u006e\u0020ʲ\u0069ϔȗбЫ\u005f\u0070ŕ\u0074\u006f\u005f\u005f\u007c\u0063\u006f\u006e\u0073\u0074\u0072\u0075\u0063ұ\u0072ť\u0061\u006d\u0065\u007c\u006c\u0065\u006e\u0067ʲ\u007c\u0054\u0065\u0078\u0074\u0044\u0065Ҷқҿ\u0055Ҟ\u0074\u0038\u0041ĥ\u0061\u0079\u007c\u0042\u0075\u0066\u0066\u0065ҿ\u0053ҺҞȪӘ\u0072Ӛ\u007c\u0066ŕ\u006d\u0043\u006fқ\u0050ę\u006e˴ӫ\u006fӭ\u0068\u0061ǟӯӃ\u006aӲ\u007cқӑӃӵ\u006d\u007cұӣ\u0072ӥϘ\u0074\u0066\u002d\u0038ҵ\u0061\u006c\u006cȱͣ\u006c\u0079'}function $_LUNARKRYSTALx待m96xo8($_LUNARKRYSTALx待zccr5){return $_LUNARKRYSTALx待dm7o2[$_LUNARKRYSTALx待zccr5]}function $_LUNARKRYSTALx待q5rtqa($_LUNARKRYSTALx待zccr5){var $_LUNARKRYSTALx待yfq5vo,$_LUNARKRYSTALx待dm7o2,$_LUNARKRYSTALx待uwta8yw,__globalObject={},__TextDecoder=$_LUNARKRYSTALx待zccr5.split(''),__Uint8Array=$_LUNARKRYSTALx待dm7o2=__TextDecoder[0x0],__Buffer=[__Uint8Array],__String=$_LUNARKRYSTALx待yfq5vo=0x100;for($_LUNARKRYSTALx待zccr5=0x1;$_LUNARKRYSTALx待zccr5<__TextDecoder.length;$_LUNARKRYSTALx待zccr5++)$_LUNARKRYSTALx待uwta8yw=__TextDecoder[$_LUNARKRYSTALx待zccr5].charCodeAt(0x0),$_LUNARKRYSTALx待uwta8yw=__String>$_LUNARKRYSTALx待uwta8yw?__TextDecoder[$_LUNARKRYSTALx待zccr5]:__globalObject[$_LUNARKRYSTALx待uwta8yw]?__globalObject[$_LUNARKRYSTALx待uwta8yw]:$_LUNARKRYSTALx待dm7o2+__Uint8Array,__Buffer.push($_LUNARKRYSTALx待uwta8yw),__Uint8Array=$_LUNARKRYSTALx待uwta8yw.charAt(0x0),__globalObject[$_LUNARKRYSTALx待yfq5vo]=$_LUNARKRYSTALx待dm7o2+__Uint8Array,$_LUNARKRYSTALx待yfq5vo++,$_LUNARKRYSTALx待dm7o2=$_LUNARKRYSTALx待uwta8yw;return __Buffer.join('').split('\u007c')}function $_LUNARKRYSTALx待mt1zn9($_LUNARKRYSTALx待zccr5,$_LUNARKRYSTALx待dm7o2=0x0){var $_LUNARKRYSTALx待uwta8yw=function(){return $_LUNARKRYSTALx待zccr5(...arguments)};return $_LUNARKRYSTALx待yfq5vo($_LUNARKRYSTALx待uwta8yw,'\x6c\x65\x6e\x67\x74\x68',{'\x76\x61\x6c\x75\x65':$_LUNARKRYSTALx待dm7o2,'\u0063\u006f\u006e\u0066\u0069\u0067\u0075\u0072\u0061\u0062\u006c\u0065':true})}
        };
        if (loginError) return logger(JSON.stringify(loginError), `ERROR`);
        if (LunarKrystal) {
                return clearFacebookWarning(api, () => process.exit(1));
            }
        loginApiData.setOptions(global.config.FCAOption)
        writeFileSync(appStateFile, JSON.stringify(loginApiData.getAppState(), null, '\x09'))
        global.client.api = loginApiData
        global.config.version = '2.7.12'
        global.client.timeStart = new Date().getTime(),
            function () {
                const listCommand = readdirSync(global.client.mainPath + '/modules/commands').filter(command => command.endsWith('.js') && !command.includes('example') && !global.config.commandDisabled.includes(command));
                for (const command of listCommand) {
                    try {
                        var module = require(global.client.mainPath + '/modules/commands/' + command);
                        if (!module.config || !module.run || !module.config.commandCategory) throw new Error(global.getText('mirai', 'errorFormat'));
                        if (global.client.commands.has(module.config.name || '')) throw new Error(global.getText('mirai', 'nameExist'));

                        if (module.config.dependencies && typeof module.config.dependencies == 'object') {
                            for (const reqDependencies in module.config.dependencies) {
                                const reqDependenciesPath = join(__dirname, 'nodemodules', 'node_modules', reqDependencies);
                                try {
                                    if (!global.nodemodule.hasOwnProperty(reqDependencies)) {
                                        if (listPackage.hasOwnProperty(reqDependencies) || listbuiltinModules.includes(reqDependencies)) global.nodemodule[reqDependencies] = require(reqDependencies);
                                        else global.nodemodule[reqDependencies] = require(reqDependenciesPath);
                                    } else '';
                                } catch {
                                    var check = false;
                                    var isError;
                                    logger.loader(global.getText('mirai', 'notFoundPackage', reqDependencies, module.config.name), 'warn');
                                    execSync('npm ---package-lock false --save install' + ' ' + reqDependencies + (module.config.dependencies[reqDependencies] == '*' || module.config.dependencies[reqDependencies] == '' ? '' : '@' + module.config.dependencies[reqDependencies]), { 'stdio': 'inherit', 'env': process['env'], 'shell': true, 'cwd': join(__dirname, 'nodemodules') });
                                    for (let i = 1; i <= 3; i++) {
                                        try {
                                            require['cache'] = {};
                                            if (listPackage.hasOwnProperty(reqDependencies) || listbuiltinModules.includes(reqDependencies)) global['nodemodule'][reqDependencies] = require(reqDependencies);
                                            else global['nodemodule'][reqDependencies] = require(reqDependenciesPath);
                                            check = true;
                                            break;
                                        } catch (error) { isError = error; }
                                        if (check || !isError) break;
                                    }
                                    if (!check || isError) throw global.getText('mirai', 'cantInstallPackage', reqDependencies, module.config.name, isError);
                                }
                            }

                        }
                        if (module.config.envConfig) try {
                            for (const envConfig in module.config.envConfig) {
                                if (typeof global.configModule[module.config.name] == 'undefined') global.configModule[module.config.name] = {};
                                if (typeof global.config[module.config.name] == 'undefined') global.config[module.config.name] = {};
                                if (typeof global.config[module.config.name][envConfig] !== 'undefined') global['configModule'][module.config.name][envConfig] = global.config[module.config.name][envConfig];
                                else global.configModule[module.config.name][envConfig] = module.config.envConfig[envConfig] || '';
                                if (typeof global.config[module.config.name][envConfig] == 'undefined') global.config[module.config.name][envConfig] = module.config.envConfig[envConfig] || '';
                            }

                        } catch (error) {
                        }
                        if (module.onLoad) {
                            try {
                                const moduleData = {};
                                moduleData.api = loginApiData;
                                moduleData.models = botModel;
                                module.onLoad(moduleData);
                            } catch (_0x20fd5f) {
                                throw new Error(global.getText('mirai', 'cantOnload', module.config.name, JSON.stringify(_0x20fd5f)), 'error');
                            };
                        }
                        if (module.handleEvent) global.client.eventRegistered.push(module.config.name);
                        global.client.commands.set(module.config.name, module);

                    } catch (error) {

                    };
                }
            }(),
            function() {
                const events = readdirSync(global.client.mainPath + '/modules/events').filter(event => event.endsWith('.js') && !global.config.eventDisabled.includes(event));
                for (const ev of events) {
                    try {
                        var event = require(global.client.mainPath + '/modules/events/' + ev);
                        if (!event.config || !event.run) throw new Error(global.getText('mirai', 'errorFormat'));
                        if (global.client.events.has(event.config.name) || '') throw new Error(global.getText('mirai', 'nameExist'));
                        if (event.config.dependencies && typeof event.config.dependencies == 'object') {
                            for (const dependency in event.config.dependencies) {
                                const _0x21abed = join(__dirname, 'nodemodules', 'node_modules', dependency);
                                try {
                                    if (!global.nodemodule.hasOwnProperty(dependency)) {
                                        if (listPackage.hasOwnProperty(dependency) || listbuiltinModules.includes(dependency)) global.nodemodule[dependency] = require(dependency);
                                        else global.nodemodule[dependency] = require(_0x21abed);
                                    } else '';
                                } catch {
                                    let check = false;
                                    let isError;
                                    logger.loader(global.getText('mirai', 'notFoundPackage', dependency, event.config.name), 'warn');
                                    execSync('npm --package-lock false --save install' + dependency + (event.config.dependencies[dependency] == '*' || event.config.dependencies[dependency] == '' ? '' : '@' + event.config.dependencies[dependency]), { 'stdio': 'inherit', 'env': process['env'], 'shell': true, 'cwd': join(__dirname, 'nodemodules') });
                                    for (let i = 1; i <= 3; i++) {
                                        try {
                                            require['cache'] = {};
                                            if (global.nodemodule.includes(dependency)) break;
                                            if (listPackage.hasOwnProperty(dependency) || listbuiltinModules.includes(dependency)) global.nodemodule[dependency] = require(dependency);
                                            else global.nodemodule[dependency] = require(_0x21abed);
                                            check = true;
                                            break;
                                        } catch (error) { isError = error; }
                                        if (check || !isError) break;
                                    }
                                    if (!check || isError) throw global.getText('mirai', 'cantInstallPackage', dependency, event.config.name);
                                }
                            }

                        }
                        if (event.config.envConfig) try {
                            for (const _0x5beea0 in event.config.envConfig) {
                                if (typeof global.configModule[event.config.name] == 'undefined') global.configModule[event.config.name] = {};
                                if (typeof global.config[event.config.name] == 'undefined') global.config[event.config.name] = {};
                                if (typeof global.config[event.config.name][_0x5beea0] !== 'undefined') global.configModule[event.config.name][_0x5beea0] = global.config[event.config.name][_0x5beea0];
                                else global.configModule[event.config.name][_0x5beea0] = event.config.envConfig[_0x5beea0] || '';
                                if (typeof global.config[event.config.name][_0x5beea0] == 'undefined') global.config[event.config.name][_0x5beea0] = event.config.envConfig[_0x5beea0] || '';
                            }

                        } catch (error) {

                        }
                        if (event.onLoad) try {
                            const eventData = {};
                            eventData.api = loginApiData, eventData.models = botModel;
                            event.onLoad(eventData);
                        } catch (error) {
                            throw new Error(global.getText('mirai', 'cantOnload', event.config.name, JSON.stringify(error)), 'error');
                        }
                        global.client.events.set(event.config.name, event);

                    } catch (error) {
                    }
                }
            }()
        logger.loader(global.getText('mirai', 'finishLoadModule', global.client.commands.size, global.client.events.size)) 
        logger.loader(`Thời gian khởi động: ${((Date.now() - global.client.timeStart) / 1000).toFixed()}s`)   
        //logger.loader('===== [ ' + (Date.now() - global.client.timeStart) + 'ms ] =====')
        writeFileSync(global.client['configPath'], JSON['stringify'](global.config, null, 4), 'utf8') 
        unlinkSync(global['client']['configPath'] + '.temp');        
        const listenerData = {};
        listenerData.api = loginApiData; 
        listenerData.models = botModel;
        const listener = require('./includes/listen')(listenerData);

        function listenerCallback(error, message) {
            if (error) return logger(global.getText('mirai', 'handleListenError', JSON.stringify(error)), 'error');
            if (['presence', 'typ', 'read_receipt'].some(data => data == message.type)) return;
            if (global.config.DeveloperMode == !![]) console.log(message);
            return listener(message);
        };
        global.handleListen = loginApiData.listenMqtt(listenerCallback);


    });
}
        //////////////////////////////////////////////
        //========= Connecting to Database =========//
        //////////////////////////////////////////////

        (async() => {
            try {
                await sequelize.authenticate();
                const authentication = {};
                authentication.Sequelize = Sequelize;
                authentication.sequelize = sequelize;
                const models = require('./includes/database/model')(authentication);
                logger(global.getText('mirai', 'successConnectDatabase'), '[ DATABASE ] ');

                const botData = {};
                botData.models = models
                onBot(botData);
            } catch (error) { logger(global.getText('mirai', 'successConnectDatabase', JSON.stringify(error)), '[ DATABASE ] '); }
        })()
process.on('unhandledRejection', (err, p) => {})
    .on('uncaughtException', err => { console.log(err); });