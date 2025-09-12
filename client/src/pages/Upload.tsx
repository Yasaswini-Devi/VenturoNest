import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload as UploadIcon, Link2, Play, X, Plus, DollarSign, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '@/components/auth/AuthContext';
import { uploadPitchWithFile, uploadPitchWithLink, savePitchAsDraft } from '@/services/pitchApi';
import type { PitchUploadData } from '@/services/pitchApi';

const industries = [
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

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];

export default function Upload() {
  const { user } = useAuth();
  const [uploadType, setUploadType] = useState<'file' | 'link'>('file');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    industry: '',
    fundingNeeds: '',
    currency: 'USD',
    videoFile: null as File | null,
    videoLink: '',
    tags: [] as string[],
  });
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
    pitchId?: string;
  }>({
    type: null,
    message: '',
  });
  const [isDraftSaving, setIsDraftSaving] = useState(false);

  if (!user) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        setFormData({ ...formData, videoFile: file });
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, videoFile: e.target.files[0] });
    }
  };

  const addTag = (tag: string) => {
    if (!formData.tags.includes(tag) && formData.tags.length < 5) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setUploadStatus({
        type: 'error',
        message: 'You must be logged in to upload a pitch',
      });
      return;
    }

    // Validation
    if (!formData.title || !formData.description || !formData.industry || !formData.fundingNeeds) {
      setUploadStatus({
        type: 'error',
        message: 'Please fill in all required fields',
      });
      return;
    }

    if (!formData.videoFile && !formData.videoLink) {
      setUploadStatus({
        type: 'error',
        message: 'Please provide either a video file or video link',
      });
      return;
    }

    setIsUploading(true);
    setUploadStatus({ type: null, message: '' });

    try {
      const uploadData: PitchUploadData = {
        title: formData.title,
        description: formData.description,
        industry: formData.industry,
        fundingNeeds: formData.fundingNeeds,
        currency: formData.currency,
        entrepreneurId: user.id,
        tags: formData.tags,
        videoFile: formData.videoFile || undefined,
        videoLink: formData.videoLink || undefined,
      };

      let result;
      
      if (formData.videoFile) {
        // Upload with file
        result = await uploadPitchWithFile(uploadData);
      } else {
        // Upload with link
        result = await uploadPitchWithLink(uploadData);
      }

      if (result.success) {
        setUploadStatus({
          type: 'success',
          message: 'Pitch uploaded successfully! Your pitch is now live.',
          pitchId: result.data?.pitchId,
        });
        
        // Reset form after successful upload
        setFormData({
          title: '',
          description: '',
          industry: '',
          fundingNeeds: '',
          currency: 'USD',
          videoFile: null,
          videoLink: '',
          tags: [],
        });
        
        // Reset upload type
        setUploadType('file');
        
      } else {
        setUploadStatus({
          type: 'error',
          message: result.message || 'Failed to upload pitch',
        });
      }
    } catch (error) {
      setUploadStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again.',
      });
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!user) {
      setUploadStatus({
        type: 'error',
        message: 'You must be logged in to save a draft',
      });
      return;
    }

    if (!formData.title) {
      setUploadStatus({
        type: 'error',
        message: 'Please provide at least a title to save as draft',
      });
      return;
    }

    setIsDraftSaving(true);
    setUploadStatus({ type: null, message: '' });

    try {
      const draftData: Partial<PitchUploadData> = {
        title: formData.title,
        description: formData.description,
        industry: formData.industry,
        fundingNeeds: formData.fundingNeeds,
        currency: formData.currency,
        entrepreneurId: user.id,
        tags: formData.tags,
        videoLink: formData.videoLink,
      };

      const result = await savePitchAsDraft(draftData);

      if (result.success) {
        setUploadStatus({
          type: 'success',
          message: 'Draft saved successfully! You can continue working on it later.',
        });
      } else {
        setUploadStatus({
          type: 'error',
          message: result.message || 'Failed to save draft',
        });
      }
    } catch (error) {
      setUploadStatus({
        type: 'error',
        message: 'Failed to save draft. Please try again.',
      });
      console.error('Draft save error:', error);
    } finally {
      setIsDraftSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Upload Your Pitch</h1>
          <p className="text-muted-foreground">Share your innovative idea with potential investors</p>
        </div>

        {/* Status Alert */}
        {uploadStatus.type && (
          <Alert className={`mb-6 ${uploadStatus.type === 'success' ? 'border-green-500' : 'border-red-500'}`}>
            {uploadStatus.type === 'success' ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertTitle>
              {uploadStatus.type === 'success' ? 'Success!' : 'Error'}
            </AlertTitle>
            <AlertDescription>
              {uploadStatus.message}
              {uploadStatus.pitchId && (
                <div className="mt-2">
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                    Pitch ID: {uploadStatus.pitchId}
                  </code>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Video Upload */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle>Pitch Video</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={uploadType} onValueChange={(value) => setUploadType(value as 'file' | 'link')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="file">Upload File</TabsTrigger>
                  <TabsTrigger value="link">External Link</TabsTrigger>
                </TabsList>

                <TabsContent value="file" className="space-y-4">
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive 
                        ? 'border-primary bg-primary/5' 
                        : 'border-muted-foreground/25 hover:border-primary/50'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {formData.videoFile ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto">
                          <Play className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{formData.videoFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(formData.videoFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setFormData({ ...formData, videoFile: null })}
                        >
                          Remove File
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto">
                          <UploadIcon className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <p className="text-lg font-medium">Drop your video here</p>
                          <p className="text-muted-foreground">or click to browse files</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Supports MP4, MOV, AVI up to 100MB
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="video-upload"
                        />
                        <Button type="button" asChild>
                          <label htmlFor="video-upload" className="cursor-pointer">
                            Choose File
                          </label>
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="link" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="video-link">Video URL</Label>
                    <div className="relative">
                      <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="video-link"
                        placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                        className="pl-10"
                        value={formData.videoLink}
                        onChange={(e) => setFormData({ ...formData, videoLink: e.target.value })}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Pitch Details */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle>Pitch Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Pitch Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., AI-Powered Healthcare Assistant"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your idea, what problem it solves, and why it's innovative..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              {/* Industry & Funding */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="funding">Funding Needed *</Label>
                  <div className="flex space-x-2">
                    <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency} value={currency}>
                            {currency}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="relative flex-1">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="funding"
                        placeholder="500000"
                        type="number"
                        className="pl-10"
                        value={formData.fundingNeeds}
                        onChange={(e) => setFormData({ ...formData, fundingNeeds: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>Tags (Optional)</Label>
                <p className="text-sm text-muted-foreground">Add up to 5 tags to help investors find your pitch</p>
                
                {/* Current Tags */}
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {formData.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => removeTag(tag)}
                      >
                        {tag}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Available Tags */}
                {formData.tags.length < 5 && (
                  <div className="flex flex-wrap gap-2">
                    {industries
                      .filter(industry => !formData.tags.includes(industry))
                      .slice(0, 8)
                      .map((industry) => (
                        <Badge 
                          key={industry} 
                          variant="outline" 
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                          onClick={() => addTag(industry)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          {industry}
                        </Badge>
                      ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isUploading || isDraftSaving || !formData.title}
            >
              {isDraftSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving Draft...
                </>
              ) : (
                'Save as Draft'
              )}
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-primary hover:opacity-90"
              disabled={
                isUploading || 
                isDraftSaving || 
                !formData.title || 
                !formData.description || 
                !formData.industry || 
                !formData.fundingNeeds ||
                (!formData.videoFile && !formData.videoLink)
              }
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {formData.videoFile ? 'Uploading Video...' : 'Publishing Pitch...'}
                </>
              ) : (
                'Publish Pitch'
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}