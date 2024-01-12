import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeSendMessage } from "./../redux/emailSlice";
import axios from "axios";
import { API } from "../global";
import { useNavigate } from "react-router-dom";

function Sendmail() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (formData) => {
    console.log(formData);
    const userData = JSON.parse(localStorage.getItem("user_data"));
    console.log("userData", userData);
    console.log(userData[0]);
    console.log(userData[1]);
    console.log(userData[2]);
    const newEmail = {
      emailTo: formData.to,
      emailFrom: userData[1],
      senderName: userData[0],
      emailSubject: formData.subject,
      emailContent: formData.message,
    };
    console.log("newEmail", newEmail);
    await axios
      .post(`${API}/emails/newEmail`, newEmail)
      .then((res) => console.log(res));
    dispatch(closeSendMessage());
    navigate("/");
  };

  return (
    <div className="sendMail">
      <div className="sendMail-header">
        <h3>New Message</h3>
        <CloseIcon
          onClick={() => dispatch(closeSendMessage())}
          className="sendMail-close"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="to"
          placeholder="To"
          type="email"
          {...register("to", { required: true })}
        />
        {errors.to && <p className="sendMail-error">To is Required!</p>}
        <input
          name="subject"
          placeholder="Subject"
          type="text"
          {...register("subject", { required: true })}
        />
        {errors.subject && (
          <p className="sendMail-error">Subject is Required!</p>
        )}
        <input
          name="message"
          placeholder="Message"
          type="text"
          className="sendMail-message"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <p className="sendMail-error">Message is Required!</p>
        )}
        <div className="sendMail-options">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="sendMail-send"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Sendmail;
