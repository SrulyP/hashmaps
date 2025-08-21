class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.array = array;
        this.root = buildTree(this.array);
    }

    // Create a balanced binary tree full of Node objects. Return the level - 0 root node.
    buildTree(array) {
        array = array.sort((a, b) => a - b);
        array = [ ...new Set(array) ];

    }

    insert(value) {}

    deleteItem(value) {}
    find(value) {}
    levelOrderForEach(callback) {}
    inOrderForEach(callback) {}
    preOrderForEach(callback) {}
    postOrderForEach(callback) {}
    height(value) {}
    depth(value) {}
    isBalanced() {}
    rebalance() {}
}
