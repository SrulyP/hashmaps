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

        // go through each index in the array, if there is a linked list there:
        // go through each node in the linked list and rehash using their key
        for (let i = 0; i < oldCapacity; i++) {
            if (oldBuckets[i]) {
                let currentNode = oldBuckets[i].head();
                while (currentNode != null) {
                    this.set(currentNode.key, currentNode.value);
                    currentNode = currentNode.nextNode;
                }
            }
        }
    }

    // Update or set a key's value in the hashmap.
    set(key, value) {
        const keyHash = this.hash(key);
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
    get(key) {
        const keyHash = this.hash(key);
        const list = this.buckets[keyHash];
        if (list) {
            return list.getValueByKey(key);
        }
        return null;
    }

    // Returns true or false based on whether or not the key is in the hash map.
    has(key) {
        const keyHash = this.hash(key);
        const list = this.buckets[keyHash];
        if (list) {
            return list.containsKey(key);
        }
        return false;
    }

    // Remove the entry with that key and return true. If the key isn’t in hash map, return false.
    remove(key) {
        const keyHash = this.hash(key);
        const list = this.buckets[keyHash];
        if (list) {
            const index = list.findKey(key);
            if (index) {
                list.removeAtIndex(index);
                return true;
            }
        }
        return false;
    }

    // Return the number of stored keys in the hash map.
    length() {
        let count = 0;
        for (let i = 0; i < this.capacity; i++) {
            const list = this.buckets[i];
            if (list) {
                count += list.size();
            }
        }
        return count;
    }

    // Remove all entries in the hash map.
    clear() {
        this.capacity = 16;
        const newBuckets = new Array(this.capacity);
        this.buckets = newBuckets;
    }

    // Return an array containing all the keys inside the hash map.
    keys() {
        let keys = [];

        for (let i = 0; i < this.capacity; i++) {
            const list = this.buckets[i];
            if (list) {
                let currentNode = list.head();
                while (currentNode) {
                    keys.push(currentNode.key);
                    currentNode = currentNode.nextNode;
                }
            }
        }
        return keys;
    }

    // Return an array containing all the values.
    values() {
        let values = [];

        for (let i = 0; i < this.capacity; i++) {
            const list = this.buckets[i];
            if (list) {
                let currentNode = list.head();
                while (currentNode) {
                    values.push(currentNode.value);
                    currentNode = currentNode.nextNode;
                }
            }
        }
        return values;
    }

    // Return an array that contains each key, value pair.
    entries() {}
}
