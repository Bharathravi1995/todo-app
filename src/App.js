import React, { useState } from "react";
import "./styles.css";

const App = () => <TodoApp />;

const TodoApp = () => {
  const [toDoList, setToDoList] = useState([]);

  const addTodo = (todoMessage) => {
    setToDoList([...toDoList, { message: todoMessage, isCompleted: false }]);
  };

  const deleteTodo = (deleteToDoIndex) => {
    setToDoList([
      ...toDoList.slice(0, deleteToDoIndex),
      ...toDoList.slice(deleteToDoIndex + 1)
    ]);
  };

  const toggleCompletionStatus = (todoIndex) => {
    let toDoListCopy = [...toDoList];
    toDoListCopy[todoIndex] = {
      ...toDoListCopy[todoIndex],
      isCompleted: !toDoListCopy[todoIndex].isCompleted
    };
    setToDoList(toDoListCopy);
  };

  return (
    <div id="app">
      <TodoHeader />
      <TodoForm addTodo={addTodo} />
      <br />
      {toDoList.length ? (
        <TodoList
          toDoList={toDoList}
          toggleCompletionStatus={toggleCompletionStatus}
          deleteTodo={deleteTodo}
        />
      ) : (
        <div className="empty_state_container">
          <span>No Todo available</span>
        </div>
      )}
      <footer class="footer-msg">
        <small>
          Made with <span>❤</span> by
          <a href="https://csb-em0wuy.netlify.app/" target="_blank">
            Bharathwaj Ravi
          </a>
        </small>
      </footer>
    </div>
  );
};

const TodoHeader = () => (
  <div id="header">
    <h2>Todo List</h2>
  </div>
);

const TodoForm = ({ addTodo }) => {
  const [input, setInput] = useState("");
  const changeHandler = (event) => {
    setInput(event.target.value);
  };

  const submitHandler = (event) => {
    addTodo(input);
    setInput("");
  };
  return (
    <form id="form">
      <input
        id="form__input"
        type="text"
        value={input}
        onChange={changeHandler}
        autoFocus
      />
      <input
        type="submit"
        id="form__submit"
        onClick={submitHandler}
        disabled={!input.length}
        value="Add Todo"
      />
    </form>
  );
};

const TodoList = ({ toDoList, deleteTodo, toggleCompletionStatus }) => (
  <ol id="todolist">
    {toDoList.map((todo, index) => (
      <TodoItem
        todo={todo}
        deleteTodo={() => deleteTodo(index)}
        toggleCompletionStatus={() => toggleCompletionStatus(index)}
        key={index}
      />
    ))}
  </ol>
);

const TodoItem = ({ todo, deleteTodo, toggleCompletionStatus }) => {
  return (
    <li id="todo">
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={toggleCompletionStatus}
      />
      <span
        title={todo.message}
        id="todo__label"
        className={todo.isCompleted ? "strike" : ""}
      >
        {todo.message}
      </span>
      <span
        id="todo__delete"
        className="material-symbols-outlined"
        onClick={deleteTodo}
      >
        delete
      </span>
    </li>
  );
};

export default App;
