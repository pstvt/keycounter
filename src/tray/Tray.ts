import SysTray, {Menu} from "systray";
import trayIcon from "./trayIcon";
import {execSync} from "child_process";

export class Tray {

    private systray: SysTray;
    private exiting: boolean;
    private todayKeyCount: number = 0;

    constructor(storagePath) {
        this.systray = new SysTray({
            menu: this.menu(),
            debug: false,
            copyDir: true, // copy go tray binary to outside directory, useful for packing tool like pkg.
        })
        this.systray.onClick(action => {
            if (action.seq_id === 2)
                this.exiting ? this.systray.kill() : this.enableExiting();
            if (action.seq_id === 1)
                execSync(`start "" "${storagePath}"`);
        })
    }

    update(todayKeyCount: number) {
        this.todayKeyCount = todayKeyCount
        this.rerender()
    }

    exit() {
        this.systray.kill(true)
    }

    private rerender() {
        this.systray.sendAction({
            type: 'update-item',
            seq_id: 0,
            item: {
                title: `Today keys: ${this.todayKeyCount}`,
                checked: false,
                enabled: true,
                tooltip: '',
            },
        })
        this.systray.sendAction({
            type: 'update-menu',
            seq_id: 0,
            menu: {
                ...this.menu(),
                tooltip: `Today keys: ${this.todayKeyCount}`,
                icon: trayIcon,
            }
        })
    }

    private menu() {
        const menu: Menu = {
            //  .png icon in macOS/Linux .ico format in windows
            icon: trayIcon,
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
        }
        return menu
    }

    private enableExiting() {
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
        })
        setTimeout(this.disableExiting, 5000);
    }

    private disableExiting() {
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
        })
    }
}