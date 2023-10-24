import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/forgot-password`,
        {
          email,
          newPassword,
          answer,
        }
      );

      if (res.data.success) {
        toast.success("res.data.message");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Forgot Password"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">Reset Password</h4>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="newPassword"
              placeholder="Enter Your New Password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="answer"
              placeholder="What is your favorite food?"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
