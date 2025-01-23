function node(data){
    let left = null;
    let right = null;

    return{data, left, right}
}

function tree(arr){
    let sortedArray = arr.sort((a, b) => a - b);
    return root = buildTree(sortedArray);
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

    if(root === null)
        return node(root);
    

    if(root.data === key){
        console.log('asd')
        return root
    }
    

    if(key < root.data)
        root.left = insert(root.left, key)
    
    else if(key > root.data)
        root.right = insert(root.right, key)

    return root;
}

let a = [1, 7, 4, 23, 9]

console.log(tree(a))

console.log(insert(tree(a), '123'))
console.log(insert(tree(a), '1'))
