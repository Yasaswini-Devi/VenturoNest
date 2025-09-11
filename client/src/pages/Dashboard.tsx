import React from "react";
// @ts-ignore
import ReactPlayer from "react-player";
import VideoModal from "../components/VideoModal";

interface Video {
  id: string;
  url: string;
  title: string;
  description: string;
  channel: string;
  views: string;
  uploadTime: string;
  duration: string;
}

interface DashboardProps {
  userType?: "entrepreneur" | "investor";
}

const Dashboard: React.FC<DashboardProps> = ({ userType = "entrepreneur" }) => {
  const [selectedVideo, setSelectedVideo] = React.useState<any>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [hoveredCard, setHoveredCard] = React.useState<string | null>(null);

  // Sample video data
  const videos: Video[] = [
    {
      id: "1",
      url: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      title: "Revolutionary AI Startup Pitch - Next Generation Technology",
      description: "Watch our groundbreaking AI startup pitch that's changing the future of technology. Learn about our innovative solutions and investment opportunities.",
      channel: "TechVentures",
      views: "125K views",
      uploadTime: "2 days ago",
      duration: "12:45"
    },
    {
      id: "2",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: "Sustainable Energy Startup - Clean Tech Innovation",
      description: "Discover how our clean energy startup is revolutionizing sustainable power solutions. Perfect investment opportunity for green tech investors.",
      channel: "GreenTech Innovations",
      views: "89K views",
      uploadTime: "1 week ago",
      duration: "8:32"
    },
    {
      id: "3",
      url: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
      title: "FinTech Revolution - Digital Banking Platform",
      description: "The future of banking is here. See how our FinTech startup is disrupting traditional financial services with innovative digital solutions.",
      channel: "FinTech Future",
      views: "234K views",
      uploadTime: "3 days ago",
      duration: "15:20"
    },
    {
      id: "4",
      url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
      title: "Healthcare Innovation - Medical AI Assistant",
      description: "Revolutionary healthcare technology that's saving lives. Our AI-powered medical assistant is transforming patient care worldwide.",
      channel: "MedTech Solutions",
      views: "567K views",
      uploadTime: "5 days ago",
      duration: "10:15"
    },
    {
      id: "5",
      url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
      title: "EdTech Platform - Future of Online Learning",
      description: "Transform education with our innovative learning platform. See how we're making quality education accessible to millions worldwide.",
      channel: "EduTech Leaders",
      views: "156K views",
      uploadTime: "1 week ago",
      duration: "13:45"
    },
    {
      id: "6",
      url: "https://www.youtube.com/watch?v=L_LUpnjgPso",
      title: "AgriTech Revolution - Smart Farming Solutions",
      description: "The future of agriculture is smart and sustainable. Discover our IoT-powered farming solutions that increase yield while protecting the environment.",
      channel: "Smart Farming Co",
      views: "78K views",
      uploadTime: "4 days ago",
      duration: "9:28"
    }
  ];

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const styles = {
    container: {
      padding: "2rem",
      width: "100%",
      backgroundColor: "#f8fafc",
      minHeight: "calc(100vh - 200px)"
    },
    header: {
      marginBottom: "3rem",
      textAlign: "center" as const
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#1e293b",
      marginBottom: "0.5rem",
      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text"
    },
    subtitle: {
      fontSize: "1.1rem",
      color: "#64748b",
      maxWidth: "600px",
      margin: "0 auto"
    },
    videoGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
      gap: "1.5rem",
      marginBottom: "3rem",
      width: "100%"
    },
    videoCard: {
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
      cursor: "pointer",
      transition: "all 0.3s ease",
      border: "1px solid #f1f5f9"
    },
    videoCardHovered: {
      transform: "translateY(-8px)",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)"
    },
    videoContainer: {
      position: "relative" as const,
      width: "100%",
      height: "220px",
      backgroundColor: "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    thumbnailOverlay: {
      position: "absolute" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: 0,
      transition: "opacity 0.3s ease"
    },
    thumbnailOverlayHovered: {
      opacity: 1
    },
    playButton: {
      width: "60px",
      height: "60px",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.5rem",
      color: "#3b82f6",
      border: "none",
      cursor: "pointer",
      transform: "scale(0.8)",
      transition: "transform 0.3s ease"
    },
    playButtonHovered: {
      transform: "scale(1)"
    },
    duration: {
      position: "absolute" as const,
      bottom: "8px",
      right: "8px",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      color: "#ffffff",
      padding: "2px 6px",
      borderRadius: "4px",
      fontSize: "0.75rem",
      fontWeight: "500"
    },
    cardContent: {
      padding: "1.5rem"
    },
    cardHeader: {
      display: "flex",
      alignItems: "flex-start",
      gap: "0.75rem",
      marginBottom: "0.5rem"
    },
    channelAvatar: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      backgroundColor: "#3b82f6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffffff",
      fontSize: "0.875rem",
      fontWeight: "600",
      flexShrink: 0
    },
    cardInfo: {
      flex: 1,
      minWidth: 0
    },
    cardTitle: {
      fontSize: "1rem",
      fontWeight: "600",
      color: "#1e293b",
      lineHeight: "1.4",
      marginBottom: "0.25rem",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical" as any
    },
    channelName: {
      fontSize: "0.875rem",
      color: "#64748b",
      fontWeight: "500",
      marginBottom: "0.25rem"
    },
    videoMeta: {
      fontSize: "0.875rem",
      color: "#64748b",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
    },
    metaDot: {
      width: "3px",
      height: "3px",
      backgroundColor: "#64748b",
      borderRadius: "50%"
    },
    description: {
      fontSize: "0.875rem",
      color: "#64748b",
      lineHeight: "1.5",
      marginTop: "0.5rem",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical" as any
    },
    actionButtons: {
      display: "flex",
      gap: "0.5rem",
      marginTop: "1rem",
      paddingTop: "1rem",
      borderTop: "1px solid #f1f5f9"
    },
    actionButton: {
      flex: 1,
      padding: "0.5rem 1rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      border: "1px solid #e2e8f0",
      borderRadius: "6px",
      backgroundColor: "#ffffff",
      color: "#374151",
      cursor: "pointer",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.375rem"
    },
    primaryButton: {
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      border: "1px solid #3b82f6"
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Investor Dashboard</h1>
        <p style={styles.subtitle}>
          Discover innovative startups and investment opportunities. 
          Connect with entrepreneurs and watch their journey unfold.
        </p>
      </div>

      {/* Video Grid */}
      <div style={styles.videoGrid}>
        {videos.map((video) => (
          <div
            key={video.id}
            style={{
              ...styles.videoCard,
              ...(hoveredCard === video.id ? styles.videoCardHovered : {})
            }}
            onMouseEnter={() => setHoveredCard(video.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleVideoClick(video)}
          >
            {/* Video Thumbnail */}
            <div style={styles.videoContainer}>
              {/* Using a simple div with solid background instead of thumbnail */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#1e293b",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {/* Thumbnail Overlay */}
                <div
                  style={{
                    ...styles.thumbnailOverlay,
                    ...(hoveredCard === video.id ? styles.thumbnailOverlayHovered : {})
                  }}
                >
                  <button
                    style={{
                      ...styles.playButton,
                      ...(hoveredCard === video.id ? styles.playButtonHovered : {})
                    }}
                  >
                    ▶
                  </button>
                </div>

                {/* Duration */}
                <div style={styles.duration}>{video.duration}</div>
              </div>
            </div>

            {/* Card Content */}
            <div style={styles.cardContent}>
              <div style={styles.cardHeader}>
                <div style={styles.channelAvatar}>
                  {video.channel.charAt(0)}
                </div>
                <div style={styles.cardInfo}>
                  <h3 style={styles.cardTitle}>{video.title}</h3>
                  <p style={styles.channelName}>{video.channel}</p>
                  <div style={styles.videoMeta}>
                    <span>{video.views}</span>
                    <div style={styles.metaDot}></div>
                    <span>{video.uploadTime}</span>
                  </div>
                </div>
              </div>

              <p style={styles.description}>{video.description}</p>

              {/* Action Buttons */}
              <div style={styles.actionButtons}>
                {userType === "investor" ? (
                  <>
                    <button
                      style={{...styles.actionButton, ...styles.primaryButton}}
                      onClick={(e) => {
                        e.stopPropagation();
                        alert("Investment interest noted!");
                      }}
                    >
                      💰 Invest
                    </button>
                    <button
                      style={styles.actionButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        alert("Contacting startup...");
                      }}
                    >
                      📞 Contact
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      style={{...styles.actionButton, ...styles.primaryButton}}
                      onClick={(e) => {
                        e.stopPropagation();
                        alert("Saved to favorites!");
                      }}
                    >
                      ❤️ Save
                    </button>
                    <button
                      style={styles.actionButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        alert("Sharing...");
                      }}
                    >
                      📤 Share
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {isModalOpen && selectedVideo && (
        <VideoModal
          video={selectedVideo}
          isOpen={isModalOpen}
          onClose={closeModal}
          userType={userType}
        />
      )}
    </div>
  );
};

export default Dashboard;
