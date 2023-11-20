// a yser
const user = {
    id: 0,
    name: '',
    skills: [],
    interests: [],
    availability: [], // "hh:mm-hh:mm;hh:mm-hh:mm;hh:mm-hh:mm"
    relation: [], // the id of the students who the user wants to work with
};

// the user's preference in a group
const pref = {
    interest: 5,
    skill: 5
};

// gets a sample set of users
// return users: Map: the users with all information
export function sampleUsers() {
    var users = new Map();
    users.set(1, {
        "id": 1,
        "name": "Person 1",
        "skills": [
            "Springboot",
            "React.js",
            "AWS",
            "HTML",
            "CSS",
            "MongoDB",
            "Java",
            "Python",
            "C",
            "Github"
        ],
        "interests": [
            "video Games",
            "music",
            "esports"
        ],
        "availability": [
            ";08:00-9:00;10:00-13:00", "", "", "", "", "", ""
        ],
        "relation": [2]
    });
    users.set(2, {
        "id": 2,
        "name": "Person 2",
        "skills": [
            "Java",
            "Python",
            "C",
            "Jupyter Notebook",
            "PyTorch",
            "Scikit Learn",
            "Matlab",
            "Wolfram Mathematica",
            "design",
            "public speaking",
            "problem solving",
            "creativity",
            "teamwork"
        ],
        "interests": [
            "video Games",
            "monkeys",
            "crocheting",
            "food"
        ],
        "availability": [
            ";08:00-9:00;10:00-13:00", "", "", "", "", "", ""
        ],
        "relation": []
    });
    users.set(3, {
        "id": 3,
        "name": "Person 3",
        "skills": [
            "HTML",
            "CSS",
            "JavaScript",
            "Python",
            "Java",
            "Photoshop",
            "hardware",
            "graphic design"
        ],
        "interests": [
            "baking",
            "reading",
            "hiking",
            "fashion"
        ],
        "availability": [
            ";08:00-9:00;10:00-13:00", "", "", "", "", "", ""
        ],
        "relation": [2]
    });
    users.set(4, {
        "id": 4,
        "name": "Person 4",
        "skills": [
        ],
        "interests": [
            "basketball",
            "derivatives",
            "equity trading",
            "biking",
            "video games"
        ],
        "availability": [
            ";08:00-9:00;10:00-13:00", "", "", "", "", "", ""
        ],
        "relation": []
    });
    users.set(5, {
        "id": 5,
        "name": "Person 5",
        "skills": [
            "Java",
            "C",
            "Python",
            "R",
            "SQL"
        ],
        "interests": [
            "sports"
        ],
        "availability": [
            ";08:00-9:00;10:00-13:00", "", "", "", "", "", ""
        ],
        "relation": [1, 3]
    });
    return users;
}
