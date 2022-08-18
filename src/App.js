import { useEffect, useRef, useState } from 'react';
import './App.css';
import Alert from './component/Alert/Alert';
import TodoItem from './component/TodoItem/TodoItem';

const getLocalStorage = () => {
  const taskList = localStorage.getItem('todoList');
  if (taskList) {
    return JSON.parse(localStorage.getItem('todoList'));
  } else {
    return [];
  }
}

function App() {
  const [value, setValue] = useState('');
  const [todoList, setTodoList] = useState(getLocalStorage());
  const [isEdit, setIsEdit] = useState(false);
  const [idItem, setIdItem] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: '',
  })

  const inputRef = useRef();

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!value) {
      displayAlert(true, 'Enter task, please', 'danger');
    } else if (isEdit) {
      setTodoList(
        todoList.map(item => {
          if (item.id === idItem) {
            return { ...item, title: value }
          }
          return item;
        })
      );
      setIsEdit(false);
      setIdItem(null);
      setValue('');
      displayAlert(true, 'Item changed', 'success');
    } else {
      const todoItem = {
        id: new Date().getTime().toString(),
        title: value,
      }
      setTodoList([...todoList, todoItem]);
      setValue('');
      displayAlert(true, 'Item added', 'success');
    }
  }

  const handleRemove = (id) => {
    const removeItem = todoList.filter(item => item.id !== id);
    setTodoList(removeItem);
    displayAlert(true, 'Removed item', 'danger');
  }

  const handleEdit = (id) => {
    const editItem = todoList.find(item => item.id === id);
    setIsEdit(true);
    setIdItem(id);
    setValue(editItem.title);
    inputRef.current.focus();
  }

  const displayAlert = (show = false, message = '', type = '') => {
    setAlert({ show, message, type });
  }

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <main className="app">
      <section className="todos">
        <h1 className='todos__title'>Todo list</h1>
        <form
          onSubmit={handleSubmit}
          className='todos__form'
        >
          {alert.show && (
            <Alert
              {...alert}
              displayAlert={displayAlert}
              todoList={todoList}
            />
          )}
          <div className="todos__container">
            <input
              type="text"
              value={value}
              onChange={handleChange}
              ref={inputRef}
              placeholder='buy a car'
              className='todos__input input'
            />
            <button
              type='submit'
              className='button todos__submit'
            >
              {isEdit ? 'Edit' : 'Submit'}
            </button>
          </div>
        </form>
        {todoList.length !== 0 && (
          <TodoItem
            todoList={todoList}
            handleRemove={handleRemove}
            handleEdit={handleEdit}
          />
        )}
      </section>
    </main>
  );
}

export default App;
