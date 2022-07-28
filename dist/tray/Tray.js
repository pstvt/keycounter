"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tray = void 0;
const systray_1 = __importDefault(require("systray"));
const trayIcon_1 = __importDefault(require("./trayIcon"));
const child_process_1 = require("child_process");
class Tray {
    constructor(storagePath) {
        this.todayKeyCount = 0;
        this.systray = new systray_1.default({
            menu: this.menu(),
            debug: false,
            copyDir: true, // copy go tray binary to outside directory, useful for packing tool like pkg.
        });
        this.systray.onClick(action => {
            if (action.seq_id === 2)
                this.exiting ? this.systray.kill() : this.enableExiting();
            if (action.seq_id === 1)
                (0, child_process_1.execSync)(`start "" "${storagePath}"`);
        });
    }
    update(todayKeyCount) {
        this.todayKeyCount = todayKeyCount;
        this.rerender();
    }
    exit() {
        this.systray.kill(true);
    }
    rerender() {
        this.systray.sendAction({
            type: 'update-item',
            seq_id: 0,
            item: {
                title: `Today keys: ${this.todayKeyCount}`,
                checked: false,
                enabled: true,
                tooltip: '',
            },
        });
        this.systray.sendAction({
            type: 'update-menu',
            seq_id: 0,
            menu: Object.assign(Object.assign({}, this.menu()), { tooltip: `Today keys: ${this.todayKeyCount}`, icon: trayIcon_1.default })
        });
    }
    menu() {
        const menu = {
            //  .png icon in macOS/Linux .ico format in windows
            icon: trayIcon_1.default,
            title: "keys",
            tooltip: "Key Counter",
            items: [
                {
                    title: "Today keys: " + this.todayKeyCount,
                    checked: false,
                    enabled: true,
                    tooltip: '',
                },
                {
                    title: "History",
                    checked: false,
                    enabled: true,
                    tooltip: '',
                },
                {
                    title: "Exit",
                    checked: false,
                    enabled: true,
                    tooltip: '',
                }
            ]
        };
        return menu;
    }
    enableExiting() {
        this.exiting = true;
        this.systray.sendAction({
            type: 'update-item',
            seq_id: 2,
            item: {
                title: "Confirm Exit?",
                checked: false,
                enabled: true,
                tooltip: '',
            },
        });
        setTimeout(this.disableExiting, 5000);
    }
    disableExiting() {
        this.exiting = false;
        this.systray.sendAction({
            type: 'update-item',
            seq_id: 2,
            item: {
                title: "Exit",
                checked: false,
                enabled: true,
                tooltip: '',
            },
        });
    }
}
exports.Tray = Tray;
//# sourceMappingURL=Tray.js.map