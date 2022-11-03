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

let sortedArr;
let sortedArrWithoutDuplicate;

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
  return node;
}

buildTree([1, 2, 3]);

function insert(value, tree = {}) {
  if (tree === null || Object.keys(tree).length === 0) {
    return Node(value);
  }
  if (value < tree.root) tree.left = insert(value, tree.left);
  else if (value > tree.root) tree.right = insert(value, tree.right);
  return tree;
}

module.exports = { buildTree, insert };
