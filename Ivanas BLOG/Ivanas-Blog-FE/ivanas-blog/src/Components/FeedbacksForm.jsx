import React, { useState } from "react";
import { useFeedbackContext } from "../Hooks/useFeedbacksContext";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
const FeedbacksForm = () => {
  const navigate = useNavigate();
  const { dispatch } = useFeedbackContext();
  const { user } = useAuthContext();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedback = { fullName, email, subject, message };
    const response = await fetch("http://localhost:4000/api/feedback", {
      method: "POST",
      body: JSON.stringify(feedback),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json, "json");
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setFullName("");
      setEmail("");
      setSubject("");
      setMessage("");
      navigate("/");
      dispatch({ type: "CREATE_FEEDBACK", payload: json });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add a Feedback about my Blog</h1>
      <label>Subject</label>
      <input
        type="text"
        onChange={(e) => {
          setSubject(e.target.value);
        }}
      />
      <label>Message</label>
      <textarea
        type="text"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <label>Enter you name</label>
      <input
        type="text"
        onChange={(e) => {
          setFullName(e.target.value);
        }}
      />
      <label>Enter your email</label>
      <input
        type="text"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
};

export default FeedbacksForm;
