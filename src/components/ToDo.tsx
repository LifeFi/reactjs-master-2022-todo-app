import { categoriesState, IToDo, toDoState } from "../atoms";
import { useSetRecoilState, useRecoilValue } from "recoil";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      // const oldToDo = oldToDos[targetIndex];
      const newToDo = {
        text,
        id,
        category: value,
      };
      // console.log(oldToDo, newToDo);

      /**특정 인덱스 원소만 바꾸는 방법 */
      const newToDos = [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
      // console.log(newToDos);
      return newToDos;
    });
  };

  const deleteToDo = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);

      const newToDos = [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
      return newToDos;
    });
  };

  return (
    <li>
      <span>{text}</span>

      {Object.values(categories).map((availableCategory) => (
        <button
          disabled={availableCategory === category}
          key={availableCategory}
          value={availableCategory}
          onClick={onClick}
        >
          {availableCategory}
        </button>
      ))}

      <span> | </span>
      <button onClick={deleteToDo}>DELETE</button>
    </li>
  );
}

export default ToDo;
