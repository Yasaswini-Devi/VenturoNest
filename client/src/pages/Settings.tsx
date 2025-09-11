import React from "react";

const Settings: React.FC = () => {
  const styles = {
    container: {
      width: "100%",
      minHeight: "calc(100vh - 200px)",
      backgroundColor: "#f8fafc",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    },
    header: {
      textAlign: "center" as const,
      padding: "3rem 2rem 2rem",
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #f1f5f9"
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "0.75rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.75rem"
    },
    subtitle: {
      fontSize: "1.125rem",
      color: "#64748b",
      fontWeight: "400",
      lineHeight: "1.6"
    },
    mainContent: {
      display: "flex",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "3rem 2rem",
      gap: "3rem",
      alignItems: "flex-start"
    },
    leftPanel: {
      flex: "0 0 350px",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      backgroundColor: "#ffffff",
      borderRadius: "20px",
      padding: "2.5rem",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      border: "1px solid #f1f5f9"
    },
    profileAvatar: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      backgroundColor: "#e2e8f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "3rem",
      color: "#64748b",
      marginBottom: "1.5rem",
      border: "4px solid #f8fafc"
    },
    profileName: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "0.5rem",
      textAlign: "center" as const
    },
    profileRole: {
      display: "inline-block",
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      padding: "0.375rem 0.875rem",
      borderRadius: "20px",
      fontSize: "0.875rem",
      fontWeight: "500",
      marginBottom: "1rem"
    },
    profileBio: {
      fontSize: "0.95rem",
      color: "#64748b",
      textAlign: "center" as const,
      lineHeight: "1.6",
      marginBottom: "2rem"
    },
    rightPanel: {
      flex: 1,
      backgroundColor: "#ffffff",
      borderRadius: "20px",
      padding: "2.5rem",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      border: "1px solid #f1f5f9"
    },
    sectionTitle: {
      fontSize: "1.375rem",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "0.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
    },
    sectionSubtitle: {
      fontSize: "1rem",
      color: "#64748b",
      marginBottom: "2rem",
      lineHeight: "1.5"
    },
    formGrid: {
      display: "grid",
      gap: "1.5rem"
    },
    formGroup: {
      display: "flex",
      flexDirection: "column" as const
    },
    label: {
      fontSize: "0.9rem",
      fontWeight: "500",
      color: "#374151",
      marginBottom: "0.5rem",
      letterSpacing: "0.025em"
    },
    input: {
      width: "100%",
      padding: "0.875rem 1rem",
      fontSize: "0.95rem",
      border: "1.5px solid #e2e8f0",
      borderRadius: "12px",
      backgroundColor: "#ffffff",
      transition: "all 0.2s ease",
      fontFamily: "inherit",
      outline: "none",
      boxSizing: "border-box" as const
    },
    textarea: {
      width: "100%",
      padding: "0.875rem 1rem",
      fontSize: "0.95rem",
      border: "1.5px solid #e2e8f0",
      borderRadius: "12px",
      backgroundColor: "#ffffff",
      transition: "all 0.2s ease",
      fontFamily: "inherit",
      outline: "none",
      minHeight: "120px",
      resize: "vertical" as const,
      lineHeight: "1.5",
      boxSizing: "border-box" as const
    },
    saveButton: {
      alignSelf: "flex-start",
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      padding: "0.875rem 2rem",
      fontSize: "0.95rem",
      fontWeight: "500",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      marginTop: "1rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          ⚙️ Settings
        </h1>
        <p style={styles.subtitle}>
          Manage your account preferences and notification settings
        </p>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Left Panel - Profile Preview */}
        <div style={styles.leftPanel}>
          <div style={styles.profileAvatar}>
            👤
          </div>
          <h2 style={styles.profileName}>InvestorJoe</h2>
          <span style={styles.profileRole}>Investor</span>
          <p style={styles.profileBio}>
            Angel investor with 10+ years of experience in scaling healthcare and AI startups. Looking for transformative solutions.
          </p>
        </div>

        {/* Right Panel - Profile Information Form */}
        <div style={styles.rightPanel}>
          <h2 style={styles.sectionTitle}>
            Profile Information
          </h2>
          <p style={styles.sectionSubtitle}>
            Update your public profile details
          </p>

          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Username</label>
              <input 
                style={styles.input} 
                type="text" 
                defaultValue="InvestorJoe"
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Bio</label>
              <textarea 
                style={styles.textarea} 
                defaultValue="Angel investor with 10+ years of experience in scaling healthcare and AI startups. Looking for transformative solutions."
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Investment Focus</label>
              <input 
                style={styles.input} 
                type="text" 
                defaultValue="HealthTech, AI"
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <button 
              style={styles.saveButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#2563eb";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#3b82f6";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              💾 Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
