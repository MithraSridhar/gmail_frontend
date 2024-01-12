import './App.css';
import Login from './components/Login'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Mail from "./components/Mail";
import EmailList from "./components/EmailList";
import SendMail from "./components/Sendmail";
import { useSelector } from "react-redux";
import { selectSendMessageIsOpen } from "./redux/emailSlice";
import { selectUser } from "./redux/userSlice";
import React, { useEffect, useState } from "react";
import {API} from './global'
import axios from 'axios';
import { set } from 'react-hook-form';
import SentEmail from './components/SentEmail';


function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
  const [emails, setEmails] = useState([]);

  console.log("emails", emails);
  const userData = JSON.parse(localStorage.getItem('user_data'));
  const userEmail = {
    emailTo: userData[1]
};
console.log("userEmail",userEmail)
  useEffect(() => {
     axios.post(`${API}/emails/getUserEmail`,userEmail).then((emails) =>
     setEmails(emails.data)
     )
  }, []);
//console.log(emails)


const [sentEmails, setSentEmails] = useState([]);

console.log("sentEmails", sentEmails);
const userSentEmail = {
  emailFrom: userData[1]
};
console.log("userSentEmail",userSentEmail)
useEffect( () => {
   axios.post(`${API}/emails/getUserSentEmail`,userSentEmail).then((emails) =>
   setSentEmails(emails.data)
   )
}, []);
console.log(sentEmails)

  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div className="app">
          <Header />
          <div className="app-body">
            <Sidebar emails={emails} sentEmails={sentEmails} />
            <Routes>
            <Route path="/" element={<EmailList emails={emails} />}/>
            <Route path="/mail" element={<Mail />} />           
            <Route path="/sentEmail" element={<SentEmail  />}/>

{/*              
              <Route path="/mail">
                <Mail /> </Route>
             
              <Route path="/" exact>
                <EmailList emails={emails} />
              </Route> */}

            </Routes>
          </div>

          {sendMessageIsOpen && <SendMail />}
        </div>
      )}
    </Router>
   
  );
}

export default App;
