import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import React, { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RedoIcon from "@mui/icons-material/Redo";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardHideIcon from "@mui/icons-material/KeyboardHide";
import SettingsIcon from "@mui/icons-material/Settings";
import InboxIcon from "@mui/icons-material/Inbox";
import PeopleIcon from "@mui/icons-material/People";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Section from "./Section";
import EmailRow from "./EmailRow";
import moment from "moment";
import axios from "axios";
import { API } from "../global";
import CircularProgress from '@mui/material/CircularProgress';


function SentEmail() {
  const [sentEmails, setSentEmails] = useState([]);
  const [isBusy,setIsBusy] = useState(false); ;


  const userData = JSON.parse(localStorage.getItem("user_data"));

  const userSentEmail = {
    emailFrom: userData[1],
  };


const getUserEmailSent = ()=>{
  setIsBusy(true);
  axios
      .post(`${API}/emails/getUserSentEmail`, userSentEmail)
      .then((emails) => {
        setSentEmails(emails.data);
        setIsBusy(false)
  } 
  )
  
}
  useEffect(() => {
    getUserEmailSent();
  }, []);

  return (
    <div className="emailList">
      <div className="emailList-settings">
        <div className="emailList-settingsLeft">
          <Checkbox />
          <IconButton>
            <ArrowDropDownIcon />
          </IconButton>
          <IconButton>
            <RedoIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className="emailList-settingsRight">
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
          <IconButton>
            <KeyboardHideIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>
      <div className="emailList-sections">
        <Section Icon={InboxIcon} title="Primary" color="red" selected />
        <Section Icon={PeopleIcon} title="Social" color="#1A73E8" />
        <Section Icon={LocalOfferIcon} title="Promotions" color="green" />
      </div>
{isBusy? ( <div class="loader"> <CircularProgress/> </div>) :(<div className="emailList-list">
        {sentEmails.map((email) => (
          <EmailRow
            id={email._id}
            key={email._id}
            title={email.emailTo}
            subject={email.emailSubject}
            description={email.emailContent}
            time={moment(email.emailDateTime).format("MMMM Do YYYY, h:mm:ss a")}
          />
        ))}
      </div>) }
      

    </div>
  );
}

export default SentEmail;
