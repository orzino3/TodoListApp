import { useState } from "react";
import "./styles/Task.css";

import database from './FirebaseDB';
import { ref, set } from 'firebase/database';
import {useNavigate} from "react-router-dom";
import Swal from 'sweetalert2';

export default function TaskForm() {
    const [taskName, setTaskName] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [taskBeforeDate, setTaskBeforeDate] = useState("");

    const navigate = useNavigate()
    const redirectToTaskPage = () => {navigate('/task')}

    const taskNameChangeHandler = (event) => {
        setTaskName(event.target.value);
    };

    const taskDescChangeHandler = (event) => {
        setTaskDesc(event.target.value);
    };

    const taskBeforeDateChangeHandler = (event) => {
        setTaskBeforeDate(event.target.value);
    };

    const taskFormSubmitHandler = (event) => {
        event.preventDefault();

        const task = {
            name: taskName,
            description: taskDesc,
            beforeDate: taskBeforeDate,
        }

        const uniqueKey = task.name;

        set(ref(database, 'tasks/' + uniqueKey), task)
            .then(() => {
                console.log("Data sent successfully!");
                Swal.fire({
                    title: 'Success!',
                    text: `Task: ${task.name} added successfully!`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            })
            .catch((error) => {
                console.error("Error sending data:", error);
                Swal.fire({
                    title: 'Error!',
                    text: `Failed to add task: ${task.name}. Please try again.`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });

        console.log(task);

        setTaskName("");
        setTaskDesc("");
        setTaskBeforeDate("");

        console.log("Task form submitted");
        console.log("Task Name:", taskName);
        console.log("Task Description:", taskDesc);
        console.log("Due Date:", taskBeforeDate);
    };

    return (
        <div className="task-form-container">
            <div className="task-form">
                <h1>Task Form</h1>
                <form onSubmit={taskFormSubmitHandler}>
                    <label className="task-name-label">Task Name</label>
                    <input
                        type="text"
                        className="task-name"
                        placeholder="Enter task name"
                        value={taskName}
                        onChange={taskNameChangeHandler}
                        required={true}
                    />
                    <label className="task-desc-label">Task Description</label>
                    <input
                        type="text"
                        className="task-desc"
                        placeholder="Enter task description"
                        value={taskDesc}
                        onChange={taskDescChangeHandler}
                        required={true}
                    />
                    <label className="task-date-label">Due Date</label>
                    <input
                        type="date"
                        className="task-date"
                        value={taskBeforeDate}
                        onChange={taskBeforeDateChangeHandler}
                        required={true}
                    />
                    <button type="submit" className="task-form-button">
                        Add Task
                    </button>
                </form>
            </div>

            <button className={"btn btn-danger redirect-to-taskpage"} onClick={redirectToTaskPage}>Go to Tasks Page</button>
        </div>
    );
}
