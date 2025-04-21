const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.get("/",(req, res)=>{
    res.sendFile(_dirname+"/index.html");
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

app.get("/",(req, res)=>{
    res.sendFile(__dirname+"/index.html");
});

let workouts = [
    {
        "_id": "1",
        "name": "Bench Press",
        "image": "bench.jpg",
        "compound": "True",
        "muscle": "chest",
        "sets": "3",
        "reps": "6-8"
    },
    {
        "_id": "2",
        "name": "Incline Bench Press",
        "image": "inclinebench.jpg",
        "compound": "True",
        "muscle": "chest",
        "sets": "3",
        "reps": "6-8"
    },
    {
        "_id": "3",
        "name": "Chest Fly",
        "image": "chestfly.jpg",
        "compound": "True",
        "muscle": "chest",
        "sets": "3",
        "reps": "8-10"
    },
    {
        "_id": "4",
        "name": "Shoulder Press",
        "image": "overheadpress.jpg",
        "compound": "True",
        "muscle": "chest",
        "sets": "3",
        "reps": "6-8"
    },
    {
        "_id": "5",
        "name": "Cable Row",
        "image": "cablerow.jpg",
        "compound": "True",
        "muscle": "back",
        "sets": "3",
        "reps": "8-10"
    },
    {
        "_id": "6",
        "name": "Pull-Up",
        "image": "pullup.jpg",
        "compound": "True",
        "muscle": "back",
        "sets": "4",
        "reps": "10-12"
    },
    {
        "_id": "7",
        "name": "Reverse Fly",
        "image": "reversefly.jpg",
        "compound": "False",
        "muscle": "back",
        "sets": "4",
        "reps": "10-12"
    },
    {
        "_id": "8",
        "name": "Face Pull",
        "image": "facepull.jpg",
        "compound": "True",
        "muscle": "back",
        "sets": "4",
        "reps": "8-10"
    },
    {
        "_id": "9",
        "name": "Squat",
        "image": "squat.jpg",
        "compound": "True",
        "muscle": "legs",
        "sets": "3",
        "reps": "6-8"
    },
    {
        "_id": "10",
        "name": "Deadlift",
        "image": "deadlift.jpg",
        "compound": "True",
        "muscle": "legs",
        "sets": "2",
        "reps": "4-6"
    },
    {
        "_id": "11",
        "name": "RDL",
        "image": "RDL.jpg",
        "compound": "True",
        "muscle": "legs",
        "sets": "3",
        "reps": "8-10"
    },
    {
        "_id": "12",
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

app.post("/api/workouts", upload.single("img"), (req,res)=>{
    const result = validateWorkout(req.body);


    if(result.error){
        console.log("I have an error");
        res.status(400).send(result.error.deatils[0].message);
        return;
    }

    const workout = {
        _id: workouts.length,
        name:req.body.name,
        muscle:req.body.muscle,
    };

    if(req.file){
        workout.image = req.file.filename;
    }

    workouts.push(workout);
    res.status(200).send(workout);
});

app.put("/api/workouts/:id", upload.single("img"),(req,res)=>{
    const workout = workouts.find((workout)=>workout._id===parseInt(req.params.id));

    if(!workout){
        res.status(404).send("The workout with the provided id was not found");
        return;
    }

    const result = validateWorkout(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    workout.name = req.body.name;
    workout.muscle = req.body.muscle;

    if(req.file){
        workout.image = req.file.filename;
    }

    res.status(200).send(workout);
});

app.delete("/api/workouts/:id",(req,res)=>{
    console.log("I'm trying to delete" + req.params.id);
    const workout = workouts.find((workout)=>workout._id===parseInt(req.params.id));

    if(!workout){
        console.log("Oh no i wasn't found");
        res.status(404).send("The workout with the provided id was not found");
        return;
    }
    console.log("YAY You found me");
    console.log("The workout you are deleting is " + workout.name);
    const index = workout.indexOf(workout);
    workouts.splice(index,1);
    res.status(200).send(workout);
});

const validateWorkout = (workout) => {
    const schema = Joi.object({
        _id:Joi.allow(""),
        name:Joi.string().min(2).required(),
        muscle:Joi.string().min(2).required(),
    });

    return schema.validate(workout);
};

app.listen(3001, ()=>{
    console.log("I'm listening");
});