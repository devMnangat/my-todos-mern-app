const mongoose = require('mongoose')
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

// loading environment variables

dotenv.config();

// create react app
const app = express();
app.use(express.json());
app.use(cors());

// connecting to mongodb
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("connected to mongodb successfullly"))
.catch((error) => console.log(error))

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    completed: {
        type: Boolean,
        required: true
    }
    
})

const Todo = mongoose.model("Todo", todoSchema)

// fetching route

app.get("/todos", async (req,res) => {
    try {
        const fetchTodos = await Todo.find()
        res.send(fetchTodos)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get("/todos/:id", async (req,res) => {
    try {
        const fetchTodos = await Todo.findById(req.params.id)
        res.send(fetchTodos)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// post route
app.post("/todos", async (req,res) => {
    try {
        const newTodo = new Todo(req.body)
        const savedTodo = await newTodo.save()
        res.send(savedTodo)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// post many
app.post("/todos/many", async (req,res) => {
    try {
        const savedTodos = await Todo.insertMany(req.body)
        // const savedTodo = await newTodo.save()
        res.send(savedTodos)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// put route

app.put("/todos/:id", async (req,res) => {
    try {
        
        const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body)
        res.send(updateTodo)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// delete route

app.delete("/todos/:id", async (req,res) => {
    try {
        
        const deleteTodo = await Todo.findByIdAndDelete(req.params.id)
        res.send(deleteTodo)
    } catch (error) {
        res.status(500).send(error.message)
    }
})
app.all("*" , (req,res) => res.status(404).send("invalid route"))

app.listen(process.env.PORT, () => console.log("app is running on port 5000"))