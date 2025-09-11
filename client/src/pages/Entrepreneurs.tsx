import React from "react";

const Entrepreneurs: React.FC = () => {
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
    entrepreneurGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
      gap: "1.5rem",
      marginBottom: "3rem",
      width: "100%"
    },
    entrepreneurCard: {
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
      cursor: "pointer",
      transition: "all 0.3s ease",
      border: "1px solid #f1f5f9",
      padding: "1.5rem"
    },
    profileHeader: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      marginBottom: "1rem"
    },
    avatar: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      backgroundColor: "#3b82f6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffffff",
      fontSize: "1.5rem",
      fontWeight: "600"
    },
    profileInfo: {
      flex: 1
    },
    name: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "0.25rem"
    },
    company: {
      fontSize: "0.875rem",
      color: "#8b5cf6",
      fontWeight: "500",
      marginBottom: "0.25rem"
    },
    industry: {
      fontSize: "0.75rem",
      color: "#64748b",
      backgroundColor: "#f1f5f9",
      padding: "0.25rem 0.5rem",
      borderRadius: "12px",
      display: "inline-block"
    },
    description: {
      fontSize: "0.875rem",
      color: "#64748b",
      lineHeight: "1.5",
      marginBottom: "1rem"
    },
    stats: {
      display: "flex",
      gap: "1rem",
      marginBottom: "1rem"
    },
    stat: {
      textAlign: "center" as const
    },
    statNumber: {
      fontSize: "1.25rem",
      fontWeight: "700",
      color: "#1e293b"
    },
    statLabel: {
      fontSize: "0.75rem",
      color: "#64748b"
    },
    actionButtons: {
      display: "flex",
      gap: "0.5rem"
    },
    primaryButton: {
      flex: 1,
      padding: "0.75rem 1rem",
      fontSize: "0.875rem",
      fontWeight: "600",
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background-color 0.2s ease"
    },
    secondaryButton: {
      flex: 1,
      padding: "0.75rem 1rem",
      fontSize: "0.875rem",
      fontWeight: "600",
      backgroundColor: "#f1f5f9",
      color: "#64748b",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background-color 0.2s ease"
    }
  };

  const entrepreneurs = [
    {
      id: 1,
      name: "Sarah Chen",
      company: "TechVentures",
      industry: "AI & Machine Learning",
      description: "Building next-generation AI solutions for healthcare diagnostics. Our platform can detect diseases 90% faster than traditional methods.",
      videos: 3,
      followers: 1200,
      funding: "$2.5M"
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      company: "GreenTech Innovations",
      industry: "Clean Energy",
      description: "Revolutionary solar panel technology that increases efficiency by 40%. Seeking Series A funding to scale manufacturing.",
      videos: 5,
      followers: 850,
      funding: "$1.8M"
    },
    {
      id: 3,
      name: "Elena Vasquez",
      company: "FinTech Future",
      industry: "Financial Technology",
      description: "Digital banking platform for underserved communities. Making financial services accessible to 2 billion people worldwide.",
      videos: 2,
      followers: 2100,
      funding: "$4.2M"
    },
    {
      id: 4,
      name: "David Kim",
      company: "MedTech Solutions",
      industry: "Healthcare",
      description: "AI-powered medical assistant that helps doctors make faster, more accurate diagnoses. Currently used in 50+ hospitals.",
      videos: 4,
      followers: 1800,
      funding: "$3.1M"
    }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Entrepreneurs</h1>
        <p style={styles.subtitle}>
          Connect with innovative entrepreneurs building the future. 
          Discover their startups and investment opportunities.
        </p>
      </div>

      {/* Entrepreneurs Grid */}
      <div style={styles.entrepreneurGrid}>
        {entrepreneurs.map((entrepreneur) => (
          <div key={entrepreneur.id} style={styles.entrepreneurCard}>
            <div style={styles.profileHeader}>
              <div style={styles.avatar}>
                {entrepreneur.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div style={styles.profileInfo}>
                <h3 style={styles.name}>{entrepreneur.name}</h3>
                <p style={styles.company}>{entrepreneur.company}</p>
                <span style={styles.industry}>{entrepreneur.industry}</span>
              </div>
            </div>
            <p style={styles.description}>{entrepreneur.description}</p>
            <div style={styles.stats}>
              <div style={styles.stat}>
                <div style={styles.statNumber}>{entrepreneur.videos}</div>
                <div style={styles.statLabel}>Videos</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statNumber}>{entrepreneur.followers}</div>
                <div style={styles.statLabel}>Followers</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statNumber}>{entrepreneur.funding}</div>
                <div style={styles.statLabel}>Raised</div>
              </div>
            </div>
            <div style={styles.actionButtons}>
              <button style={styles.primaryButton}>
                📞 Connect
              </button>
              <button style={styles.secondaryButton}>
                📺 View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Entrepreneurs;
