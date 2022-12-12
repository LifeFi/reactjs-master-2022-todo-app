import { atom, selector } from "recoil";

// type categories = "TO_DO" | "DOING" | "DONE";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

let output = localStorage.getItem("todos");
let localData = JSON.parse(output as any) || [];

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: localData,
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO /**enum 사용시 실수를 줄일 수 있다. */,
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
