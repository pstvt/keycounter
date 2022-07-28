import fs from 'fs'
import {userStartupDirectory} from "../environment";

export function uninstall() {
    fs.unlinkSync(userStartupDirectory + 'KeyCounter.vbs')
    console.log('Removed startup script from ' + userStartupDirectory)
}
