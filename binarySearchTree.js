import Node from './node.js';
import mergeSort from './mergeSort.js';

export default class Tree {
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
        if (!currentNode.left) {
          const nodeData = currentNode.data;
          previousNode.right = null;
          return nodeData;
        }
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
        if (!currentNode.right) {
          const nodeData = currentNode.data;
          previousNode.left = null;
          return nodeData;
        }
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

  find(value, currentNode = this.root) {
    if (!currentNode) {
      return 'Node not found';
    }
    if (value === currentNode.data) {
      return currentNode;
    }
    if (value <= currentNode.data) {
      currentNode = currentNode.left;
      return this.find(value, currentNode);
    }
    if (value > currentNode.data) {
      currentNode = currentNode.right;
      return this.find(value, currentNode);
    }
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
        const currentNode = queue.splice(0, 1)[0];
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

  inOrder(callback, node = this.root, inOrderArray = []) {
    if (node === null) {
      return;
    }
    this.inOrder(callback, node.left, inOrderArray);
    if (callback) {
      node.data = callback(node.data);
    } else {
      inOrderArray.push(node.data);
    }
    this.inOrder(callback, node.right, inOrderArray);
    if (callback) {
      return;
    }
    return inOrderArray;
  }

  preOrder(callback, node = this.root, preOrderArray = []) {
    if (node === null) {
      return;
    }
    if (callback) {
      node.data = callback(node.data);
    } else {
      preOrderArray.push(node.data);
    }
    this.preOrder(callback, node.left, preOrderArray);
    this.preOrder(callback, node.right, preOrderArray);
    if (callback) {
      return;
    }
    return preOrderArray;
  }

  postOrder(callback, node = this.root, postOrderArray = []) {
    if (node === null) {
      return;
    }
    this.postOrder(callback, node.left, postOrderArray);
    this.postOrder(callback, node.right, postOrderArray);
    if (callback) {
      node.data = callback(node.data);
    } else {
      postOrderArray.push(node.data);
    }
    if (callback) {
      return;
    }
    return postOrderArray;
  }

  height(node, height = 0) {
    const queue = [node];
    while (queue.length > 0) {
      const levelSize = queue.length;
      for (let i = 0; i < levelSize; i++) {
        if (queue[0].left !== null) {
          queue.push(queue[0].left);
        }
        if (queue[0].right !== null) {
          queue.push(queue[0].right);
        }
        queue.splice(0, 1);
      }
      height++;
    }
    height--;
    return height;
  }

  depth(node, currentNode = this.root, depth = 0) {
    if (node.data === currentNode.data) {
      return depth;
    }
    if (node.data <= currentNode.data) {
      depth++;
      return this.depth(node, currentNode.left, depth);
    }
    if (node.data > currentNode.data) {
      depth++;
      return this.depth(node, currentNode.right, depth);
    }
  }

  isBalanced() {
    const leftHeight = this.height(this.root.left);
    const rightHeight = this.height(this.root.right);
    if (leftHeight - 1 > rightHeight || rightHeight - 1 > leftHeight) {
      return false;
    }
    return true;
  }

  rebalance() {
    const unorderedArray = this.inOrder();
    this.root = this.buildTree(unorderedArray);
  }
}
