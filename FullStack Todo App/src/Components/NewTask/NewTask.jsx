import React, { useState, useEffect, useReducer } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import "./NewTask.css";
import { SnackbarProvider, useSnackbar } from "notistack";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Checkbox,
  Radio,
  FormControlLabel,
  FormLabel,
  FormControl,
  RadioGroup,
  FormGroup,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, setLoading, getData } from "../../Redux/Todo/action";
import { addUser } from "../../Redux/User/action";
import Loading from "../Home/Loading";

const initialState = {
  title: "",
  description: "",
  subTasks: [],
  status: "todo",
  tags: { Official: false, Personal: false, Others: false },
  date: "",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_TITLE":
      return { ...state, title: payload };
    case "UPDATE_DESCRIPTION":
      return { ...state, description: payload };
    case "UPDATE_STATUS":
      return { ...state, status: payload };
    case "UPDATE_TAGS":
      return { ...state, tags: { ...state.tags, ...payload } };
    case "UPDATE_DATE":
      return { ...state, date: payload };
    case "UPDATE_SUBTASKS":
      return { ...state, subTasks: [...state.subTasks, payload] };
    case "TOGGLE_SUBTASKS":
      const subtasksAfterToggle = state.subTasks.map((ele) =>
        ele.id === payload.id ? { ...ele, status: payload.status } : ele
      );
      return { ...state, subTasks: subtasksAfterToggle };
    case "DELETE_SUBTASK":
      const subtaskAfterDelete = state.subTasks.filter(
        (el) => el.id !== payload
      );

      return { ...state, subTasks: subtaskAfterDelete };
    case "RESET":
      return { ...initialState };
    default:
      throw new Error("Please give proper action object");
  }
};

const MyNewTask = () => {
  const [state, localDispatch] = useReducer(reducer, initialState);
  // console.log("state:", state);
  const { enqueueSnackbar } = useSnackbar();

  const [sub, setSub] = useState("");

  const { title, description, subTasks, status, tags, date } = state;

  const { Official, Personal, Others } = tags;

  const user = useSelector((state) => state.user.user.users);
  

  const createNewTask = () => {
    if (state.title.trim().length === 0) {
      enqueueSnackbar("Title feild is empty", { variant: "error" });
    } else if (
      state.tags.Official == false &&
      state.tags.Personal == false &&
      state.tags.Others == false
    ) {
      enqueueSnackbar("Atleast one tag required", { variant: "error" });
    } else {
      const payload = {
        ...state,
        username: user.email,
      };
      
      const response = fetch("https://nayan-todo-app.herokuapp.com/todo/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"          
        },
        body: JSON.stringify(payload)
      }).then((res)=>res.json());
      
      
      response
        .then((res) => {
          //   res.json();
          // console.log(res);
          res.error && enqueueSnackbar(error, {
            variant: "error",
          })
          dispatch(getData(user.email));

           localDispatch({ type: "RESET" });
          res.status &&  
          enqueueSnackbar("New Todo Creates Successfully", {
            variant: "success",
          })
        });
    
    }
  };

  // ----
  const dispatch = useDispatch();
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("TodoUser"));
    if (user) {
      dispatch(addUser(user));
    }
    dispatch(setLoading(false));
  }, []);

  return (
    <>
      <Loading />{" "}
      <Typography variant="h4" component="p" m="10px auto">
        Add New Todo
      </Typography>
      <div className="newtask_page">
        <div id="newTask_page_section">
          <TextField
            id="outlined-basic"
            label="Todo title"
            variant="outlined"
            size="small"
            name="title"
            value={title}
            onChange={(e) =>
              localDispatch({ type: "UPDATE_TITLE", payload: e.target.value })
            }
          />
          <FormLabel>
            Select Date : <br />
            <input
              id="datePicker"
              type="date"
              value={date}
              onChange={(e) => {
                localDispatch({
                  type: "UPDATE_DATE",
                  payload: e.target.value,
                });
              }}
            />
          </FormLabel>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            name="description"
            value={description}
            onChange={(e) =>
              localDispatch({
                type: "UPDATE_DESCRIPTION",
                payload: e.target.value,
              })
            }
          />
        </div>
        <div id="newTask_page_section">
          <Box component="div" className="small_flex_box">
            <TextField
              id="outlined-basic"
              label="Sub task"
              variant="outlined"
              size="small"
              name="title"
              value={sub}
              onChange={(e) => {
                setSub(e.target.value);
              }}
            />
            <Button
              variant="contained"
              onClick={() => {
                const payload = {
                  id: uuid(),
                  title: sub,
                  status: false,
                };

                localDispatch({ type: "UPDATE_SUBTASKS", payload });
                setSub("");
              }}
            >
              {" "}
              Add{" "}
            </Button>
          </Box>

          <Box component="div">
            {subTasks.map((task) => (
              <Box
                component="div"
                display="flex"
                alignItems="center"
                key={task.id}
              >
                <Checkbox
                  checked={task.status}
                  onChange={(e) =>
                    localDispatch({
                      type: "TOGGLE_SUBTASKS",
                      payload: { id: task.id, status: e.target.checked },
                    })
                  }
                />
                <Typography component="p">{task.title}</Typography>
                <IconButton aria-label="delete">
                  <DeleteIcon
                    color="error"
                    onClick={() =>
                      localDispatch({
                        type: "DELETE_SUBTASK",
                        payload: task.id,
                      })
                    }
                  />
                </IconButton>
              </Box>
            ))}
          </Box>
        </div>
        <div id="newTask_page_section">
          <Box component="div" display="flex" alignItems="center">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Todo Status
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="status"
                onChange={(e) => {
                  localDispatch({
                    type: "UPDATE_STATUS",
                    payload: e.target.value,
                  });
                }}
              >
                <FormControlLabel
                  value="todo"
                  control={<Radio />}
                  label="Todo"
                  checked={status === "todo"}
                />
                <FormControlLabel
                  value="progress"
                  control={<Radio />}
                  label="In Progress"
                  checked={status === "progress"}
                />
                <FormControlLabel
                  value="done"
                  control={<Radio />}
                  label="Done"
                  checked={status === "done"}
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box component="div">
            <FormGroup>
              <FormLabel id="demo-radio-buttons-group-label">
                Todo Tags
              </FormLabel>
              <FormControlLabel
                control={<Checkbox />}
                label="Official"
                name="tag"
                value="Official"
                checked={Official}
                onChange={(e) => {
                  localDispatch({
                    type: "UPDATE_TAGS",
                    payload: { Official: e.target.checked },
                  });
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Personal"
                name="tag"
                value="Personal"
                checked={Personal}
                onChange={(e) => {
                  localDispatch({
                    type: "UPDATE_TAGS",
                    payload: { Personal: e.target.checked },
                  });
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Others"
                name="tag"
                value="Others"
                checked={Others}
                onChange={(e) => {
                  localDispatch({
                    type: "UPDATE_TAGS",
                    payload: { Others: e.target.checked },
                  });
                }}
              />
            </FormGroup>
          </Box>
        </div>

        <Button variant="contained" onClick={createNewTask}>
          <h2>Add Todo</h2>
        </Button>
      </div>
    </>
  );
};

export const NewTask = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyNewTask />
    </SnackbarProvider>
  );
};
