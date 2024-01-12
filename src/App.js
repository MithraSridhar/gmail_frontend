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


function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
  const [emails, setEmails] = useState([]);

  console.log("emails", emails);
  useEffect(() => {
     axios.get(`${API}/emails`).then((emails) =>
     setEmails(emails.data)
     )
  }, []);
//console.log(emails)
  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div className="app">
          <Header />
          <div className="app-body">
            <Sidebar emails={emails} />
            <Routes>
            <Route path="/mail" element={<Mail />} />
            <Route path="/" element={<EmailList emails={emails} />}/>
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
