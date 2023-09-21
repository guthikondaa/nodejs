import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Paper, Typography } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";
import { API_SERVER_INSTANCE, API_CHATBOT_SERVER_INSTANCE } from "../../config";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";
import GreetingMessage from "../greetings";

const Chatbot = ({ style, toggleChat }) => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const userName = useSelector((state) => state.username.userName);
  const projectList = useSelector((state) => state?.projectDataReducer);
  const bitbucket_name_list = projectList.map(
    (projectlist) => projectlist.tools?.bitbucket?.bitbucketName
  );
  const jira_name_list = projectList.map(
    (projectlist) => projectlist.tools?.jira?.jiraName
  );
  const key_list = projectList.map((projects) => projects.projectKey);
  const project_names_list = projectList.map((project) => project.projectName);

  const handleMessageChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUserMessage = { message: userMessage, isUser: true };
    setChatHistory([...chatHistory, { message: userMessage, isUser: true }]);
    let postData = { message: userMessage };
    const headers = {
      "Content-Type": "application/json",
    };
    setUserMessage("");
    setIsLoading(true);

    try {
      let response = await axios.post(
        API_CHATBOT_SERVER_INSTANCE + "chatbot/messages",
        postData,
        { headers }
      );
      if ("ocpo project name is" === response.data.slice(0, 20)) {
        if (project_names_list.includes(response.data.slice(21))) {
          const newChatbotResponse = {
            message:
              "OCPO project name already exists, please provide other name.",
            isUser: false,
          };
          setChatHistory([...chatHistory, newUserMessage, newChatbotResponse]);
        } else {
          const newChatbotResponse = {
            message:
              "Thank you, ocpo project is created successfully.\nChatbot: Please choose a tool, 1 - bitbucket, 2 - jira, 3 - jenkins."
                .split("\n")
                .map((str) =>
                  str.length === 62 ? str : <Typography>{str}</Typography>
                ),
            isUser: false,
          };
          postData = {
            message: "Thank you, ocpo project is created successfully",
          };
          setChatHistory([...chatHistory, newUserMessage, newChatbotResponse]);
        }
      } else if ("bitbucket project name is" === response.data.slice(0, 25)) {
        if (bitbucket_name_list.includes(response.data.slice(26))) {
          const newChatbotResponse = {
            message:
              "Bitbucket project name already exists, please provide other name.",
            isUser: false,
          };
          setChatHistory([...chatHistory, newUserMessage, newChatbotResponse]);
        } else {
          const newChatbotResponse = {
            message: "Thank you, please provide repository name.",
            isUser: false,
          };
          setChatHistory([...chatHistory, newUserMessage, newChatbotResponse]);
        }
      } else if ("jira project name is" === response.data.slice(0, 20)) {
        if (jira_name_list.includes(response.data.slice(21))) {
          const newChatbotResponse = {
            message:
              "Jira project name already exists, please provide other name.",
            isUser: false,
          };
          setChatHistory([...chatHistory, newUserMessage, newChatbotResponse]);
        } else {
          const newChatbotResponse = {
            message: "Thank you, please provide project key.",
            isUser: false,
          };
          setChatHistory([...chatHistory, newUserMessage, newChatbotResponse]);
        }
      } else if ("bitbucket project key is" === response.data.slice(0, 24)) {
        if (key_list.includes(response.data.slice(25))) {
          const newChatbotResponse = {
            message: "Project key already exists, please provide another key.",
            isUser: false,
          };
          setChatHistory([...chatHistory, newUserMessage, newChatbotResponse]);
        } else {
          const newChatbotResponse = {
            message: "Thank you, please enter yes to create project.",
            isUser: false,
          };
          setChatHistory([...chatHistory, newUserMessage, newChatbotResponse]);
        }
      } else if ("jira project key is" === response.data.slice(0, 19)) {
        if (key_list.includes(response.data.slice(20))) {
          const newChatbotResponse = {
            message: "Project key already exists, please provide another key.",
            isUser: false,
          };
          setChatHistory([...chatHistory, newUserMessage, newChatbotResponse]);
        } else {
          const newChatbotResponse = {
            message:
              "Thank you, please provide board name - scrum, kanban or basic.",
            isUser: false,
          };
          setChatHistory([...chatHistory, newUserMessage, newChatbotResponse]);
        }
      } else if (response.data[0] === "{") {
        const res = JSON.parse(response.data);
        const resp = await axios.post(
          API_SERVER_INSTANCE + "projects/project-onboarding",
          res,
          { headers }
        );
        if ("bitbucket" in res.tools) {
          const newChatbotResponse = {
            message: "Thank you bitbucket project is successfully created.",
            isUser: false,
          };
          setChatHistory([...chatHistory, newUserMessage, newChatbotResponse]);
        } else if ("jira" in res.tools) {
          const newChatbotResponse = {
            message: "Thank you jira project is successfully created.",
            isUser: false,
          };
          setChatHistory([...chatHistory, newUserMessage, newChatbotResponse]);
        }
        else{
          const newChatbotResponse = {
            message: "Thank you jenkins item is successfully created.",
            isUser: false,
          };
          setChatHistory([...chatHistory, newUserMessage, newChatbotResponse]);
        }

        const response_bitbucket = await axios.post(
          API_SERVER_INSTANCE + "launch/provision/" + res.projectName,
          res,
          { headers }
        );

        toggleChat();
      } else {
        const newChatbotResponse = { message: response.data, isUser: false };
        setChatHistory([...chatHistory, newUserMessage, newChatbotResponse]);
      }
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chatHistory]);

  const theme = createTheme({
    palette: {
      primary: orange,
    },
  });

  return (
    <Paper
      elevation={3}
      style={{
        ...style,
        padding: "20px",
        maxWidth: "600px",
        margin: "20px auto",
        height: "560px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        style={{ color: "#F26522" }}
      >
        CHATBOT
      </Typography>
      <div ref={chatContainerRef} style={{ flex: 1, overflowY: "auto" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "auto",
          }}
        >
          <GreetingMessage userName={userName} />
          {chatHistory.map((item, index) => (
            <Typography
              key={index}
              variant="body1"
              align={item.isUser ? "right" : "left"}
              style={{
                marginBottom: "10px",
                color: item.isUser ? "#044BD1" : "#EE5300",
              }}
            >
              {item.isUser ? "You: " : "Chatbot: "}
              {item.message}
            </Typography>
          ))}
        </div>
        {isLoading && (
          <div style={{ textAlign: "center" }}>
            <ReactLoading type="cylon" color="orange" height={100} width={50} />
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Type your message"
          value={userMessage}
          onChange={handleMessageChange}
        />
        <ThemeProvider theme={theme}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<SendIcon />}
            style={{ marginLeft: "10px" }}
          >
            Send
          </Button>
        </ThemeProvider>
      </form>
    </Paper>
  );
};

export default Chatbot;
