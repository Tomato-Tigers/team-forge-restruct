
const { autocomplete } = require("./_autocomplete.js");
const { dtos, getDict } = require("./_dict.js");
const { select } = require("./_select.js");

function testSelect() {
    var dict = getDict("skills");
    console.log("Dictionary: \n" + dtos(dict));
    console.log("autocomplete j: " + autocomplete(dict, "j"));
    console.log("select JavaScript");
    select(dict, "JavaScript");
    console.log("autocomplete j: " + autocomplete(dict, "j"));
    console.log("select Java");
    select(dict, "Java");
    console.log("autocomplete j: " + autocomplete(dict, "j"));
    console.log("\nDictionary: \n" + dtos(dict));
}

// test the functions
testSelect();