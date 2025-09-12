import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { PitchCard } from '@/components/dashboard/PitchCard';
import { InvestorCard } from '@/components/dashboard/InvestorCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Clock, Filter, Users, Loader2 } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { fetchAllPitches, fetchTrendingPitches, type Pitch as APIPitch } from '@/services/pitchApi';
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

export default function Dashboard() {
  const { user } = useAuth();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  
  // State for pitch data
  const [pitches, setPitches] = useState<Pitch[]>([]);
  const [trendingPitches, setTrendingPitches] = useState<Pitch[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMorePages, setHasMorePages] = useState<boolean>(true);

  // Transform API pitch to local pitch type
  const transformAPIPitch = (apiPitch: APIPitch): Pitch => {
    return {
      id: apiPitch.id,
      title: apiPitch.title,
      description: apiPitch.description,
      videoUrl: apiPitch.videoUrl,
      thumbnailUrl: apiPitch.thumbnailUrl || '',
      industry: apiPitch.industry,
      fundingNeeds: apiPitch.fundingNeeds,
      currency: apiPitch.currency,
      entrepreneurId: apiPitch.entrepreneurId,
      entrepreneur: {
        id: apiPitch.entrepreneur.id,
        name: apiPitch.entrepreneur.name,
        email: apiPitch.entrepreneur.email,
        role: apiPitch.entrepreneur.role as 'entrepreneur' | 'investor',
        avatar: apiPitch.entrepreneur.avatar,
        bio: apiPitch.entrepreneur.bio,
        interests: apiPitch.entrepreneur.interests,
        createdAt: apiPitch.entrepreneur.createdAt,
      },
      likes: apiPitch.likes,
      comments: apiPitch.comments,
      saves: apiPitch.saves,
      isLiked: apiPitch.isLiked,
      isSaved: apiPitch.isSaved,
      createdAt: apiPitch.createdAt,
    };
  };

  // Fetch pitches when filters change
  useEffect(() => {
    if (user?.role === 'investor') {
      loadPitches();
    }
  }, [selectedIndustry, sortBy, user?.role]);

  // Fetch trending pitches on component mount
  useEffect(() => {
    if (user?.role === 'investor') {
      loadTrendingPitches();
    }
  }, [user?.role]);

  const loadPitches = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchAllPitches({
        industry: selectedIndustry,
        sortBy,
        limit: 20,
        page: 1,
      });

      if (response.success) {
        const transformedPitches = response.data.map(transformAPIPitch);
        setPitches(transformedPitches);
        setHasMorePages(response.pagination.pages > 1);
        setCurrentPage(1);
      } else {
        setError(response.message || 'Failed to fetch pitches');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Error loading pitches:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadTrendingPitches = async () => {
    try {
      const response = await fetchTrendingPitches(10);
      if (response.success) {
        const transformedPitches = response.data.map(transformAPIPitch);
        setTrendingPitches(transformedPitches);
      }
    } catch (err) {
      console.error('Error loading trending pitches:', err);
    }
  };

  const loadMorePitches = async () => {
    if (!hasMorePages || loading) return;
    
    setLoading(true);
    
    try {
      const response = await fetchAllPitches({
        industry: selectedIndustry,
        sortBy,
        limit: 20,
        page: currentPage + 1,
      });

      if (response.success) {
        const transformedPitches = response.data.map(transformAPIPitch);
        setPitches(prev => [...prev, ...transformedPitches]);
        setHasMorePages(response.pagination.page < response.pagination.pages);
        setCurrentPage(prev => prev + 1);
      }
    } catch (err) {
      console.error('Error loading more pitches:', err);
    } finally {
      setLoading(false);
    }
  };

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
    
    // Find the pitch by ID
    const pitch = pitches.find(p => p.id === pitchId) || trendingPitches.find(p => p.id === pitchId);
    
    if (pitch && pitch.videoUrl) {
      // Open video in a new tab
      window.open(pitch.videoUrl, '_blank');
    } else {
      console.error('Video URL not found for pitch:', pitchId);
      // You could show a toast notification here
      alert('Video not available for this pitch.');
    }
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
    // Accept connection request
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
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    <p>{error}</p>
                    <Button 
                      onClick={loadPitches} 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                    >
                      Retry
                    </Button>
                  </div>
                )}

                {loading && pitches.length === 0 ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Loading pitches...</span>
                  </div>
                ) : pitches.length > 0 ? (
                  <>
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
                    
                    {hasMorePages && (
                      <div className="flex justify-center pt-6">
                        <Button 
                          onClick={loadMorePitches}
                          variant="outline"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Loading...
                            </>
                          ) : (
                            'Load More Pitches'
                          )}
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">No Pitches Found</h3>
                    <p className="text-muted-foreground">
                      {selectedIndustry !== 'all' 
                        ? `No pitches found for ${selectedIndustry} industry`
                        : 'No pitches have been uploaded yet'
                      }
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="trending" className="space-y-6">
                {trendingPitches.length > 0 ? (
                  <>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2">Trending Pitches</h2>
                      <p className="text-muted-foreground">
                        Most popular pitches based on engagement
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {trendingPitches.map((pitch) => (
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
                  </>
                ) : (
                  <div className="text-center py-12">
                    <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Trending Pitches</h3>
                    <p className="text-muted-foreground">
                      Trending pitches will appear here based on engagement
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="saved" className="space-y-6">
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">Saved Pitches</h3>
                  <p className="text-muted-foreground">Your bookmarked pitches will appear here</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    (Feature coming soon - saved pitches will be stored per user)
                  </p>
                </div>
              </TabsContent>
            </>
          )}

          {/* Entrepreneur View - Interested Investors */}
          {user.role === 'entrepreneur' && (
            <>
              <TabsContent value="investors" className="space-y-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Investors Interested in Your Pitches</h2>
                  <p className="text-muted-foreground">
                    Connect with investors who have shown interest in your pitches
                  </p>
                </div>
                
                {mockInterestedInvestors.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockInterestedInvestors.map((investor) => (
                      <InvestorCard
                        key={investor.id}
                        investor={investor}
                        onMessage={handleMessage}
                        onViewProfile={handleViewProfile}
                        onConnect={handleConnect}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No interested investors yet</h3>
                    <p className="text-muted-foreground">
                      Share your pitches to attract potential investors
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="text-center py-12">
                  <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Analytics</h3>
                  <p className="text-muted-foreground">
                    Pitch performance metrics and insights will appear here
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="connections" className="space-y-6">
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Connections</h3>
                  <p className="text-muted-foreground">
                    Manage your investor connections and relationships
                  </p>
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </main>
    </div>
  );
}