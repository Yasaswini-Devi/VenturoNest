import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { X, Bot, Calendar, Target } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  feedback: string;
  pitchTitle: string;
  generatedAt: string;
  isLoading?: boolean;
}

export function FeedbackModal({ 
  isOpen, 
  onClose, 
  feedback, 
  pitchTitle, 
  generatedAt,
  isLoading = false 
}: FeedbackModalProps) {
  // Format the feedback text with proper styling
  const formatFeedback = (text: string) => {
    // Split by sections and format
    const sections = text.split('##').filter(section => section.trim());
    
    return sections.map((section, index) => {
      const lines = section.trim().split('\n').filter(line => line.trim());
      const title = lines[0]?.trim();
      const content = lines.slice(1);
      
      if (!title) return null;

      return (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
            {title.includes('Recommendation') && <Target className="h-5 w-5" />}
            {title.includes('Score') && <Badge variant="outline" className="text-sm">Score</Badge>}
            {title}
          </h3>
          <div className="space-y-2">
            {content.map((line, lineIndex) => {
              const trimmedLine = line.trim();
              if (!trimmedLine) return null;
              
              if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-')) {
                return (
                  <div key={lineIndex} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    <span className="flex-1">{trimmedLine.substring(1).trim()}</span>
                  </div>
                );
              } else if (trimmedLine.includes('INVEST') || trimmedLine.includes('CONSIDER') || trimmedLine.includes('WORK')) {
                return (
                  <Badge 
                    key={lineIndex} 
                    variant={
                      trimmedLine.includes('STRONG INVEST') || trimmedLine.includes('HIGH INTEREST') ? 'default' :
                      trimmedLine.includes('CONSIDER') || trimmedLine.includes('MODERATE') ? 'secondary' : 
                      'destructive'
                    }
                    className="text-sm px-3 py-1"
                  >
                    {trimmedLine}
                  </Badge>
                );
              } else {
                return (
                  <p key={lineIndex} className="text-muted-foreground leading-relaxed">
                    {trimmedLine}
                  </p>
                );
              }
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold">
                  AI Pitch Feedback
                </DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Analysis for "{pitchTitle}"
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
            <Calendar className="h-3 w-3" />
            Generated on {new Date(generatedAt).toLocaleString()}
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="px-6 py-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="text-muted-foreground">
                    AI is analyzing your pitch...
                  </p>
                  <p className="text-xs text-muted-foreground">
                    This may take up to 30 seconds
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                {feedback ? formatFeedback(feedback) : (
                  <div className="text-center py-8">
                    <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No feedback available
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="px-6 py-4 border-t bg-muted/30">
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              This feedback is AI-generated and should be used as guidance only.
            </p>
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}