import docKeys from "./keys/Keywords";

export = class Manager {
    searchKeys(keywords: string[]) {
        let keyArray = [];
        
        for (let key of keywords) {
            let k = docKeys.find(dk => dk.name === key);
            if (!k) return;
            keyArray.push(k);
        }

        return keyArray;
    }
}