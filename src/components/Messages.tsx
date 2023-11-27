/*
import React from "react";
import "./Projects.css";
import { Link } from "react-router-dom";

import MainLayout from "./MainLayout";

interface User {
  name: string;
  email: string;
}

interface MessagesProps {
  user: User;
  onLogout: () => void;
}

const Messages: React.FC<MessagesProps> = ({ user, onLogout }) => {
  return (
    <MainLayout user={user} onLogout={onLogout}>
      <div>Messages</div>
    </MainLayout>
  );
};

export default Messages;
*/ 
/*
import React, { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "./MainLayout";
import "./Projects.css";
import "./Messages.css";


interface User {
  name: string;
  email: string;
}


interface Message {
  senderEmail: string;
  recipientEmail: string;
  messageContent: string;
 
}


interface MessagesProps {
  user: User;
  onLogout: () => void;
}


const Messages: React.FC<MessagesProps> = ({ user, onLogout }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [showFiltered, setShowFiltered] = useState(false);
  const [newRecipient, setNewRecipient] = useState('');
  const [newMessage, setNewMessage] = useState('');


  useEffect(() => {
    axios.get(`/api/messages?email=${user.email}`)
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => console.error('Error fetching messages:', error));
  }, [user.email]);


  const handleSendMessage = () => {
    if (!newRecipient || !newMessage) return;


    axios.post('/api/messages', {
      senderEmail: user.email,
      recipientEmail: newRecipient,
      messageContent: newMessage
    })
    .then(() => {
      setNewRecipient('');
      setNewMessage('');
     
    })
    .catch(error => console.error('Error sending message:', error));
  };


  const handleSearch = () => {
    const filtered = messages.filter(message =>
      message.messageContent.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMessages(filtered);
    setShowFiltered(true);
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
};


const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
};


  const inboxMessages = messages.filter(message => message.recipientEmail === user.email);
  const sentMessages = messages.filter(message => message.senderEmail === user.email);


  return (
    <MainLayout user={user} onLogout={onLogout}>
      <div className="MessagesRoot">
      <div className="SearchContainer">
                <input
                    type="text"
                    placeholder="Search Messages"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <img
                    src={searchIcon}
                    alt="Search Icon"
                    className="SearchIcon"
                    onClick={handleSearch}
                />
            </div>
        <div className="LeftPane">
          <h1>Messages for {user.name}</h1>
          <div className="NewMessageContainer">
            <input
              type="text"
              placeholder="Recipient"
              value={newRecipient}
              onChange={(e) => setNewRecipient(e.target.value)}
            />
            <textarea
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="MenuItem" onClick={handleSendMessage}>
              Send New Message
            </button>
          </div>


          <div className="MsgPane">
            {showFiltered ? (
              filteredMessages.map((message, index) => (
                <div key={index} className="Message">
                  <p>From: {message.senderEmail}</p>
                  <p>To: {message.recipientEmail}</p>
                  <p>Message: {message.messageContent}</p>
                </div>
              ))
            ) : (
              <>
                {inboxMessages.map((message, index) => (
                  <div key={index} className="Message">
                    <p>From: {message.senderEmail}</p>
                    <p>Message: {message.messageContent}</p>
                  </div>
                ))}
                {sentMessages.map((message, index) => (
                  <div key={index} className="Message">
                    <p>To: {message.recipientEmail}</p>
                    <p>Message: {message.messageContent}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};


export default Messages;
*/
/*
import React, { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "./MainLayout";
import "./Projects.css";
import searchIcon from './images/Search.png';
import NavigationBar from './NavigationBar';
import { useLocation, useNavigate , Link } from "react-router-dom";

interface User {
  name: string;
  email: string;
}


interface Message {
  senderEmail: string;
  recipientEmail: string;
  messageContent: string;
 
}


interface MessagesProps {
  user: User;
  onLogout: () => void;
}
const location = useLocation();
    // State variables, hooks
    let fullname = location.state.email.split('@')[0];
    let firstname = fullname.split('.')[0];
    let lastname = fullname.split('.')[1];
    let upperfirst = firstname.charAt(0).toUpperCase() + firstname.slice(1);
    let upperlast = lastname.charAt(0).toUpperCase() + lastname.slice(1);

    const [messages, setMessages] = useState([
        { sender: 'student1@emory.edu', recepient:  'alexandra.iotzova@emory.edu' , content: 'Hi! I would like to join your group.' },
        { sender: 'student1@emory.edu', recepient:  'alexandra.iotzova@emory.edu' , content: 'Hello, do you have any spaces left?' },
        { sender: 'alexandra.iotzova@emory.edu', recepient:  'student1@emory.edu' , content: 'Hi Alex' },
        // Add more messages as needed
    ]);

    interface Msg {
        email: string;
        message: string;
    }

    var sentMessagesArr: Msg[] = [
        { email: "alexandra.iotzova@emory.edu", message: "Hello Alex!" },
        { email: "student@emory.edu", message: "Hello Alex!" }
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMessages, setFilteredMessages] = useState([] as typeof messages); 
    const [inbox, setInbox] = useState([] as typeof messages); 
    const [sent, setSent] = useState([] as typeof messages); 
    const [showFiltered, setShowFiltered] = useState(false);
    const [newRecipient, setNewRecipient] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [showSentMsgs, setShowSentMsgs] = useState(false);
    const [showSentMessages, setSentMessages] = useState(false);

    const handleInboxMessages = () => {
        setSentMessages(false);
        setShowFiltered(false);
        setShowSentMsgs(true);
        const inb = messages.filter((message) =>
        message.recepient.toLowerCase().includes(location.state.email));
        setInbox(inb);
    }

    const handleSentMessages = () => {
        setShowSentMsgs(false);
        setShowFiltered(false);
        setSentMessages(true);
        const s = messages.filter((message) =>
        message.sender.toLowerCase().includes(location.state.email));
        setSent(s);
    }

    const handleReply = (e: React.SetStateAction<string> , b: React.SetStateAction<string> ) => {
        setNewRecipient(e);
        var re="\n"+">"+b ;
        setNewMessage(re);
    }

    const handleSearch = () => {
        // Filter messages based on the searchQuery
        setShowSentMsgs(false);
        setSentMessages(false);
        setShowFiltered(true);
        const filtered = messages.filter((message) =>
            message.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredMessages(filtered);
    };

    const handleSendMessage1 = () => {
        if (newRecipient && newMessage) {
            const message = { sender:location.state.email, recepient: newRecipient,  content: newMessage };
            setMessages([...messages, message]);
            setNewRecipient('');
            setNewMessage('');
            let newMsg: Msg = {
                email: "fff",
                message: "dfddd"
            };
            sentMessagesArr.push(newMsg);
        }
    }

const Messages: React.FC<MessagesProps> = ({ user, onLogout }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [showFiltered, setShowFiltered] = useState(false);
  const [newRecipient, setNewRecipient] = useState('');
  const [newMessage, setNewMessage] = useState('');


  useEffect(() => {
    axios.get(`/api/messages?email=${user.email}`)
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => console.error('Error fetching messages:', error));
  }, [user.email]);


  const handleSendMessage = () => {
    if (!newRecipient || !newMessage) return;


    axios.post('/api/messages', {
      senderEmail: user.email,
      recipientEmail: newRecipient,
      messageContent: newMessage
    })
    .then(() => {
      setNewRecipient('');
      setNewMessage('');
     
    })
    .catch(error => console.error('Error sending message:', error));
  };


  const handleSearch = () => {
    const filtered = messages.filter(message =>
      message.messageContent.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMessages(filtered);
    setShowFiltered(true);
  };
  const handleInboxMessages = () => {
    setSentMessages(false);
    setShowFiltered(false);
    setShowSentMsgs(true);
    const inb = messages.filter((message) =>
    message.recepient.toLowerCase().includes(location.state.email));
    setInbox(inb);
}

const handleSentMessages = () => {
    setShowSentMsgs(false);
    setShowFiltered(false);
    setSentMessages(true);
    const s = messages.filter((message) =>
    message.sender.toLowerCase().includes(location.state.email));
    setSent(s);
}


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
};


const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
};


  const inboxMessages = messages.filter(message => message.recipientEmail === user.email);
  const sentMessages = messages.filter(message => message.senderEmail === user.email);


  return (
    <MainLayout user={user} onLogout={onLogout}>
      <div className="MessagesRoot">
      <div className="SearchContainer">
                <input
                    type="text"
                    placeholder="Search Messages"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <img
                    src={searchIcon}
                    alt="Search Icon"
                    className="SearchIcon"
                    onClick={handleSearch}
                />
            </div>
            <div className="LeftPane">
                <h1>Messages for {user.name}</h1>
                <div className="NewMessageContainer">
                    <input
                        type="text"
                        placeholder="Recipient"
                        value={newRecipient}
                        onChange={(e) => setNewRecipient(e.target.value)}
                    />
                    <textarea
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button className="MenuItem" onClick={handleSendMessage}>
                        Send New Message
                    </button>
                </div>
                <button className="MenuItem" onClick={handleInboxMessages}>Inbox</button>
                <button className="MenuItem" onClick={handleSentMessages}>Sent</button>
                <div className="MsgPane">
                    {showSentMsgs && (
                        <div className="InboxPane">
                            <h1>Inbox</h1>
                            <table>
                                <tr>
                                    <th>
                                        Sender
                                    </th>
                                    <th>
                                        Content
                                    </th>
                             
                                </tr>
                                {inbox.map((message, index) => (
                                    <tr>
                                        <td key={index}>{message.sender}</td>
                                        <td key={index}>{message.content}</td>
                                        <td key={index}>
                                            <button className="MenuItem" onClick={e => handleReply(message.sender, message.content)}>
                                                Reply
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    )}
                    {showSentMessages && (
                        <div className="SentdPane">
                            <h1>Sent</h1>
                            <table>
                                <tr>
                                    <th>
                                        Recipient
                                    </th>
                                    <th>
                                        Content
                                    </th>
                                </tr>
                                {sent.map((message, index) => (
                                    <tr>
                                        <td key={index}>{message.recepient}</td>
                                        <td key={index}>{message.content}</td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </MainLayout>
  );
};


export default Messages;
*/ 
import React, { useState } from 'react';
import './Messages.css';
import searchIcon from './images/Search.png';
import NavigationBar from './NavigationBar';
import { useLocation, useNavigate , Link } from "react-router-dom";
import '../App.css'
import axios from "axios";
import MainLayout from "./MainLayout";



