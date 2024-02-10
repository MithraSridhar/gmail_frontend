import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AppsIcon from "@mui/icons-material/Apps";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "./../redux/userSlice";
import { auth } from "./../config/firebase";
import { useState } from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(logout());
    });
  };

  const userData = JSON.parse(localStorage.getItem("user_data"));
  const userName = userData[0];
  const userEmail = userData[1];

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();

  const handleClick = (newPlacement) => (event) => {
    //console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <>
      <Box sx={{ width: 500 }}>
        <Popper
          sx={{ zIndex: 1200, bgcolor: "black" }}
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <Typography
                  sx={{
                    p: 2,
                    bgcolor: "black",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  <div width="500px" height="4000px">
                    <p>{userEmail}</p>
                    <img
                      src={user?.photoUrl}
                      height="32px"
                      width="32px"
                      style={{ borderRadius: 50 }}
                      alt=""
                    ></img>
                    <p>Hi, {userName}!</p>
                    <Button variant="contained">
                      Manage your Google Account
                    </Button>
                    <br></br>
                    <br></br>
                    <Button variant="contained" onClick={signOut}>
                      Sign Out
                    </Button>
                  </div>
                </Typography>
              </Paper>
            </Fade>
          )}
        </Popper>
      </Box>
      <div className="header">
        <div className="header-left">
          <IconButton>
            <MenuIcon />
          </IconButton>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzRceIIBz4GgeNszaN5SupI6p1SJE_Bzgk3Q&usqp=CAU"
            alt="gmail logo"
          />
        </div>
        <div className="header-middle">
          <SearchIcon />
          <input type="text" placeholder="Search mail" />
          <ArrowDropDownIcon className="header-inputCaret" />
        </div>
        <div className="header-right">
          <IconButton>
            <HelpOutlineIcon />
          </IconButton>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <IconButton>
            <AppsIcon />
          </IconButton>
          <IconButton>
            <img
              onClick={handleClick("left-start")}
              src={user?.photoUrl}
              height="32px"
              width="32px"
              style={{ borderRadius: 50 }}
              alt=""
            ></img>
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default Header;
