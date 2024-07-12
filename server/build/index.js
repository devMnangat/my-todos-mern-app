"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mongoose = require('mongoose');
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// loading environment variables
dotenv.config();
// create react app
const app = express();
app.use(express.json());
app.use(cors());
// connecting to mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("connected to mongodb successfullly"))
    .catch((error) => console.log(error));
const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
});
const Todo = mongoose.model("Todo", todoSchema);
// fetching route
app.get("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchTodos = yield Todo.find();
        res.send(fetchTodos);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
app.get("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchTodos = yield Todo.findById(req.params.id);
        res.send(fetchTodos);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// post route
app.post("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTodo = new Todo(req.body);
        const savedTodo = yield newTodo.save();
        res.send(savedTodo);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// post many
app.post("/todos/many", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savedTodos = yield Todo.insertMany(req.body);
        // const savedTodo = await newTodo.save()
        res.send(savedTodos);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// put route
app.put("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateTodo = yield Todo.findByIdAndUpdate(req.params.id, req.body);
        res.send(updateTodo);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// delete route
app.delete("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteTodo = yield Todo.findByIdAndDelete(req.params.id);
        res.send(deleteTodo);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
app.all("*", (req, res) => res.status(404).send("invalid route"));
app.listen(process.env.PORT, () => console.log("app is running on port 5000"));
