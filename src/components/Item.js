import './styles/Item.css'
import { getDatabase, ref, remove } from "firebase/database";
import Swal from 'sweetalert2';


export default function Item(props) {

    const removeDoneTask = async (uniqueKey) => {
        const db = await getDatabase();
        const dbRef = ref(db, "tasks/" + uniqueKey);

        remove(dbRef)
            .then(() => {
                console.log("Task removed successfully");
                Swal.fire({
                    title: 'Success!',
                    text: `Task ${uniqueKey} set as Done successfully!`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            })
            .catch((error) => {
                console.log("Error removing task", error.message);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to remove task. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    }


    return (
        <div className={"reminder-item-container"}>
        <div className={"reminder-item-content"}>
            <h2 className={"item-desc"}>{props.item.name}</h2>
            <h4 className={"item-todo"}>{props.item.description}</h4>
            <p className={"item-before-date"}>{props.item.beforeDate}</p>
            <div className={"item-buttons"}>
                <button className={"item-button-done"} onClick={()=>removeDoneTask(props.item.name)}>Done</button>
            </div>
        </div>
        </div>
    )
}