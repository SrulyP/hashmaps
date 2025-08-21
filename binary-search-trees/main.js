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
        // sort and remove dupes
        array = array.sort((a, b) => a - b);
        array = [...new Set(array)];

        // if it's the last node
        if (array.length === 0) {
            return null;
        }

        // else, slice the array into 2 sub-arrays, run buildTree on left sides, then right side
        const start = 0;
        const end = array.length - 1;
        const middle = Math.floor((start + end) / 2);

        const currRoot = new Node(array[middle]);

        const leftSubarray = array.slice(0, middle);  
        const rightSubarray = array.slice(middle + 1);  

        currRoot.left = buildTree(leftSubarray);
        currRoot.right = buildTree(rightSubarray);

        return currRoot;
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
