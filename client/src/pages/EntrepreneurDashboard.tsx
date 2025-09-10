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
  investorName: string;
  investmentFocus: string;
  portfolioCompanies: number;
  averageInvestment: string;
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

  // Sample data for entrepreneur dashboard - focused on interested investors
  const videos: Video[] = [
    {
      id: 1,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: "Sarah Johnson - Angel Investor",
      description: "Interested in your HealthTech startup. Has 15+ years experience in healthcare investments and is looking for innovative medical solutions.",
      duration: "Active",
      channel: "Angel Investor",
      timeAgo: "2 days ago",
      investorName: "Sarah Johnson",
      investmentFocus: "HealthTech, MedTech",
      portfolioCompanies: 12,
      averageInvestment: "$250K - $500K"
    },
    {
      id: 2,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: "Michael Chen - Venture Capitalist",
      description: "Showed interest in your AI platform. Partner at TechVentures with focus on early-stage AI and machine learning startups.",
      duration: "Active",
      channel: "VC Partner",
      timeAgo: "5 days ago",
      investorName: "Michael Chen",
      investmentFocus: "AI, Machine Learning",
      portfolioCompanies: 28,
      averageInvestment: "$1M - $5M"
    },
    {
      id: 3,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: "Emily Rodriguez - Seed Investor",
      description: "Interested in your FinTech solution. Specializes in early-stage financial technology companies with strong technical teams.",
      duration: "Active",
      channel: "Seed Fund",
      timeAgo: "1 week ago",
      investorName: "Emily Rodriguez",
      investmentFocus: "FinTech, Blockchain",
      portfolioCompanies: 18,
      averageInvestment: "$100K - $750K"
    },
    {
      id: 4,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: "David Kim - Strategic Investor",
      description: "Corporate investor from TechCorp interested in strategic partnership. Looking for innovative tech solutions for enterprise clients.",
      duration: "Active",
      channel: "Corporate VC",
      timeAgo: "3 days ago",
      investorName: "David Kim",
      investmentFocus: "Enterprise Tech, SaaS",
      portfolioCompanies: 8,
      averageInvestment: "$500K - $2M"
    },
    {
      id: 5,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: "Lisa Thompson - Impact Investor",
      description: "Interested in your sustainable energy startup. Focuses on companies with positive environmental and social impact.",
      duration: "Active",
      channel: "Impact Fund",
      timeAgo: "4 days ago",
      investorName: "Lisa Thompson",
      investmentFocus: "CleanTech, Sustainability",
      portfolioCompanies: 14,
      averageInvestment: "$300K - $1M"
    },
    {
      id: 6,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: "Robert Singh - Angel Investor",
      description: "Experienced entrepreneur turned investor. Interested in your EdTech platform and offers mentorship alongside investment.",
      duration: "Active",
      channel: "Angel Investor",
      timeAgo: "6 days ago",
      investorName: "Robert Singh",
      investmentFocus: "EdTech, Consumer Apps",
      portfolioCompanies: 22,
      averageInvestment: "$150K - $400K"
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
      gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))",
      gap: "3rem",
      padding: "4rem 2.5rem",
      maxWidth: "1500px",
      margin: "0 auto"
    },
    videoCard: {
      backgroundColor: "white",
      borderRadius: "24px",
      boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      overflow: "hidden",
      cursor: "pointer",
      transition: "all 0.3s ease",
      height: "520px",
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
      height: "240px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column" as const
    },
    investorAvatar: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2rem",
      fontWeight: "700",
      color: "#ffffff",
      marginBottom: "0.5rem",
      border: "3px solid rgba(255, 255, 255, 0.3)"
    },
    investorType: {
      color: "rgba(255, 255, 255, 0.9)",
      fontSize: "0.875rem",
      fontWeight: "600",
      textAlign: "center" as const
    },
    duration: {
      position: "absolute" as const,
      bottom: "12px",
      right: "12px",
      backgroundColor: "rgba(34, 197, 94, 0.9)",
      color: "white",
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "0.75rem",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      gap: "4px"
    },
    activeIndicator: {
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      backgroundColor: "#ffffff"
    },
    cardContent: {
      padding: "1.5rem",
      flex: 1,
      display: "flex",
      flexDirection: "column" as const
    },
    channelRow: {
      display: "flex",
      alignItems: "center",
      marginBottom: "1.25rem",
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
      marginBottom: "1rem",
      lineHeight: "1.4",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical" as any,
      overflow: "hidden",
    },
    videoMeta: {
      fontSize: "0.9rem",
      color: "#64748b",
      marginBottom: "1rem",
      fontWeight: "400"
    },
    investorInfo: {
      display: "flex",
      justifyContent: "space-between",
      gap: "1rem",
      marginBottom: "1rem",
      padding: "1rem",
      backgroundColor: "#f8fafc",
      borderRadius: "12px",
      border: "1px solid #e2e8f0"
    },
    investorInfoItem: {
      textAlign: "center" as const,
      flex: 1
    },
    investorInfoValue: {
      fontSize: "0.875rem",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "0.25rem"
    },
    investorInfoLabel: {
      fontSize: "0.75rem",
      color: "#64748b",
      textTransform: "uppercase" as const,
      letterSpacing: "0.025em"
    },
    investmentRange: {
      display: "inline-block",
      padding: "0.375rem 0.75rem",
      backgroundColor: "#dbeafe",
      color: "#1d4ed8",
      borderRadius: "8px",
      fontSize: "0.8rem",
      fontWeight: "600",
      marginBottom: "1rem"
    },
    videoDescription: {
      fontSize: "0.9rem",
      color: "#4b5563",
      lineHeight: "1.6",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical" as any,
      overflow: "hidden",
      marginBottom: "1.5rem",
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
      backgroundColor: "#10b981",
      color: "white",
      border: "none",
      borderRadius: "10px",
      fontSize: "0.9rem",
      fontWeight: "600",
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
      backgroundColor: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "10px",
      fontSize: "0.9rem",
      fontWeight: "600",
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
        <h1 style={styles.title}>Interested Investors</h1>
        <p style={styles.subtitle}>
          These investors have shown interest in your startup ideas and want to connect with you
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
              <div style={styles.investorAvatar}>
                {video.investorName.split(' ').map(name => name.charAt(0)).join('')}
              </div>
              <div style={styles.investorType}>{video.channel}</div>
              <div style={styles.duration}>
                <div style={styles.activeIndicator}></div>
                {video.duration}
              </div>
            </div>
            
            <div style={styles.cardContent}>
              <div style={styles.channelRow}>
                <div style={styles.channelAvatar}>
                  {video.investorName.charAt(0)}
                </div>
                <span style={styles.channelName}>{video.investorName}</span>
              </div>
              
              <h3 style={styles.videoTitle}>{video.title}</h3>
              <p style={styles.videoMeta}>Interested {video.timeAgo}</p>
              
              <div style={styles.investmentRange}>
                💰 {video.averageInvestment}
              </div>
              
              <div style={styles.investorInfo}>
                <div style={styles.investorInfoItem}>
                  <div style={styles.investorInfoValue}>{video.portfolioCompanies}</div>
                  <div style={styles.investorInfoLabel}>Portfolio</div>
                </div>
                <div style={styles.investorInfoItem}>
                  <div style={styles.investorInfoValue}>{video.investmentFocus}</div>
                  <div style={styles.investorInfoLabel}>Focus</div>
                </div>
              </div>
              
              <p style={styles.videoDescription}>{video.description}</p>
              
              <div style={styles.actionButtons}>
                <button 
                  style={styles.primaryButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#059669";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#10b981";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  💬 Message
                </button>
                <button 
                  style={styles.secondaryButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#2563eb";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#3b82f6";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  � View Profile
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
