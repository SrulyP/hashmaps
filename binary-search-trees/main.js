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
        this.root = this.buildTree(this.array);
    }

    // Create a balanced binary tree full of Node objects. Return the level - 0 root node.
    buildTree(array) {
        // sort and remove dupes
        array = array.sort((a, b) => a - b);
        array = [...new Set(array)];

        // if it's the last node
        if (array.length === 0) return null;

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

        if (!currNode) {
            this.root = newNode;
            return;
        }

        // loop through to find where to insert the new node
        while (currNode) {
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

        while (currNode && currNode.data != value) {
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
        let currNode = this.root;
        while (currNode) {
            if (value === currNode.data) {
                return currNode;
            } else if (value > currNode.data) {
                currNode = currNode.right;
            } else {
                currNode = currNode.left;
            }
        }
        return null; // not found
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

    // Traverse the tree in depth-first, in-order and call the callback on each node
    inOrderForEach(callback, node = this.root) {
        if (typeof callback != 'function') {
            throw new Error('Error: Please provide a callback function');
        }
        if (!node) return;

        this.inOrderForEach(callback, node.left);
        callback(node);
        this.inOrderForEach(callback, node.right);
    }

    // Traverse the tree in depth-first, pre-order and call the callback on each node
    preOrderForEach(callback, node = this.root) {
        if (typeof callback != 'function') {
            throw new Error('Error: Please provide a callback function');
        }
        if (!node) return;

        callback(node);
        this.preOrderForEach(callback, node.left);
        this.preOrderForEach(callback, node.right);
    }

    // Traverse the tree in depth-first, post-order and call the callback on each node
    postOrderForEach(callback, node = this.root) {
        if (typeof callback != 'function') {
            throw new Error('Error: Please provide a callback function');
        }
        if (!node) return;

        this.postOrderForEach(callback, node.left);
        this.postOrderForEach(callback, node.right);
        callback(node);
    }

    // Return the height of the node containing the given value.
    height(value) {
        const currNode = this.find(value);
        if (!currNode) return null;
        return this.heightHelper(currNode);
    }

    heightHelper(currNode) {
        if (!currNode) return 0;
        return (
            1 +
            Math.max(
                this.heightHelper(currNode.left),
                this.heightHelper(currNode.right)
            )
        );
    }

    // Return the depth of the node containing the given value.
    depth(value) {
        const desiredNode = this.find(value);
        if (!desiredNode) return null;
        let root = this.root;
        let depth = 0;
        while (root != desiredNode) {
            value > root.data ? (root = root.right) : (root = root.left);
            depth += 1;
        }
        return depth;
    }

    // Return true if the tree is balanced, false otherwise
    isBalanced() {
        return this.isBalancedHelper(this.root);
    }

    isBalancedHelper(node) {
        if (!node) return true;
        let left = node.left ? this.heightHelper(node.left) : 0;
        let right = node.right ? this.heightHelper(node.right) : 0;
        if (Math.abs(left - right) > 1) {
            return false;
        }
        return (
            this.isBalancedHelper(node.left) &&
            this.isBalancedHelper(node.right)
        );
    }

    // Rebalance an unbalanced tree
    rebalance() {
        const queue = [];
        this.rebalanceHelper(this.root, queue);
        this.root = this.buildTree(queue);
    }

    rebalanceHelper(node, queue) {
        if (!node) return;

        this.rebalanceHelper(node.left, queue);
        this.rebalanceHelper(node.right, queue);
        queue.push(node.data);
    }
}
