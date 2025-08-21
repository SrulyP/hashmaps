import { LinkedList, Node } from './linked-lists.js';

class HashMap {
    constructor(loadFactor = 0.8, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.buckets = new Array(this.capacity);
    }

    // hash function from TOP.
    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode =
                (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    // Increase the capacity of the hashmap array.
    increaseCapacity() {
        const oldBuckets = this.buckets;
        const oldCapacity = this.capacity;

        this.capacity *= 2;
        this.buckets = new Array(this.capacity);

        for (let i = 0; i < oldCapacity; i++) {
            if (oldBuckets[i]) {
                // go through each linked list and rehash all the nodes
            }
        }
    }

    // Update or set a key's value in the hashmap.
    set(key, value) {
        if (!this.buckets[keyHash]) {
            this.buckets[keyHash] = new LinkedList();
        }
        const list = this.buckets[keyHash];

        if (list.containsKey(key)) {
            list.updateValue(key, value);
        } else {
            list.append(new Node(key, value));

            if (this.length() > this.loadFactor * this.capacity) {
                this.increaseCapacity();
            }
        }
    }

    // Returns value that's assigned to the key. If a key is not found, return null.
    get(key) {}

    // Returns true or false based on whether or not the key is in the hash map.
    has(key) {}

    // Remove the entry with that key and return true. If the key isn’t in hash map, return false.
    remove(key) {}

    // Return the number of stored keys in the hash map.
    length() {}

    // Remove all entries in the hash map.
    clear() {}

    // Return an array containing all the keys inside the hash map.
    keys() {}

    // Return an array containing all the values.
    values() {}

    // Return an array that contains each key, value pair.
    entries() {}
}
