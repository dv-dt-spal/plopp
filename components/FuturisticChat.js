import React, { useState } from 'react';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import ReactMapGL from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import Map, {Marker} from 'react-map-gl';
import { getOpenAIResponse } from '../helpers/openai';
import axios from 'axios'; // <-- Import axios


const REACT_APP_MAP_BOX_TOKEN = process.env.REACT_APP_MAP_BOX_TOKEN;
const REACT_APP_OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #222;
  padding: 20px;
`;

const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  color: #fff;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background-color: #333;
  color: #fff;
  padding: 10px;
  border-radius: 20px;
  outline: none;
`;

const MapContainer = styled.div`
  flex: 1;
`;

// const FuturisticChat = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [viewport, setViewport] = useState({
//     latitude: 37.7749,
//     longitude: -122.4194,
//     zoom: 10,
//   });

//   const handleSendMessage = () => {
//     setMessages([...messages, inputValue]);
//     setInputValue('');
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

// working 2
// const FuturisticChat = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [viewport, setViewport] = useState({
//     latitude: 37.7749,
//     longitude: -122.4194,
//     zoom: 10,
//   });

//   const handleSendMessage = async () => {
//     setMessages([...messages, { text: inputValue, sender: 'user' }]);
//     setInputValue('');

//     const aiResponse = await getOpenAIResponse(inputValue);
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { text: aiResponse, sender: 'ai' },
//     ]);
//   };


async function sendMessageToGPT3(message) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${REACT_APP_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // or any other model, like "text-curie-002"
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    }),
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", requestOptions);
    const data = await response.json();
    console.log(data)
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      return "I'm sorry, I couldn't generate a response.";
    }
  } catch (error) {
    console.error("Error:", error);
    return "An error occurred while processing your request.";
  }
}

// sendMessageToGPT3("can you give the coordinates for top things to do in San Francisco")
//   .then((response) => console.log(response))
//   .catch((error) => console.error(error));


const FuturisticChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 10,
  });

const handleSendMessage = async () => {
  setMessages((prevMessages) => [
    ...prevMessages,
    { text: inputValue, sender: 'Adventurer' },
  ]);
  setInputValue('');

  try {
    const assistantResponse = await sendMessageToGPT3(inputValue);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: assistantResponse, sender: 'Plopp' },
    ]);
  } catch (error) {
    console.error('Error fetching assistant response:', error.message);
  }
};

    const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };


  return (
    <>
      <Global
        styles={css`
          body {
            margin: 0;
            font-family: 'Arial', sans-serif;
          }
        `}
      />
      <Container>
        <ChatContainer>

          <MessageList>
            {messages.map((message, index) => (
              <div key={index}>
                <span>{message.sender}: </span>
                <span>{message.text}</span>
              </div>
            ))}
          </MessageList>
          <InputContainer>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
            />
          </InputContainer>
        </ChatContainer>
        <Map
        initialViewState={{
          latitude: 37.8,
          longitude: -122.4,
          zoom: 14
        }}
        width="100%"
        height="100%"
        // style={{width: 800, height: 600}}
        mapStyle="mapbox://styles/ozyphus/clfrjwcxi002b01llomz55wav"
        mapboxAccessToken={REACT_APP_MAP_BOX_TOKEN}
      >
        <Marker longitude={-122.4} latitude={37.8} color="red" />
      </Map>
      </Container>
    </>
  );
};


export default FuturisticChat;
