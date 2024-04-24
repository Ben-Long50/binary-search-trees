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
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(arr);

prettyPrint(tree.root);
