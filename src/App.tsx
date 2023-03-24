import "./App.css";
import TodoForm from "./components/TodoForm";
import AllBoards from "./components/AllBoards";
import Box from "@mui/material/Box";

function App() {

  return (
    <Box className="App">
      <Box className="page-container">
        <TodoForm />

        <Box style={{display: "flex", flexDirection: "column"}}>
        <h1
          style={{
            fontSize: "40px",
            marginBottom: "10px",
          }}
        >
          Todo List
        </h1>
        <AllBoards />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
