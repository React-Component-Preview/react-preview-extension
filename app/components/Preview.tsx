import React, { useRef, useEffect, useState } from "react";

interface Props {
  port?: number;
}

function Preview({ port = 9132 }: Props) {
  const [previewReady, setPreviewReady] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    window.addEventListener("message", (event) => {
      const message = event.data;

      switch (message.command) {
        case "previewReady":
          setPreviewReady(true);
        case "previewNotReady":
          setPreviewReady(false);
      }
    });
  }, []);

  return (
    <div>
      {previewReady ? <iframe ref={iframeRef} src={`http://localhost:${port}`}></iframe> : <div>Preview Not Ready</div>}
      <iframe ref={iframeRef} src={`http://localhost:9132`}></iframe>
    </div>
  );
}

export default Preview;
