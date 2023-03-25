import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import useTodoStore, {TodoState } from "../store/TodoStore";
import useTemplateStore, {
  Template,
  TemplateState,
} from "../store/TemplateStore";

const TodoForm = () => {

  const { todos, addTodo } = useTodoStore((state: TodoState) => ({
    todos: state.todos,
    addTodo: state.addTodo
  }));

  const [todoTitle, setTodoTitle] = useState("testTitle");
  const [todoTask, setTodoTask] = useState("testTask");
  const [todoStatus, setTodoStatus] = useState("inProgress");
  const [todoImage, setTodoImage] = useState("default");
  const [todoTitleColor, setTodoTitleColor] = useState("green");
  const [todoTaskColor, setTodoTaskColor] = useState("purple");
  const [todoBackgroundColor, setTodoBackgroundColor] =
    useState("cornflowerblue");
  const [todoBorderColor, setTodoBorderColor] = useState("black");
  const [todoTemplateSelected, setTodoTemplateSelected] = useState(0);

  const [newTemplateTitle, setNewTemplateTitle] = useState("");
  const [newThemeDisplayName, setNewThemeDisplayName] = useState("DEFAULT");
  const [newThemeDisplayBackgroundColor, setNewThemeDisplayBackgroundColor] =
    useState("none");
  const [newThemeDisplayColor, setNewThemeDisplayColor] = useState("none");
  const { templates, addTemplate } = useTemplateStore(
    (state: TemplateState) => ({
      addTemplate: state.addTemplate,
      templates: state.templates,
    })
  );

  const testTemplates = [
    {
      id: 1,
      title: "dark",
      titleColor: "white",
      taskColor: "white",
      backgroundColor: "black",
      borderColor: "black",
      image: "https://www.clearblade.com/wp-content/uploads/2019/01/share.png",
    },
    {
      id: 2,
      title: "light",
      titleColor: "black",
      taskColor: "black",
      backgroundColor: "white",
      borderColor: "white",
      image: "https://www.clearblade.com/wp-content/uploads/2019/01/share.png",
    },
  ];
  if (!templates || templates.length === 0) {
    testTemplates.map((template) => {
      addTemplate({
        id: template.id,
        title: template.title,
        titleColor: template.titleColor,
        taskColor: template.taskColor,
        backgroundColor: template.backgroundColor,
        borderColor: template.borderColor,
        image: template.image,
      });
    });
  }

  function setThemeDisplay(
    id: number,
    name: string,
    bgColor: string,
    color: string
  ) {
    setTodoTemplateSelected(id);
    setNewThemeDisplayName(name.toUpperCase());
    setNewThemeDisplayBackgroundColor(bgColor);
    setNewThemeDisplayColor(color);
  }

  function createCustomTemplate(
    titleColor: string,
    taskColor: string,
    backgroundColor: string,
    borderColor: string,
    image: string
  ) {
    if (!newTemplateTitle) {
      return alert("Please Fill Out Template Name Field!");
    }
    addTemplate({
      id: templates.length + 1,
      title: newTemplateTitle,
      titleColor,
      taskColor,
      backgroundColor,
      borderColor,
      image,
    });
  }

  const handleTodoSubmit = (status: string) => {
    if (
      !todoTitle ||
      !todoTask ||
      !status ||
      !todoImage ||
      !todoTitleColor ||
      !todoTaskColor ||
      !todoBackgroundColor ||
      !todoBorderColor
    )
      return alert("Please Fill Out All Form Fields!");
    addTodo({
      id: todos.length,
      templateId: todoTemplateSelected,
      title: todoTitle,
      task: todoTask,
      status: status,
      image: todoImage,
      titleColor: todoTitleColor,
      taskColor: todoTaskColor,
      backgroundColor: todoBackgroundColor,
      borderColor: todoBorderColor,
      show: true,
      deleted: false,
    });
  };

  return (
    <Box
      className={"form-container"}
      component="form"
      sx={{
        "& .MuiTextField-root": { s: 1, width: "25ch" },
        marginTop: "20px",
      }}
      noValidate
      autoComplete="off"
    >
      <Box className={"ind-form-box top-form-box"}>
        Create New Todo
        <TextField
          sx={{ marginTop: "10px" }}
          className={"form-text"}
          label="Todo Title"
          size="small"
          value={todoTitle}
          onChange={(e) => {
            setTodoTitle(e.target.value);
          }}
        />
        <TextField
          label="Todo Task"
          value={todoTask}
          size="small"
          onChange={(e) => {
            setTodoTask(e.target.value);
          }}
        />
        <TextField
          label="Todo Status"
          value={todoStatus}
          size="small"
          onChange={(e) => {
            setTodoStatus(e.target.value);
          }}
        />
        <TextField
          label="Todo Image"
          value={todoImage}
          size="small"
          onChange={(e) => {
            setTodoImage(e.target.value);
          }}
        />
        <TextField
          label="Todo Title Color"
          value={todoTitleColor}
          size="small"
          onChange={(e) => {
            setTodoTitleColor(e.target.value);
          }}
        />
        <TextField
          label="Todo Task Color"
          value={todoTaskColor}
          size="small"
          onChange={(e) => {
            setTodoTaskColor(e.target.value);
          }}
        />
        <TextField
          label="Todo Background Color"
          value={todoBackgroundColor}
          size="small"
          onChange={(e) => {
            setTodoBackgroundColor(e.target.value);
          }}
        />
        <TextField
          label="Todo Border Color"
          value={todoBorderColor}
          size="small"
          onChange={(e) => {
            setTodoBorderColor(e.target.value);
          }}
        />
      </Box>
      <Box className={"ind-form-box create-template-box"}>
        Create New Template With Values Above
        <TextField
          sx={{ marginTop: "10px", marginBottom: "10px" }}
          size="small"
          label="New Template Name"
          value={newTemplateTitle}
          onChange={(e) => {
            setNewTemplateTitle(e.target.value);
          }}
        />
        <Button
          variant="contained"
          size="small"
          sx={{ marginBottom: "15px" }}
          onClick={() =>
            createCustomTemplate(
              todoTitleColor,
              todoTaskColor,
              todoBackgroundColor,
              todoBorderColor,
              todoImage
            )
          }
        >
          Save Values as Template
        </Button>
      </Box>
      <Box className={"ind-form-box existing-template"}>
        Use Existing Template
        <Box sx={{ marginTop: "10px", marginBottom: "15px" }}>
          {templates?.map((template: Template) => {
            {
              if (template.title !== "userEdit") {
                return (
                  <Button
                    variant="contained"
                    size="small"
                    key={template.id}
                    onClick={() =>
                      setThemeDisplay(
                        template.id,
                        template.title,
                        template.backgroundColor,
                        template.titleColor
                      )
                    }
                    sx={{ margin: "4px" }}
                    style={{
                      cursor: "pointer",
                      color: template.titleColor,
                      backgroundColor: template.backgroundColor,
                      border: `1px solid ${template.borderColor}`,
                    }}
                  >
                    {template.title}
                  </Button>
                );
              }
            }
          })}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>Selected:</Box>
          <Box
            sx={{
              marginLeft: "5px",
              padding: "3px",
              borderRadius: "4px",
              backgroundColor: `${newThemeDisplayBackgroundColor}`,
              color: `${newThemeDisplayColor}`,
            }}
          >
            {newThemeDisplayName}
          </Box>
        </Box>
        <Box style={{ marginBottom: "15px" }}></Box>
      </Box>
      <Box className="ind-form-box add-todo">
        Add Your Todo!
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            handleTodoSubmit("notStarted");
          }}
          className=".form-submit-btn"
        >
          Add To "Not Started"
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            handleTodoSubmit("inProgress")
          }}
          className=".form-submit-btn"
        >
          Add To "In Progress"
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            handleTodoSubmit("completed");
          }}
          className=".form-submit-btn"
        >
          Add To "Completed"
        </Button>
      </Box>
    </Box>
  );
};

export default TodoForm;
