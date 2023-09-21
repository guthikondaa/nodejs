import React from "react";
import { Typography } from "@material-ui/core";

const GreetingMessage = ({ userName }) => {
  const greetingMessage = `Hello ${userName}, please provide a name to create an ocpo project.`;

  return (
    <Typography variant="body1" align="left" style={{ marginBottom: "10px", color: "#EE5300" }}>
      Chatbot: {greetingMessage}
    </Typography>
  );
};

export default GreetingMessage;
