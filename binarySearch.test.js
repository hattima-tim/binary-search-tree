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

test('delete node which has two childs', () => {
  // we got a tree structure like this from previous test
  //  ???  ????????? 5
  // ?????????3
  //    ???   ????????? 2
  //    ????????? 1
  // now let's remove 3, which has two childs
  // after the removal we should get this tree
  // ?????????5
  //    ???   ????????? 2
  //    ????????? 1
  expect(binaryTree.deleteNode(3)).toEqual({
    left: {
      left: null,
      right: {
        left: null,
        right: null,
        root: 2,
      },
      root: 1,
    },
    right: null,
    root: 5,
  });
});

describe('levelOrder function', () => {
  test('returns an array with values in level order when no callback is provided', () => {
    // first create a new bst
    binaryTree.buildTree([1, 2, 3, 4, 5, 6]);
    expect(binaryTree.levelOrder()).toStrictEqual([3, 1, 5, 2, 4, 6]);
  });

  test('returns the return values of the callback function when it is provided', () => {
    expect(binaryTree.levelOrder((val) => val + 2)).toStrictEqual([5, 3, 7, 4, 6, 8]);
  });
})

test('find function', () => {
  // currently we have a tree like this (created in prev test)
  //  ???       ????????? 6 
  //  ???   ????????? 5 
  //  ???   ???   ????????? 4 
  //  ????????? 3 
  //      ???   ????????? 2 
  //      ????????? 1
  // so, given 5 as a value, find function should return a node with
  // 4 as a left value and 6 as a right value
  expect(binaryTree.find(5)).toStrictEqual({
    left: {
      left: null,
      right: null,
      root: 4
    },
    right: {
      left: null,
      right: null,
      root: 6
    },
    root: 5
  })
})

describe('depth first traversal', () => {
  describe('inorder function', () => {
    test('returns an array with values when no callback is provided', () => {
      expect(binaryTree.inorder()).toStrictEqual([1, 2, 3, 4, 5, 6])
    })
    test('returns the return value of callback func when it is provided', () => {
      expect(binaryTree.inorder(val => val + 2)).toStrictEqual([3, 4, 5, 6, 7, 8])
    })
  })

  describe('preorder function', () => {
    test('returns an array with values when no callback is provided', () => {
      expect(binaryTree.preorder()).toStrictEqual([3, 1, 2, 5, 4, 6])
    })
    test('returns the return value of callback func when it is provided', () => {
      expect(binaryTree.preorder(val => val + 2)).toStrictEqual([5, 3, 4, 7, 6, 8])
    })
  })

  describe('postorder function', () => {
    test('returns an array with values when no callback is provided', () => {
      expect(binaryTree.postorder()).toStrictEqual([2, 1, 4, 6, 5, 3])
    })
    test('returns the return value of callback func when it is provided', () => {
      expect(binaryTree.postorder(val => val + 2)).toStrictEqual([4, 3, 6, 8, 7, 5])
    })
  })
})

describe('height function', () => {
  // currently we have a tree like this (created in a prev test)
  //  ???       ????????? 6 
  //  ???   ????????? 5 
  //  ???   ???   ????????? 4 
  //  ????????? 3 
  //      ???   ????????? 2 
  //      ????????? 1

  test('height of 3 is 2', () => {
    expect(binaryTree.height(3)).toBe(2)
  })

  test('height of 5 is 1', () => {
    expect(binaryTree.height(5)).toBe(1)
  })

  test('height of 1 is 1', () => {
    expect(binaryTree.height(1)).toBe(1)
  })

  test('height of 2(a leaf node) is 0', () => {
    expect(binaryTree.height(2)).toBe(0)
  })

  test('height of 4 is 3', () => {
    // create a new tree
    binaryTree.buildTree([1, 2, 3, 4, 5, 6, 7, 8])
    // the tree should look like the following
    //  ???           ????????? 8
    //  ???       ????????? 7
    //  ???   ????????? 6
    //  ???   ???   ????????? 5
    //  ????????? 4
    //      ???   ????????? 3
    //      ????????? 2
    //          ????????? 1
    expect(binaryTree.height(4)).toBe(3)
  })
})

describe('depth function', () => {
  // we got the following tree from previous test
  //  ???           ????????? 8
  //  ???       ????????? 7
  //  ???   ????????? 6
  //  ???   ???   ????????? 5
  //  ????????? 4
  //      ???   ????????? 3
  //      ????????? 2
  //          ????????? 1
  test('depth of 8 is 3', () => {
    expect(binaryTree.depth(8)).toBe(3);
  })

  test('depth of 4 is 0', () => {
    expect(binaryTree.depth(4)).toBe(0);
  })
})

describe('isBalanced function', () => {
  test('returns true when the tree is balanced', () => {
    binaryTree.buildTree([1, 2, 3]);
    // ???   ????????? 3
    // ????????? 2
    //     ????????? 1
    expect(binaryTree.isBalanced()).toBe(true);
  })

  test('returns true when the height difference of left & right subtree is 1', () => {
    binaryTree.insert(4);
    // ???       ????????? 4
    // ???   ????????? 3
    // ????????? 2
    //     ????????? 1
    expect(binaryTree.isBalanced()).toBe(true);
  })

  test('returns false when the tree is unbalanced', () => {
    binaryTree.insert(5);
    binaryTree.insert(6);
    // ???               ????????? 6
    // ???           ????????? 5
    // ???       ????????? 4
    // ???   ????????? 3
    // ????????? 2
    //     ????????? 1
    expect(binaryTree.isBalanced()).toBe(false);
  })

  test('returns false when there is no right subtree but the left subtree has height of 1', () => {
    binaryTree.deleteNode(6);
    binaryTree.deleteNode(5);
    binaryTree.deleteNode(4);
    binaryTree.deleteNode(3);
    binaryTree.insert(0);
    // ????????? 2
    //     ????????? 1
    //         ????????? 0
    expect(binaryTree.isBalanced()).toBe(false);
  })

  test('returns true when the tree has no left or right subtree', () => {
    binaryTree.deleteNode(0);
    binaryTree.deleteNode(1);
    // ????????? 2
    expect(binaryTree.isBalanced()).toBe(true);
  })
  test('returns true when the tree is empty', () => {
    binaryTree.deleteNode(2);
    expect(binaryTree.isBalanced()).toBe(true);
  })
})

test('rebalance function rebalances an unbalanced tree', () => {
  binaryTree.insert(2);
  binaryTree.insert(1);
  binaryTree.insert(3);
  binaryTree.insert(4);
  binaryTree.insert(5);
  binaryTree.insert(6);
  // ???               ????????? 6
  // ???           ????????? 5
  // ???       ????????? 4
  // ???   ????????? 3
  // ????????? 2
  //     ????????? 1
  expect(binaryTree.isBalanced()).toBe(false);
  binaryTree.rebalance();
  expect(binaryTree.isBalanced()).toBe(true);
})
