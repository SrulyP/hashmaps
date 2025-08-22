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

        currRoot.left = this.buildTree(leftSubarray);
        currRoot.right = this.buildTree(rightSubarray);

        return currRoot;
    }

    insert(value) {
        const newNode = new Node(value);
        let currNode = this.root;
        let parentNode;

        if (currNode === null) {
            return;
        }

        // loop through to find where to insert the new node
        while (currNode != null) {
            parentNode = currNode;
            if (value > currNode.data) {
                currNode = currNode.right;
            } else if (value < currNode.data) {
                currNode = currNode.left;
            } else if (value === currNode.data) {
                return;
            }
        }
        // once you get to the node you wanna insert into: insert it on the correct side
        if (value > parentNode.data) {
            parentNode.right = newNode;
        } else {
            parentNode.left = newNode;
        }
        return;
    }

    deleteItem(value) {
        let currNode = this.root;
        let parentNode;

        while (currNode != null && currNode.data != value) {
            parentNode = currNode;
            if (value > currNode.data) {
                currNode = currNode.right;
            } else if (value < currNode.data) {
                currNode = currNode.left;
            }
        }
        if (!currNode) return; // the value does not exist in the tree

        // case 1: has no children (just delete)
        if (!currNode.right && !currNode.left) {
            if (!parentNode) {
                this.root = null;
            } else if (parentNode.left === currNode) {
                parentNode.left = null;
            } else {
                parentNode.right = null;
            }
        } else if (!currNode.left || !currNode.right) {
            // case 2: has one child (swap with child)
            let child = currNode.left ? currNode.left : currNode.right;
            if (!parentNode) {
                this.root = child;
            } else if (parentNode.left === currNode) {
                parentNode.left = child;
            } else {
                parentNode.right = child;
            }
        } else if (currNode.right && currNode.left) {
            // case 3: has 2 children (swap with in-order successor)
            // Copy the contents of the in-order successor of the node to be deleted
            let inOrderSuccessor = this.getInOrderSuccessor(currNode);
            currNode.data = inOrderSuccessor.data;

            // Delete in-order successor from the right subtree
            let successorParent = currNode;
            let successorNode = currNode.right;
            while (successorNode.left) {
                successorParent = successorNode;
                successorNode = successorNode.left;
            }
            if (successorParent.left === successorNode) {
                successorParent.left = successorNode.right;
            } else {
                successorParent.right = successorNode.right;
            }
        }
    }

    // Return the in-order successor.
    getInOrderSuccessor(currNode) {
        currNode = currNode.right;
        while (currNode != null && currNode.left != null) {
            currNode = currNode.left;
        }
        return currNode;
    }

    // Returns the node with the given value, or null if it is not found.
    find(value) {
        currNode = this.root;
        while (currNode.data != value) {
            if (value > currNode.data) {
                currNode = currNode.right;
            } else {
                currNode = currNode.left;
            }
            return currNode;
        }
        return null;
    }

    // Traverse the tree in breadth-first level order and call the callback on each node
    levelOrderForEach(callback) {
        if (typeof callback != 'function') {
            throw new Error('Error: Please provide a callback function');
        }
        if (!this.root) return;

        let queue = [this.root];
        while (queue.length > 0) {
            const shifted = queue.shift();
            callback(shifted);
            if (shifted.left) queue.push(shifted.left);
            if (shifted.right) queue.push(shifted.right);
        }
    }
    inOrderForEach(callback) {}
    preOrderForEach(callback) {}
    postOrderForEach(callback) {}
    height(value) {}
    depth(value) {}
    isBalanced() {}
    rebalance() {}
}
