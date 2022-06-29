import axios from "axios";
import ProfileForm from "../ProfileForm";
import { useState, useEffect } from "react";
import Task from "../Task";
import Date from "../Date";

export default function TasksPage({
  initialForm,
  tasks,
  setTasks,
  profiles,
  currentProfile,
}) {
  const [form, setForm] = useState({ completed: false, initialForm });
  const [msg, setMsg] = useState();
  const handleSubmit = (e, form, setForm) => {
    const token = localStorage.getItem("jwt");
    const options = {
      headers: {
        Authorization: token,
      },
    };
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api-v1/tasks`, form, options)
      .then((response) => {
        console.log(response.data.tasks);
        setTasks(response.data.tasks);
        setForm({ description: "", completed: false });
      })

      .catch(console.warn);
  };
  const msgArr = [
    "You Should Get These Done...",
    "You miss 100% of the shots you don't take -Michael Scott",
    "Stop Being Lazy",
    "That's a long list. It would be a shame if it kept growing.",
    "Just pick a task and do it already.",
    "You're mom would be ashamed if she saw this list.",
    "Don't be a Disappointment"
  ];

  useEffect(() => {
    setMsg(msgArr[Math.floor(Math.random() * msgArr.length)]);
  }, []);

  const phArr = [
    "Do the dishes",
    "Mow the lawn",
    "Pay rent",
    "Do the laundry",
    "Wash the car",
    "Get out of bed",
    "Go outside",
    "Touch grass",
    "Call your parents",
    "Quit your job",
    "Stop complaining",
    "Get a job",
    "Pay the bills",
    "Do your homework",
    "Walk your dishes",
    "Call your Grandmother",
    "Find a girlfriend",
  ];
  const phMsg = phArr[Math.floor(Math.random() * phArr.length)];

  const taskList = tasks.map((task, idx) => {
    return (
      <tr className="rounded-full border-white border-2 p-4 m-4">
        <Task
          key={`task${task._id}`}
          task={task}
          currentProfile={currentProfile}
          profiles={profiles}
          setTasks={setTasks}
        />
      </tr>
    )
  });

  return (
    <main>
      <div>
        <h1 className="pb-10 text-white text-center tracking-tight text-5xl self-center font-semibold dark:text-white pt-20">
          {msg}
        </h1>
        <h2>
          <Date />
        </h2>

        <form className="p-10" onSubmit={(e) => handleSubmit(e, form, setForm)}>
          <label
            className="text-white text-2xl font-semibold"
            htmlFor="description"
          >
            New Task:{" "}
          </label>
          <input
            className="m-2 rounded-full w-60 h-8 font-semibold shadow-lg shadow-indigo-500/40 text-blue-500"
            placeholder={phMsg}
            type="text"
            id="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <label htmlFor="completed"></label>
          <input
            type="hidden"
            id="completed"
            value={form.completed}
            onChange={(e) => setForm({ ...form, completed: e.target.value })}
          />
          <label htmlFor="account"></label>
          {/* <input type="hidden" id="account" value={account.name} /> */}
          <label htmlFor="profile"></label>
          <input
            type="hidden"
            id="profile"
            value={profiles.name}
            onChange={(e) => setForm({ ...form, profile: e.target.value })}
          />
          <button className="text-white relative" type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 absolute bottom-[-10px] over:-translate-y-1 hover:scale-110 transition duration-150 ease-in-out"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </form>
        <div className="text-white text-[20px] font-semibold p-8">
          <table class="table-auto mx-auto">
            <thead>
              <tr>
                <th className="w-[300px] text-3xl pb-6">Complete</th>
                <th className="w-[300px] text-3xl pb-6">Task</th>
                <th className="w-[300px] text-3xl pb-6">Delete</th>
              </tr>
            </thead>
            <tbody className="mx-auto">{taskList}</tbody>
          </table>
        </div>
      </div>
      <h3 className="text-white tracking-tight text-4xl self-center font-semibold dark:text-white p-8 flex justify-end"></h3>
    </main>
  )
}
