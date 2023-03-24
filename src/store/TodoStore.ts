import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type Todo = {
  id: number;
  templateId: number;
  deleted: boolean;
  show: boolean;
  title: string;
  titleColor: string;
  task: string;
  taskColor: string;
  backgroundColor: string;
  borderColor: string;
  image: string;
  status: string;
};

export type TodoState = {
  addTodo: Function;
  deleteTodo: Function;
  editTodo: Function;
  todos: Todo[];
};

export type EditTodoParams = {
  id: number,
  newTemplateId: number
  newTitle: string,
  newTask: string,
  newImage: string,

};

const TodoStore = (set: Function) => ({
  todos: [],
  addTodo: (todo: Todo) => {
    set((state: TodoState) => ({
      todos: [todo, ...state.todos],
    }));
  },
  editTodo: ({ id, newTitle, newTask, newImage, newTemplateId }: EditTodoParams) =>
    set((state: TodoState) => {
      console.log(newTemplateId, "new tid");
      return {
        todos: state.todos.map((todo: Todo) => {
          if (todo.id == id) {
            todo.title = newTitle;
            todo.task = newTask;
            todo.image = newImage;
            if (newTemplateId) {
              todo.templateId = newTemplateId;
            }
          }
          return todo;
        }),
      };
    }),

  deleteTodo: (id: number) =>
    set((state: TodoState) => {
      return {
        todos: state.todos.map((todo: Todo) => {
          if (todo.id == id) {
            todo.show = false;
          }
          return todo;
        }),
      };
    }),
});
const useTodoStore = create(
  devtools(
    persist(TodoStore, {
      name: "todos",
    })
  )
);

export default useTodoStore;
