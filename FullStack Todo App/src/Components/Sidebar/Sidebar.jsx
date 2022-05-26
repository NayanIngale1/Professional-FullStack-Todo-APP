//import useState hook to create menu collapse state
import React, { useState } from "react";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import AdfScannerOutlinedIcon from "@mui/icons-material/AdfScannerOutlined";
import {
  FiHome,
  FiLogOut,
  FiLogIn,
  FiGrid,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../../Redux/User/action";

const Sidebar = () => {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(true);

  const [activeProp, setActiveProp] = useState({
    home: true,
    all: false,
    personal: false,
    official: false,
    others: false,
    add: false,
  });

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // console.log("user:", user);

  return (
    <>
      <div id="sidebar">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader id="sidebarHeader">
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              {user.loggedin ? (
                <p>{user.user.users.name} </p>
              ) : (
                <p>{menuCollapse ? "TODO" : "TODO APP"}</p>
              )}
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem
                active={activeProp.home}
                icon={<FiHome />}
                onClick={() => {
                  setActiveProp({
                    ...activeProp,
                    home: true,
                    personal: false,
                    official: false,
                    others: false,
                    all: false,
                    add: false,
                  });
                  navigate("/");
                }}
              >
                Home
              </MenuItem>

              <MenuItem
                active={activeProp.all}
                icon={<FaList />}
                onClick={() => {
                  setActiveProp({
                    home: false,
                    personal: false,
                    official: false,
                    others: false,
                    all: true,
                  });
                  navigate("/alltodos");
                }}
              >
                ALL
              </MenuItem>
              <MenuItem
                active={activeProp.personal}
                icon={<FaRegHeart />}
                onClick={() => {
                  setActiveProp({
                    home: false,
                    personal: true,
                    official: false,
                    others: false,
                    all: false,
                  });
                  navigate("/personaltodos");
                }}
              >
                Personal
              </MenuItem>
              <MenuItem
                active={activeProp.official}
                icon={<AdfScannerOutlinedIcon />}
                onClick={() => {
                  setActiveProp({
                    home: false,
                    personal: false,
                    official: true,
                    others: false,
                    all: false,
                  });
                  navigate("/officialtodos");
                }}
              >
                Official
              </MenuItem>
              <MenuItem
                active={activeProp.others}
                icon={<FiGrid />}
                onClick={() => {
                  setActiveProp({
                    home: false,
                    personal: false,
                    official: false,
                    others: true,
                    all: false,
                  });
                  navigate("/othertodos");
                }}
              >
                Others
              </MenuItem>
              <MenuItem
                active={activeProp.add}
                icon={<RiPencilLine />}
                onClick={() => {
                  setActiveProp({
                    home: false,
                    personal: false,
                    official: false,
                    others: false,
                    add: true,
                    all: false,
                  });
                  navigate("/newtask");
                }}
              >
                Add Task
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              {user.loggedin ? (
                <>
                  <MenuItem
                    icon={<FiLogOut />}
                    onClick={() => {
                      localStorage.removeItem("TodoUser");
                      dispatch(logOutUser());
                    }}
                  >
                    Logout
                  </MenuItem>
                  <p style={{ color: "gray", fontSize: "12px" }}>
                    Copyright @ Nayan, 2022
                  </p>
                </>
              ) : (
                <>
                  <MenuItem
                    icon={<FiLogIn />}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </MenuItem>
                  <p style={{ color: "gray", fontSize: "12px" }}>
                    Copyright @ Nayan, 2022
                  </p>
                </>
              )}
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Sidebar;
