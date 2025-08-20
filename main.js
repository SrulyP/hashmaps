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
        const newNode = new Node(value, this.head());
        this.head = newNode;
    }

    // Total number of nodes in the list
    size() {
        let count = 0;
        let currentNode = this.head();
        while (currentNode.nextNode != null) {
            currentNode = currentNode.nextNode;
            count++;
        }
    }

    // First node in the list
    head() {
        return this.headNode;
    }

    // Last node in the list
    tail() {
        return this.tailNode;
    }

    at(index) {}
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
