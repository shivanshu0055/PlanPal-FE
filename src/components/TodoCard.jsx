import axios from 'axios';
import React from 'react'
import { MdOutlineDateRange } from "react-icons/md";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { allTodos, filteredTodos } from '../atoms';
import { MdOutlineDone } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";

const colorMapping={
  High:"text-red-400",
  Low:"text-green-400",
  Mid:"text-blue-400"
}

const TodoCard = ({objectId, text, urgency, dueDate, doneOrNot}) => {
  const [allTodo,setAllTodo]=useRecoilState(allTodos(localStorage.getItem("token")))
  
  async function markAsDone(){
    try{
      const res=await axios.post("http://localhost:3000/user/editTodo",{
      doneOrNot:!doneOrNot,
      todoId:objectId
    },{
      headers:{
        token:localStorage.getItem("token")
      }
    })
    
    setAllTodo((todos) =>
      todos.map((todo) =>
        todo._id === objectId ? { ...todo, doneOrNot: !todo.doneOrNot } : todo
      )
    );
  }
  catch(error){
    console.log(error);
  }
  }
  
  async function removeTodo(){
    try{
      const res=await axios.post("http://localhost:3000/user/delTodo",{
        todoId:objectId
      },{
        headers:{
          token:localStorage.getItem("token")
        }
      })
      setAllTodo(allTodo.filter((todo)=>todo._id!=objectId))
    }
    catch(error){
      console.log(error);
    }
  }

  function getFormattedDate(){
    const dueDateParts=dueDate.split("-")
    return dueDateParts[2]+"/"+dueDateParts[1]+"/"+dueDateParts[0]
    
  }
  
  return (
    <div className='my-4 w-[85%] bg-black-400 h-fit mx-auto rounded-md p-3 text-white md:ml-[35%] md:w-[50%]' >
            <div className='flex gap-4 items-center justify-between'>
            <div className='flex gap-4 items-center'>
              <div onClick={markAsDone} className='h-6 w-6 border-4 border-yellow-500 rounded-lg cursor-pointer'>
                {doneOrNot && <MdOutlineDone className='bg-yellow-500 text-black-500'/>}
              </div>
              <div className={`${doneOrNot?"line-through text-gray-400":""}`}>{text}</div>
            </div>
            <div onClick={removeTodo} className='cursor-pointer'>
              <CiCircleRemove className='h-6 w-6 '/>
            </div>
            </div>
            <div className='mt-4 flex justify-between'>
            <div className='text-sm'>
                Urgency: <span className={colorMapping[urgency]}> {urgency} </span>
            </div>
            <div className='flex gap-1 items-center text-gray-300'>
            <MdOutlineDateRange className=''></MdOutlineDateRange>
            <span className='text-sm '>Due Date - {getFormattedDate()}</span>
            </div>
            </div>
        </div> 
  )
}

export default TodoCard