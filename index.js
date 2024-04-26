import Tree from './binarySearchTree.js';
import prettyPrint from './prettyPrint.js';

const arr = [
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 323, 10000, 4000, 5000, 3, 5,
  6, 7, 567,
];

const tree = new Tree(arr);

function addOne(item) {
  item += 1;
  return item;
}

prettyPrint(tree.root);
// console.log(tree.postOrder());
// tree.deleteItem(3);
// prettyPrint(tree.root);
// console.log(tree.height(tree.root.right));
console.log(tree.depth(tree.find(8)));
console.log(tree.depth(tree.find(324)));
console.log(tree.depth(tree.find(5)));
console.log(tree.depth(tree.find(5000)));
console.log(tree.depth(tree.find(6345)));
