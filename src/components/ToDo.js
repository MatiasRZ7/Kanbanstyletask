import React, { useEffect } from 'react'
import EditTask from './EditTask'
import { useState } from 'react'
import { useDrag } from 'react-dnd'

const ToDo = ({task, index, taskList, setTaskList }) => {
    const [time, setTime] = useState(JSON.parse(localStorage.getItem(`timer${index}`)) || 0);
    const [running, setRunning] = useState(false);
    const [{isDragging}, drag] = useDrag(() => ({
        type: "todo",
        item: {
            id: index,
            projectName: task.projectName,
            taskDescription: task.taskDescription,
            timestamp: task.timestamp,
            duration: task.duration
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })

    }));


    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime(prevTime => {
                    const newTime = prevTime + 10;
                    localStorage.setItem(`timer${index}`, JSON.stringify(newTime));
                    return newTime;
                });
            }, 10);
        }
    
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [running, index]);

    const deleteTask = (index) => {
        const newTaskList = [...taskList];
        newTaskList.splice(index, 1);
        setTaskList(newTaskList);
    }
  return (
    <div className='flex flex-col items-start justify-start bg-white my-4 ml-6 py-4 px-6 w-3/4
    max-w-lg' ref={drag}>
        <div className='w-full flex flex-row justify-between'>
           <p className='font-semibold text-xl'>{task.projectName}</p>
           <EditTask task={task} index={index} taskList={taskList} setTaskList={setTaskList} />
        </div>
        
        <p className='text-lg py-2'>{task.taskDescription}</p>
        <p className='text-lg py-2'>Created at: {new Date(task.timestamp).toLocaleString()}</p>
        <div className='w-full flex flex-col sm:flex-row items-center justify-center  sm:justify-evenly'>
            <div className='w-1/4 max-w-max text-xl font-semibold py-4'>
                <span>{("0" + Math.floor((time / 3600000) % 24)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
                <span className='text-sm'>{("0" + ((time / 10) % 100)).slice(-2)}</span>
            </div>
            <div className='flex flex-row justify-evenly gap-4'>
                {running ? (<button className='border rounded-lg py-1 px-3'
                 onClick={() => {setRunning(false)}}>
                    Stop
                </button>) : (<button className='border rounded-lg py-1 px-3' onClick={() => {setRunning(true)}}>Start</button>)}
                <button className='border rounded-lg py-1 px-3'
                onClick={() => {setTime(0)}}>Reset</button>
            </div>
        </div>
        <div className='w-full flex justify-center'>
        <button className='bg-red-500 text-white text-sm uppercase font-semibold
        py-1.5 px-3 mt-6 mb-1 rounded-lg' onClick={() => deleteTask(index)}>Delete</button>
        </div>
    </div>
  )
}

export default ToDo