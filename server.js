const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.get("/",(req, res)=>{
    res.sendFile(_dirname+"/index.html");
});

let workouts = [
    {
        "id": "1",
        "name": "Bench Press",
        "image": "bench.jpg",
        "compound": "True",
        "muscle": "chest",
        "sets": "3",
        "reps": "6-8"
    },
    {
        "id": "2",
        "name": "Incline Bench Press",
        "image": "inclinebench.jpg",
        "compound": "True",
        "muscle": "chest",
        "sets": "3",
        "reps": "6-8"
    },
    {
        "id": "3",
        "name": "Chest Fly",
        "image": "chestfly.jpg",
        "compound": "True",
        "muscle": "chest",
        "sets": "3",
        "reps": "8-10"
    },
    {
        "id": "4",
        "name": "Shoulder Press",
        "image": "overheadpress.jpg",
        "compound": "True",
        "muscle": "chest",
        "sets": "3",
        "reps": "6-8"
    },
    {
        "id": "5",
        "name": "Cable Row",
        "image": "cablerow.jpg",
        "compound": "True",
        "muscle": "back",
        "sets": "3",
        "reps": "8-10"
    },
    {
        "id": "6",
        "name": "Pull-Up",
        "image": "pullup.jpg",
        "compound": "True",
        "muscle": "back",
        "sets": "4",
        "reps": "10-12"
    },
    {
        "id": "7",
        "name": "Reverse Fly",
        "image": "reversefly.jpg",
        "compound": "False",
        "muscle": "back",
        "sets": "4",
        "reps": "10-12"
    },
    {
        "id": "8",
        "name": "Face Pull",
        "image": "facepull.jpg",
        "compound": "True",
        "muscle": "back",
        "sets": "4",
        "reps": "8-10"
    },
    {
        "id": "9",
        "name": "Squat",
        "image": "squat.jpg",
        "compound": "True",
        "muscle": "legs",
        "sets": "3",
        "reps": "6-8"
    },
    {
        "id": "10",
        "name": "Deadlift",
        "image": "deadlift.jpg",
        "compound": "True",
        "muscle": "legs",
        "sets": "2",
        "reps": "4-6"
    },
    {
        "id": "11",
        "name": "RDL",
        "image": "RDL.jpg",
        "compound": "True",
        "muscle": "legs",
        "sets": "3",
        "reps": "8-10"
    },
    {
        "id": "12",
        "name": "Leg Press",
        "image": "legpress.jpg",
        "compound": "True",
        "muscle": "legs",
        "sets": "3",
        "reps": "6-8"
    }
];

app.get("/api/workouts", (req, res)=>{
    res.send(workouts);
});

app.listen(3001, ()=>{
    console.log("I'm listening");
});