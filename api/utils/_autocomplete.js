// the file
const file = `accents
accentuable
accentual
accentuality
accentually
accentuate
accentuated
accentuates
accentuating
accentuation
accentuator
accentus
accept
acceptability
acceptable
acceptableness
acceptably
acceptance
acceptances
acceptancy
acceptancies
acceptant
acceptation
acceptavit
accepted
acceptedly
acceptee
acceptees
accepter
accepters
acceptilate
acceptilated
acceptilating
C
C++
communication
Java
JavaScript`

// builds the dictionary
function build() {
    // get the dictionary
    var dict = getDict();

    // the top of the trie
    var top = {
        flag: false,
        child: new Map()
    };

    // loop through all words in the dictionary
    for (var idx in dict) {
        // insert the word into the dictionary
        var s = dict[idx];
        var tmp = top;
        for (var i = 0; i < s.length; i++) {
            if (!tmp.child.has(s[i]))
                tmp.child.set(s[i], {
                    flag: false,
                    child: new Map()
                })
            tmp = tmp.child.get(s[i]);
        }
        tmp.flag = true;
    }
    return top;
}

// gets the dictionary (in text format)
// return dict: array: the dictionary with each entry being a word
export function getDict() {
    var dict = file.split("\n");
    return dict;
}

// gets all possible words start with s in the dictionary dict
// param dict: array: the dictionary
// param s: string: the word that is entered
export function autocomplete(dict, s) {
    return findPrefix(dict, 0, s);
}

// finds the possible words based on the prefix (up to position i)
function findPrefix(dict, i, s) {
    // console.log("check prefix " + s);
    if (i == s.length) {
        // console.log("find all [" + s + "]");
        return findAll(dict, s);
    }
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
    if (dict.flag) {
        res.push(s);
        // console.log("push [" + s + "]");
    }
    for (var i = 32; i <= 127; i++) {
        var c = String.fromCharCode(i);
        if (dict.child.has(c)) {
            var next = s.concat(c);
            // console.log(s + " + " + c + " = " + next);
            res = res.concat(findAll(dict.child.get(c), next));
        }
    }
    return res;
}
