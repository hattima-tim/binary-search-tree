/* eslint-disable no-param-reassign */
function Node(data) {
  const left = null;
  const right = null;
  return {
    root: data,
    left,
    right,
  };
}

function Tree() {
  let sortedArr;
  let sortedArrWithoutDuplicate;
  let tree = {};

  function buildTree(arr, start, end, count = 0) {
    if (start > end) return null;
    if (count === 0) {
      sortedArr = arr.sort((a, b) => a - b);

      let arrIndexToBeRemoved;
      sortedArrWithoutDuplicate = sortedArr.filter((element, index) => {
        const leftElement = element;
        const rightElement = sortedArr[index + 1];
        if (leftElement === rightElement) arrIndexToBeRemoved = index + 1;
        return arrIndexToBeRemoved !== index;
      });
      start = 0;
      end = sortedArrWithoutDuplicate.length - 1;
    }
    count += 1;
    const mid = parseInt((start + end) / 2, 10);
    const node = Node(sortedArrWithoutDuplicate[mid]);

    node.left = buildTree(sortedArrWithoutDuplicate, start, mid - 1, count);
    node.right = buildTree(sortedArrWithoutDuplicate, mid + 1, end, count);
    tree = node;
    return node;
  }

  function insert(value, storedTree = tree) {
    if (!storedTree || Object.keys(storedTree).length === 0) {
      return Node(value);
    }
    if (value < storedTree.root) storedTree.left = insert(value, storedTree.left);
    else if (value > storedTree.root) storedTree.right = insert(value, storedTree.right);
    return storedTree;
  }

  function findInorderSuccessor(treeToSearch) {
    if (treeToSearch.left === null) {
      const inorderSuccessor = treeToSearch.root;
      return inorderSuccessor;
    }
    return findInorderSuccessor(treeToSearch.left);
  }

  function deleteNode(value, storedTree = tree) {
    if (!storedTree) return null;
    if (storedTree.root === value) {
      if (storedTree.left !== null && storedTree.right !== null) {
        const inorderSuccessor = findInorderSuccessor(storedTree.right);
        deleteNode(inorderSuccessor);
        storedTree.root = inorderSuccessor;
        return storedTree;
      }
      if (storedTree.left === null) return storedTree.right;
      if (storedTree.right === null) return storedTree.left;
      return null;
    }
    if (value < storedTree.root) storedTree.left = deleteNode(value, storedTree.left);
    else if (value > storedTree.root) storedTree.right = deleteNode(value, storedTree.right);
    return storedTree;
  }

  function levelOrder(
    callback,
    callbackReturns = [],
    queue = [tree],
    valueArr = []) {

    callback ?
      callbackReturns.push(callback(queue[0].root)) :
      valueArr.push(queue[0].root);

    if (queue[0].left !== null) queue.push(queue[0].left);
    if (queue[0].right !== null) queue.push(queue[0].right);
    queue.shift();
    if (queue.length !== 0) {
      levelOrder(callback, callbackReturns, queue, valueArr)
    }
    return callback ? callbackReturns : valueArr;
  }

  function find(value, storedTree = tree) {
    if (!storedTree || value == null || value == undefined) return null;
    if (value === storedTree.root) return storedTree;
    else if (value < storedTree.root) return find(value, storedTree.left);
    else if (value > storedTree.root) return find(value, storedTree.right);
  }

  function inorder(
    callback,
    callbackReturns = [],
    storedTree = tree,
    valuesArr = []) {
    if (!storedTree) return;
    inorder(callback, callbackReturns, storedTree.left, valuesArr);

    callback ?
      callbackReturns.push(callback(storedTree.root)) :
      valuesArr.push(storedTree.root);

    inorder(callback, callbackReturns, storedTree.right, valuesArr);
    return callback ? callbackReturns : valuesArr;
  }

  function preorder(
    callback,
    callbackReturns = [],
    storedTree = tree,
    valuesArr = []) {
    if (!storedTree) return;

    callback ?
      callbackReturns.push(callback(storedTree.root)) :
      valuesArr.push(storedTree.root);

    preorder(callback, callbackReturns, storedTree.left, valuesArr);
    preorder(callback, callbackReturns, storedTree.right, valuesArr);
    return callback ? callbackReturns : valuesArr;
  }

  function postorder(
    callback,
    callbackReturns = [],
    storedTree = tree,
    valuesArr = []) {
    if (!storedTree) return;
    postorder(callback, callbackReturns, storedTree.left, valuesArr);
    postorder(callback, callbackReturns, storedTree.right, valuesArr);

    callback ?
      callbackReturns.push(callback(storedTree.root)) :
      valuesArr.push(storedTree.root);

    return callback ? callbackReturns : valuesArr;
  }

  function height(nodeValue, edgeNumber = 0) {
    const tree = find(nodeValue);
    let leftSubTreeHeight = 0;
    let rightSubTreeHeight = 0;

    leftSubTreeHeight = edgeNumber +
      (tree.left ? height(tree.left.root, 1) : 0);
    rightSubTreeHeight = edgeNumber +
      (tree.right ? height(tree.right.root, 1) : 0);

    return leftSubTreeHeight > rightSubTreeHeight ?
      leftSubTreeHeight : rightSubTreeHeight;
  }

  function depth(nodeValue, storedTree = tree, depthCount = 0) {
    if (!storedTree || !nodeValue) return 0;
    if (nodeValue === storedTree.root) return depthCount;
    else if (nodeValue < storedTree.root) return depth(nodeValue, storedTree.left, depthCount += 1);
    else if (nodeValue > storedTree.root) return depth(nodeValue, storedTree.right, depthCount += 1);
  }

  function isBalanced(storedTree = tree) {
    if (!storedTree || (!storedTree.left && !storedTree.right)) return true;
    let heightOfLeftSubTree = storedTree.left ?
      height(storedTree.left.root) : -1;
    let heightOfRightSubTree = storedTree.right ?
      height(storedTree.right.root) : -1;

    if (Math.abs(heightOfLeftSubTree - heightOfRightSubTree) > 1) {
      return false;
    }
    let isLeftSubTreeBalanced = isBalanced(storedTree.left);
    let isRightSubTreeBalanced = isBalanced(storedTree.right);
    return (isLeftSubTreeBalanced === false || isRightSubTreeBalanced === false) ?
      false : true;
  }

  function rebalance(){
    let unbalancedTreeValues = preorder()
    let balancedTree = buildTree(unbalancedTreeValues);
    tree = balancedTree;
    return tree;
  }

  return {
    buildTree,
    insert,
    deleteNode,
    find,
    levelOrder,
    inorder,
    preorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance
  };
}

module.exports = Tree();
