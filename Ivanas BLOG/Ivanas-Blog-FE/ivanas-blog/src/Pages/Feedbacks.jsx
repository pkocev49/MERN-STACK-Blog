import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFeedbackContext } from "../Hooks/useFeedbacksContext";
import { useAuthContext } from "../Hooks/useAuthContext";
const Feedbacks = () => {
  const { feedbacks, dispatch } = useFeedbackContext();
  const { user } = useAuthContext();
  // const { feedbackId } = useParams();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/feedback");
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error fetching feedbacks:", errorData);
          return;
        }
        const json = await response.json();
        console.log("feedbacks", json);
        dispatch({ type: "SET_FEEDBACK", payload: json });
      } catch (error) {
        console.log("Error fetching feedbacks", error);
      }
    };
    fetchFeedbacks();
  }, []);
  const handleDelete = async (feedbackId) => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/feedback/${feedbackId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error deleting feedback:", errorData);
        return;
      }

      // Fetch the updated list of feedbacks

      const json = await response.json(); // Use updatedResponse.json() instead of response.json()

      if (response.ok) {
        dispatch({ type: "DELETE_FEEDBACK", payload: json }); // Use json instead of updatedJson
      }
    } catch (error) {
      console.error("Error in handleDelete:", error);
    }
  };
  return (
    <div>
      <div>
        {feedbacks &&
          feedbacks.map((feedback) => (
            <div key={feedback._id}>
              <h1>{feedback.subject}</h1>
              <p>{feedback.message}</p>
              <span>Left By:{feedback.fullName}</span>
              {user && (
                <div>
                  <span>Email:{feedback.email}</span>
                  {user && (
                    <button onClick={() => handleDelete(feedback._id)}>
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Feedbacks;
