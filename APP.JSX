import { useState } from "react";
import "./style.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Study JavaScript", completed: false },
    { id: 2, title: "Practice React", completed: true },
  ]);

  const [newTask, setNewTask] = useState("");

  function addTask() {
    if (newTask.trim() === "") return;

    const task = {
      id: Date.now(),
      title: newTask,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <div className="app">

      <header className="navbar">
        <h1>StudyFlow</h1>
        <span>Student Productivity Dashboard</span>
      </header>

      <main>

        <section className="stats">

          <div className="card">
            <h3>Total Tasks</h3>
            <p>{tasks.length}</p>
          </div>

          <div className="card">
            <h3>Completed</h3>
            <p>{completedTasks}</p>
          </div>

          <div className="card">
            <h3>Progress</h3>
            <p>
              {tasks.length === 0
                ? 0
                : Math.round(
                    (completedTasks / tasks.length) * 100
                  )}
              %
            </p>
          </div>

        </section>

        <section className="task-section">

          <h2>My Tasks</h2>

          <div className="task-input">

            <input
              type="text"
              placeholder="Enter a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTask();
              }}
            />

            <button onClick={addTask}>
              Add Task
            </button>

          </div>

          <div className="tasks">

            {tasks.map((task) => (

              <div className="task" key={task.id}>

                <div
                  className={
                    task.completed
                      ? "task-title completed"
                      : "task-title"
                  }
                  onClick={() => toggleTask(task.id)}
                >
                  {task.title}
                </div>

                <button
                  className="delete"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

export default App;