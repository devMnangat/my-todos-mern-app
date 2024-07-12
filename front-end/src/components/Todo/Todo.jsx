import React, { useState } from "react";
import Button from "../Button";
import { MdEditNote } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";

function ToDo({
  task,
  index,
  handleToggleCompleted,
  deleteTask,
  setEditTaskId,
  setEditTaskTitle,
  editTaskId,
  editTaskTitle,
  editTask
}) {
  const [localEditTaskTitle, setLocalEditTaskTitle] = useState(editTaskTitle);

  const handleEditTask = (e) => {
    e.preventDefault();
    editTask(e, task._id, localEditTaskTitle);
  };

  return (
    <li
      key={task._id}
      className="font-bold p-[15px] bg-slate-400 mb-[10px] rounded-[5px] flex items-center relative"
    >
      {editTaskId === task._id ? (
        <form
          onSubmit={handleEditTask}
          className="flex-1 absolute inset-0 z-10 bg-white p-4 rounded-lg shadow-lg"
        >
          <input
            type="text"
            value={localEditTaskTitle}
            onChange={(e) => setLocalEditTaskTitle(e.target.value)}
            className="border border-black p-2 rounded-lg w-full"
          />
          <Button className="bg-blue-600 mt-2" type="submit">
            Save
          </Button>
          <Button
            className="bg-gray-600 mt-2"
            onClick={() => {
              setEditTaskId(null);
              setEditTaskTitle("");
            }}
          >
            Cancel
          </Button>
        </form>
      ) : (
        <div className="flex-1" style={{ zIndex: editTaskId ? 0 : 1 }}>
          <span
            onClick={() => handleToggleCompleted(index)}
            className={`${task.completed ? "line-through" : ""} cursor-pointer`}
          >
            {task.title}
          </span>
        </div>
      )}
      <Button
        onClick={() => {
          setEditTaskId(task._id);
          setEditTaskTitle(task.title);
        }}
        className="bg-orange-600 ml-2"
      >
        <MdEditNote className="text-xl" />
      </Button>
      <Button onClick={() => deleteTask(task._id)} className="bg-red-600 ml-2">
        <AiTwotoneDelete className="text-xl" />
      </Button>
    </li>
  );
}

export default ToDo;
