git import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { PitchCard } from '@/components/dashboard/PitchCard';
import { InvestorCard } from '@/components/dashboard/InvestorCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { TrendingUp, Clock, Filter, Users, Eye, Heart, MessageSquare, Bookmark, Search } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '@/components/auth/AuthContext';
import type { Pitch, InterestedInvestor } from '@/types/user';

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

// Mock interested investors data for entrepreneurs
const mockInterestedInvestors: InterestedInvestor[] = [
  {
    id: '5',
    name: 'David Park',
    email: 'david@venturecapital.com',
    role: 'investor',
    avatar: '',
    bio: 'Senior Partner at TechVenture Capital with 15+ years in healthcare investments',
    interests: ['Healthcare', 'AI', 'Medical Devices'],
    createdAt: '2024-01-01',
    connectionStatus: 'pending',
    interactionType: 'connected',
    pitchTitle: 'AI-Powered Healthcare Assistant',
    company: 'TechVenture Capital',
    investmentFocus: 'Healthcare & AI Technologies',
    lastInteraction: '2024-01-16',
  },
  {
    id: '6',
    name: 'Lisa Wang',
    email: 'lisa@greenventures.com',
    role: 'investor',
    avatar: '',
    bio: 'Clean energy investment specialist focusing on sustainable solutions',
    interests: ['Clean Energy', 'Sustainability', 'Climate Tech'],
    createdAt: '2024-01-01',
    connectionStatus: 'accepted',
    interactionType: 'liked',
    pitchTitle: 'Sustainable Energy Storage Solution',
    company: 'Green Ventures',
    investmentFocus: 'Clean Energy & Sustainability',
    lastInteraction: '2024-01-15',
  },
  {
    id: '7',
    name: 'Robert Chen',
    email: 'robert@fintechfund.com',
    role: 'investor',
    avatar: '',
    bio: 'Fintech investment advisor with portfolio of 50+ successful startups',
    interests: ['Fintech', 'Banking', 'Blockchain'],
    createdAt: '2024-01-01',
    connectionStatus: 'pending',
    interactionType: 'saved',
    pitchTitle: 'Fintech Payment Platform',
    company: 'FinTech Growth Fund',
    investmentFocus: 'Financial Technology & Banking',
    lastInteraction: '2024-01-14',
  },
  {
    id: '8',
    name: 'Maria Rodriguez',
    email: 'maria@angelinvestors.com',
    role: 'investor',
    avatar: '',
    bio: 'Angel investor and former healthcare executive',
    interests: ['Healthcare', 'Biotech', 'Medical AI'],
    createdAt: '2024-01-01',
    connectionStatus: 'accepted',
    interactionType: 'commented',
    pitchTitle: 'AI-Powered Healthcare Assistant',
    company: 'Rodriguez Angel Group',
    investmentFocus: 'Healthcare Innovation',
    lastInteraction: '2024-01-13',
  },
];

// Mock analytics data
const analyticsData = {
  viewsData: [
    { date: 'Jan 1', views: 12 },
    { date: 'Jan 2', views: 19 },
    { date: 'Jan 3', views: 15 },
    { date: 'Jan 4', views: 25 },
    { date: 'Jan 5', views: 22 },
    { date: 'Jan 6', views: 30 },
    { date: 'Jan 7', views: 28 },
  ],
  engagementData: [
    { name: 'Likes', value: 42, color: '#ef4444' },
    { name: 'Comments', value: 8, color: '#3b82f6' },
    { name: 'Saves', value: 15, color: '#10b981' },
    { name: 'Shares', value: 5, color: '#f59e0b' },
  ],
  industryData: [
    { industry: 'Healthcare', pitches: 2 },
    { industry: 'Fintech', pitches: 1 },
    { industry: 'Clean Energy', pitches: 1 },
    { industry: 'AI', pitches: 1 },
  ],
};

