import React from "react";

const Investors: React.FC = () => {
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
    investorGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
      gap: "1.5rem",
      marginBottom: "3rem",
      width: "100%"
    },
    investorCard: {
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
      backgroundColor: "#8b5cf6",
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
    title_role: {
      fontSize: "0.875rem",
      color: "#8b5cf6",
      fontWeight: "500",
      marginBottom: "0.25rem"
    },
    focus: {
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
      backgroundColor: "#8b5cf6",
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

  const investors = [
    {
      id: 1,
      name: "InvestorJoe",
      title: "Angel Investor",
      focus: "HealthTech, AI",
      description: "Angel investor with 10+ years of experience in scaling healthcare and AI startups. Looking for transformative solutions.",
      investments: 15,
      portfolio: 45,
      ticketSize: "$50K-500K"
    },
    {
      id: 2,
      name: "Maria Santos",
      title: "VC Partner",
      focus: "FinTech, Blockchain",
      description: "Partner at TechVenture Capital. Specialized in early-stage FinTech and blockchain companies. $100M+ in exits.",
      investments: 28,
      portfolio: 12,
      ticketSize: "$1M-10M"
    },
    {
      id: 3,
      name: "Robert Chen",
      title: "Seed Investor",
      focus: "SaaS, B2B",
      description: "Former founder turned investor. Focus on B2B SaaS companies with strong product-market fit and recurring revenue.",
      investments: 22,
      portfolio: 18,
      ticketSize: "$100K-1M"
    },
    {
      id: 4,
      name: "Lisa Wang",
      title: "Growth Investor",
      focus: "E-commerce, Consumer",
      description: "Series A/B growth investor with expertise in consumer products and e-commerce platforms. Portfolio includes 3 unicorns.",
      investments: 35,
      portfolio: 25,
      ticketSize: "$2M-20M"
    }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Investors</h1>
        <p style={styles.subtitle}>
          Connect with experienced investors and venture capitalists. 
          Find the right funding partners for your startup journey.
        </p>
      </div>

      {/* Investors Grid */}
      <div style={styles.investorGrid}>
        {investors.map((investor) => (
          <div key={investor.id} style={styles.investorCard}>
            <div style={styles.profileHeader}>
              <div style={styles.avatar}>
                {investor.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div style={styles.profileInfo}>
                <h3 style={styles.name}>{investor.name}</h3>
                <p style={styles.title_role}>{investor.title}</p>
                <span style={styles.focus}>{investor.focus}</span>
              </div>
            </div>
            <p style={styles.description}>{investor.description}</p>
            <div style={styles.stats}>
              <div style={styles.stat}>
                <div style={styles.statNumber}>{investor.investments}</div>
                <div style={styles.statLabel}>Investments</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statNumber}>{investor.portfolio}</div>
                <div style={styles.statLabel}>Portfolio</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statNumber}>{investor.ticketSize}</div>
                <div style={styles.statLabel}>Ticket Size</div>
              </div>
            </div>
            <div style={styles.actionButtons}>
              <button style={styles.secondaryButton}>
                📊 View Portfolio
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Investors;
