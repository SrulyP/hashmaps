import { LinkedList, Node } from './linked-lists.js';

class HashMap {
    constructor(loadFactor = 0.8, capacity = 16, buckets = []) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.buckets = buckets;
    }

    // hash function from TOP
    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode =
                (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    increaseCapacity() {
        this.capacity *= 2;
    }

    set(key, value) {}

    get(key) {}
    has(key) {}
    remove(key) {}
    length() {}
    clear() {}
    keys() {}
    values() {}
    entries() {}
}
