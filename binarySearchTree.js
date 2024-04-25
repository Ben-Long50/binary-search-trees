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

    const node = getNode(this.root);

    function replaceNode(currentNode) {
      if (currentNode.right) {
        let targetNode = currentNode.right;
        while (targetNode.left) {
          targetNode = targetNode.left;
        }
        return targetNode.data;
      }
      if (currentNode.left) {
        let targetNode = currentNode.left;
        while (targetNode.right) {
          targetNode = targetNode.right;
        }
        return targetNode.data;
      }
      return currentNode.data;
    }
    node.data = replaceNode(node);
  }
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(arr);

prettyPrint(tree.root);
tree.deleteItem(67);
prettyPrint(tree.root);
