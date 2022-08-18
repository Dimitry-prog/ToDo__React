import React from 'react'
import { BsTrash } from 'react-icons/bs';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import classes from './TodoItem.module.css';

const TodoItem = ({ todoList, handleRemove, handleEdit }) => {
  return (
    <>
      {todoList.map(({ id, title }) => {
        return (
          <article key={id} className={classes.todo}>
            <div className={classes.todo__header}>
              <p className={classes.todo__text}> {title}</p>
              <div className={classes.todo__buttons} >
                <button
                  onClick={() => handleEdit(id)}
                  className='button'
                >
                  <MdOutlineModeEditOutline />
                </button>
                <button
                  onClick={() => handleRemove(id)}
                  className='button'
                >
                  <BsTrash />
                </button>
              </div>
            </div>
          </article>
        );
      })
      }
    </>
  )
}

export default TodoItem