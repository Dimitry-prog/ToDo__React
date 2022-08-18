import React, { useEffect } from 'react'
import style from './Alert.module.css';


const Alert = ({ displayAlert, todoList, type, message }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      displayAlert();
    }, 3000);
    return () => clearTimeout(timer);
  }, [todoList]);

  return (
    <div className={style.alert}>
      <p className={type === 'danger' ? `${style.alert__danger}` : `${style.alert__success}`}>{message}</p>
    </div >
  )
}

export default Alert