import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, MessageCircle, Bookmark, Eye, Bell, Settings, CheckCheck } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'save' | 'view' | 'message';
  title: string;
  description: string;
  actor: {
    name: string;
    avatar?: string;
    role: 'investor' | 'entrepreneur';
  };
  pitchTitle?: string;
  timestamp: string;
  isRead: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'save',
    title: 'Your pitch was saved',
    description: 'John Investor saved your "AI-Powered Healthcare Assistant" pitch',
    actor: {
      name: 'John Investor',
      avatar: '',
      role: 'investor',
    },
    pitchTitle: 'AI-Powered Healthcare Assistant',
    timestamp: '2024-01-15T10:30:00Z',
    isRead: false,
  },
  {
    id: '2',
    type: 'comment',
    title: 'New comment on your pitch',
    description: 'Emma Wilson commented: "This is exactly what the healthcare industry needs!"',
    actor: {
      name: 'Emma Wilson',
      avatar: '',
      role: 'investor',
    },
    pitchTitle: 'AI-Powered Healthcare Assistant',
    timestamp: '2024-01-15T09:15:00Z',
    isRead: false,
  },
  {
    id: '3',
    type: 'like',
    title: 'Your pitch was liked',
    description: 'Michael Rodriguez and 5 others liked your pitch',
    actor: {
      name: 'Michael Rodriguez',
      avatar: '',
      role: 'investor',
    },
    pitchTitle: 'AI-Powered Healthcare Assistant',
    timestamp: '2024-01-14T16:45:00Z',
    isRead: true,
  },
  {
    id: '4',
    type: 'message',
    title: 'New message',
    description: 'David Chen sent you a message about investment opportunities',
    actor: {
      name: 'David Chen',
      avatar: '',
      role: 'investor',
    },
    timestamp: '2024-01-14T14:20:00Z',
    isRead: true,
  },
  {
    id: '5',
    type: 'view',
    title: 'Pitch performance update',
    description: 'Your pitch has reached 250 views this week (+15% from last week)',
    actor: {
      name: 'VenturoNest',
      avatar: '',
      role: 'investor',
    },
    pitchTitle: 'AI-Powered Healthcare Assistant',
    timestamp: '2024-01-14T12:00:00Z',
    isRead: true,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'like':
      return <Heart className="h-4 w-4 text-red-500" />;
    case 'comment':
      return <MessageCircle className="h-4 w-4 text-blue-500" />;
    case 'save':
      return <Bookmark className="h-4 w-4 text-primary" />;
    case 'view':
      return <Eye className="h-4 w-4 text-green-500" />;
    case 'message':
      return <MessageCircle className="h-4 w-4 text-purple-500" />;
    default:
      return <Bell className="h-4 w-4 text-muted-foreground" />;
  }
};

export default function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  if (!user) return null;

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const filteredNotifications = notifications.filter(n => 
    filter === 'all' || !n.isRead
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Notifications</h1>
              <p className="text-muted-foreground">Stay updated with your pitch activity</p>
            </div>
            <div className="flex items-center space-x-4">
              {unreadCount > 0 && (
                <Button variant="outline" onClick={markAllAsRead}>
                  <CheckCheck className="h-4 w-4 mr-2" />
                  Mark all as read
                </Button>
              )}
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        <Card className="shadow-card border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Activity
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadCount}
                  </Badge>
                )}
              </CardTitle>
              <Tabs value={filter} onValueChange={(value) => setFilter(value as 'all' | 'unread')}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">
                    Unread {unreadCount > 0 && `(${unreadCount})`}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {filteredNotifications.length > 0 ? (
              <div className="divide-y">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-6 hover:bg-muted/30 transition-colors cursor-pointer ${
                      !notification.isRead ? 'bg-primary/5 border-l-2 border-l-primary' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {notification.actor.name === 'VenturoNest' ? (
                          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                            {getNotificationIcon(notification.type)}
                          </div>
                        ) : (
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={notification.actor.avatar} alt={notification.actor.name} />
                            <AvatarFallback>{notification.actor.name.charAt(0).toUpperCase()}</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            {getNotificationIcon(notification.type)}
                            <p className="font-medium text-sm">{notification.title}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-muted-foreground">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                            {!notification.isRead && (
                              <div className="h-2 w-2 bg-primary rounded-full"></div>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.description}
                        </p>
                        
                        {notification.pitchTitle && (
                          <Badge variant="outline" className="text-xs">
                            {notification.pitchTitle}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
                </h3>
                <p className="text-muted-foreground">
                  {filter === 'unread' 
                    ? 'All caught up! Check back later for new activity.'
                    : 'Your notification activity will appear here.'
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}