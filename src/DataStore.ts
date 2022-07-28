import fs from "fs";

export class DataStore {
    storagePath: string

    constructor(storagePath: string) {
        this.storagePath = storagePath
    }

    store(key: string, content: string): boolean {
        try {
            if (!fs.existsSync(this.storagePath)) fs.mkdirSync(this.storagePath)
            const filePath = this.storagePath + key + '.txt'
            fs.writeFileSync(filePath, content);
            return true
        } catch (e) {
            console.error('DataStore error.', e)
            return false
        }
    }

    retrieve(key: string): string {
        try {
            const filePath = this.storagePath + key + '.txt'
            return fs.existsSync(filePath) ? fs.readFileSync(filePath).toString() : '0'
        } catch (e) {
            console.error('DataStore error.', e)
            return null
        }
    }
}
