import "./TodoCard.css";

import * as React from "react";
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
  return (
    <>
      <Card
        sx={{
          minWidth: 220,
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 8px",
          padding: "10px",
          position: "relative",
        }}
        key={todo.id}
      >
        <CardContent>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {todo.title}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 10, mb: 1, mt: 0 }}>
            {todo.status == "todo" ? (
              <Button color="secondary">Todo</Button>
            ) : todo.status == "progress" ? (
              <Button color="warning">In Progress</Button>
            ) : (
              <Button color="success">Done</Button>
            )}
            <br />
          </Typography>
          <Typography sx={{ fontSize: 20 }} component="div">
            {todo.tags.map((tag) => (
              <Chip
                variant="outlined"
                color="secondary"
                avatar={<Avatar>{tag[0]}</Avatar>}
                label={tag}
                sx={{ mr: 1.5, mt: 1 }}
              />
            ))}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1.5, mb: 1.5 }}>
            {todo.description}
            <br />
          </Typography>
          <Typography variant="body1">
            Sub Tasks :
            {todo.subTasks.map((st) => (
              <Box component="div" display="flex" alignItems="center">
                <Checkbox />
                <Typography component="p">{st.title}</Typography>
                <IconButton aria-label="delete">
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            ))}
            <br />
          </Typography>
          <Typography
            variant="body1"
            sx={{ mt: 1.5, position: "absolute", bottom: 15, right: 15 }}
          >
            <Button size="small" variant="contained" color="primary">
              Edit{" "}
            </Button>{" "}
            <IconButton aria-label="delete">
              <DeleteIcon color="error"/>
            </IconButton>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default TodoCard;
