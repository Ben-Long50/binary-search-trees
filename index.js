import Tree from './binarySearchTree.js';
import generateArray from './generateArray.js';
import prettyPrint from './prettyPrint.js';

const arr = generateArray(30);

const binaryTree = new Tree(arr);

prettyPrint(binaryTree.root);
console.log(binaryTree.isBalanced());
console.log(binaryTree.inOrder());
console.log(binaryTree.preOrder());
console.log(binaryTree.postOrder());
binaryTree.insert(110);
binaryTree.insert(120);
binaryTree.insert(130);
binaryTree.insert(140);
prettyPrint(binaryTree.root);
console.log(binaryTree.isBalanced());
binaryTree.rebalance();
prettyPrint(binaryTree.root);
console.log(binaryTree.isBalanced());
