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
        // go through array, each linked list and rehash all the nodes
    }

    set(key, value) {
        keyHash = hash(key);
        index = this.buckets[keyHash].LinkedList.find(value);
        if (!index) {
            this.buckets[keyHash].LinkedList.append()
        }

        this.buckets[keyHash].append(Node(key, value));
        if (this.length() > this.loadFactor * this.capacity) {
            this.increaseCapacity();
        }
    }

    get(key) {

    }

    has(key) {}
    remove(key) {}
    length() {}
    clear() {}
    keys() {}
    values() {}
    entries() {}
}
