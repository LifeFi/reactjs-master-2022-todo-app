import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

// type categories = "TO_DO" | "DOING" | "DONE";

// export enum Categories {
//   "TO_DO" = "TO_DO",
//   "DOING" = "DOING",
//   "DONE" = "DONE",
// }

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

const { persistAtom } = recoilPersist({
  key: "recoil-persist-toDos",
  storage: localStorage,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const categoryState = atom<string>({
  key: "category",
  default: "TO_DO",
});

export const categoriesState = atom<string[]>({
  key: "categories",
  default: ["TO_DO", "DOING", "DONE"],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
