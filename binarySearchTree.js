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
    return callback? callbackReturns:valueArr;
  }

  function find(value, storedTree = tree) {
    if (!storedTree || !value) return null;
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
  return { buildTree, insert, deleteNode, find, levelOrder, inorder, preorder };
}

module.exports = Tree();