interface User {
  name: string;
  email: string;
}

interface MessagesProps {
  user: User;
  onLogout: () => void;
}



const Messages: React.FC<MessagesProps> = ({ user, onLogout })  =>  {
    const location = useLocation();
    // State variables, hooks
    //let fullname = location.state.email.split('@')[0];
   // let firstname = fullname.split('.')[0];
    //let lastname = fullname.split('.')[1];
    //let upperfirst = firstname.charAt(0).toUpperCase() + firstname.slice(1);
    //let upperlast = lastname.charAt(0).toUpperCase() + lastname.slice(1);

    const [messages, setMessages] = useState([
        { sender: 'student1@emory.edu', recepient:  'alexandra.iotzova@emory.edu' , content: 'Hi! I would like to join your group.' },
        { sender: 'student1@emory.edu', recepient:  'alexandra.iotzova@emory.edu' , content: 'Hello, do you have any spaces left?' },
        { sender: 'alexandra.iotzova@emory.edu', recepient:  'student1@emory.edu' , content: 'Hi Alex' },
        // Add more messages as needed
    ]);

    interface Msg {
        email: string;
        message: string;
    }

    var sentMessagesArr: Msg[] = [
        { email: "alexandra.iotzova@emory.edu", message: "Hello Alex!" },
        { email: "student@emory.edu", message: "Hello Alex!" }
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMessages, setFilteredMessages] = useState([] as typeof messages); 
    const [inbox, setInbox] = useState([] as typeof messages); 
    const [sent, setSent] = useState([] as typeof messages); 
    const [showFiltered, setShowFiltered] = useState(false);
    const [newRecipient, setNewRecipient] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [showSentMsgs, setShowSentMsgs] = useState(false);
    const [showSentMessages, setSentMessages] = useState(false);

    const handleInboxMessages = () => {
        setSentMessages(false);
        setShowFiltered(false);
        setShowSentMsgs(true);
        const inb = messages.filter((message) =>
        message.recepient.toLowerCase().includes(location.state.email));
        setInbox(inb);
    }

    const handleSentMessages = () => {
        setShowSentMsgs(false);
        setShowFiltered(false);
        setSentMessages(true);
        const s = messages.filter((message) =>
        message.sender.toLowerCase().includes(location.state.email));
        setSent(s);
    }

    const handleReply = (e: React.SetStateAction<string> , b: React.SetStateAction<string> ) => {
        setNewRecipient(e);
        var re="\n"+">"+b ;
        setNewMessage(re);
    }

    const handleSearch = () => {
        // Filter messages based on the searchQuery
        setShowSentMsgs(false);
        setSentMessages(false);
        setShowFiltered(true);
        const filtered = messages.filter((message) =>
            message.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredMessages(filtered);
    };

    /*const handleSendMessage = () => {
        if (newRecipient && newMessage) {
            const message = { sender:location.state.email, recepient: newRecipient,  content: newMessage };
            setMessages([...messages, message]);
            setNewRecipient('');
            setNewMessage('');
            let newMsg: Msg = {
                email: "fff",
                message: "dfddd"
            };
            sentMessagesArr.push(newMsg);
        }
    }
*/
const handleSendMessage = () => {
  if (!newRecipient || !newMessage) return;


  axios.post('/api/messages', {
    senderEmail: user.email,
    recipientEmail: newRecipient,
    messageContent: newMessage
  })
  .then(() => {
    setNewRecipient('');
    setNewMessage('');
   
  })
  .catch(error => console.error('Error sending message:', error));
};
     return (
      <MainLayout user = {user} onLogout = {onLogout}>
        <div className="MessagesRoot">
        <div className="LeftPane">
            <div className="SearchContainer">
                <input
                    type="text"
                    placeholder="Search Messages"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <img
                    src={searchIcon}
                    alt="Search Icon"
                    className="SearchIcon"
                    onClick={handleSearch}
                />
            </div>
            <button className="MenuItem" onClick={handleInboxMessages}>Inbox</button>
            <button className="MenuItem" onClick={handleSentMessages}>Sent</button>
            </div>
            <div className="RightPane">
                <h1>  </h1>
                <div className="NewMessageContainer">
                    <input
                        type="text"
                        placeholder="Recipient"
                        value={newRecipient}
                        onChange={(e) => setNewRecipient(e.target.value)}
                    />
                    <textarea
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button className="MenuItem" onClick={handleSendMessage}>
                        Send New Message
                    </button>
                </div>
                <div className="MsgPane">
                    {showSentMsgs && (
                        <div className="InboxPane">
                            <h1></h1>
                            <table>
                                <tr>
                                    <th>
                                        Sender
                                    </th>
                                    <th>
                                        Content
                                    </th>
                             
                                </tr>
                                {inbox.map((message, index) => (
                                    <tr>
                                        <td key={index}>{message.sender}</td>
                                        <td key={index}>{message.content}</td>
                                        <td key={index}>
                                            <button className="MenuItem" onClick={e => handleReply(message.sender, message.content)}>
                                                Reply
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    )}
                    {showSentMessages && (
                        <div className="SentdPane">
                            <h1></h1>
                            <table>
                                <tr>
                                    <th>
                                        Recipient
                                    </th>
                                    <th>
                                        Content
                                    </th>
                                </tr>
                                {sent.map((message, index) => (
                                    <tr>
                                        <td key={index}>{message.recepient}</td>
                                        <td key={index}>{message.content}</td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </MainLayout>
    );
}

export default Messages;