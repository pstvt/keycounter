import {uIOhook} from "uiohook-napi";
import {storagePath} from "./environment";
import {KeyCounter} from "./KeyCounter";
import {Tray} from "./tray/Tray";
import {DataStore} from "./DataStore";

export function start() {
    const dataStore = new DataStore(storagePath)
    const keyCounter = new KeyCounter(dataStore)
    const tray = new Tray(storagePath)

    keyCounter.on('update', (todayKeyCount) => tray.update(todayKeyCount))
    uIOhook.on('keyup', keyCounter.onKeyUp.bind(keyCounter))
    uIOhook.start()

    process.on('SIGINT', tray.exit.bind(tray))
    process.on('exit', keyCounter.storeTodayKeyCount.bind(keyCounter))
}
