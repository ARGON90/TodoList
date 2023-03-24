import "../App.css";
import Board from "./Board";
import Card from "./Card";
import useTodoStore from "../store/TodoStore";
import { TodoState, Todo } from "../store/TodoStore";
import { Box } from "@mui/material";

function AllBoards() {
  const { todos } = useTodoStore((state: TodoState) => ({
    todos: state.todos,
  }));

  const notStarted = todos.filter((todo: Todo) => todo.status === "notStarted");
  const inProgress = todos.filter((todo: Todo) => todo.status === "inProgress");
  const completed = todos.filter((todo: Todo) => todo.status === "completed");

  return (
    <Box className={"all-boards-container"}>
      <Box className={"ind-board-container"}>
        <h2>NOT STARTED</h2>
        <Board id="board-1" className="board">
          {notStarted.map((todo: Todo, idx: number) => {
            {
              if (todo.show) {
                return (
                  <Card
                    key={idx}
                    id={todo.id}
                    className="card"
                    draggable="true"
                    title={todo.title}
                    task={todo.task}
                    templateId={todo.templateId}
                    titleColor={todo.titleColor}
                    backgroundColor={todo.backgroundColor}
                    taskColor={todo.taskColor}
                    borderColor={todo.borderColor}
                    status={todo.status}
                    image={todo.image}
                    deleted={todo.deleted}
                  ></Card>
                );
              } else {
                return (
                  <Card
                    key={idx}
                    id={todo.id}
                    className="card"
                    draggable="true"
                    title={todo.title}
                    task={todo.task}
                    templateId={todo.templateId}
                    titleColor={todo.titleColor}
                    backgroundColor={todo.backgroundColor}
                    taskColor={todo.taskColor}
                    borderColor={todo.borderColor}
                    status={todo.status}
                    image={todo.image}
                    deleted={true}
                  ></Card>
                );
              }
            }
          })}
        </Board>
      </Box>

      <Box className={"ind-board-container"}>
        <h2>
        IN PROGRESS
        </h2>
        <Board id="board-2" className="board">
          {inProgress.map((todo: Todo, idx: number) => {
            {
              if (todo.show) {
                return (
                  <Card
                    key={idx}
                    id={todo.id}
                    className="card"
                    draggable="true"
                    title={todo.title}
                    task={todo.task}
                    templateId={todo.templateId}
                    titleColor={todo.titleColor}
                    backgroundColor={todo.backgroundColor}
                    taskColor={todo.taskColor}
                    borderColor={todo.borderColor}
                    status={todo.status}
                    image={todo.image}
                    deleted={todo.deleted}
                  ></Card>
                );
              } else {
                return (
                  <Card
                    key={idx}
                    id={todo.id}
                    className="card"
                    draggable="true"
                    title={todo.title}
                    task={todo.task}
                    templateId={todo.templateId}
                    titleColor={todo.titleColor}
                    backgroundColor={todo.backgroundColor}
                    taskColor={todo.taskColor}
                    borderColor={todo.borderColor}
                    status={todo.status}
                    image={todo.image}
                    deleted={true}
                  ></Card>
                );
              }
            }
          })}
        </Board>
      </Box>

      <Box className={"ind-board-container"}>
        <h2>COMPLETED</h2>
        <Board id="board-3" className="board">
          {completed.map((todo: Todo, idx: number) => {
            {
              if (todo.show) {
                return (
                  <Card
                    key={idx}
                    id={todo.id}
                    className="card"
                    draggable="true"
                    title={todo.title}
                    task={todo.task}
                    templateId={todo.templateId}
                    titleColor={todo.titleColor}
                    backgroundColor={todo.backgroundColor}
                    taskColor={todo.taskColor}
                    borderColor={todo.borderColor}
                    status={todo.status}
                    image={todo.image}
                    deleted={todo.deleted}
                  ></Card>
                );
              } else {
                return (
                  <Card
                    key={idx}
                    id={todo.id}
                    className="card"
                    draggable="true"
                    title={todo.title}
                    task={todo.task}
                    templateId={todo.templateId}
                    titleColor={todo.titleColor}
                    backgroundColor={todo.backgroundColor}
                    taskColor={todo.taskColor}
                    borderColor={todo.borderColor}
                    status={todo.status}
                    image={todo.image}
                    deleted={true}
                  ></Card>
                );
              }
            }
          })}
        </Board>
      </Box>
    </Box>
  );
}

export default AllBoards;
