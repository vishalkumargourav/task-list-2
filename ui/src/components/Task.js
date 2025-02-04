import { Button, Checkbox, Typography } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { UpdateTaskForm } from "./UpdateTaskForm";
import classnames from "classnames";
import axios from "axios";
import { API_URL } from "../utils";

export const Task = ({ task, fetchTasks }) => {
  const { id, name, completed } = task;
  const [isCompleted, setIsCompleted] = useState(completed);
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);

  const handleUpdateTaskCompletion = async () => {
    try {
      await axios.put(API_URL, {
        id,
        name,
        completed: !isCompleted,
      });
      setIsCompleted((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await axios.delete(`${API_URL}/${task.id}`);

      await fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="task">
      <div
        className={classnames("flex", {
          done: isCompleted,
        })}
      >
        <Checkbox checked={isCompleted} onChange={handleUpdateTaskCompletion} />
        <Typography variant="h4">{name}</Typography>
      </div>
      <div className="taskButtons">
        <Button variant="contained" onClick={() => setIsDialogueOpen(true)}>
          <EditIcon />
        </Button>
        <Button color="error" variant="contained" onClick={handleDeleteTask}>
          <DeleteIcon />
        </Button>
      </div>
      <UpdateTaskForm
        fetchTasks={fetchTasks}
        isDialogueOpen={isDialogueOpen}
        setIsDialogueOpen={setIsDialogueOpen}
        task={task}
      />
    </div>
  );
};
