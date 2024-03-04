import React, { useEffect } from 'react'
import { useState } from 'react'
const EditTask = ({task, index, taskList, setTaskList }) => {
    const [editModal, setEditModal] = useState(false);
    const [projectName, setProjectName] = useState(task.projectName);
    const [taskDescription, setTaskDescription] = useState(task.taskDescription);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setProjectName(task.projectName);
        setTaskDescription(task.taskDescription);

    }, [task]);
    useEffect(() => {
        if (!editModal) {
            setErrorMessage('');
        }
    }, [editModal]);
    const handleInput = e => {
        const {name, value} = e.target;
        if (name === 'projectName') setProjectName(value)
        if (name === 'taskDescription') setTaskDescription(value)
    }

    const handleUpdate = e => {
        e.preventDefault();
        if (projectName.trim() === '' || taskDescription.trim() === '') {
            setErrorMessage('Project name and task description cannot be empty when updating a task');
            return;
        }
        const updatedTaskList = [...taskList];
        updatedTaskList[index] = {projectName, taskDescription, timestamp: new Date().getTime()};
        setTaskList(updatedTaskList);
        localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
        setEditModal(false);
        setErrorMessage('');
    }

    const handleClose = () => {
        setEditModal(false);
        setErrorMessage('');
    }

  return (
    <>
    <button className='bg-gray-400 text-white text-sm-uppercase
        font-semibold py-1.5 px-3 rounded-lg' onClick={() => {
        setEditModal(true);
        setProjectName(task.projectName);
        setTaskDescription(task.taskDescription);
        }}>Edit</button>
    {editModal ? (
        <div className='flex items-center 
        justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100'>
            <div className='w-9/12 max-w-lg bg-white rounded-lg shadow-md relative flex flex-col'>
            <div className='flex flex-row justify-between p-5 border-b border-slate-200 rounded-t'>
            <h3 className='text-3xl font-semibold'>Edit Task</h3>
            <button className='px-1 text-gray-400 float-right text-3xl
            leading-none font-semibold block'
            onClick={handleClose}>
                X
            </button>
            </div>
            <form className='px-6 pt-6 pb-4'>
                <div>

                <label className='track-wide uppercase text-gray-700 text-xs
                font-semibold mb-2 block'
                htmlFor='project-name'>Project Name</label>
                <input className='w-full bg-gray-200 text-gray-700 border
                border-gray-200 rounded py-3 px-4 mb-5 leading-tight
                focus:outline-none focus:bg-white'
                   id='project-name'
                   name='projectName'
                   type='text'
                   placeholder='Project Name'
                   value={projectName}
                   onChange={handleInput}
                   required
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
                <div>
                    <label className='track-wide uppercase text-gray-700 text-xs
                font-semibold mb-2 block'
                htmlFor='project-name'>
                    Task description
                    </label>
                    <textarea 
                    className='w-full bg-gray-200 text-gray-700 border
                    border-gray-200 rounded py-3 px-4 mb-5 leading-tight
                    focus:outline-none focus:bg-white'
                    id='task-description'
                    name='taskDescription'
                    rows="5"
                    placeholder='Task description'
                    value={taskDescription}
                    onChange={handleInput}/>
                </div>
            </form>
            <div className='flex justify-end p-6 border-t border-slate-200 rounded-b'>
                <button
                className='bg-blue-500 text-white font-semibold
                uppercase text-sm px-6 py-3 rounded hover:opacity-70' onClick={handleUpdate}>Update Task</button>
            </div>
            </div>
        </div>

    ) : null}
    </>
  )
}

export default EditTask