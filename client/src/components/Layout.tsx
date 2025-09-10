import React from "react";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const styles = {
    layout: {
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      flexDirection: "column" as const,
      backgroundColor: "#f8fafc",
      maxWidth: "100vw",
      overflowX: "hidden" as const
    },
    header: {
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #e2e8f0",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      position: "sticky" as const,
      top: 0,
      zIndex: 1000
    },
    headerContent: {
      width: "100%",
      padding: "0 2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "64px"
    },
    logo: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#1e293b",
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    },
    logoIcon: {
      width: "32px",
      height: "32px",
      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffffff",
      fontSize: "1.2rem",
      fontWeight: "700"
    },
    nav: {
      display: "flex",
      alignItems: "center",
      gap: "1rem"
    },
    navButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem 1rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      backgroundColor: "transparent",
      color: "#64748b",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      textDecoration: "none"
    },
    navButtonActive: {
      backgroundColor: "#3b82f6",
      color: "#ffffff"
    },
    main: {
      flex: 1,
      display: "flex",
      flexDirection: "column" as const
    },
    footer: {
      backgroundColor: "#1e293b",
      color: "#94a3b8",
      padding: "2rem 0",
      marginTop: "auto"
    },
    footerContent: {
      width: "100%",
      padding: "0 2rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "2rem"
    },
    footerSection: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "1rem"
    },
    footerTitle: {
      fontSize: "1.1rem",
      fontWeight: "600",
      color: "#ffffff",
      margin: "0"
    },
    footerText: {
      fontSize: "0.875rem",
      lineHeight: "1.6",
      margin: "0"
    },
    footerBottom: {
      borderTop: "1px solid #334155",
      marginTop: "2rem",
      paddingTop: "1rem",
      textAlign: "center" as const,
      fontSize: "0.875rem"
    }
  };

  const handleLogout = () => {
    // Clear any stored user data (if you have localStorage/sessionStorage)
    // localStorage.removeItem('userToken');
    // sessionStorage.clear();
    
    // Navigate to login page
    navigate('/login');
  };

  const handleProfile = () => {
    // Navigate to profile page
    navigate('/profile');
  };

  const handleDashboard = () => {
    // Navigate to dashboard page
    navigate('/dashboard');
  };

  const handleEntrepreneurs = () => {
    // Navigate to entrepreneurs page
    navigate('/entrepreneurs');
  };

  const handleInvestors = () => {
    // Navigate to investors page
    navigate('/investors');
  };

  const handleSettings = () => {
    // Navigate to settings page
    navigate('/settings');
  };

  return (
    <div style={styles.layout}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          {/* Logo */}
          <div style={styles.logo}>
            <div style={styles.logoIcon}>V</div>
            VenturoNest
          </div>

          {/* Navigation */}
          <nav style={styles.nav}>
            <button
              style={{...styles.navButton, ...styles.navButtonActive}}
              onClick={handleDashboard}
            >
              🏠 Dashboard
            </button>
            <button
              style={styles.navButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f1f5f9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              💬 Chat
            </button>
            <button
              style={styles.navButton}
              onClick={handleEntrepreneurs}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f1f5f9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              🚀 Entrepreneurs
            </button>
            <button
              style={styles.navButton}
              onClick={handleInvestors}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f1f5f9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              💼 Investors
            </button>
            <button
              style={styles.navButton}
              onClick={handleSettings}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f1f5f9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              ⚙️ Settings
            </button>
            <button
              style={styles.navButton}
              onClick={handleProfile}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f1f5f9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              👤 Profile
            </button>
            <button
              style={styles.navButton}
              onClick={handleLogout}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#fee2e2";
                e.currentTarget.style.color = "#dc2626";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#64748b";
              }}
            >
              🚪 Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {children}
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>VenturoNest</h3>
            <p style={styles.footerText}>
              Connecting innovative startups with visionary investors. 
              Building the future of entrepreneurship through meaningful partnerships.
            </p>
          </div>
          
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>For Entrepreneurs</h3>
            <p style={styles.footerText}>Find the right investors for your startup</p>
            <p style={styles.footerText}>Showcase your innovation</p>
            <p style={styles.footerText}>Build valuable connections</p>
          </div>
          
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>For Investors</h3>
            <p style={styles.footerText}>Discover promising startups</p>
            <p style={styles.footerText}>Portfolio management tools</p>
            <p style={styles.footerText}>Investment analytics</p>
          </div>
        </div>
        
        <div style={styles.footerBottom}>
          <p>© 2025 VenturoNest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;