import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppsIcon from '@mui/icons-material/Apps';
import IconButton from '@mui/material/IconButton';
//import { AccountCircleIcon, AppsIcon } from "@mui/icons-material/core";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "./../redux/userSlice";
import { auth } from "./../config/firebase";

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(logout());
    });
  };

  return (
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
        <AccountCircleIcon onClick={signOut} src={user?.photoUrl} />
      </div>
    </div>
  );
}

export default Header;