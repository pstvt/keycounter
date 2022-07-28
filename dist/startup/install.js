"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.install = void 0;
const fs_1 = __importDefault(require("fs"));
const vbsScript_1 = __importDefault(require("./vbsScript"));
const environment_1 = require("../environment");
const child_process_1 = require("child_process");
function install() {
    const scriptPath = environment_1.userStartupDirectory + 'KeyCounter.vbs';
    fs_1.default.writeFileSync(scriptPath, vbsScript_1.default);
    console.log(`Installed startup script in "${environment_1.userStartupDirectory}".`);
    (0, child_process_1.spawn)('WScript', [scriptPath], { detached: true, stdio: 'ignore' }).unref();
    console.log('KeyCounter should be running in your system tray in a few seconds!');
}
exports.install = install;
//# sourceMappingURL=install.js.map