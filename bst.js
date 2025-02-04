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
    let keyToFind = null;
    let curr = root

    while(curr.data !== key){
        if( key < curr.data ){
            curr = curr.left

        }

        if( key > curr.data ){
            curr = curr.right

        }

        if( key === curr.data){
            return curr
        }

        return curr;
    }
    return curr
}


let a = [7, 4, 23, 9];
let testTree = tree(a);

console.log("Before Insert:");
console.log((testTree));

// Insert new keys
testTree = insert(testTree, 24);
testTree = insert(testTree, 1);
testTree = insert(testTree, 2);
testTree = insert(testTree, 124);
// testTree = deleteNode(testTree, 1);

console.log("After Insert:");
console.log((testTree));

console.log('Found! ' + JSON.stringify(find(testTree, 1)))

