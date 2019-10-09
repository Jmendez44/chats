import React from "react";
import io from "socket.io-client";

export const CTX = React.createContext();

/*
  msg{
    from: 'user
    msg: 'hi'
    topic: 'general'
  }

  state{
    topic1: [
      {msg},{msg},{msg}
    ]
    topic2: [
      {msg},{msg},{msg}
    ]
    topic3: [
      {msg},{msg},{msg}
    ]
  }

*/

const initState = {
  General: [
    { from: "user", msg: "hi", topic: "general" },
    { from: "user2", msg: "hi", topic: "general" },
    { from: "user3", msg: "hi", topic: "general" }
  ],
  Topic2: [
    { from: "user", msg: "hi", topic: "general" },
    { from: "user", msg: "hi", topic: "general" },
    { from: "user", msg: "hi", topic: "general" }
  ]
};

const reducer = (state, action) => {
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [topic]: [
          ...state[topic],
          {
            from,
            msg
          }
        ]
      };
    default:
      return state;
  }
};

let socket;

const sendChatAction = value => {
  socket.emit("chat message", value);
};

const Store = props => {
  const [allChats, dispatch] = React.useReducer(reducer, initState);
  if (!socket) {
    socket = io(":3001");
    socket.on("chat message", function(msg) {
      dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
    });
  }

  const user = "jay" + Math.random(100).toFixed(2);

  return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </CTX.Provider>
  );
};

export default Store;
