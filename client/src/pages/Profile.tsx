import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Plus, X, Edit2, Save } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import type { User } from '@/types/user';

// Mock user data
const availableInterests = [
  'AI & Machine Learning',
  'Fintech',
  'Healthcare',
  'SaaS',
  'E-commerce',
  'Clean Energy',
  'Blockchain',
  'EdTech',
  'FoodTech',
  'Gaming',
  'IoT',
  'Mobility',
  'Real Estate',
  'Retail',
  'Travel',
];

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    interests: [...(user?.interests || [])],
  });

  if (!user) return null;

  const handleSave = () => {
    // In a real app, this would update the user via API
    console.log('Updating user:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      bio: user.bio || '',
      interests: [...user.interests],
    });
    setIsEditing(false);
  };

  const addInterest = (interest: string) => {
    if (!formData.interests.includes(interest)) {
      setFormData({
        ...formData,
        interests: [...formData.interests, interest],
      });
    }
  };

  const removeInterest = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter(i => i !== interest),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-muted-foreground">Manage your profile information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture & Basic Info */}
          <div className="lg:col-span-1">
            <Card className="shadow-card border-0">
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <Button 
                    size="sm" 
                    className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
                <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
                <p className="text-muted-foreground text-sm mb-2">{user.email}</p>
                <Badge variant="secondary" className="mb-4 capitalize">
                  {user.role}
                </Badge>
                
                <p className="text-sm text-muted-foreground">
                  Member since {new Date(user.createdAt).toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Card className="shadow-card border-0">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Profile Details</CardTitle>
                {!isEditing ? (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  ) : (
                    <p className="text-sm py-2">{user.name}</p>
                  )}
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself..."
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={4}
                    />
                  ) : (
                    <p className="text-sm py-2 text-muted-foreground">
                      {user.bio || 'No bio added yet.'}
                    </p>
                  )}
                </div>

                {/* Interests */}
                <div className="space-y-2">
                  <Label>Interests</Label>
                  {isEditing ? (
                    <div className="space-y-4">
                      {/* Current Interests */}
                      <div className="flex flex-wrap gap-2">
                        {formData.interests.map((interest) => (
                          <Badge 
                            key={interest} 
                            variant="secondary" 
                            className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => removeInterest(interest)}
                          >
                            {interest}
                            <X className="h-3 w-3 ml-1" />
                          </Badge>
                        ))}
                      </div>
                      
                      {/* Available Interests */}
                      <div>
                        <Label className="text-xs text-muted-foreground">Add interests:</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {availableInterests
                            .filter(interest => !formData.interests.includes(interest))
                            .map((interest) => (
                              <Badge 
                                key={interest} 
                                variant="outline" 
                                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                                onClick={() => addInterest(interest)}
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                {interest}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {user.interests.map((interest) => (
                        <Badge key={interest} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}