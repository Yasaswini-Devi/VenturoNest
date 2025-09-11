import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Send, MoreVertical, Phone, Video } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import type { Conversation, ChatMessage } from '@/types/user';

// Mock data
const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [
      {
        id: '2',
        name: 'Sarah Chen',
        email: 'sarah@example.com',
        role: 'entrepreneur',
        avatar: '',
        bio: 'Healthcare AI founder',
        interests: ['AI', 'Healthcare'],
        createdAt: '2024-01-01',
      }
    ],
    lastMessage: {
      id: '1',
      content: 'Thanks for your interest in our healthcare AI platform!',
      senderId: '2',
      receiverId: '1',
      timestamp: '2024-01-15T10:30:00Z',
      isRead: false,
    },
    unreadCount: 2,
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    participants: [
      {
        id: '3',
        name: 'Michael Rodriguez',
        email: 'michael@example.com',
        role: 'entrepreneur',
        avatar: '',
        bio: 'Clean energy innovator',
        interests: ['Clean Energy'],
        createdAt: '2024-01-01',
      }
    ],
    lastMessage: {
      id: '2',
      content: 'I would love to schedule a call to discuss the investment opportunity.',
      senderId: '1',
      receiverId: '3',
      timestamp: '2024-01-14T16:45:00Z',
      isRead: true,
    },
    unreadCount: 0,
    updatedAt: '2024-01-14T16:45:00Z',
  },
];

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    content: 'Hi! I saw your pitch about the healthcare AI platform. Very impressive work!',
    senderId: '1',
    receiverId: '2',
    timestamp: '2024-01-15T09:15:00Z',
    isRead: true,
  },
  {
    id: '2',
    content: 'Thank you so much! I would love to tell you more about our technology.',
    senderId: '2',
    receiverId: '1',
    timestamp: '2024-01-15T09:45:00Z',
    isRead: true,
  },
  {
    id: '3',
    content: 'Thanks for your interest in our healthcare AI platform!',
    senderId: '2',
    receiverId: '1',
    timestamp: '2024-01-15T10:30:00Z',
    isRead: false,
  },
];

export default function Messages() {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string>('1');
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  if (!user) return null;

  const currentConversation = mockConversations.find(c => c.id === selectedConversation);
  const otherParticipant = currentConversation?.participants.find(p => p.id !== user.id);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const filteredConversations = mockConversations.filter(conversation => {
    const otherParticipant = conversation.participants.find(p => p.id !== user.id);
    return otherParticipant?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           conversation.lastMessage?.content.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main className="container mx-auto px-4 py-8 h-[calc(100vh-5rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="shadow-card border-0 h-full flex flex-col">
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Search conversations..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0 overflow-y-auto">
                <div className="space-y-1">
                  {filteredConversations.map((conversation) => {
                    const otherParticipant = conversation.participants.find(p => p.id !== user.id);
                    const isSelected = conversation.id === selectedConversation;
                    
                    return (
                      <div
                        key={conversation.id}
                        className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                          isSelected ? 'bg-primary/10 border-r-2 border-r-primary' : ''
                        }`}
                        onClick={() => setSelectedConversation(conversation.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={otherParticipant?.avatar} alt={otherParticipant?.name} />
                              <AvatarFallback>{otherParticipant?.name.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="absolute -top-1 -right-1 h-3 w-3 bg-success rounded-full border-2 border-background"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-sm truncate">{otherParticipant?.name}</p>
                              <span className="text-xs text-muted-foreground">
                                {new Date(conversation.updatedAt).toLocaleTimeString('en-US', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-muted-foreground truncate mr-2">
                                {conversation.lastMessage?.content}
                              </p>
                              {conversation.unreadCount > 0 && (
                                <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                                  {conversation.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="shadow-card border-0 h-full flex flex-col">
              {currentConversation && otherParticipant ? (
                <>
                  {/* Chat Header */}
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={otherParticipant.avatar} alt={otherParticipant.name} />
                          <AvatarFallback>{otherParticipant.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{otherParticipant.name}</h3>
                          <p className="text-sm text-muted-foreground capitalize">{otherParticipant.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Messages */}
                  <CardContent className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                        {mockMessages.map((message) => {
                          const isOwn = message.senderId === user.id;
                        return (
                          <div
                            key={message.id}
                            className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                isOwn
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted text-muted-foreground'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <span className={`text-xs mt-1 block ${
                                isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground/70'
                              }`}>
                                {new Date(message.timestamp).toLocaleTimeString('en-US', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>

                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                    <p className="text-muted-foreground">Choose a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}