import React from "react";
import ToDo from "./Todo";

function Todos({
  tasks,
  handleToggleCompleted,
  deleteTask,
  setEditTaskId,
  setEditTaskTitle,
  editTaskId,
  editTaskTitle,
  editTask,
}) {
  return (
    <ol className="list-decimal">
      {tasks.map((task, index) => (
        <ToDo
          key={task._id}
          task={task}
          index={index}
          handleToggleCompleted={handleToggleCompleted}
          deleteTask={deleteTask}
          setEditTaskId={setEditTaskId}
          setEditTaskTitle={setEditTaskTitle}
          editTaskId={editTaskId}
          editTaskTitle={editTaskTitle}
          editTask={editTask}
        />
      ))}
    </ol>
  );
}

export default Todos;
