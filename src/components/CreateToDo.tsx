import { useForm } from "react-hook-form";
import { useRecoilValue, useRecoilState } from "recoil";
import { toDoState, categoryState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  localStorage.setItem("todos", JSON.stringify(toDos));
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", { required: "Please write a To Do." })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
