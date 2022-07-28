import fs from 'fs'
import vbsScript from "./vbsScript"
import {userStartupDirectory} from "../environment";
import {exec, spawn} from "child_process";

export function install() {
    const scriptPath = userStartupDirectory + 'KeyCounter.vbs'
    fs.writeFileSync(scriptPath, vbsScript)
    console.log(`Installed startup script in "${userStartupDirectory}".`)
    spawn('WScript', [scriptPath], {detached: true, stdio: 'ignore'}).unref()
    console.log('KeyCounter should be running in your system tray in a few seconds!')
}
