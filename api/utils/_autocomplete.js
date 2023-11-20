// gets all possible words start with s in the dictionary dict
// param dict: Dict: the dictionary
// param s: string: the word that is entered
// return res: array:string: all words in dict that start with s
function autocomplete(dict, s) {
    var words = findPrefix(dict, 0, s);

    // sort the words based on the frequency
    // frequently used words come first
    // word is a list of objects
    words.sort(function (a, b) {
        return parseInt(b.freq) - parseInt(a.freq);
    });

    // put the strings into an array
    var res = [];
    for (var elem of words)
        res.push(elem.str);

    return res;
}

// finds the possible words based on the prefix (up to position i)
function findPrefix(dict, i, s) {
    // console.log("check prefix " + s);
    if (i == s.length) {
        // console.log("find all [" + s + "]");
        return findAll(dict, s);
    }

    // combine and return the results 
    // check both upper case and lower case
    var res = [];
    if (dict.child.has(s[i].toUpperCase()))
        res = res.concat(findPrefix(dict.child.get(s[i].toUpperCase()), i + 1, s.substring(0, i) + s[i].toUpperCase() + s.substring(i + 1)));
    if (dict.child.has(s[i].toLowerCase()))
        res = res.concat(findPrefix(dict.child.get(s[i].toLowerCase()), i + 1, s.substring(0, i) + s[i].toLowerCase() + s.substring(i + 1)));
    return res;
}

// finds all words inside the dictionary
function findAll(dict, s) {
    var res = [];

    // if this is a word, put it into dictionary
    if (dict.freq) {
        res.push({
            str: s,
            freq: dict.freq
        });
    }

    // go through all branches and find possible words
    for (var i = 32; i <= 127; i++) {
        var c = String.fromCharCode(i);
        if (dict.child.has(c))
            res = res.concat(findAll(dict.child.get(c), s + c));
    }
    return res;
}

module.exports = {
    autocomplete
};
