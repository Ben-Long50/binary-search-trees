import Node from './node.js';
import mergeSort from './mergeSort.js';
import prettyPrint from './prettyPrint.js';

class Tree {
  constructor(array) {
    this.sortedArray = mergeSort(array);
    this.root = this.buildTree(this.sortedArray);
  }

  buildTree(array) {
    const nodeIndex = Math.floor(array.length / 2);
    const node = new Node(array[nodeIndex]);
    if (array.length === 0) {
      return null;
    }
    const arrLeft = [];
    for (let i = 0; i < nodeIndex; i++) {
      arrLeft.push(array[i]);
    }
    node.left = this.buildTree(arrLeft);
    const arrRight = [];
    for (let i = nodeIndex + 1; i < array.length; i++) {
      arrRight.push(array[i]);
    }
    node.right = this.buildTree(arrRight);
    return node;
  }

  insert(value) {
    function traverse(currentNode) {
      if (
        (value <= currentNode.data && !currentNode.left) ||
        (value > currentNode.data && !currentNode.right)
      ) {
        return currentNode;
      }
      if (value <= currentNode.data) {
        currentNode = currentNode.left;
        return traverse(currentNode);
      }
      if (value > currentNode.data) {
        currentNode = currentNode.right;
        return traverse(currentNode);
      }
    }

    const parentNode = traverse(this.root);

    if (value <= parentNode.data) {
      parentNode.left = new Node(value);
    }
    if (value > parentNode.data) {
      parentNode.right = new Node(value);
    }
  }

  deleteItem(value) {
    const node = this.find(value);

    function replaceNode(currentNode) {
      if (currentNode.right) {
        let previousNode = currentNode;
        currentNode = currentNode.right;
        while (currentNode.left) {
          previousNode = currentNode;
          currentNode = currentNode.left;
        }
        const nodeData = currentNode.data;
        previousNode.left = null;
        return nodeData;
      }
      if (currentNode.left) {
        let previousNode = currentNode;
        currentNode = currentNode.left;
        while (currentNode.right) {
          previousNode = currentNode;
          currentNode = currentNode.right;
        }
        const nodeData = currentNode.data;
        previousNode.right = null;
        return nodeData;
      }
      return currentNode.data;
    }
    node.data = replaceNode(node);
  }

  find(value) {
    function getNode(currentNode) {
      if (!currentNode) {
        return 'Node not found';
      }
      if (value === currentNode.data) {
        return currentNode;
      }
      if (value <= currentNode.data) {
        currentNode = currentNode.left;
        return getNode(currentNode);
      }
      if (value > currentNode.data) {
        currentNode = currentNode.right;
        return getNode(currentNode);
      }
    }
    return getNode(this.root);
  }

  levelOrder(callback) {
    const queue = [];
    const breadthArray = [];
    queue.push(this.root);
    while (queue[0]) {
      if (queue[0].left !== null) {
        queue.push(queue[0].left);
      }
      if (queue[0].right !== null) {
        queue.push(queue[0].right);
      }
      if (callback) {
        let currentNode = queue.splice(0, 1)[0];
        currentNode.data = callback(currentNode.data);
      }
      if (!callback) {
        breadthArray.push(queue.splice(0, 1)[0].data);
      }
    }
    if (callback) {
      return;
    }
    return breadthArray;
  }

  inOrder(callback) {}

  preOrder(callback) {}

  postOrder(callback) {}

  height(node) {}

  depth(node) {}

  isBalanced() {}

  rebalance() {}
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(arr);
function addOne(item) {
  item *= 5;
  return item;
}
prettyPrint(tree.root);
console.log(tree.levelOrder(addOne));
prettyPrint(tree.root);
