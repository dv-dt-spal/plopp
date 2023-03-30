import React, { useState } from 'react';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import ReactMapGL from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import Map, {Marker} from 'react-map-gl';

const REACT_APP_MAP_BOX_TOKEN = process.env.REACT_APP_MAP_BOX_TOKEN;

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

const FuturisticChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 10,
  });

  const handleSendMessage = () => {
    setMessages([...messages, inputValue]);
    setInputValue('');
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
              <div key={index}>{message}</div>
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
