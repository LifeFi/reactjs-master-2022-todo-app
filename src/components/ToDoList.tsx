import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoSelector, categoriesState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(categoriesState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCategory(event.currentTarget.value);
  };

  const addCategory = () => {
    const newCategory = prompt("Input new category name.", "");

    if (newCategory) {
      if (categories.includes(newCategory)) {
        alert("Already exists same category name.");
        return;
      }
      setCategories([...categories, newCategory]);
      setCategory(newCategory);
    }
  };

  return (
    <div>
      <h2>To-Do App</h2>
      <hr />
      {categories.map((availableCategory) => (
        <span key={availableCategory}>
          <button
            value={availableCategory}
            onClick={onClick}
            disabled={availableCategory === category}
          >
            {availableCategory}
          </button>
        </span>
      ))}
      <span> | </span>
      <span>
        <button onClick={addCategory}>New Category</button>
      </span>
      <hr />
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
