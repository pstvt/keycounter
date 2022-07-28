"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStore = void 0;
const fs_1 = __importDefault(require("fs"));
class DataStore {
    constructor(storagePath) {
        this.storagePath = storagePath;
    }
    store(key, content) {
        try {
            if (!fs_1.default.existsSync(this.storagePath))
                fs_1.default.mkdirSync(this.storagePath);
            const filePath = this.storagePath + key + '.txt';
            fs_1.default.writeFileSync(filePath, content);
            return true;
        }
        catch (e) {
            console.error('DataStore error.', e);
            return false;
        }
    }
    retrieve(key) {
        try {
            const filePath = this.storagePath + key + '.txt';
            return fs_1.default.existsSync(filePath) ? fs_1.default.readFileSync(filePath).toString() : '0';
        }
        catch (e) {
            console.error('DataStore error.', e);
            return null;
        }
    }
}
exports.DataStore = DataStore;
//# sourceMappingURL=DataStore.js.map