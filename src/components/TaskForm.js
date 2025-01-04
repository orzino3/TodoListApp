import { useState } from "react";
import "./styles/Task.css";

import database from './FirebaseDB';
import { ref, set } from 'firebase/database';
import {useNavigate} from "react-router-dom";

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

        // שליחת הנתונים
        set(ref(database, 'tasks/' + uniqueKey), task)
            .then(() => {
                console.log("Data sent successfully!");
            })
            .catch((error) => {
                console.error("Error sending data:", error);
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
                    />
                    <label className="task-desc-label">Task Description</label>
                    <input
                        type="text"
                        className="task-desc"
                        placeholder="Enter task description"
                        value={taskDesc}
                        onChange={taskDescChangeHandler}
                    />
                    <label className="task-date-label">Need to be done before:</label>
                    <input
                        type="date"
                        className="task-date"
                        value={taskBeforeDate}
                        onChange={taskBeforeDateChangeHandler}
                    />
                    <button type="submit" className="task-form-button">
                        Add Task
                    </button>
                </form>
            </div>

            <button className={"btn btn-danger redirect-to-taskpage"} onClick={redirectToTaskPage}>Go to Task</button>


        </div>
    );
}
