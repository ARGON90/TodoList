import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";

import useTodoStore, { TodoState } from "../store/TodoStore";
import useTemplateStore, {
  TemplateState,
  Template,
} from "../store/TemplateStore";

type MuiCardType = {
  todoId: number;
  templateId: number;
  title: string;
  task: string;
  titleColor: string;
  taskColor: string;
  backgroundColor: string;
  borderColor: string;
  status: string;
  image: string;
};

export default function MuiCard({
  todoId,
  templateId,
  title,
  task,
  titleColor,
  taskColor,
  backgroundColor,
  borderColor,
  image,
}: MuiCardType) {
  const { editTodo, deleteTodo } = useTodoStore((state: TodoState) => ({
    editTodo: state.editTodo,
    deleteTodo: state.deleteTodo,
  }));

  const { templates, addTemplate } = useTemplateStore(
    (state: TemplateState) => ({
      templates: state.templates,
      addTemplate: state.addTemplate,
    })
  );

  const [showCardDropDown, setShowCardDropDown] = useState("");
  const [updateTodoTitle, setUpdateTodoTitle] = useState(title);
  const [updateTodoTask, setUpdateTodoTask] = useState(titleColor);
  const [updateTodoImage, setUpdateTodoImage] = useState(image);
  const [updateTitleColor, setUpdateTitleColor] = useState(titleColor);
  const [updateTaskColor, setUpdateTaskColor] = useState(taskColor);
  const [updateTemplateId, setUpdateTemplateId] = useState(null);
  const [updateBGColor, setUpdateBGColor] = useState(backgroundColor);
  const [updateBorderColor, setUpdateBorderColor] = useState(borderColor);
  const [newTemplateName, setNewTemplateName] = useState("");

  useEffect(() => {
    setUpdateTodoTitle(title);
    setUpdateTodoTask(titleColor);
    setUpdateTodoImage(image);
    setUpdateTitleColor(titleColor);
    setUpdateTaskColor(taskColor);
    setUpdateBGColor(backgroundColor);
    setUpdateBorderColor(borderColor);
  }, [title, titleColor, task, taskColor, backgroundColor, borderColor, image]);

  function updateExistingTodo() {
    let newTemplateId = templates.length + 1;
    createCustomTemplate(
      updateTitleColor,
      updateTaskColor,
      updateBGColor,
      updateBorderColor,
      updateTodoImage
    );
    editTodo({
      id: todoId,
      newTitle: updateTodoTitle,
      newTask: updateTodoTask,
      newImage: updateTodoImage,
      newTemplateId: newTemplateId,
    });
    setShowCardDropDown("");
    setUpdateTodoTitle("");
    setUpdateTodoTask("");
    setUpdateTemplateId(null);
  }

  let userTemplate;
  if (templateId) {
    userTemplate = templates.filter(
      (template: Template) => template.id === templateId
    );
    console.log("in here");
    titleColor = userTemplate[0].titleColor;
    taskColor = userTemplate[0].taskColor;
    backgroundColor = userTemplate[0].backgroundColor;
    borderColor = userTemplate[0].borderColor;
    image = userTemplate[0].image;
  }

  if (image === "default") {
    image =
    'https://www.telegraph.co.uk/content/dam/Pets/spark/pets-at-home-2017/fluffy-white-puppy-xlarge.jpg'
  }

  function createCustomTemplate(
    titleColor: string,
    taskColor: string,
    backgroundColor: string,
    borderColor: string,
    image: string
  ) {
    addTemplate({
      id: templates.length + 1,
      title: templateNamerFunction(),
      titleColor,
      taskColor,
      backgroundColor,
      borderColor,
      image,
    });
    setShowCardDropDown("");
  }

  function templateNamerFunction() {
    if (newTemplateName === "") {
      return "userEdit";
    } else {
      return newTemplateName;
    }
  }

  return (
    <Card
      sx={{
        margin: "0px",
        padding: "0px",
        border: `1px solid ${borderColor}`,
        backgroundColor,
      }}
    >
      <CardActionArea>
        <CardMedia component="img" height="140" src={image} alt={image} />
        <CardContent>
          <Typography
            sx={{ color: titleColor }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {title}
          </Typography>
          <Typography variant="body2" color={taskColor}>
            {task}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box className="all-btns-container">
          <Box className="del-edit-btns">
            <Button
              variant="contained"
              size="small"
              className="delete btn"
              onClick={() => deleteTodo(todoId)}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              size="small"
              className="edit btn"
              onClick={() => setShowCardDropDown("editTodo")}
            >
              Edit
            </Button>
          </Box>
          <Button
            variant="contained"
            size="small"
            className="edit btn"
            onClick={() => setShowCardDropDown("saveTemplate")}
          >
            Save This Template
          </Button>

          {showCardDropDown === "saveTemplate" && (
            <Box className="edit-todo-form">
              <Box className="edit-todo-btns-container">
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    "&:hover": { backgroundColor: "#807567" },
                    backgroundColor: "#9f9380",
                  }}
                  className="edit-todo-btns"
                  onClick={() => {
                    setShowCardDropDown("");
                  }}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    "&:hover": { backgroundColor: "#807567" },
                    backgroundColor: "#9f9380",
                  }}
                  className="edit-todo-btns"
                  onClick={() =>
                    createCustomTemplate(
                      titleColor,
                      taskColor,
                      backgroundColor,
                      borderColor,
                      image
                    )
                  }
                >
                  Create New Template
                </Button>
              </Box>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <Box>
                  <TextField
                    required
                    id="outlined-required"
                    size="small"
                    label="New Template Name"
                    value={newTemplateName}
                    onChange={(e) => {
                      setNewTemplateName(e.target.value);
                    }}
                  />
                </Box>
              </Box>
            </Box>
          )}

          {showCardDropDown === "editTodo" && (
            <Box className="edit-todo-form">
              <Box className="edit-todo-btns-container">
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    "&:hover": { backgroundColor: "#807567" },
                    backgroundColor: "#9f9380",
                  }}
                  className="edit-todo-btns"
                  onClick={() => {
                    setShowCardDropDown("");
                  }}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    "&:hover": { backgroundColor: "#807567" },
                    backgroundColor: "#9f9380",
                  }}
                  className="edit-todo-btns"
                  onClick={() => {
                    updateExistingTodo();
                  }}
                >
                  Save Changes
                </Button>
              </Box>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <Box>
                  <TextField
                    required
                    id="outlined-required"
                    size="small"
                    label="New Title"
                    value={updateTodoTitle}
                    onChange={(e) => {
                      setUpdateTodoTitle(e.target.value);
                    }}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    size="small"
                    label="New Title Color"
                    value={updateTitleColor}
                    onChange={(e) => {
                      setUpdateTitleColor(e.target.value);
                    }}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    size="small"
                    label="New Task"
                    value={updateTodoTask}
                    onChange={(e) => {
                      setUpdateTodoTask(e.target.value);
                    }}
                  />

                  <TextField
                    required
                    id="outlined-required"
                    size="small"
                    label="New Task Color"
                    value={updateTaskColor}
                    onChange={(e) => {
                      setUpdateTaskColor(e.target.value);
                    }}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    size="small"
                    label="New Background Color"
                    value={updateBGColor}
                    onChange={(e) => {
                      setUpdateBGColor(e.target.value);
                    }}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    size="small"
                    label="New Border Color"
                    value={updateBorderColor}
                    onChange={(e) => {
                      setUpdateBorderColor(e.target.value);
                    }}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    size="small"
                    label="New Image"
                    value={updateTodoImage}
                    onChange={(e) => {
                      setUpdateTodoImage(e.target.value);
                    }}
                  />
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </CardActions>
    </Card>
  );
}
