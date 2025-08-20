class LinkedList {
    constructor(headNode = null, tailNode = null) {
        this.headNode = headNode;
        this.tailNode = tailNode;
    }

    // Add node to end of list
    append(value) {
        const newNode = new Node(value, null);
        if (this.headNode === null) {
            this.headNode = newNode;
            this.tailNode = newNode;
        } else {
            this.tailNode.nextNode = newNode;
            this.tailNode = this.tailNode.nextNode;
        }
    }

    // Add node to beginning of list
    prepend(value) {
        const newNode = new Node(value, this.headNode);
        this.headNode = newNode;
        if (this.tailNode === null) {
            this.tailNode = newNode;
        }
    }

    // Return total number of nodes in the list
    size() {
        if (this.head() === null) {
            return 0;
        } else {
            let count = 1;
            let currentNode = this.head();
            while (currentNode.nextNode != null) {
                count++;
                currentNode = currentNode.nextNode;
            }
            return count;
        }
    }

    // Return first node in the list
    head() {
        return this.headNode;
    }

    // Return last node in the list
    tail() {
        return this.tailNode;
    }

    // Return node at the given index
    at(index) {
        if (index >= this.size()) {
            throw new Error('Index larger than size of linked list');
        } else {
            let currentNode = this.head();
            for (let i = 0; i < index; i++) {
                currentNode = currentNode.nextNode;
            }
            return currentNode;
        }
    }

    pop() {}
    contains(value) {}
    find(value) {}
    toString() {}
}

class Node {
    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }
}