export default function Dashboard() {
  const { user } = useAuth();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [pitches, setPitches] = useState(mockPitches);
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (!user) return null;

  // Filter investors based on search term
  const filteredInvestors = mockInterestedInvestors.filter(investor =>
    investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    investor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    investor.investmentFocus.toLowerCase().includes(searchTerm.toLowerCase()) ||
    investor.interests.some(interest => interest.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleLike = (pitchId: string) => {
    setPitches(prevPitches =>
      prevPitches.map(pitch =>
        pitch.id === pitchId
          ? {
              ...pitch,
              isLiked: !pitch.isLiked,
              likes: pitch.isLiked ? pitch.likes - 1 : pitch.likes + 1
            }
          : pitch
      )
    );
  };

  const handleSave = (pitchId: string) => {
    setPitches(prevPitches =>
      prevPitches.map(pitch =>
        pitch.id === pitchId
          ? {
              ...pitch,
              isSaved: !pitch.isSaved,
              saves: pitch.isSaved ? pitch.saves - 1 : pitch.saves + 1
            }
          : pitch
      )
    );
  };

  const handleComment = (pitchId: string) => {
    console.log('Comment on pitch:', pitchId);
    // TODO: Open comment modal or navigate to pitch detail
  };

  const handleView = (pitchId: string) => {
    console.log('View pitch:', pitchId);
    // TODO: Navigate to pitch detail page or open video modal
  };

  const handleMessage = (investorId: string) => {
    console.log('Message investor:', investorId);
    // Navigate to messages page with investor
  };

  const handleViewProfile = (investorId: string) => {
    console.log('View investor profile:', investorId);
    // Navigate to investor profile page
  };

  const handleConnect = (investorId: string) => {
    console.log('Connect with investor:', investorId);
    // Accept connection request - in a real app, this would make an API call
    // For now, we'll just log it
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {user.role === 'investor' ? 'Discover Pitches' : 'Entrepreneur Dashboard'}
          </h1>
          <p className="text-muted-foreground">
            {user.role === 'investor' 
              ? 'Find your next investment opportunity' 
              : 'Monitor interested investors and manage your connections'
            }
          </p>
        </div>

        <Tabs defaultValue={user.role === 'entrepreneur' ? 'investors' : 'feed'} className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <TabsList className="grid w-full sm:w-auto grid-cols-3">
              {user.role === 'investor' ? (
                <>
                  <TabsTrigger value="feed">Feed</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="saved">Saved</TabsTrigger>
                </>
              ) : (
                <>
                  <TabsTrigger value="investors">
                    <Users className="h-4 w-4 mr-2" />
                    Interested Investors
                  </TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="connections">Connections</TabsTrigger>
                </>
              )}
            </TabsList>

            <div className="flex items-center space-x-4">
              {user.role === 'investor' ? (
                <>
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
                </>
              ) : (
                <>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Recent Activity</SelectItem>
                      <SelectItem value="status">Connection Status</SelectItem>
                      <SelectItem value="interaction">Interaction Type</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              )}
            </div>
          </div>

          {/* Investor View - Browse Pitches */}
          {user.role === 'investor' && (
            <>
              <TabsContent value="feed" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pitches.map((pitch) => (
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
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Trending Pitches</h2>
                  <p className="text-muted-foreground">Most popular pitches this week</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pitches.slice(0, 6).map((pitch) => (
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

              <TabsContent value="saved" className="space-y-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Saved Pitches</h2>
                  <p className="text-muted-foreground">Your bookmarked pitches</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pitches.filter(pitch => pitch.isSaved).map((pitch) => (
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
            </>
          )}

          {/* Entrepreneur View - Interested Investors */}
          {user.role === 'entrepreneur' && (
            <>
              <TabsContent value="investors" className="space-y-6">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Investors Interested in Your Pitches</h2>
                    <p className="text-muted-foreground">
                      Connect with investors who have shown interest in your pitches
                    </p>
                  </div>
                  <div className="w-full sm:w-64">
                    <div className="relative">
                      <Input
                        placeholder="Search investors..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        className="pr-8"
                      />
                      <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>
                
                {filteredInvestors.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredInvestors.map((investor) => (
                      <InvestorCard
                        key={investor.id}
                        investor={investor}
                        onMessage={() => handleMessage(investor.id)}
                        onViewProfile={() => handleViewProfile(investor.id)}
                        onConnect={() => handleConnect(investor.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No interested investors found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or check back later.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Analytics</h2>
                  <p className="text-muted-foreground">Track your pitch performance and engagement</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-card p-4 rounded-lg border">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-5 w-5 text-blue-500" />
                      <span className="text-sm font-medium">Total Views</span>
                    </div>
                    <p className="text-2xl font-bold mt-2">151</p>
                    <p className="text-xs text-muted-foreground">+12% from last week</p>
                  </div>
                  <div className="bg-card p-4 rounded-lg border">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-5 w-5 text-red-500" />
                      <span className="text-sm font-medium">Likes</span>
                    </div>
                    <p className="text-2xl font-bold mt-2">42</p>
                    <p className="text-xs text-muted-foreground">+8% from last week</p>
                  </div>
                  <div className="bg-card p-4 rounded-lg border">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5 text-blue-500" />
                      <span className="text-sm font-medium">Comments</span>
                    </div>
                    <p className="text-2xl font-bold mt-2">8</p>
                    <p className="text-xs text-muted-foreground">+2 from last week</p>
                  </div>
                  <div className="bg-card p-4 rounded-lg border">
                    <div className="flex items-center space-x-2">
                      <Bookmark className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">Saves</span>
                    </div>
                    <p className="text-2xl font-bold mt-2">15</p>
                    <p className="text-xs text-muted-foreground">+5 from last week</p>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Views Over Time */}
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-4">Views Over Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={analyticsData.viewsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Engagement Breakdown */}
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-4">Engagement Breakdown</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={analyticsData.engagementData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {analyticsData.engagementData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Industry Distribution */}
                  <div className="bg-card p-6 rounded-lg border lg:col-span-2">
                    <h3 className="text-lg font-semibold mb-4">Pitches by Industry</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={analyticsData.industryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="industry" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="pitches" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="connections" className="space-y-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Connections</h2>
                  <p className="text-muted-foreground">Manage your investor connections and relationships</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockInterestedInvestors.map((investor) => (
                    <div key={investor.id} className="bg-card p-6 rounded-lg border">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {investor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{investor.name}</h3>
                          <p className="text-sm text-muted-foreground">{investor.company}</p>
                          <p className="text-sm text-muted-foreground mt-1">{investor.investmentFocus}</p>
                          <div className="flex items-center space-x-2 mt-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              investor.connectionStatus === 'accepted'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {investor.connectionStatus === 'accepted' ? 'Connected' : 'Pending'}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Last interaction: {investor.lastInteraction}
                            </span>
                          </div>
                          <div className="flex space-x-2 mt-4">
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Message
                            </Button>
                            <Button size="sm" variant="outline">
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </main>
    </div>
  );
}

