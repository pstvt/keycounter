"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyCounter = void 0;
const lodash_1 = require("lodash");
const events_1 = __importDefault(require("events"));
class KeyCounter extends events_1.default {
    constructor(dataStore) {
        var _a;
        super();
        this.todayKeyCount = 0;
        this.updateDebounceWaitMs = 5 * 1000;
        this.storeDebounceWaitMs = 5 * 60 * 1000;
        this.dataStore = dataStore;
        this.currentDate = KeyCounter.todayDate();
        this.todayKeyCount = (_a = +this.dataStore.retrieve(this.currentDate)) !== null && _a !== void 0 ? _a : 0;
        this.updateDebounced = (0, lodash_1.debounce)(this.emitUpdate, this.updateDebounceWaitMs, {
            maxWait: this.updateDebounceWaitMs,
        });
        this.storeTodayKeyCountDebounced = (0, lodash_1.debounce)(this.storeTodayKeyCount, this.storeDebounceWaitMs, {
            maxWait: this.storeDebounceWaitMs,
        });
        setTimeout(this.emitUpdate.bind(this), 1000);
        console.log('KeyCounter started.');
    }
    onKeyUp() {
        this.todayKeyCount++;
        this.updateDebounced();
        this.storeTodayKeyCountDebounced();
    }
    emitUpdate() {
        this.emit('update', this.todayKeyCount);
    }
    storeTodayKeyCount() {
        this.dataStore.store(this.currentDate, this.todayKeyCount.toString());
        // track date change
        if (this.currentDate !== KeyCounter.todayDate()) {
            this.currentDate = KeyCounter.todayDate();
            this.todayKeyCount = 0;
        }
    }
    static todayDate() {
        const t = new Date();
        return t.getFullYear() + '-' + ('0' + t.getMonth()).slice(-2) + '-' + ('0' + t.getDate()).slice(-2);
    }
}
exports.KeyCounter = KeyCounter;
//# sourceMappingURL=KeyCounter.js.map