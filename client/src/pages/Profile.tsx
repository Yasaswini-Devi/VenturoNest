import React from "react";

interface ProfileProps {
  userType?: "entrepreneur" | "investor";
}

const Profile: React.FC<ProfileProps> = ({ userType = "investor" }) => {
  const styles = {
    container: {
      padding: "2rem",
      width: "100%",
      backgroundColor: "#f8fafc",
      minHeight: "calc(100vh - 200px)"
    },
    topNav: {
      display: "flex",
      justifyContent: "center",
      gap: "2rem",
      marginBottom: "2rem",
      padding: "1rem",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
    },
    navButton: {
      padding: "0.75rem 1.5rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      backgroundColor: "#f1f5f9",
      color: "#64748b"
    },
    activeNavButton: {
      backgroundColor: "#3b82f6",
      color: "#ffffff"
    },
    profileHeader: {
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      padding: "2rem",
      marginBottom: "2rem",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
      display: "flex",
      alignItems: "center",
      gap: "2rem"
    },
    profileImage: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      backgroundColor: "#e2e8f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "3rem",
      color: "#64748b",
      flexShrink: 0
    },
    profileInfo: {
      flex: 1
    },
    profileName: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#1e293b",
      marginBottom: "0.5rem"
    },
    profileDetails: {
      display: "flex",
      gap: "1.5rem",
      marginBottom: "1rem",
      flexWrap: "wrap" as const
    },
    profileEmail: {
      fontSize: "0.875rem",
      color: "#64748b",
      fontWeight: "500"
    },
    profilePhone: {
      fontSize: "0.875rem",
      color: "#64748b",
      fontWeight: "500"
    },
    profileUsername: {
      fontSize: "0.875rem",
      color: "#64748b",
      fontWeight: "500"
    },
    profileBadge: {
      display: "inline-block",
      padding: "0.25rem 0.75rem",
      fontSize: "0.75rem",
      fontWeight: "600",
      backgroundColor: "#8b5cf6",
      color: "#ffffff",
      borderRadius: "20px",
      marginRight: "1rem"
    },
    profileCategory: {
      display: "inline-block",
      fontSize: "0.875rem",
      color: "#64748b",
      fontWeight: "500"
    },
    profileDescription: {
      fontSize: "1rem",
      color: "#64748b",
      lineHeight: "1.6",
      marginTop: "1rem",
      marginBottom: "1.5rem"
    },
    profileActions: {
      display: "flex",
      gap: "1rem"
    },
    actionButton: {
      padding: "0.75rem 1.5rem",
      fontSize: "0.875rem",
      fontWeight: "600",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.2s ease"
    },
    primaryButton: {
      backgroundColor: "#3b82f6",
      color: "#ffffff"
    },
    secondaryButton: {
      backgroundColor: "#8b5cf6",
      color: "#ffffff"
    },
    statsSection: {
      display: "flex",
      gap: "2rem",
      marginBottom: "2rem"
    },
    statCard: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "1.5rem",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
      textAlign: "center" as const,
      flex: 1
    },
    statNumber: {
      fontSize: "1.75rem",
      fontWeight: "700",
      color: "#1e293b",
      marginBottom: "0.25rem"
    },
    statLabel: {
      fontSize: "0.875rem",
      color: "#64748b",
      fontWeight: "500"
    },
    contentSection: {
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      padding: "2rem",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)"
    },
    sectionTabs: {
      display: "flex",
      borderBottom: "1px solid #e2e8f0",
      marginBottom: "2rem"
    },
    tab: {
      padding: "1rem 2rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      border: "none",
      backgroundColor: "transparent",
      color: "#64748b",
      cursor: "pointer",
      transition: "color 0.2s ease",
      borderBottom: "2px solid transparent"
    },
    activeTab: {
      color: "#3b82f6",
      borderBottomColor: "#3b82f6"
    },
    videoGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "1.5rem"
    },
    videoCard: {
      backgroundColor: "#f8fafc",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
      transition: "transform 0.2s ease"
    },
    videoThumbnail: {
      width: "100%",
      height: "180px",
      backgroundColor: "#1e293b",
      position: "relative" as const,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    playIcon: {
      width: "50px",
      height: "50px",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.25rem",
      color: "#3b82f6"
    },
    videoInfo: {
      padding: "1rem"
    },
    videoTitle: {
      fontSize: "0.875rem",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "0.5rem",
      lineHeight: "1.4"
    },
    videoStats: {
      fontSize: "0.75rem",
      color: "#64748b"
    }
  };

  const [activeTab, setActiveTab] = React.useState("videos");

  return (
    <div style={styles.container}>
      {/* Profile Header */}
      <div style={styles.profileHeader}>
        <div style={styles.profileImage}>
          👤
        </div>
        <div style={styles.profileInfo}>
          <h1 style={styles.profileName}>InvestorJoe </h1>
          <div style={styles.profileDetails}>
            <span style={styles.profileEmail}>📧 InvestorJoe@venturonest.com</span>
            <span style={styles.profilePhone}>📱 +91 9876543210</span>
            <span style={styles.profileUsername}>👤 @InvestorJoe</span>
          </div>
          <div>
            <span style={styles.profileBadge}>Investor</span>
            <span style={styles.profileCategory}>HealthTech, AI, FinTech</span>
          </div>
          <p style={styles.profileDescription}>
            Angel investor and entrepreneur with 12+ years of experience in scaling healthcare, AI, and fintech startups. 
            Passionate about transformative solutions that can impact millions of lives. Portfolio includes 15+ successful investments.
          </p>
          <div style={styles.profileActions}>
            <button style={{...styles.actionButton, ...styles.primaryButton}}>
              ✏️ Edit Profile
            </button>
            <button style={{...styles.actionButton, ...styles.secondaryButton}}>
              📤 Upload Video
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={styles.statsSection}>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>2</div>
          <div style={styles.statLabel}>Videos</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>2</div>
          <div style={styles.statLabel}>Saved</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>15</div>
          <div style={styles.statLabel}>Investments</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>45</div>
          <div style={styles.statLabel}>Following</div>
        </div>
      </div>

      {/* Content Section */}
      <div style={styles.contentSection}>
        <div style={styles.sectionTabs}>
          <button 
            style={{...styles.tab, ...(activeTab === "videos" ? styles.activeTab : {})}}
            onClick={() => setActiveTab("videos")}
          >
            📹 Videos
          </button>
          <button 
            style={{...styles.tab, ...(activeTab === "saved" ? styles.activeTab : {})}}
            onClick={() => setActiveTab("saved")}
          >
            💾 Saved
          </button>
        </div>

        {activeTab === "videos" && (
          <div style={styles.videoGrid}>
            <div style={styles.videoCard}>
              <div style={styles.videoThumbnail}>
                <div style={styles.playIcon}>▶</div>
              </div>
              <div style={styles.videoInfo}>
                <h3 style={styles.videoTitle}>Investment Strategy: Healthcare Tech</h3>
                <p style={styles.videoStats}>1.2K views • 3 days ago</p>
              </div>
            </div>
            <div style={styles.videoCard}>
              <div style={styles.videoThumbnail}>
                <div style={styles.playIcon}>▶</div>
              </div>
              <div style={styles.videoInfo}>
                <h3 style={styles.videoTitle}>AI Startup Evaluation Framework</h3>
                <p style={styles.videoStats}>856 views • 1 week ago</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "saved" && (
          <div style={styles.videoGrid}>
            <div style={styles.videoCard}>
              <div style={styles.videoThumbnail}>
                <div style={styles.playIcon}>▶</div>
              </div>
              <div style={styles.videoInfo}>
                <h3 style={styles.videoTitle}>Revolutionary AI Startup Pitch</h3>
                <p style={styles.videoStats}>125K views • 2 days ago</p>
              </div>
            </div>
            <div style={styles.videoCard}>
              <div style={styles.videoThumbnail}>
                <div style={styles.playIcon}>▶</div>
              </div>
              <div style={styles.videoInfo}>
                <h3 style={styles.videoTitle}>Sustainable Energy Innovation</h3>
                <p style={styles.videoStats}>89K views • 1 week ago</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
