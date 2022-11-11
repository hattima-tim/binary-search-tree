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

test(' delete a node which has no child ', () => {
  expect(binaryTree.deleteNode(4)).toEqual({
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

test('deleteNode returns unchanged tree if node is not found', () => {
  expect(binaryTree.deleteNode('s')).toEqual({
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

test('delete node which has one child', () => {
  // create a new tree
  expect(binaryTree.buildTree([1, 2, 3, 4, 5])).toEqual({
    left: {
      left: null,
      right: {
        left: null,
        right: null,
        root: 2,
      },
      root: 1,
    },
    right: {
      left: null,
      right: {
        left: null,
        right: null,
        root: 5,
      },
      root: 4,
    },
    root: 3,
  });

  // delete a node with one child from the new tree
  expect(binaryTree.deleteNode(4)).toEqual({
    left: {
      left: null,
      right: {
        left: null,
        right: null,
        root: 2,
      },
      root: 1,
    },
    right: {
      left: null,
      right: null,
      root: 5,
    },
    root: 3,
  });
});
