import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../Button";
import Todos from "./Todos";

const BASE_URL = "http://localhost:5000/todos";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", completed: false });
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  function handleInputChange(event) {
    setNewTask({ ...newTask, title: event.target.value });
  }

  async function addTask(e) {
    e.preventDefault();
    if (newTask.title.trim() !== "") {
      try {
        const res = await axios.post(`${BASE_URL}`, newTask);
        console.log("Add Task Response:", res);

        if (res.status === 200 || res.status === 201) {
          console.log("Task added successfully:", res.data);
          setTasks((prevTasks) => [res.data, ...prevTasks]);
          setNewTask({ title: "", completed: false });
        } else {
          console.error("Unexpected response:", res.status, res.data);
          throw new Error("An error has occurred");
        }
      } catch (error) {
        console.error("Add Task Error:", error);
        alert("Add task failed: " + error.message);
      }
    }
  }

  async function editTask(e, id, newTitle) {
    e.preventDefault();
    const updatedTask = { title: newTitle };

    try {
      const res = await axios.put(`${BASE_URL}/${id}`, updatedTask);
      console.log("Edit Task Response:", res);

      if (res.status === 200 && res.data) {
        console.log("Task edited successfully:", res.data);
        setTasks((oldTasks) =>
          oldTasks.map((task) =>
            task._id === id ? { ...task, title: newTitle } : task
          )
        );
        setEditTaskId(null);
        setEditTaskTitle("");
      } else {
        console.error("Unexpected response:", res.status, res.data);
        throw new Error("Failed to update task");
      }
    } catch (error) {
      console.error("Edit Task Error:", error);
      alert("Failed to update: " + error.message);
    }
  }

  async function deleteTask(id) {
    if (!id) return alert("id " + id);
    try {
      let res = await axios.delete(`${BASE_URL}/${id}`);
      console.log("Delete Task Response:", res);

      if (res.status === 200) {
        console.log("Task deleted successfully");
        const updatedTasks = tasks.filter((todo) => todo._id !== id);
        setTasks(updatedTasks);
      } else {
        console.error("Unexpected response:", res.status);
        throw Error("An error has occurred");
      }
    } catch (error) {
      console.error("Delete Task Error:", error);
      alert("Delete failed: " + error.message);
    }
  }

  async function handleToggleCompleted(index) {
    const task = tasks[index];
    const updatedTask = { ...task, completed: !task.completed };

    try {
      const res = await axios.put(`${BASE_URL}/${task._id}`, updatedTask);
      console.log("Toggle Completed Response:", res);

      if (res.status === 200 && res.data) {
        console.log("Task toggled successfully:", res.data);
        setTasks((oldTasks) => {
          const updatedTasks = [...oldTasks];
          updatedTasks[index] = updatedTask;
          return updatedTasks;
        });
      } else {
        console.error("Unexpected response:", res.status, res.data);
        throw new Error("Failed to mark task");
      }
    } catch (error) {
      console.error("Toggle Completed Error:", error);
      alert("Update failed: " + error.message);
    }
  }

  function fetchData() {
    axios.get(`${BASE_URL}`).then((res) => setTasks(res.data));
  }

  return (
    <div className="to-do-list mt-[100px] bg-slate-200 py-9 px-7 rounded-3xl ml-0">
      <h1 className="text-3xl font-bold mb-4">TO-DO LIST</h1>

      <div className="my-6">
        <input
          type="text"
          placeholder="Enter task here..."
          value={newTask.title}
          onChange={handleInputChange}
          className="border border-black p-2 rounded-lg"
        />
        <Button className="bg-green-600" onClick={addTask}>
          Add
        </Button>
      </div>

      <Todos
        tasks={tasks}
        handleToggleCompleted={handleToggleCompleted}
        deleteTask={deleteTask}
        setEditTaskId={setEditTaskId}
        setEditTaskTitle={setEditTaskTitle}
        editTaskId={editTaskId}
        editTaskTitle={editTaskTitle}
        editTask={editTask}
      />
    </div>
  );
}

export default ToDoList;
