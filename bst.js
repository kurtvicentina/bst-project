function node(data){
    let left = null;
    let right = null;

    return{data, left, right}
}

function tree(arr){
    let sortedArray = arr.sort((a, b) => a - b);
    return buildTree(sortedArray);
}

function buildTree(sortedArr, start = 0, end = sortedArr.length - 1){
    if(start > end) return null;
    let root;

    let mid = start + Math.floor((end - start) / 2);

    root = node(sortedArr[mid]);

    root.left = buildTree(sortedArr, start, mid - 1);
    root.right = buildTree(sortedArr, mid + 1, end);

    return root
}

function insert(root, key){
    if(root === null){
        return node(key);
    }
    
    if(root.data === key){
        return root;
    }

    if(key < root.data){
        root.left = insert(root.left, key);
    }

    if(key > root.data){
        root.right = insert(root.right, key);
    }

    return root;
}

function getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
        curr = curr.left;
    }
    return curr;
}

function deleteNode(root, key){

    if(root === null){
        return root;
    }

    if(root.data > key){
        root.left = deleteNode(root.left, key);
    } else if(root.data < key){
        root.right = deleteNode(root.right, key);
    }
    else{

        if(root.left === null){
            return root.right;
        }

        if(root.right === null){
            return root.left;
        }


        let successor = getSuccessor(root);
        root.key = successor.key;
        root.right = deleteNode(root.right, successor.key)
    }

    return root;
}

function find(root, key){
    try{

    while(root !== null){
        if( root.data === key ){
            return root;
        }

        if( key < root.data ){
            root = root.left
        }

        if( key > root.data){
            root = root.right
        }
    }
}
catch{
    console.log('Key was not in the tree!')
}
}


function levelOrder(root) {
    if (root === null || root === undefined){
        throw new Error('No callback provided!');
    }

    let queue = [];
    let treeNodes = [];
    queue.push(root);

    while (queue.length > 0) {
        let curr = queue.shift();

        console.log(curr.data);
        treeNodes.push(curr.data)

        if (curr.left !== null) queue.push(curr.left);
        if (curr.right !== null) queue.push(curr.right);
    }
    return treeNodes;
}

function preOrder(root) {
    if (root === null) {
        throw new Error("Tree is null. Cannot perform pre-order traversal.");
    }
    
    console.log(root.data);

    if (root.left !== null) {
        preOrder(root.left);
    }
    if (root.right !== null) {
        preOrder(root.right);
    }
}


function inOrder(root){
    if(root === null){
        throw new Error('Tree is null. Cannot perform in-order traversal.');
    }


    if(root.left !== null){
        inOrder(root.left);
    }

    console.log(root.data);

    if(root.right !== null){
        inOrder(root.right);
    }
}

function postOrder(root){
    if(root === null){
        throw new Error('Tree is null. Cannot perform post-order traversal.');
    }

    if(root.left !== null){
        postOrder(root.left);
    }

    if(root.right !== null){
        postOrder(root.right);
    };

    console.log(root.data);
}

function height(node){
    if(node === null){
        return -1;
    }

    let leftCounter = height(node.left);
    let rightCounter = height(node.right);

    return Math.max(leftCounter, rightCounter) + 1;
}

function findHeight(tree, node){
    let nodeToFind = find(tree, node)
    console.log(nodeToFind.data)

    if(nodeToFind !== null){
        return height(nodeToFind) 
    }
}

function depth(tree, nodeValue) {
    let nodeDepth = 0;

    while (tree !== null) {
        if (tree.data === nodeValue) {
            return nodeDepth;
        }

        if (nodeValue < tree.data) {
            tree = tree.left;
        } else {
            tree = tree.right;
        }

        nodeDepth++;
    }

    return -1;
}


function isBalanced(root){
    if(!root) return true;

    let result = true;

    function dfs(node){
        if(!node) {
            return 0;
        }

        let left = dfs(node.left);
        let right = dfs(node.right)
    
    
        if(left - right > 1){
            result = false;
        } 
    
        return Math.max(left, right) + 1;
    }

    dfs(root);
    return result 
}


function rebalance(root){
    let nodes = levelOrder(root);
    console.log(nodes)

    let balancedTree = tree(nodes);

    return balancedTree;
}



let a = [7, 4, 23, 9];
let testTree = tree(a);
let b = null

console.log("Before Insert:");
console.log((testTree));

// Insert new keys

testTree = insert(testTree, 777);
testTree = insert(testTree, 7453);
testTree = insert(testTree, 982);
testTree = insert(testTree, 182);
testTree = insert(testTree, 900);
testTree = insert(testTree, 1234);
testTree = deleteNode(testTree, 4);

console.log("After Insert:");
console.log(JSON.stringify((testTree)));

console.log('Find height result --- ' + (findHeight(testTree, 7)))
console.log('Find depth result --- ' + (depth(testTree, 9)))
console.log('Find result --- ' + JSON.stringify((find(testTree, 7))))

console.log('levelorder---')
levelOrder(testTree)
console.log('preorder---')
preOrder(testTree)
console.log('inorder---')
inOrder(testTree)
console.log('postorder---')
postOrder(testTree)



console.log(height(testTree, 7))
console.log('DEPTH')
console.log(depth(testTree, 878787))
console.log('isBalanced -----')
console.log(isBalanced(testTree))

testTree = rebalance(testTree)
console.log('new balanced tree -----')
console.log(testTree)

console.log('isBalanced -----')
console.log(isBalanced(testTree))


console.log('levelorder---')
levelOrder(testTree)
console.log('preorder---')
preOrder(testTree)
console.log('inorder---')
inOrder(testTree)
console.log('postorder---')
postOrder(testTree)