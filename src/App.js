import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import ToDo from "./components/ToDo";
import { useDrop } from "react-dnd";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [completed, setCompleted] = useState([]);
  useEffect(() => {
    let array = localStorage.getItem("taskList");
    if (array) {
      setTaskList(JSON.parse(array));
    }
  }, []);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item) => addtoCompleted(item.id, item.projectName, item.taskDescription,
       item.timestamp, item.duration),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    })
}));

const addtoCompleted = (id, projectName, taskDescription, timestamp, duration) => {
const moveTask = taskList.filter((task) => id === task.id);
setCompleted((completed) => [...completed, {moveTask, projectName, taskDescription,
   timestamp, duration}]);
}

const deleteCompletedTask = (index) => {
  const newCompletedList = [...completed];
  newCompletedList.splice(index, 1);
  setCompleted(newCompletedList);
}


  return (
    <>
       <h1 className="text-2xl font-bold py-6 pl-6">
      The task Tracker
    </h1>
    <p className="text-xl pl-6">
      Hi there
    </p>
    <div className="flex flex-row items-center">
    <p className="text-xl pl-6">
      Click
    </p>
    <AddTask taskList={taskList} setTaskList={setTaskList} />
    <p className="text-xl my-2">to add a new task</p>
    </div>

    <div className="flex flex-row ">

    
    <div className="w-full">
    <h2 className="ml-6 text-xl font-semibold w-3/4 max-w-lg my-4
    py-2 px-4 bg-gray-300">To Do:</h2>
    <div className="ml-6 flex flex-col-reverse">
    {taskList.map((task, index) => 
      
      <ToDo key={index} task={task} index={index} taskList={taskList} setTaskList={setTaskList}/>
      
    )}
    </div>
    </div>
    <div className="w-full flex flex-col" ref={drop}>
      <h2 className="text-xl font-semibold w-3/4 max-w-lg my-4
    py-2 px-4 bg-gray-300">Completed:</h2>
    {completed.map((task, index) => 
      
      <ToDo key={index} task={task} index={index} taskList={completed} setTaskList={setCompleted} deleteTask={deleteCompletedTask}/>
      
    )}
      </div>
    </div>
</>
  );
}

export default App;
