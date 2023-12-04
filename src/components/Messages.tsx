
import React, { useState, useEffect } from 'react';
import axios from "axios";
import MainLayout from "./MainLayout";
import './Messages.css';

interface User {
  name: string;
  email: string;
}

interface Message {
    id: string;          // Unique identifier for the message
    sender: User;        // The sender of the message, as a User object
    recipient: User;     // The recipient of the message, as a User object
    content: string;     // The content of the message
    createdAt: Date;     // The date and time the message was created
    
  }

interface MessagesProps {
  user: User;
  onLogout: () => void;
}

const Messages: React.FC<MessagesProps> = ({ user, onLogout }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inbox, setInbox] = useState<Message[]>([]);
  const [sent, setSent] = useState<Message[]>([]);
  const [newRecipient, setNewRecipient] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [showOutgoingMsgs, setOutgoingMsgs] = useState(true);
  const [showSentMsgs, setShowSentMsgs] = useState(false);
  const [showSentMessages, setSentMessages] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const messagesPerPage = 10;

  useEffect(() => {
    fetchInboxMessages();
    fetchSentMessages();
  }, [currentPage, user.email]);

  const fetchInboxMessages = () => {
    axios.get(`/api/get-inbox?recipientEmail=${user.email}&page=${currentPage}&limit=${messagesPerPage}`)
      .then(response => {
        setInbox(response.data);
      })
      .catch(error => console.error('Error fetching inbox messages:', error));
  };

  const fetchSentMessages = () => {
    axios.get(`/api/get-sent-messages?senderEmail=${user.email}&page=${currentPage}&limit=${messagesPerPage}`)
      .then(response => {
        setSent(response.data);
      })
      .catch(error => console.error('Error fetching sent messages:', error));
  };

  const handleReply = (senderEmail: string, originalMessage: string) => {
    setNewRecipient(senderEmail); // Set the recipient for the reply
    setNewMessage(`Replying to your message: "${originalMessage}"\n\n`); // Pre-fill the message
  
    // Update the state to show the message composition view
    setOutgoingMsgs(true); // Assuming this state controls the visibility
    setShowSentMsgs(false);    // Hide the sent messages view
    setSentMessages(false);    // Hide any other related views, if necessary
  };
  
  
  

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

       // Refresh the inbox messages after sending the reply
       fetchInboxMessages();
    })
    .catch(error => console.error('Error sending message:', error));
  };

  const handleInboxMessages = () => {
    fetchInboxMessages();
    setShowSentMsgs(true);
    setOutgoingMsgs(false);
    setSentMessages(false);
  };

  const handleSentMessages = () => {
    fetchSentMessages(); // Fetch the sent messages
    setShowSentMsgs(false);
    setOutgoingMsgs(false);
    setSentMessages(true);
  };

  const handleBackOriginal = () => {
    setShowSentMsgs(false);
    setOutgoingMsgs(true);
    setSentMessages(false);
  };
 
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
                  {inbox.map((message, index) => (
                    <tr key={index}>
                      <td>{message.sender.email}</td> {/* Display the name of the sender */}
                      <td>{message.content}</td>
                      <td>
                      <button className="MenuItem ReplyButton"
                        onClick={() => handleReply(message.sender.email, message.content)}
                        >
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
                  {sent.map((message, index) => (
                    <tr key={index}>
                      <td>{message.recipient.email}</td> {/* Display the name of the recipient */}
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
