class LinkedList {
    constructor(headNode=null, tailNode=null) {
        this.headNode = headNode;
        this.tailNode = tailNode;
    }

    append(value) {
        const newNode = new Node(value, null)
        if (this.headNode === null) {
            this.headNode = newNode
            this.tailNode = newNode
        } else {
            this.tailNode.nextNode = newNode;
            this.tailNode = this.tailNode.nextNode;
        }
    }
    prepend(value) {}
    size() {}
    head() {
        return this.headNode;
    }
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
