// select the word in the dictionary and increase the frequency
// param dict: Dict: the dictionary
// param s: string: the word chosen
// the method returns nothing because it edits dict in the parameter
export function select(dict, s) {
    // start from the root
    var tmp = dict;
    // go to the position of the word
    for (var i = 0; i < s.length; i++) {
        if (!tmp.child.has(s[i]))
            tmp.child.set(s[i], {
                freq: 0,
                child: new Map()
            })
        tmp = tmp.child.get(s[i]);
    }
    // increase the frequency by 1
    tmp.freq = tmp.freq + 1;
}