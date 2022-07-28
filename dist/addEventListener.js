"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEventListener = void 0;
const uiohook_napi_1 = require("uiohook-napi");
function addEventListener(eventHandler) {
    uiohook_napi_1.uIOhook.on('keyup', (e) => {
        eventHandler(e);
    });
    uiohook_napi_1.uIOhook.start();
}
exports.addEventListener = addEventListener;
//# sourceMappingURL=addEventListener.js.map