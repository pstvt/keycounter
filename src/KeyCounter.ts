import * as fs from "fs";
import {DataStore} from "./DataStore";
import {debounce, DebouncedFunc} from "lodash";
import EventEmitter from "events";

export type KeyCounterOptions = {
    userDataDirectory: string,
    dataStore: DataStore,
}

export class KeyCounter extends EventEmitter {

    private dataStore: DataStore;
    private todayKeyCount: number = 0;
    private currentDate: string;
    private updateDebounceWaitMs: number = 5 * 1000;
    private storeDebounceWaitMs: number = 5 * 60 * 1000;
    private readonly updateDebounced: DebouncedFunc<() => void>;
    private readonly storeTodayKeyCountDebounced: DebouncedFunc<() => void>;

    constructor(dataStore: DataStore) {
        super();
        this.dataStore = dataStore
        this.currentDate = KeyCounter.todayDate()
        this.todayKeyCount = +this.dataStore.retrieve(this.currentDate) ?? 0
        this.updateDebounced = debounce(this.emitUpdate, this.updateDebounceWaitMs, {
            maxWait: this.updateDebounceWaitMs,
        })
        this.storeTodayKeyCountDebounced = debounce(this.storeTodayKeyCount, this.storeDebounceWaitMs, {
            maxWait: this.storeDebounceWaitMs,
        })
        setTimeout(this.emitUpdate.bind(this), 1000)
        console.log('KeyCounter started.')
    }

    onKeyUp() {
        this.todayKeyCount++
        this.updateDebounced()
        this.storeTodayKeyCountDebounced()
    }

    private emitUpdate() {
        this.emit('update', this.todayKeyCount)
    }

    storeTodayKeyCount() {
        this.dataStore.store(this.currentDate, this.todayKeyCount.toString())
        // track date change
        if (this.currentDate !== KeyCounter.todayDate()) {
            this.currentDate = KeyCounter.todayDate()
            this.todayKeyCount = 0
        }
    }

    private static todayDate() {
        const t = new Date()
        return t.getFullYear() + '-' + ('0' + t.getMonth()).slice(-2) + '-' + ('0' + t.getDate()).slice(-2)
    }
}