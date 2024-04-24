import Node from './node.js';
import prettyPrint from './prettyPrint.js';

class Tree {
  constructor(array) {
    this.sortedArray = this.mergeSort(array);
    this.root = this.buildTree(this.sortedArray);
  }

  buildTree(array) {
    const nodeIndex = Math.floor(array.length / 2);
    const node = new Node(array[nodeIndex]);
    if (array.length > 0 && node != null) {
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
    }
    return node;
  }

  mergeSort(array, sortedArray = []) {
    const half = Math.floor(array.length / 2);
    let firstHalf = array.slice(0, half);
    let secondHalf = array.slice(half, array.length);
    if (firstHalf.length > 1 || secondHalf.length > 1) {
      firstHalf = this.mergeSort(firstHalf);
      secondHalf = this.mergeSort(secondHalf);
    }

    const length = firstHalf.length + secondHalf.length;

    while (sortedArray.length < length) {
      if (firstHalf[0] <= secondHalf[0] || typeof secondHalf[0] !== 'number') {
        sortedArray.push(firstHalf[0]);
        firstHalf.splice(0, 1);
      } else {
        sortedArray.push(secondHalf[0]);
        secondHalf.splice(0, 1);
      }
    }
    return sortedArray;
  }
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(arr);

prettyPrint(tree.root);
