#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const start_1 = require("./start");
const install_1 = require("./startup/install");
const uninstall_1 = require("./startup/uninstall");
const asciiArt_1 = require("./asciiArt");
console.log(asciiArt_1.asciiArt);
const command = process.argv[2];
switch (command) {
    case 'start':
        (0, start_1.start)();
        break;
    case 'install':
        (0, install_1.install)();
        break;
    case 'uninstall':
        (0, uninstall_1.uninstall)();
        break;
    default:
        console.log(`Unknown command "${command}"! available commands: "start", "install", "uninstall".`);
}
//# sourceMappingURL=app.js.map