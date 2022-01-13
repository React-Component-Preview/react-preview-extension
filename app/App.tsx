import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";

import Preview from "./panels/PreviewPanel";
import ControlPanel from "./panels/ControlPanel";
import Header from "./panels/Header";
import Popup from "./components/Shared/Popup";

const App = () => {
  const [eventMessage, setEventMessage] = useState("");
  const [currentComponentName, setCurrentComponentName] = useState("");
  const [propList, setPropList] = useState([]);

  const messageHandler = useCallback(() => {
    window.addEventListener("message", (message: MessageEvent<any>) => {
      const data = message.data;

      switch (data.command) {
        case "updateComponent":
          setPropList(data.propList);
          setCurrentComponentName(data.currentComponentName);
        case "previewEvent":
          setEventMessage(data.eventMessage);
      }
    });
  }, []);

  useEffect(() => {
    messageHandler();
  });

  const handleEventPopupVisibility = (isVisible: boolean) => {
    if (!isVisible) {
      setEventMessage("");
    }
  };

  return (
    <Wrapper>
      <Header componentName={currentComponentName} />
      <Preview />
      <ControlPanel propList={propList} />
      {eventMessage && (
        <Popup message={eventMessage} duration={2000} setIsVisible={handleEventPopupVisibility} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

export default App;
