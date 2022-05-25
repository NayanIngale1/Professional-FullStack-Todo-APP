import "./TodoCard.css";

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../Redux/Todo/action";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Chip,
  Avatar,
  Checkbox,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoCard = ({ todo }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const { title, description, subTasks, status, tags, date, id } = todo;

  const { Personal, Official, Others } = tags;

  function makeUpdateRequest(payload) {
    fetch(`http://localhost:8080/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => dispatch(getData(user.user.email)));
  }

  const handleDelet = (todoId) => {
    fetch(`http://localhost:8080/todos/${todoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => dispatch(getData(user.user.email)));
  };
  return (
    <>
      <Card
        sx={{
          minWidth: 220,
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 8px",
          padding: "10px",
          position: "relative",
        }}
        key={id}
      >
        <CardContent>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography
            variant="p"
            color="text.secondary"
            gutterBottom
            sx={{ fontSize: 14 }}
          >
            {date.split("-").reverse().join("/")}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 10, mb: 1, mt: 0 }}>
            {status == "todo" ? (
              <Button color="secondary">Todo</Button>
            ) : status == "progress" ? (
              <Button color="warning">In Progress</Button>
            ) : (
              <Button color="success">Done</Button>
            )}
            <br />
          </Typography>
          <Typography sx={{ fontSize: 20 }} component="div">
            {Official && (
              <Chip
                variant="outlined"
                color="secondary"
                avatar={<Avatar>O</Avatar>}
                label="Official"
                sx={{ mr: 1.5, mt: 1 }}
              />
            )}
            {Personal && (
              <Chip
                variant="outlined"
                color="secondary"
                avatar={<Avatar>P</Avatar>}
                label="Personal"
                sx={{ mr: 1.5, mt: 1 }}
              />
            )}
            {Others && (
              <Chip
                variant="outlined"
                color="secondary"
                avatar={<Avatar>O</Avatar>}
                label="Others"
                sx={{ mr: 1.5, mt: 1 }}
              />
            )}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1.5, mb: 1.5 }}>
            {description}
            <br />
          </Typography>
          <Typography variant="body1">
            Sub Tasks :
            {subTasks.map((st) => (
              <Box component="div" display="flex" alignItems="center">
                <Checkbox
                  sx={{ mr: 1 }}
                  checked={st.status}
                  onChange={(e) => {
                    const taskAfterToggle = subTasks.map((item) =>
                      item.id === st.id
                        ? { ...st, status: e.target.checked }
                        : item
                    );
                    const payload = {
                      subTasks: taskAfterToggle,
                    };
                    makeUpdateRequest(payload);
                  }}
                />
                <Typography component="p" sx={{ mr: 1 }}>
                  {st.title}
                </Typography>
                <IconButton aria-label="delete">
                  <DeleteIcon
                    color="error"
                    onClick={(e) => {
                      const taskAfterDelet = subTasks.filter(
                        (item) => item.id !== st.id
                      );

                      const payload = {
                        subTasks: taskAfterDelet,
                      };
                      makeUpdateRequest(payload);
                    }}
                  />
                </IconButton>
              </Box>
            ))}
            <br />
          </Typography>
          <Typography
            variant="body1"
            sx={{ mt: 1.5, position: "absolute", bottom: 15, right: 15 }}
          >
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={() => handleDelet(id)}
            >
              Delete{" "}
            </Button>{" "}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default TodoCard;
