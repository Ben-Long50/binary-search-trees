import Tree from './binarySearchTree.js';
import prettyPrint from './prettyPrint.js';

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(arr);

function addOne(item) {
  item += 1;
  return item;
}

prettyPrint(tree.root);
// console.log(tree.postOrder());
tree.deleteItem(3);
tree.deleteItem(4);
tree.deleteItem(67);
prettyPrint(tree.root);
// console.log(tree.height(tree.root.right));
