const binaryTree = require('./binarySearchTree');

test('buildTree creates a balanced BST', () => {
  expect(binaryTree.buildTree([1, 2, 3])).toEqual({
    left: {
      left: null,
      right: null,
      root: 1,
    },
    right: {
      left: null,
      right: null,
      root: 3,
    },
    root: 2,
  });
});

test('no duplicates in the tree', () => {
  expect(binaryTree.buildTree([1, 1, 2, 2, 3])).toEqual({
    left: {
      left: null,
      right: null,
      root: 1,
    },
    right: {
      left: null,
      right: null,
      root: 3,
    },
    root: 2,
  });
});

test('insert 4 to the tree created in previous test', () => {
  expect(binaryTree.insert(4)).toEqual({
    left: {
      left: null,
      right: null,
      root: 1,
    },
    right: {
      left: null,
      right: {
        left: null,
        right: null,
        root: 4,
      },
      root: 3,
    },
    root: 2,
  });
});
