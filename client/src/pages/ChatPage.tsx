import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

// Define types
interface User {
  _id: string;
  name: string;
  email: string;
  role: 'entrepreneur' | 'investor';
  companyName?: string;
  investmentFocus?: string;
}

interface Message {
  _id: string;
  sender: User;
  receiver: User;
  content: string;
  timestamp: Date;
}

// Mock data for demonstration
const mockChattedUsers: User[] = [
  {
    _id: '1',
    name: 'John Investor',
    email: 'john@example.com',
    role: 'investor',
    companyName: 'Tech Ventures',
    investmentFocus: 'AI & Machine Learning'
  },
  {
    _id: '2',
    name: 'Sarah Capital',
    email: 'sarah@example.com',
    role: 'investor',
    companyName: 'Growth Fund',
    investmentFocus: 'Fintech'
  },
  {
    _id: '3',
    name: 'Mike Ventures',
    email: 'mike@example.com',
    role: 'investor',
    companyName: 'Startup Partners',
    investmentFocus: 'Healthcare'
  }
];

const mockMessages: Message[] = [
  {
    _id: '1',
    sender: mockChattedUsers[0],
    receiver: { _id: 'current', name: 'Current User', email: '', role: 'entrepreneur' },
    content: 'Hi, I\'m interested in your startup pitch.',
    timestamp: new Date('2024-01-15T10:00:00Z')
  },
  {
    _id: '2',
    sender: { _id: 'current', name: 'Current User', email: '', role: 'entrepreneur' },
    receiver: mockChattedUsers[0],
    content: 'Thank you! I\'d love to discuss more.',
    timestamp: new Date('2024-01-15T10:05:00Z')
  }
];

const ChatPage: React.FC = () => {
  const { user } = useUser();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedUser) return;

    const newMessage: Message = {
      _id: Date.now().toString(),
      sender: { _id: 'current', name: user?.name || 'Current User', email: '', role: user?.role || 'entrepreneur' },
      receiver: selectedUser,
      content: messageInput,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');
  };

  const styles = {
    container: {
      display: 'flex',
      height: 'calc(100vh - 128px)', // Adjust for header and footer
      backgroundColor: '#f8fafc'
    },
    sidebar: {
      width: '300px',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column' as const,
      overflowY: 'auto' as const
    },
    sidebarHeader: {
      padding: '1rem',
      borderBottom: '1px solid #e2e8f0',
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1e293b'
    },
    userList: {
      flex: 1,
      padding: '0'
    },
    userItem: {
      padding: '1rem',
      borderBottom: '1px solid #f1f5f9',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    userItemActive: {
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      fontWeight: '600'
    },
    userAvatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      fontSize: '1rem',
      fontWeight: '600'
    },
    userInfo: {
      flex: 1
    },
    userName: {
      fontSize: '0.875rem',
      fontWeight: '500',
      margin: '0',
      color: '#1e293b'
    },
    userRole: {
      fontSize: '0.75rem',
      color: '#64748b',
      margin: '0.25rem 0 0 0'
    },
    chatArea: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column' as const,
      backgroundColor: '#ffffff'
    },
    chatHeader: {
      padding: '1rem',
      borderBottom: '1px solid #e2e8f0',
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1e293b'
    },
    messagesContainer: {
      flex: 1,
      padding: '1rem',
      overflowY: 'auto' as const,
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.75rem'
    },
    message: {
      maxWidth: '70%',
      padding: '0.75rem',
      borderRadius: '8px',
      fontSize: '0.875rem',
      lineHeight: '1.4'
    },
    messageSent: {
      alignSelf: 'flex-end',
      backgroundColor: '#3b82f6',
      color: '#ffffff'
    },
    messageReceived: {
      alignSelf: 'flex-start',
      backgroundColor: '#f1f5f9',
      color: '#1e293b'
    },
    messageTime: {
      fontSize: '0.75rem',
      marginTop: '0.25rem',
      opacity: 0.7
    },
    inputArea: {
      padding: '1rem',
      borderTop: '1px solid #e2e8f0',
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'center'
    },
    messageInput: {
      flex: 1,
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '0.875rem',
      outline: 'none'
    },
    sendButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    emptyState: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#64748b',
      fontSize: '1rem'
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar with chatted users */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>Previous Chats</div>
        <div style={styles.userList}>
          {mockChattedUsers.map((chattedUser) => (
            <div
              key={chattedUser._id}
              style={{
                ...styles.userItem,
                ...(selectedUser?._id === chattedUser._id ? styles.userItemActive : {})
              }}
              onClick={() => setSelectedUser(chattedUser)}
              onMouseEnter={(e) => {
                if (selectedUser?._id !== chattedUser._id) {
                  e.currentTarget.style.backgroundColor = '#f1f5f9';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedUser?._id !== chattedUser._id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div style={styles.userAvatar}>
                {chattedUser.name.charAt(0).toUpperCase()}
              </div>
              <div style={styles.userInfo}>
                <p style={styles.userName}>{chattedUser.name}</p>
                <p style={styles.userRole}>
                  {chattedUser.role === 'investor' ? 'Investor' : 'Entrepreneur'} • {chattedUser.companyName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div style={styles.chatArea}>
        <div style={styles.chatHeader}>
          {selectedUser ? `Chat with ${selectedUser.name}` : 'Select a conversation'}
        </div>

        {selectedUser ? (
          <>
            <div style={styles.messagesContainer}>
              {messages
                .filter(msg =>
                  (msg.sender._id === selectedUser._id && msg.receiver._id === 'current') ||
                  (msg.sender._id === 'current' && msg.receiver._id === selectedUser._id)
                )
                .map((msg) => (
                  <div
                    key={msg._id}
                    style={{
                      ...styles.message,
                      ...(msg.sender._id === 'current' ? styles.messageSent : styles.messageReceived)
                    }}
                  >
                    {msg.content}
                    <div style={styles.messageTime}>
                      {msg.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                ))}
            </div>

            <div style={styles.inputArea}>
              <input
                type="text"
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                style={styles.messageInput}
              />
              <button
                onClick={handleSendMessage}
                style={styles.sendButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#3b82f6';
                }}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div style={styles.emptyState}>
            Select a conversation from the sidebar to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
