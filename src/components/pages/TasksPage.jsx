import axios from "axios";
import ProfileForm from "../ProfileForm";

export default function TasksPage(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api-v1/tasks/`)
      .then((response) => {
        console.log(response.data);
        props.setTasks(response.data);
      })
      .catch(console.warn);
  };
  const taskList = props.tasks.map((task, idx) => {
    return (
      <ul>
        <li key={`task ${idx}`}>
          {task.description} <button>Complete</button>
        </li>
      </ul>
    );
  });
  return (
    <div>
      <h1 className="text-6xl">Task Page</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="taskdesc">Task Description: </label>
        <input type="text" id="taskdesc" />
        <label htmlFor="completed"></label>
        <input type="hidden" id="completed" value={false} />
        <label htmlFor="account"></label>
        {/* <input type="hidden" id="account" value={account.name} /> */}
        <label htmlFor="profile"></label>
        <input type="hidden" id="profile" value={props.profiles.name} />
        <button type="submit">Add Task</button>
      </form>
      {taskList}
    </div>
  );
}
