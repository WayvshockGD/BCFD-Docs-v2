import docKeys from "./keys/Keywords";

export = class Manager {
    searchKeys(keywords: string[]) {
        let keyArray = [];
        
        for (let key of keywords) {
            let arg = key.startsWith("$") ? key : `$${key}`;
            console.log(arg)
            let k = docKeys.find(dk => dk.name === arg);
            if (!k) return;
            keyArray.push(k);
        }

        return keyArray;
    }

    searchTypes(types: string) {
        
    }
}