import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import Clock from "../Clock";
import "./TodoApp.css";

const Todo_Items = [
  { id: 1, title: "lorem ipsum 1", completed: true },
  { id: 2, title: "lorem ipsum 2", completed: false },
  { id: 3, title: "lorem ipsum 3", completed: true },
];
function TodoApp() {
  const [items, setItems] = useState(Todo_Items);
  const [value, setValue] = useState("");
  const inputRef = useRef();
  const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()),1000)
        return () => clearInterval(timer)
    })

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const items = localStorage.getItem("items");
    if (items) {
      setItems(JSON.parse(items));
    }
  },[]);

  function onItemChange(CLickedItem) {
    const newValue = items.map(item => {
      if (item.id === CLickedItem.id) {
        item.completed = !item.completed;
      }
      return item;
    });
    setItems(newValue);
  }
  function itemSubmited(e) {
    e.preventDefault();
    const newItems = [
      {
        id: Date.now(),
        title: value,
        completed: false,
      },

      ...items,
    ];
    setItems(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
    setValue("");
  }

  function onItemDelete(itemId) {
    const newItems = items.filter(item => item.id !== itemId);
    setItems(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
  }
  return (
    <div className="ToDo">
    <div className="bgImageContainer">
        <Clock/>
    </div>
      <div style={{ padding: "15px" }}>
        <form action="" onSubmit={itemSubmited}>
          <input className="textInput"
            ref={inputRef}
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Note"
          />
          <button onClick={() => setValue([value])}><i className="fa-solid fa-plus icon"/></button>
        </form>
      </div>
      <ul>
        {items.map(item => (

            <li key={item.id} 
            className={classNames({completed:item.completed})}>
              <label className="container">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => onItemChange(item)}
              />
              <span className="checkmark"></span>
              </label>
              {item.title}
              <div className="iconDiv">
                <i className="fa-solid fa-trash-can" onClick={() => 
                onItemDelete(item.id)} style={{color:"red"}}
                />
                <p className="para"> {date.toLocaleDateString()} </p>
                </div>
            </li>
      ))}
      </ul>
    </div>
  );
  }

export default TodoApp;
