import React, { useState } from 'react';
import VideoModal from '../components/VideoModal';

interface Video {
  id: number;
  url: string;
  title: string;
  description: string;
  duration: string;
  channel: string;
  timeAgo: string;
}

interface EntrepreneurDashboardProps {
  userType: "entrepreneur" | "investor";
}

const EntrepreneurDashboard: React.FC<EntrepreneurDashboardProps> = ({ userType }) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openVideoModal = (video: Video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };

  // Sample data for entrepreneur dashboard - focused on investors and funding opportunities
  const videos: Video[] = [
    {
      id: 1,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: "Venture Capital Insights - Q4 2024 Funding Trends",
      description: "Learn about the latest funding trends and what investors are looking for in 2024. Key insights from top VCs.",
      duration: "8:45",
      channel: "VentureInsights",
      timeAgo: "2 days ago"
    },
    {
      id: 2,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: "Angel Investor Spotlight - Sarah Johnson",
      description: "Meet Sarah Johnson, angel investor focused on HealthTech startups. Learn her investment criteria.",
      duration: "12:30",
      channel: "AngelSpotlight",
      timeAgo: "5 days ago"
    },
    {
      id: 3,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: "How to Perfect Your Startup Pitch Deck",
      description: "Essential tips for creating a compelling pitch deck that catches investor attention.",
      duration: "15:20",
      channel: "StartupSuccess",
      timeAgo: "1 week ago"
    },
    {
      id: 4,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: "TechCorp Ventures - Investment Portfolio Update",
      description: "Overview of TechCorp Ventures' recent investments and future focus areas in AI and ML.",
      duration: "10:15",
      channel: "TechCorp Ventures",
      timeAgo: "3 days ago"
    },
    {
      id: 5,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: "Seed Funding Success Stories - FinTech Edition",
      description: "Success stories from FinTech startups that secured seed funding in 2024.",
      duration: "18:45",
      channel: "FinTech Today",
      timeAgo: "4 days ago"
    },
    {
      id: 6,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: "Building Strategic Investor Relationships",
      description: "How to build long-term relationships with investors beyond just funding.",
      duration: "13:55",
      channel: "Entrepreneur Hub",
      timeAgo: "6 days ago"
    }
  ];

  const styles = {
    container: {
      width: "100%",
      padding: "0",
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    },
    header: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      padding: "3rem 2rem",
      textAlign: "center" as const,
    },
    title: {
      fontSize: "2.75rem",
      fontWeight: "700",
      marginBottom: "0.75rem",
      letterSpacing: "-0.025em"
    },
    subtitle: {
      fontSize: "1.25rem",
      opacity: 0.9,
      marginBottom: "2rem",
      fontWeight: "400",
      lineHeight: "1.6"
    },
    videoGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
      gap: "2rem",
      padding: "3rem 2rem",
      maxWidth: "1400px",
      margin: "0 auto"
    },
    videoCard: {
      backgroundColor: "white",
      borderRadius: "20px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      overflow: "hidden",
      cursor: "pointer",
      transition: "all 0.3s ease",
      height: "470px",
      border: "1px solid #f1f5f9",
      display: "flex",
      flexDirection: "column" as const
    },
    videoCardHover: {
      transform: "translateY(-8px)",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    },
    videoContainer: {
      position: "relative" as const,
      width: "100%",
      height: "220px",
      backgroundColor: "#1e293b",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    duration: {
      position: "absolute" as const,
      bottom: "12px",
      right: "12px",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      color: "white",
      padding: "6px 10px",
      borderRadius: "6px",
      fontSize: "0.8rem",
      fontWeight: "600",
    },
    cardContent: {
      padding: "1rem",
      flex: 1,
      display: "flex",
      flexDirection: "column" as const
    },
    channelRow: {
      display: "flex",
      alignItems: "center",
      marginBottom: "1rem",
    },
    channelAvatar: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      backgroundColor: "#6366f1",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "0.9rem",
      fontWeight: "600",
      marginRight: "0.75rem",
    },
    channelName: {
      fontSize: "0.9rem",
      color: "#64748b",
      fontWeight: "500",
    },
    videoTitle: {
      fontSize: "1.1rem",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "0.75rem",
      lineHeight: "1.4",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical" as any,
      overflow: "hidden",
    },
    videoMeta: {
      fontSize: "0.9rem",
      color: "#64748b",
      marginBottom: "0.75rem",
      fontWeight: "400"
    },
    videoDescription: {
      fontSize: "0.9rem",
      color: "#4b5563",
      lineHeight: "1.5",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical" as any,
      overflow: "hidden",
      marginBottom: "1.25rem",
      flex: 1
    },
    actionButtons: {
      display: "flex",
      gap: "0.75rem",
      marginTop: "auto"
    },
    primaryButton: {
      flex: 1,
      padding: "0.75rem 1rem",
      backgroundColor: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "10px",
      fontSize: "0.9rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem"
    },
    secondaryButton: {
      flex: 1,
      padding: "0.75rem 1rem",
      backgroundColor: "transparent",
      color: "#64748b",
      border: "1.5px solid #e2e8f0",
      borderRadius: "10px",
      fontSize: "0.9rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem"
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Investment Opportunities</h1>
        <p style={styles.subtitle}>
          Discover investors, funding trends, and grow your startup with the right connections
        </p>
      </div>

      <div style={styles.videoGrid}>
        {videos.map((video) => (
          <div
            key={video.id}
            style={styles.videoCard}
            onClick={() => openVideoModal(video)}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, styles.videoCardHover);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
            }}
          >
            <div style={styles.videoContainer}>
              <div style={styles.duration}>{video.duration}</div>
            </div>
            
            <div style={styles.cardContent}>
              <div style={styles.channelRow}>
                <div style={styles.channelAvatar}>
                  {video.channel.charAt(0)}
                </div>
                <span style={styles.channelName}>{video.channel}</span>
              </div>
              
              <h3 style={styles.videoTitle}>{video.title}</h3>
              <p style={styles.videoMeta}>{video.timeAgo}</p>
              <p style={styles.videoDescription}>{video.description}</p>
              
              <div style={styles.actionButtons}>
                <button 
                  style={styles.primaryButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#2563eb";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#3b82f6";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  💬 Connect
                </button>
                <button 
                  style={styles.secondaryButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8fafc";
                    e.currentTarget.style.borderColor = "#cbd5e1";
                    e.currentTarget.style.color = "#475569";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.color = "#64748b";
                  }}
                >
                  📈 Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedVideo && (
        <VideoModal
          video={selectedVideo}
          isOpen={isModalOpen}
          onClose={closeVideoModal}
          userType={userType}
        />
      )}
    </div>
  );
};

export default EntrepreneurDashboard;
