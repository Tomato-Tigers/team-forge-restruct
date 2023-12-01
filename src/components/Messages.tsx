import React, { useState, useEffect } from 'react';
import './Messages.css';
import searchIcon from './images/Search.png';
import { useLocation, useNavigate , Link } from "react-router-dom";
import '../App.css'
import axios from "axios";
import MainLayout from "./MainLayout";

interface User {
    name: string;
    email: string;
  }
  
  interface Message {
    
    senderEmail: string;
    recipientEmail: string;
    content: string;
    createdAt: string;
  }
  
  interface MessagesProps {
    user: User;
    onLogout: () => void;
  }
  
  const Messages: React.FC<MessagesProps> = ({ user, onLogout }) => {
    console.log("Messages component rendered");
    console.log("User Object in Messages:", user);

    const [inbox, setInbox] = useState<Message[]>([]);
    const [sentMessages, setSentMessages] = useState<Message[]>([]);
     const [newRecipient, setNewRecipient] = useState('');
     const [messageContent, setMessageContent] = useState(''); // Message content 
    const [searchQuery, setSearchQuery] = useState('');
    const [showOutgoingMsgs, setShowOutgoingMsgs] = useState(true);
    const [showSentMsgs, setShowSentMsgs] = useState(false);
    const [recipientEmail, setRecipientEmail] = useState(''); // Declare recipientEmail
    
    /*const getJWTHeader = () => {
        const token = localStorage.getItem('jwt');
        return token ? { Authorization: `Bearer ${token}` } : {};
      }; */


      const fetchInbox = async () => {
        try {
            const response = await axios.get(`/api/inbox?email=${user.email}`);
            console.log('Inbox messages fetched:', response.data.messages);
            setInbox(response.data.messages);
        } catch (error) {
            console.error('Error fetching inbox:', error);
        }
    };
    
    const fetchSentMessages = async () => {
        try {
            const response = await axios.get(`/api/sent?email=${user.email}`);
            console.log('Sent messages fetched:', response.data.messages);
            setSentMessages(response.data.messages);
        } catch (error) {
            console.error('Error fetching sent messages:', error);
        }
    };
    
    

    const handleSendMessage = async () => {
        console.log("Send Message Clicked with:", { recipientEmail, messageContent });
    
        if (!recipientEmail || !messageContent) return;
    
        try {
            console.log("Preparing to send message via axios");
            const response = await axios.post('/api/send', {
                senderEmail: user.email,
                recipientEmail,
                content: messageContent
            });
            console.log("Axios post request sent, response:", response.data);
    
            setRecipientEmail('');
            setMessageContent('');
            fetchSentMessages(); // Refresh sent messages list
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    
      

      const handleSearch = async () => {
        // Logic to filter messages based on search query
        // This can be implemented either by filtering the existing state or by making a new API call
      };
    
      // Handle displaying inbox messages
      const handleInboxMessages = () => {
        setShowOutgoingMsgs(false);
        setShowSentMsgs(false);
        fetchInbox();
      };

      
      const handleSentMessages = () => {
        setShowOutgoingMsgs(false);
        setShowSentMsgs(true);
        fetchSentMessages();
      };

      const handleBackOriginal = () => {
        setShowOutgoingMsgs(true);
        setShowSentMsgs(false);
      };

  const handleReply = (senderEmail: string, originalMessage: string) => {
    // Set up reply logic
    setRecipientEmail(senderEmail);
    // Optional: Prefill reply message or set up state for reply
  };


  useEffect(() => {
    console.log("User Object:", user);
    fetchInbox();
    fetchSentMessages();
  }, []); // Dependency array is empty, so this runs once on mount

  return (
    <MainLayout user={user} onLogout={onLogout}>
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
          <button className="MenuItem" onClick={handleBackOriginal}>Send New Messages</button>
        </div>
  
        <div className="RightPane">
          {showOutgoingMsgs && (
            <div className="NewMessageContainer">
              <input
                type="text"
                placeholder="Recipient"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
              />
              <textarea
                placeholder="Type your message..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              />
              <button className="MenuItem" onClick={handleSendMessage}>
                Send New Message
              </button>
            </div>
          )}
  
          <div className="MsgPane">
            {showSentMsgs && (
              <div className="InboxPane">
                <table>
                  <thead>
                    <tr>
                      <th>Sender</th>
                      <th>Content</th>
                      {/* other headers if needed */}
                    </tr>
                  </thead>
                  <tbody>
                    {inbox.map((message, index) => (
                      <tr key={index}>
                        <td>{message.senderEmail}</td>
                        <td>{message.content}</td>
                        <td>
                          <button className="MenuItem" onClick={() => handleReply(message.senderEmail, message.content)}>
                            Reply
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
  
            {sentMessages && (
              <div className="SentdPane">
                <table>
                  <thead>
                    <tr>
                      <th>Recipient</th>
                      <th>Content</th>
                      {/* other headers if needed */}
                    </tr>
                  </thead>
                  <tbody>
                    {sentMessages.map((message, index) => (
                      <tr key={index}>
                        <td>{message.recipientEmail}</td>
                        <td>{message.content}</td>
                        {/* other columns if needed */}
                      </tr>
                    ))}
                  </tbody>
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