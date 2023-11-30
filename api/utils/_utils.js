// gets all shared elements in two lists
// param arrA: array: list A
// param arrB: array: list B
// return filteredArray: array: the list of shared elements
function sharedElements(arrA, arrB) {
    var filteredArray = arrA.filter(function (n) {
        return arrB.indexOf(n) !== -1;
    });
    return filteredArray;
}

function arrayEqual(arrA, arrB) {
    if (arrA.length != arrB.length)
        return 0;
    for (var i in arrA)
        if (arrA[i] != arrB[i])
            return 0;
    return 1;
}

module.exports = {
    sharedElements,
    arrayEqual
};
