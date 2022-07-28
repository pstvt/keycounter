#!/usr/bin/env node

import {start} from "./start";
import {install} from "./startup/install";
import {uninstall} from "./startup/uninstall";
import {asciiArt} from "./asciiArt";

console.log(asciiArt)
const command = process.argv[2]
switch (command) {
    case 'start':
        start()
        break
    case 'install':
        install()
        break
    case 'uninstall':
        uninstall()
        break
    default:
        console.log(`Unknown command "${command}"! available commands: "start", "install", "uninstall".`)
}