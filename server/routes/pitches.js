const express = require('express');
const multer = require('multer');
const request = require('request');
const mongoose = require('mongoose');

const VideoPitch = require('../models/VideoPitch');
const User = require('../models/User');
const { getPitchFeedbackFromData } = require('../services/feedback');
const router = express.Router();

// Configure multer for file uploads (memory storage for ImageKit)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed!'), false);
    }
  }
});

// ImageKit configuration (these should be in environment variables)
const IMAGEKIT_CONFIG = {
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || 'your_public_key',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || 'your_private_key',
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/your_id'
};

// Function to upload file to ImageKit
const uploadToImageKit = (fileBuffer, fileName, options = {}) => {
  return new Promise((resolve, reject) => {
    const formData = {
      file: {
        value: fileBuffer,
        options: {
          filename: fileName,
          contentType: 'video/mp4'
        }
      },
      fileName: fileName,
      useUniqueFileName: 'true',
      folder: options.folder || '/pitches',
      tags: options.tags || ''
    };

    const requestOptions = {
      method: 'POST',
      url: 'https://upload.imagekit.io/api/v1/files/upload',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Basic ${Buffer.from(IMAGEKIT_CONFIG.privateKey + ':').toString('base64')}`
      },
      formData
    };

    request(requestOptions, (error, response, body) => {
      if (error) return reject(error);

      try {
        const result = JSON.parse(body);
        if (result.error) {
          return reject(new Error(result.error.message || 'ImageKit upload failed'));
        }
        resolve(result);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
};

// @route   POST /api/pitches/upload
// @desc    Upload a new video pitch
router.post('/upload', upload.single('video'), async (req, res) => {
  try {
    const {
      title,
      description,
      industry,
      fundingNeeds,
      currency,
      tags,
      videoLink
    } = req.body;
     const entrepreneurId = "68c3d446966984934a384293";
    if (!title || !description || !industry || !fundingNeeds || !entrepreneurId) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, industry, funding needs, and entrepreneur ID are required'
      });
    }

    let videoUrl = '';
    let thumbnailUrl = '';

    if (req.file) {
      const uploadOptions = {
        tags: `pitch,${industry.toLowerCase().replace(/\s+/g, '-')}`,
        folder: '/pitches/videos'
      };

      const uploadResult = await uploadToImageKit(
        req.file.buffer,
        `${title.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.${req.file.mimetype.split('/')[1]}`,
        uploadOptions
      );

      videoUrl = uploadResult.url;
      thumbnailUrl = uploadResult.thumbnailUrl || uploadResult.url;
    } else if (videoLink) {
      videoUrl = videoLink;
      thumbnailUrl = '';
    } else {
      return res.status(400).json({
        success: false,
        message: 'Either video file or video link is required'
      });
    }

    const newPitch = new VideoPitch({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      industry,
      fundingNeeds: parseFloat(fundingNeeds),
      currency: currency || 'USD',
      entrepreneurId,
      tags: tags ? (typeof tags === 'string' ? tags.split(',') : tags) : [],
      isPublished: true,
      isDraft: false
    });

    const savedPitch = await newPitch.save();

    res.status(201).json({
      success: true,
      message: 'Pitch uploaded successfully',
      data: {
        pitchId: savedPitch._id,
        videoUrl: savedPitch.videoUrl,
        thumbnailUrl: savedPitch.thumbnailUrl,
        title: savedPitch.title,
        createdAt: savedPitch.createdAt
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during pitch upload',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/pitches/draft
// @desc    Save a pitch as draft
router.post('/draft', upload.single('video'), async (req, res) => {
  try {
    const {
      title,
      description,
      industry,
      fundingNeeds,
      currency,
      entrepreneurId,
      tags,
      videoLink
    } = req.body;

    if (!title || !entrepreneurId) {
      return res.status(400).json({
        success: false,
        message: 'Title and entrepreneur ID are required for draft'
      });
    }

    let videoUrl = '';
    let thumbnailUrl = '';

    if (req.file) {
      const uploadOptions = {
        tags: `draft,pitch${industry ? ',' + industry.toLowerCase().replace(/\s+/g, '-') : ''}`,
        folder: '/pitches/drafts'
      };

      const uploadResult = await uploadToImageKit(
        req.file.buffer,
        `draft-${title.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.${req.file.mimetype.split('/')[1]}`,
        uploadOptions
      );

      videoUrl = uploadResult.url;
      thumbnailUrl = uploadResult.thumbnailUrl || uploadResult.url;
    } else if (videoLink) {
      videoUrl = videoLink;
    }

    const draftPitch = new VideoPitch({
      title,
      description: description || '',
      videoUrl,
      thumbnailUrl,
      industry: industry || '',
      fundingNeeds: fundingNeeds ? parseFloat(fundingNeeds) : 0,
      currency: currency || 'USD',
      entrepreneurId: mongoose.Types.ObjectId(entrepreneurId),
      tags: tags ? (typeof tags === 'string' ? tags.split(',') : tags) : [],
      isPublished: false,
      isDraft: true
    });

    const savedDraft = await draftPitch.save();

    res.status(201).json({
      success: true,
      message: 'Draft saved successfully',
      data: {
        pitchId: savedDraft._id,
        title: savedDraft.title,
        isDraft: savedDraft.isDraft,
        createdAt: savedDraft.createdAt
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during draft save',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/pitches/all
// @desc    Get all published pitches
router.get('/all', async (req, res) => {
  try {
    const { industry, sortBy, limit = 20, page = 1 } = req.query;

    const filter = { isPublished: true, isDraft: false };
    if (industry && industry !== 'all') {
      filter.industry = { $regex: industry, $options: 'i' };
    }

    let sortQuery = {};
    switch (sortBy) {
      case 'newest': sortQuery = { createdAt: -1 }; break;
      case 'oldest': sortQuery = { createdAt: 1 }; break;
      case 'funding-high': sortQuery = { fundingNeeds: -1 }; break;
      case 'funding-low': sortQuery = { fundingNeeds: 1 }; break;
      default: sortQuery = { createdAt: -1 };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const pitches = await VideoPitch.find(filter)
      .populate('entrepreneurId', 'name email bio avatar interests createdAt')
      .sort(sortQuery)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await VideoPitch.countDocuments(filter);

    const transformedPitches = pitches.map(pitch => {
      const entrepreneur = pitch.entrepreneurId || {
        _id: null,
        name: 'Unknown Entrepreneur',
        email: '',
        bio: '',
        avatar: '',
        interests: [],
        createdAt: pitch.createdAt
      };

      return {
        id: pitch._id,
        title: pitch.title,
        description: pitch.description,
        videoUrl: pitch.videoUrl,
        thumbnailUrl: pitch.thumbnailUrl,
        industry: pitch.industry,
        fundingNeeds: pitch.fundingNeeds,
        currency: pitch.currency,
        entrepreneurId: entrepreneur._id,
        entrepreneur: {
          id: entrepreneur._id,
          name: entrepreneur.name,
          email: entrepreneur.email,
          role: 'entrepreneur',
          avatar: entrepreneur.avatar || '',
          bio: entrepreneur.bio || '',
          interests: entrepreneur.interests || [],
          createdAt: entrepreneur.createdAt || pitch.createdAt,
        },
        likes: pitch.likes ? pitch.likes.length : 0,
        comments: pitch.comments ? pitch.comments.length : 0,
        saves: pitch.saves ? pitch.saves.length : 0,
        isLiked: false,
        isSaved: false,
        createdAt: pitch.createdAt,
        tags: pitch.tags || []
      };
    });

    res.json({
      success: true,
      data: transformedPitches,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pitches',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/pitches/:id
// @desc    Get single pitch by ID
router.get('/:id', async (req, res) => {
  try {
    const pitch = await VideoPitch.findById(req.params.id)
      .populate('entrepreneurId', 'name email bio avatar interests createdAt');

    if (!pitch) {
      return res.status(404).json({
        success: false,
        message: 'Pitch not found'
      });
    }

    const entrepreneur = pitch.entrepreneurId || {
      _id: null,
      name: 'Unknown Entrepreneur',
      email: '',
      bio: '',
      avatar: '',
      interests: [],
      createdAt: pitch.createdAt
    };

    const transformedPitch = {
      id: pitch._id,
      title: pitch.title,
      description: pitch.description,
      videoUrl: pitch.videoUrl,
      thumbnailUrl: pitch.thumbnailUrl,
      industry: pitch.industry,
      fundingNeeds: pitch.fundingNeeds,
      currency: pitch.currency,
      entrepreneurId: entrepreneur._id,
      entrepreneur: {
        id: entrepreneur._id,
        name: entrepreneur.name,
        email: entrepreneur.email,
        role: 'entrepreneur',
        avatar: entrepreneur.avatar || '',
        bio: entrepreneur.bio || '',
        interests: entrepreneur.interests || [],
        createdAt: entrepreneur.createdAt || pitch.createdAt,
      },
      likes: pitch.likes ? pitch.likes.length : 0,
      comments: pitch.comments ? pitch.comments.length : 0,
      saves: pitch.saves ? pitch.saves.length : 0,
      isLiked: false,
      isSaved: false,
      createdAt: pitch.createdAt,
      tags: pitch.tags || []
    };

    res.json({
      success: true,
      data: transformedPitch
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pitch',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/pitches/trending/top
// @desc    Get trending pitches
router.get('/trending/top', async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const pitches = await VideoPitch.aggregate([
      { $match: { isPublished: true, isDraft: false } },
      {
        $addFields: {
          engagementScore: {
            $add: [
              { $size: { $ifNull: ['$likes', []] } },
              { $size: { $ifNull: ['$saves', []] } },
              { $size: { $ifNull: ['$comments', []] } }
            ]
          }
        }
      },
      { $sort: { engagementScore: -1, createdAt: -1 } },
      { $limit: parseInt(limit) },
      {
        $lookup: {
          from: 'users',
          localField: 'entrepreneurId',
          foreignField: '_id',
          as: 'entrepreneurData'
        }
      },
      { $unwind: { path: '$entrepreneurData', preserveNullAndEmptyArrays: true } }
    ]);

    const transformedPitches = pitches.map(pitch => {
      const entrepreneur = pitch.entrepreneurData || {
        _id: pitch.entrepreneurId,
        name: 'Unknown Entrepreneur',
        email: '',
        bio: '',
        avatar: '',
        interests: [],
        createdAt: pitch.createdAt
      };

      return {
        id: pitch._id,
        title: pitch.title,
        description: pitch.description,
        videoUrl: pitch.videoUrl,
        thumbnailUrl: pitch.thumbnailUrl,
        industry: pitch.industry,
        fundingNeeds: pitch.fundingNeeds,
        currency: pitch.currency,
        entrepreneurId: pitch.entrepreneurId,
        entrepreneur: {
          id: entrepreneur._id,
          name: entrepreneur.name,
          email: entrepreneur.email,
          role: 'entrepreneur',
          avatar: entrepreneur.avatar || '',
          bio: entrepreneur.bio || '',
          interests: entrepreneur.interests || [],
          createdAt: entrepreneur.createdAt || pitch.createdAt,
        },
        likes: (pitch.likes || []).length,
        comments: (pitch.comments || []).length,
        saves: (pitch.saves || []).length,
        isLiked: false,
        isSaved: false,
        createdAt: pitch.createdAt,
        tags: pitch.tags || []
      };
    });

    res.json({
      success: true,
      data: transformedPitches
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trending pitches',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/pitches/debug/:id
// @desc    Debug specific pitch data
router.get('/debug/:id', async (req, res) => {
  try {
    const pitch = await VideoPitch.findById(req.params.id);
    if (!pitch) {
      return res.status(404).json({
        success: false,
        message: 'Pitch not found'
      });
    }

    res.json({
      success: true,
      data: {
        id: pitch._id,
        title: pitch.title,
        description: pitch.description,
        videoUrl: pitch.videoUrl,
        thumbnailUrl: pitch.thumbnailUrl,
        videoUrlType: typeof pitch.videoUrl,
        videoUrlLength: pitch.videoUrl ? pitch.videoUrl.length : 0,
        isPublished: pitch.isPublished,
        isDraft: pitch.isDraft,
        createdAt: pitch.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to debug pitch',
      error: error.message
    });
  }
});

// 🤖 Generate AI feedback for a pitch
router.post('/:id/feedback', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate pitch ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid pitch ID format'
      });
    }

    // Find the pitch
    const pitch = await VideoPitch.findById(id).populate('entrepreneurId', 'name email');
    
    if (!pitch) {
      return res.status(404).json({
        success: false,
        message: 'Pitch not found'
      });
    }

    // Generate AI feedback
    const pitchData = {
      title: pitch.title,
      industry: pitch.industry,
      fundingNeeds: pitch.fundingNeeds,
      description: pitch.description
    };

    console.log('Generating AI feedback for pitch:', pitch.title);
    const feedback = await getPitchFeedbackFromData(pitchData);

    // Store feedback in database (optional - you could add a feedback field to VideoPitch model)
    pitch.aiFeedback = feedback;
    pitch.feedbackGeneratedAt = new Date();
    await pitch.save();

    res.json({
      success: true,
      data: {
        pitchId: pitch._id,
        pitchTitle: pitch.title,
        feedback: feedback,
        generatedAt: new Date().toISOString()
      },
      message: 'AI feedback generated successfully'
    });

  } catch (error) {
    console.error('Error generating pitch feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate AI feedback',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;
