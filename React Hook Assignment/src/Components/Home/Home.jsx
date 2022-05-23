import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../Redux/User/action";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("TodoUser"));
    if (user) {
      dispatch(addUser(user));
    }
  }, []);
  return (
    <div>
      <h1>Welcome To Home</h1>
    </div>
  );
};

export default Home;
