import { Heart, MessageCircle, Bookmark, Play, DollarSign, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Pitch } from '@/types/user';

interface PitchCardProps {
  pitch: Pitch;
  userRole: 'entrepreneur' | 'investor';
  onLike?: (pitchId: string) => void;
  onSave?: (pitchId: string) => void;
  onComment?: (pitchId: string) => void;
  onView?: (pitchId: string) => void;
}

export function PitchCard({ pitch, userRole, onLike, onSave, onComment, onView }: PitchCardProps) {
  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="group hover:shadow-card transition-all duration-300 border-0 shadow-soft">
      <CardContent className="p-0">
        {/* Video Thumbnail */}
        <div className="relative aspect-video bg-gradient-hero rounded-t-lg overflow-hidden">
          <img 
            src={pitch.thumbnailUrl} 
            alt={pitch.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          <Button
            size="sm"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-12 h-12 bg-white/90 hover:bg-white text-primary hover:text-primary-hover"
            onClick={() => onView?.(pitch.id)}
          >
            <Play className="h-5 w-5 ml-0.5" />
          </Button>
          
          {/* Industry Badge */}
          <Badge className="absolute top-3 left-3 bg-white/90 text-primary hover:bg-white">
            {pitch.industry}
          </Badge>
          
          {/* Funding Need */}
          <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-sm flex items-center">
            <DollarSign className="h-3 w-3 mr-1" />
            {formatAmount(pitch.fundingNeeds, pitch.currency)}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Entrepreneur Info */}
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={pitch.entrepreneur.avatar} alt={pitch.entrepreneur.name} />
              <AvatarFallback>{pitch.entrepreneur.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{pitch.entrepreneur.name}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(pitch.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{pitch.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{pitch.description}</p>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className={`p-2 ${pitch.isLiked ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => onLike?.(pitch.id)}
              >
                <Heart className={`h-4 w-4 mr-1 ${pitch.isLiked ? 'fill-current' : ''}`} />
                {pitch.likes}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground p-2"
                onClick={() => onComment?.(pitch.id)}
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                {pitch.comments}
              </Button>

              {userRole === 'investor' && (
                <Button
                  variant="ghost"
                  size="sm"
                  className={`p-2 ${pitch.isSaved ? 'text-primary hover:text-primary-hover' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => onSave?.(pitch.id)}
                >
                  <Bookmark className={`h-4 w-4 ${pitch.isSaved ? 'fill-current' : ''}`} />
                </Button>
              )}
            </div>

            {userRole === 'entrepreneur' && (
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-2">
                <Eye className="h-4 w-4 mr-1" />
                {pitch.saves}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}