import { createContext, useReducer } from "react";

export const FeedbackContext = createContext();

export const feedbackReducer = (state, action) => {
  switch (action.type) {
    case "SET_FEEDBACK":
      return {
        ...state,
        feedbacks: action.payload,
      };
    case "CREATE_FEEDBACK":
      return {
        ...state,
        feedbacks: [action.payload, ...state.feedbacks],
      };
    case "DELETE_FEEDBACK":
      return {
        feedbacks: state.feedbacks.filter(
          (feed) => feed._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const FeedbackContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(feedbackReducer, {
    feedbacks: [],
  });
  return (
    <FeedbackContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FeedbackContext.Provider>
  );
};
