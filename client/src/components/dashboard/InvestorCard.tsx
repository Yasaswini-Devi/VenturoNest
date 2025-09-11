import { MessageCircle, Eye, Mail, Building2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { User } from '@/types/user';

interface InterestedInvestor extends User {
  connectionStatus: 'pending' | 'accepted' | 'rejected';
  interactionType: 'liked' | 'saved' | 'commented' | 'connected';
  pitchTitle: string;
  company?: string;
  investmentFocus?: string;
  lastInteraction: string;
}

interface InvestorCardProps {
  investor: InterestedInvestor;
  onMessage?: (investorId: string) => void;
  onViewProfile?: (investorId: string) => void;
  onConnect?: (investorId: string) => void;
}

export function InvestorCard({ investor, onMessage, onViewProfile, onConnect }: InvestorCardProps) {
  const getInteractionText = (type: string) => {
    switch (type) {
      case 'liked': return 'Liked your pitch';
      case 'saved': return 'Saved your pitch';
      case 'commented': return 'Commented on your pitch';
      case 'connected': return 'Requested connection';
      default: return 'Showed interest';
    }
  };

  const getInteractionColor = (type: string) => {
    switch (type) {
      case 'liked': return 'bg-red-100 text-red-700';
      case 'saved': return 'bg-blue-100 text-blue-700';
      case 'commented': return 'bg-green-100 text-green-700';
      case 'connected': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className="hover:shadow-card transition-all duration-300 border-0 shadow-soft">
      <CardContent className="p-6">
        {/* Header with Avatar and Name */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={investor.avatar} alt={investor.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {investor.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{investor.name}</h3>
              <p className="text-sm text-muted-foreground">{investor.email}</p>
              {investor.company && (
                <div className="flex items-center mt-1">
                  <Building2 className="h-3 w-3 mr-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">{investor.company}</p>
                </div>
              )}
            </div>
          </div>
          
          <Badge className={getStatusColor(investor.connectionStatus)}>
            {investor.connectionStatus}
          </Badge>
        </div>

        {/* Interaction Info */}
        <div className="mb-4">
          <Badge className={getInteractionColor(investor.interactionType)} variant="secondary">
            {getInteractionText(investor.interactionType)}
          </Badge>
          <p className="text-sm text-muted-foreground mt-1">
            on "{investor.pitchTitle}"
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {new Date(investor.lastInteraction).toLocaleDateString()}
          </p>
        </div>

        {/* Investment Focus */}
        {investor.investmentFocus && (
          <div className="mb-4">
            <p className="text-sm font-medium text-muted-foreground mb-1">Investment Focus:</p>
            <p className="text-sm">{investor.investmentFocus}</p>
          </div>
        )}

        {/* Bio */}
        {investor.bio && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground line-clamp-2">{investor.bio}</p>
          </div>
        )}

        {/* Interests */}
        {investor.interests && investor.interests.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {investor.interests.slice(0, 3).map((interest, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {interest}
                </Badge>
              ))}
              {investor.interests.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{investor.interests.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-4 border-t">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => onViewProfile?.(investor.id)}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Profile
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => onMessage?.(investor.id)}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Message
          </Button>
          
          {investor.connectionStatus === 'pending' && (
            <Button
              size="sm"
              className="flex-1"
              onClick={() => onConnect?.(investor.id)}
            >
              <Mail className="h-4 w-4 mr-2" />
              Accept
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}