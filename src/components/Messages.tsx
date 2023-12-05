
import React, { useState, useEffect } from 'react';
import axios from "axios";
import MainLayout from "./MainLayout";
import './Messages.css';

// Define the User and Message interfaces for type checking
interface User {
  name: string;
  email: string;
}

interface Message {
    id: string;
    sender: User;
    recipient: User;
    content: string;
    createdAt: Date;
}

// Define the props interface for the Messages component
interface MessagesProps {
  user: User;
  onLogout: () => void;
}

// Messages component function
const Messages: React.FC<MessagesProps> = ({ user, onLogout }) => {

  // State hooks to manage component state
  const [messages, setMessages] = useState<Message[]>([]);
  const [inbox, setInbox] = useState<Message[]>([]);
  const [sent, setSent] = useState<Message[]>([]);
  const [newRecipient, setNewRecipient] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [showOutgoingMsgs, setOutgoingMsgs] = useState(true);
  const [showSentMsgs, setShowSentMsgs] = useState(false);
  const [showSentMessages, setSentMessages] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const messagesPerPage = 10;

  // Fetch inbox and sent messages on component mount and when currentPage or user.email changes
  useEffect(() => {
    fetchInboxMessages();
    fetchSentMessages();
  }, [currentPage, user.email]);

  // Function to fetch inbox messages from the server
  const fetchInboxMessages = () => {
    axios.get(`/api/get-inbox?recipientEmail=${user.email}&page=${currentPage}&limit=${messagesPerPage}`)
      .then(response => {
        setInbox(response.data);
      })
      .catch(error => console.error('Error fetching inbox messages:', error));
  };

  // Function to fetch sent messages from the server
  const fetchSentMessages = () => {
    axios.get(`/api/get-sent-messages?senderEmail=${user.email}&page=${currentPage}&limit=${messagesPerPage}`)
      .then(response => {
        setSent(response.data);
      })
      .catch(error => console.error('Error fetching sent messages:', error));
  };

  // Function to handle replying to a message
  const handleReply = (senderEmail: string, originalMessage: string) => {
    setNewRecipient(senderEmail);
    setNewMessage(`Replying to your message: "${originalMessage}"\n\n`);
    setOutgoingMsgs(true);
    setShowSentMsgs(false);
    setSentMessages(false);
  };

  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (!newRecipient || !newMessage) return;

    axios.post('/api/send-message', {
      senderEmail: user.email,
      recipientEmail: newRecipient,
      messageContent: newMessage
    })
    .then(response => {
      setMessages([...messages, response.data]);
      setNewRecipient('');
      setNewMessage('');
      fetchInboxMessages();
    })
    .catch(error => console.error('Error sending message:', error));
  };

  // Functions to handle displaying inbox and sent messages
  const handleInboxMessages = () => {
    fetchInboxMessages();
    setShowSentMsgs(true);
    setOutgoingMsgs(false);
    setSentMessages(false);
  };

  const handleSentMessages = () => {
    fetchSentMessages();
    setShowSentMsgs(false);
    setOutgoingMsgs(false);
    setSentMessages(true);
  };

  // Function to handle going back to the original view
  const handleBackOriginal = () => {
    setShowSentMsgs(false);
    setOutgoingMsgs(true);
    setSentMessages(false);
  };

  // Pagination logic
  const indexOfLastMessage = (currentPage + 1) * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentInboxMessages = inbox.slice(indexOfFirstMessage, indexOfLastMessage);
  const currentSentMessages = sent.slice(indexOfFirstMessage, indexOfLastMessage);

  const nextPage = () => setCurrentPage(prevPage => prevPage + 1);
  const prevPage = () => setCurrentPage(prevPage => prevPage > 0 ? prevPage - 1 : 0);

  return (
    <MainLayout user={user} onLogout={onLogout}>
      <div className="MessagesRoot">
        <div className="LeftPane">
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
          )}
          <div className="MsgPane">
            {showSentMsgs && (
              <div className="InboxPane">
                <table>
                  <tr>
                    <th>Sender</th>
                    <th>Content</th>
                  </tr>
                  {currentInboxMessages.map((message, index) => (
                    <tr key={index}>
                      <td>{message.sender.email}</td>
                      <td>{message.content}</td>
                      <td>
                        <button className="MenuItem ReplyButton"
                          onClick={() => handleReply(message.sender.email, message.content)}>
                          Reply
                        </button>
                      </td>
                    </tr>
                  ))}
                </table>
                <div className="pagination">
                  {currentPage > 0 && <button onClick={prevPage}>Previous</button>}
                  {currentInboxMessages.length === messagesPerPage && <button onClick={nextPage}>Next</button>}
                </div>
              </div>
            )}
            {showSentMessages && (
              <div className="SentdPane">
                <table>
                  <tr>
                    <th>Recipient</th>
                    <th>Content</th>
                  </tr>
                  {currentSentMessages.map((message, index) => (
                    <tr key={index}>
                      <td>{message.recipient.email}</td>
                      <td>{message.content}</td>
                    </tr>
                  ))}
                </table>
                <div className="pagination">
                  {currentPage > 0 && <button onClick={prevPage}>Previous</button>}
                  {currentSentMessages.length === messagesPerPage && <button onClick={nextPage}>Next</button>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Messages;

