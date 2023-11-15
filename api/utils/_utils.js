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

module.exports = {
    sharedElements
};