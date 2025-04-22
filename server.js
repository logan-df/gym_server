const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");
const mongoose = require("mongoose");
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

    mongoose
    .connect("mongodb+srv://ldford711:6sdrsTeoX3cn0wlP@cluster-logan-df.eqj2ybp.mongodb.net/")
    .then(() => {
        console.log("connected to mongodb");
    })
    .catch((error) => {
    console.log("couldn't connect to mongodb", error);
    });

const workoutSchema = new mongoose.Schema({
    name:String,
    muscle:String,
    image:String
});

const Workout = mongoose.model("Workout", workoutSchema);

app.get("/api/workouts", async(req, res)=>{
    const workouts = await Workout.find();
    res.send(workouts);
});

app.post("/api/workouts", upload.single("img"), async(req,res)=>{
    const result = validateWorkout(req.body);


    if(result.error){
        console.log("I have an error");
        res.status(400).send(result.error.deatils[0].message);
        return;
    }

    const workout = new Workout ({
        name:req.body.name,
        muscle:req.body.muscle
    });

    if(req.file){
        workout.image = req.file.filename;
    }

    const newWorkout = await workout.save();
    res.status(200).send(newWorkout);
});

app.put("/api/workouts/:id", upload.single("img"), async(req,res)=>{

    const result = validateWorkout(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const fieldsToUpdate = {
        name:req.body.name,
        muscle:req.body.muscle
    }

    if(req.file){
        fieldsToUpdate.image = req.file.filename;
    }

    const wentThrough = await Workout.updateOne({_id:req.parans.id}, fieldsToUpdate)
    const workout = await Workout.findOne({_id:req.params.id});

    res.status(200).send(workout);
});

app.delete("/api/workouts/:id", async(req,res)=>{
    const workout = await Workout.findByIdAndDelete(req.params.id);
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