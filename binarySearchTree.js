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

  return { buildTree, insert };
}

module.exports = Tree();
