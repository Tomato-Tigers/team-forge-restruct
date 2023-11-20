import { getDict, autocomplete } from "./autocomplete";

// prints the dictionary
function testDict() {
    console.log("Dictionary(txt): \n" + getDict() + "\n");
}

// tests autocomplete on several words
function testAutocomplete() {
    var dict = build();
    console.log("test autocomplete on C: " + autocomplete(dict, "C") + "\n");
    console.log("test autocomplete on c: " + autocomplete(dict, "c") + "\n");
    console.log("test autocomplete on Java: " + autocomplete(dict, "Java") + "\n");
    console.log("test autocomplete on jAvA: " + autocomplete(dict, "jAvA") + "\n");
}

// test the functions
testDict();
testAutocomplete();
