import './App.css';
import Login from './components/Login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Mail from "./components/Mail";
import EmailList from "./components/EmailList";
import SendMail from "./components/Sendmail";
import { useSelector } from "react-redux";
import { selectSendMessageIsOpen } from "./redux/emailSlice";
import { selectUser } from "./redux/userSlice";
import SentEmail from './components/SentEmail';


function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
 

  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div className="app">
          <Header />
          <div className="app-body">
            <Sidebar  />
            <Routes>
            <Route path="/" element={<EmailList />}/>
            <Route path="/mail" element={<Mail />} />           
            <Route path="/sentEmail" element={<SentEmail  />}/>
            </Routes>
          </div>

          {sendMessageIsOpen && <SendMail />}
        </div>
      )}
    </Router>
   
  );
}

export default App;
