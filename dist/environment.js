"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStartupDirectory = exports.storagePath = exports.userDataDirectory = void 0;
exports.userDataDirectory = process.env.APPDATA; // e.g. C:\Users\username\AppData\Roaming
exports.storagePath = exports.userDataDirectory + '/KeyCounter/';
exports.userStartupDirectory = exports.userDataDirectory + '/Microsoft/Windows/Start Menu/Programs/Startup/';
//# sourceMappingURL=environment.js.map