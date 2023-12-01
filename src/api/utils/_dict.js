const fs = require('fs');
const url = require('url');

const resourcePath = __dirname + "/../../../resources/"; // (absolute) path to the resources folder

// builds the dictionary using the list of words
function build(dict) {
    // the top of the trie
    var root = {
        freq: 0,
        child: new Map()
    };

    // loop through all words in the dictionary
    for (var s of dict) {
        // insert the word into the dictionary
        var tmp = root;
        for (var i = 0; i < s.str.length; i++) {
            // if the branch does not exist, create it
            if (!tmp.child.has(s.str[i]))
                tmp.child.set(s.str[i], {
                    freq: 0,
                    child: new Map()
                });
            // go to the child branch
            tmp = tmp.child.get(s.str[i]);
        }
        // after we reach the destination, set the frequency
        tmp.freq = s.freq;
    }

    // return the root of the dictionary
    return root;
}

// gets the dictionary
// return dict: array:string: the dictionary with each entry being a word
function getDict(path) {
    var dict = [];

    // get data from the file
    var data = fs.readFileSync(resourcePath + path + ".txt", "utf8");

    // read each line and store data
    var lines = data.toString().trim().split("\n");
    for (var line of lines) {
        var tokens = line.toString().trim().split(" ");
        dict.push({
            str: tokens[0], // the word
            freq: parseInt(tokens[1]) // the frequency 
        })
    }

    return build(dict);
}

// write the dictionary into the file
// param path: string: the (relative) path (under the resources folder) of the file
// param dict: Dict: the dictionary
function writeDict(path, dict) {
    fs.writeFileSync(resourcePath + path + ".txt", dtos(dict))
}

// prints the dictionary in text format
// param dict: Dict: the dictionary
// return str: string: the dictionary in text format 
function dtos(dict) {
    return ditos(dict, "");
}

// transfers the dictionary to text
// s records the current string
function ditos(dict, s) {
    var res = "";
    // if the current position is a word, add it to string (with its frequency)
    if (dict.freq) res += s + " " + dict.freq + "\n";

    // loop through all visible characters
    for (var i = 32; i <= 127; i++) {
        var c = String.fromCharCode(i);
        // if there is a corresponding branch
        if (dict.child.has(c)) {
            // go into the branch and get all words
            res += ditos(dict.child.get(c), s + c);
        }
    }
    return res;
}

module.exports = {
    getDict,
    writeDict,
    dtos
};