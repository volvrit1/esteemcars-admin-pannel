"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FiPaperclip } from "react-icons/fi";
import { MdOutlineDoneAll } from "react-icons/md";

const dummyMessages = [
  { text: "Hello! How are you?", sender: "them", seen: true },
  { text: "I am good, thanks for asking!", sender: "me", seen: true },
  { text: "What about you?", sender: "them", seen: false },
];

export default function ChatApp() {
  const [messages, setMessages] = useState(dummyMessages);
  const [selectedChat, setSelectedChat] = useState<any>({
    id: 1,
    name: "John Doe",
    messages: dummyMessages,
    online: true,
  });
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // const selectChat = (chat) => {
  //   setSelectedChat(chat);
  //   setMessages(dummyMessages);
  // };

  return (
    <div className="flex h-screen rounded-xl overflow-hidden bg-gray-100">
      {/* <div className="w-1/3 bg-white border-r flex flex-col">
        <div className="p-4 border-b text-lg font-bold bg-gray-200/80 text-black">Chats</div>
        <input
          type="text"
          placeholder="Search contacts..."
          className="p-2 border-b w-full bg-gray-50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul className="flex-1 overflow-y-auto">
          {chats.filter(chat => chat.name.toLowerCase().includes(searchTerm.toLowerCase())).map(chat => (
            <li
              key={chat.id}
              onClick={() => selectChat(chat)}
              className={`p-4 cursor-pointer flex items-center border-b hover:bg-gray-200/80 ${selectedChat?.id === chat.id ? 'bg-gray-300' : ''}`}
            >
              <div className="relative w-10 h-10 bg-gray-400/50 rounded-full flex items-center justify-center text-primary font-bold mr-4">
                {chat.name.charAt(0)}
                {chat.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></span>}
              </div>
              {chat.name}
            </li>
          ))}
        </ul>
      </div> */}
      <div className="w-full flex flex-col">
        {selectedChat ? (
          <>
            <div className="p-4 border-b flex items-center bg-primary text-black">
              <div className="relative w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center font-bold mr-4">
                {selectedChat?.name.charAt(0)}
                {selectedChat?.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-gray-200"></span>
                )}
              </div>
              <div>
                <h2 className="text-lg font-bold text-white ">
                  {selectedChat?.name}
                </h2>
                <span className="ml-2 text-sm text-gray-200">
                  {selectedChat?.online ? "Online" : "Offline"}
                </span>
              </div>
            </div>
            <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 my-2 max-w-xs rounded-lg ${
                    msg.sender === "me"
                      ? "ml-auto bg-gray-300 text-black"
                      : "bg-white"
                  }`}
                >
                  {msg.text}
                  {msg.sender === "me" && msg.seen && (
                    <MdOutlineDoneAll className="inline ml-1 text-blue-500" />
                  )}
                </div>
              ))}
            </div>
            <div className="p-4 bg-white flex items-center">
              <label className="cursor-pointer p-3 mr-2 text-gray-700">
                <FiPaperclip size={24} />
                <input type="file" className="hidden" />
              </label>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow p-3 border rounded-full bg-gray-50"
                placeholder="Type your message..."
              />
              <button className="ml-2 p-3 bg-gray-300 text-black rounded-full">
                ➤
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-grow text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
