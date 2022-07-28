"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uninstall = void 0;
const fs_1 = __importDefault(require("fs"));
const environment_1 = require("../environment");
function uninstall() {
    fs_1.default.unlinkSync(environment_1.userStartupDirectory + 'KeyCounter.vbs');
    console.log('Removed startup script from ' + environment_1.userStartupDirectory);
}
exports.uninstall = uninstall;
//# sourceMappingURL=uninstall.js.map