"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const uiohook_napi_1 = require("uiohook-napi");
const environment_1 = require("./environment");
const KeyCounter_1 = require("./KeyCounter");
const Tray_1 = require("./tray/Tray");
const DataStore_1 = require("./DataStore");
function start() {
    const dataStore = new DataStore_1.DataStore(environment_1.storagePath);
    const keyCounter = new KeyCounter_1.KeyCounter(dataStore);
    const tray = new Tray_1.Tray(environment_1.storagePath);
    keyCounter.on('update', (todayKeyCount) => tray.update(todayKeyCount));
    uiohook_napi_1.uIOhook.on('keyup', keyCounter.onKeyUp.bind(keyCounter));
    uiohook_napi_1.uIOhook.start();
    process.on('SIGINT', tray.exit.bind(tray));
    process.on('exit', keyCounter.storeTodayKeyCount.bind(keyCounter));
}
exports.start = start;
//# sourceMappingURL=start.js.map