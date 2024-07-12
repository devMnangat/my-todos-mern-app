import express, { Response, Request} from "express";
import mongoose from "mongoose";
// const cors = require("cors")
import cors from "cors"
const dotenv = require("dotenv")

// loading environment variables

dotenv.config();

// create react app
const app = express();
app.use(express.json());
app.use(cors());

// connecting to mongodb
mongoose.connect(process.env.MONGO_URI as string)
.then(() => console.log("connected to mongodb successfullly"))
.catch((error: any) => console.log(error))

const todoSchema = new mongoose.Schema({
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

app.get("/todos", async (req: Request,res: Response) => {
    try {
        const fetchTodos = await Todo.find()
        res.send(fetchTodos)
    } catch (error: any) {
        res.status(500).send(error.message)
    }
})

app.get("/todos/:id", async (req: Request,res: Response) => {
    try {
        const fetchTodos = await Todo.findById(req.params.id)
        res.send(fetchTodos)
    } catch (error: any) {
        res.status(500).send(error.message)
    }
})

// post route
app.post("/todos", async (req: Request,res: Response) => {
    try {
        const newTodo = new Todo(req.body)
        const savedTodo = await newTodo.save()
        res.send(savedTodo)
    } catch (error: any) {
        res.status(500).send(error.message)
    }
})

// post many
app.post("/todos/many", async (req: Request,res: Response) => {
    try {
        const savedTodos = await Todo.insertMany(req.body)
        // const savedTodo = await newTodo.save()
        res.send(savedTodos)
    } catch (error: any) {
        res.status(500).send(error.message)
    }
})

// put route

app.put("/todos/:id", async (req: Request,res: Response) => {
    try {
        
        const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body)
        res.send(updateTodo)
    } catch (error: any) {
        res.status(500).send(error.message)
    }
})

// delete route

app.delete("/todos/:id", async (req: Request,res: Response) => {
    try {
        
        const deleteTodo = await Todo.findByIdAndDelete(req.params.id)
        res.send(deleteTodo)
    } catch (error: any) {
        res.status(500).send(error.message)
    }
})
app.all("*" , (req: Request,res: Response) => res.status(404).send("invalid route"))

app.listen(process.env.PORT, () => console.log("app is running on port 5000"))