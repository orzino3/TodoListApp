import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import database from "../FirebaseDB";
import Item from "../Item";
import {useNavigate} from "react-router-dom";

export default function TaskPage() {
    const [tasks, setTasks] = useState([]);

    const navigate = useNavigate()
    const redirectToHomePage = () => {navigate('/')}

    const fetchTasks = async () => {
        try {
            const dbRef = ref(database, "tasks");
            const snapshot = await get(dbRef);

            if (snapshot.exists()) {
                const data = snapshot.val();
                const tasks = Object.values(data);
                setTasks(tasks);
                console.log("Data fetched successfully", tasks);
            } else {
                console.log("No data found");
            }
        } catch (error) {
            console.log("Error fetching data", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="task-page">
            {tasks.length === 0 && <h1>No tasks yet</h1>}
            <div className="task-page-content">
                {tasks.map((task, index) => (
                    <Item key={index} item={task} />
                ))}
            </div>

            <button onClick={redirectToHomePage}>Go Back</button>
        </div>
    );
}
