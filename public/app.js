(function () {
  const messages = document.querySelector("#messages");
  const wsButton = document.querySelector("#wsButton");
  const wsSendButton = document.querySelector("#wsSendButton");
  const start = document.querySelector("#start-profile");
  const stop = document.querySelector("#stop-profile");

  function showMessage(message) {
    messages.textContent += `\n${message}`;
    messages.scrollTop = messages.scrollHeight;
  }

  function handleResponse(response) {
    return response.ok
      ? response.json().then((data) => JSON.stringify(data, null, 2))
      : Promise.reject(new Error("Unexpected response"));
  }

  start.onclick = function () {
    fetch("http://localhost:3001/start", {
      method: "GET",
      credentials: "same-origin",
    })
      .then(handleResponse)
      .then(showMessage)
      .catch(function (err) {
        showMessage(err.message);
      });
  };

  stop.onclick = function () {
    fetch("http://localhost:3001/stop", {
      method: "GET",
      credentials: "same-origin",
    })
      .then(handleResponse)
      .then(showMessage)
      .catch(function (err) {
        showMessage(err.message);
      });
  };

  let ws;

  wsButton.onclick = function () {
    if (ws) {
      ws.onerror = ws.onopen = ws.onclose = null;
      ws.close();
    }

    ws = new WebSocket("ws://localhost:3001/ws");
    ws.onerror = function () {
      showMessage("WebSocket error");
    };
    ws.onopen = function () {
      showMessage("WebSocket connection established");
    };
    ws.onmessage = function (message) {
      showMessage("Server broadcast message " + message.data);
    };

    ws.onclose = function () {
      showMessage("WebSocket connection closed");
      ws = null;
    };
  };

  wsSendButton.onclick = function () {
    if (!ws) {
      showMessage("No WebSocket connection");
      return;
    }

    ws.send("Hello World!");
    showMessage('Sent "Hello World!"');
  };
})();
