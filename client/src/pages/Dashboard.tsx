import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { PitchCard } from '@/components/dashboard/PitchCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Clock, Filter } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import type { Pitch } from '@/types/user';

// Mock data
const mockPitches: Pitch[] = [
  {
    id: '1',
    title: 'AI-Powered Healthcare Assistant',
    description: 'Revolutionary AI assistant that helps doctors diagnose patients faster and more accurately using machine learning algorithms.',
    videoUrl: 'https://example.com/video1',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    industry: 'Healthcare',
    fundingNeeds: 500000,
    currency: 'USD',
    entrepreneurId: '2',
    entrepreneur: {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      role: 'entrepreneur',
      avatar: '',
      bio: 'Medical AI researcher',
      interests: ['AI', 'Healthcare'],
      createdAt: '2024-01-01',
    },
    likes: 42,
    comments: 8,
    saves: 15,
    isLiked: false,
    isSaved: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Sustainable Energy Storage Solution',
    description: 'Next-generation battery technology that reduces environmental impact while increasing energy storage capacity by 300%.',
    videoUrl: 'https://example.com/video2',
    thumbnailUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop',
    industry: 'Clean Energy',
    fundingNeeds: 2000000,
    currency: 'USD',
    entrepreneurId: '3',
    entrepreneur: {
      id: '3',
      name: 'Michael Rodriguez',
      email: 'michael@example.com',
      role: 'entrepreneur',
      avatar: '',
      bio: 'Clean energy innovator',
      interests: ['Clean Energy', 'Sustainability'],
      createdAt: '2024-01-01',
    },
    likes: 67,
    comments: 12,
    saves: 23,
    isLiked: true,
    isSaved: false,
    createdAt: '2024-01-14',
  },
  {
    id: '3',
    title: 'Fintech Payment Platform',
    description: 'Seamless cross-border payment solution for small businesses with instant settlements and minimal fees.',
    videoUrl: 'https://example.com/video3',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
    industry: 'Fintech',
    fundingNeeds: 1500000,
    currency: 'USD',
    entrepreneurId: '4',
    entrepreneur: {
      id: '4',
      name: 'Emma Thompson',
      email: 'emma@example.com',
      role: 'entrepreneur',
      avatar: '',
      bio: 'Fintech entrepreneur',
      interests: ['Fintech', 'Banking'],
      createdAt: '2024-01-01',
    },
    likes: 89,
    comments: 15,
    saves: 31,
    isLiked: false,
    isSaved: false,
    createdAt: '2024-01-13',
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  if (!user) return null;

  const handleLike = (pitchId: string) => {
    console.log('Liked pitch:', pitchId);
  };

  const handleSave = (pitchId: string) => {
    console.log('Saved pitch:', pitchId);
  };

  const handleComment = (pitchId: string) => {
    console.log('Comment on pitch:', pitchId);
  };

  const handleView = (pitchId: string) => {
    console.log('View pitch:', pitchId);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {user.role === 'investor' ? 'Discover Pitches' : 'My Dashboard'}
          </h1>
          <p className="text-muted-foreground">
            {user.role === 'investor' 
              ? 'Find your next investment opportunity' 
              : 'Track your pitches and engagement'
            }
          </p>
        </div>

        <Tabs defaultValue="feed" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <TabsList className="grid w-full sm:w-auto grid-cols-3">
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-4">
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="ai">AI & Tech</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="fintech">Fintech</SelectItem>
                  <SelectItem value="clean-energy">Clean Energy</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Newest
                    </div>
                  </SelectItem>
                  <SelectItem value="trending">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Trending
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="feed" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPitches.map((pitch) => (
                <PitchCard
                  key={pitch.id}
                  pitch={pitch}
                  userRole={user.role as 'entrepreneur' | 'investor'}
                  onLike={handleLike}
                  onSave={handleSave}
                  onComment={handleComment}
                  onView={handleView}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <div className="text-center py-12">
              <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Trending Pitches</h3>
              <p className="text-muted-foreground">Most popular pitches this week will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <div className="text-center py-12">
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">Saved Pitches</h3>
                <p className="text-muted-foreground">Your bookmarked pitches will appear here</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}