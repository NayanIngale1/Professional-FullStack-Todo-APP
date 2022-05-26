import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";

export default function Loading() {
  const { loading } = useSelector((state) => state.todo);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}       
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
