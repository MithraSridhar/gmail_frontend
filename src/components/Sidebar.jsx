import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import InboxIcon from "@mui/icons-material/Inbox";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import NearMeIcon from "@mui/icons-material/NearMe";
import NoteIcon from "@mui/icons-material/Note";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import DuoIcon from "@mui/icons-material/Duo";
import PhoneIcon from "@mui/icons-material/Phone";
import SidebarOption from "./SideBarOption";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openSendMessage } from "./../redux/emailSlice"
import SentEmail from './SentEmail';
import  { useEffect, useState } from "react";
import axios from 'axios';
import { API } from '../global';
import { useNavigate } from "react-router-dom"


function Sidebar({ emails , sentEmails}) {
  console.log(emails.length)
  console.log(sentEmails.length)
  const dispatch = useDispatch();

const navigate = useNavigate();
  return (
    <div className="sidebar">
      <Button
        className="sidebar-compose"
        onClick={() => dispatch(openSendMessage())}
        startIcon={<AddIcon fontSize="large" />}
      >
        Compose
      </Button>
      <Link to="/" className="sidebar-link">
        <SidebarOption
          Icon={InboxIcon}
          title="Inbox"
          number={emails.length}
          selected={true}
          onClick={()=> navigate("/")}    
        />
      </Link>

      <SidebarOption Icon={StarIcon} title="Starred" number={12} />
      <SidebarOption Icon={AccessTimeIcon} title="Snoozed" number={9} />
      <SidebarOption Icon={LabelImportantIcon} title="Important" number={12} />

      <Link to="/sentEmail" className="sidebar-link">
        <SidebarOption
          Icon={NearMeIcon}
          title="Sent"
          number={sentEmails.length}
          onClick={()=> navigate("/sentEmail")}        
        />
      </Link>
     {/* <SidebarOption Icon={NearMeIcon} title="Sent" number={81} onClick={<SentEmail/>}/> */}


      <SidebarOption Icon={NoteIcon} title="Drafts" number={5} />
      <SidebarOption Icon={ExpandMoreIcon} title="More" />

      <div className="sidebar-footer">
        <div className="sidebar-footerIcons">
          <IconButton>
            <PersonIcon />
          </IconButton>
          <IconButton>
            <DuoIcon />
          </IconButton>
          <IconButton>
            <PhoneIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;