// this is to see the capablities of the BST implementation 
// in the console

const binaryTree = require('./binarySearchTree');

const randomArr = (() => {
    let arr = [];
    while (arr.length <= 10) {
        arr.push(Math.floor(Math.random() * 10))
    }
    return arr;
})()

binaryTree.buildTree(randomArr)
binaryTree.prettyPrint();

console.log(`is the tree balanaced: ${binaryTree.isBalanced()}`)
console.log(`level order: ${binaryTree.levelOrder()}`);
console.log(`preorder: ${binaryTree.preorder()}`);
console.log(`inorder: ${binaryTree.inorder()}`);
console.log(`postorder: ${binaryTree.postorder()}`);

binaryTree.insert(200);
binaryTree.insert(300);
binaryTree.insert(400);
binaryTree.insert(500);
binaryTree.insert(600);
binaryTree.prettyPrint();

console.log(`is the tree balanaced: ${binaryTree.isBalanced()}`);
binaryTree.rebalance();
console.log(`after rebalance:`);
binaryTree.prettyPrint();
console.log(`is the tree balanaced: ${binaryTree.isBalanced()}`)
console.log(`level order: ${binaryTree.levelOrder()}`);
console.log(`preorder: ${binaryTree.preorder()}`);
console.log(`inorder: ${binaryTree.inorder()}`);
console.log(`postorder: ${binaryTree.postorder()}`);