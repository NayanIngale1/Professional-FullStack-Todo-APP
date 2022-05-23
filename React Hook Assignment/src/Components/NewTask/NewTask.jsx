import React from "react";
import "./NewTask.css";
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

const NewTask = () => {
  return (
    <>
      {" "}
      <Typography variant="h4" component="p" m="10px auto">
        Add New Todo
      </Typography>
      <div className="newtask_page">
        <div className="newTask_page_section">
          <TextField
            id="outlined-basic"
            label="Todo title"
            variant="outlined"
            size="small"
            name="title"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            name="description"
          />
        </div>
        <div className="newTask_page_section">
          <Box component="div" className="small_flex_box">
            <TextField
              id="outlined-basic"
              label="Sub task"
              variant="outlined"
              size="small"
              name="title"
              onChange={(e) => handleChange(e)}
            />
            <Button variant="contained" onClick={(e) => {}}>
              {" "}
              Add{" "}
            </Button>
          </Box>
          <Box component="div" display="flex" alignItems="center">
            <Checkbox />
            <Typography component="p">Sign In</Typography>
            <IconButton aria-label="delete">
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        </div>
        <div className="newTask_page_section">
          <Box component="div" display="flex" alignItems="center">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Todo Status
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="todo"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="todo"
                  control={<Radio />}
                  label="Todo"
                />
                <FormControlLabel
                  value="progress"
                  control={<Radio />}
                  label="In Progress"
                />
                <FormControlLabel
                  value="done"
                  control={<Radio />}
                  label="Done"
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
                control={<Checkbox defaultChecked />}
                label="Official"
              />
              <FormControlLabel control={<Checkbox />} label="Personal" />
              <FormControlLabel control={<Checkbox />} label="Others" />
            </FormGroup>
          </Box>
        </div>
        <Button variant="contained" onClick={(e) => {}}>
          <h2>Add Todo</h2>
        </Button>
      </div>
    </>
  );
};

export default NewTask;
