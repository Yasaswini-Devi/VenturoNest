import React from "react";
// @ts-ignore
import ReactPlayer from "react-player";

interface Video {
  url: string;
  title: string;
  description: string;
}

interface VideoModalProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
  userType: "entrepreneur" | "investor";
}

const VideoModal: React.FC<VideoModalProps> = ({ video, isOpen, onClose, userType }) => {
  const actions = userType === "entrepreneur" ? ["Chat", "Request Meeting"] : ["View Startup", "Invest"];

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !video) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const styles = {
    overlay: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: "1rem"
    },
    modal: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      width: "100%",
      maxWidth: "1200px",
      maxHeight: "90vh",
      overflow: "hidden",
      position: "relative" as const,
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
      display: "flex",
      flexDirection: "row" as const
    },
    leftSection: {
      flex: 2,
      display: "flex",
      flexDirection: "column" as const
    },
    rightSection: {
      flex: 1,
      backgroundColor: "#f8fafc",
      borderLeft: "1px solid #e2e8f0",
      display: "flex",
      flexDirection: "column" as const,
      minWidth: "300px"
    },
    closeButton: {
      position: "absolute" as const,
      top: "1rem",
      right: "1rem",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      color: "#ffffff",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.5rem",
      zIndex: 10,
      transition: "background-color 0.2s ease"
    },
    videoContainer: {
      position: "relative" as const,
      width: "100%",
      height: "400px",
      backgroundColor: "#000000",
      flexShrink: 0
    },
    interactionBar: {
      display: "flex",
      gap: "1rem",
      padding: "1rem 1.5rem",
      borderBottom: "1px solid #e2e8f0",
      backgroundColor: "#ffffff"
    },
    interactionButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.75rem 1rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background-color 0.2s ease"
    },
    likeButton: {
      backgroundColor: "#fef2f2",
      color: "#dc2626"
    },
    saveButton: {
      backgroundColor: "#eff6ff",
      color: "#2563eb"
    },
    shareButton: {
      backgroundColor: "#f0fdf4",
      color: "#16a34a"
    },
    content: {
      padding: "1.5rem",
      flex: 1,
      overflowY: "auto" as const
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#1e293b",
      margin: "0 0 1rem 0",
      lineHeight: "1.3"
    },
    description: {
      fontSize: "1rem",
      color: "#475569",
      lineHeight: "1.6",
      margin: "0 0 1.5rem 0"
    },
    actionsContainer: {
      display: "flex",
      gap: "1rem",
      paddingTop: "1rem",
      borderTop: "1px solid #e2e8f0"
    },
    actionButton: {
      flex: 1,
      padding: "0.75rem 1rem",
      fontSize: "1rem",
      fontWeight: "600",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      border: "none"
    },
    primaryButton: {
      backgroundColor: "#3b82f6",
      color: "#ffffff"
    },
    secondaryButton: {
      backgroundColor: "#f1f5f9",
      color: "#475569",
      border: "1px solid #cbd5e1"
    },
    chatSection: {
      padding: "1.5rem",
      display: "flex",
      flexDirection: "column" as const,
      height: "100%"
    },
    chatHeader: {
      fontSize: "1.125rem",
      fontWeight: "600",
      color: "#1e293b",
      margin: "0 0 1rem 0",
      paddingBottom: "1rem",
      borderBottom: "1px solid #e2e8f0"
    },
    chatPlaceholder: {
      flex: 1,
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center" as const,
      color: "#64748b",
      gap: "1rem"
    },
    chatIcon: {
      width: "48px",
      height: "48px",
      borderRadius: "50%",
      backgroundColor: "#3b82f6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffffff",
      fontSize: "1.5rem"
    },
    chatButton: {
      width: "100%",
      padding: "1rem",
      fontSize: "1rem",
      fontWeight: "600",
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
      marginTop: "1rem"
    }
  };

  return (
    <div style={styles.overlay} onClick={handleOverlayClick}>
      <div style={styles.modal}>
        {/* Close Button */}
        <button 
          style={styles.closeButton}
          onClick={onClose}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
          }}
        >
          ×
        </button>

        {/* Left Section - Video and Content */}
        <div style={styles.leftSection}>
          {/* Video Player */}
          <div style={styles.videoContainer}>
            <ReactPlayer
              // @ts-ignore
              url={video.url}
              width="100%"
              height="100%"
              controls={true}
              playing={true}
            />
          </div>

          {/* Interaction Bar */}
          <div style={styles.interactionBar}>
            <button 
              style={{...styles.interactionButton, ...styles.likeButton}}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#fee2e2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#fef2f2";
              }}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
              </svg>
              Like
            </button>

            <button 
              style={{...styles.interactionButton, ...styles.saveButton}}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#dbeafe";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#eff6ff";
              }}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
              </svg>
              Save
            </button>

            <button 
              style={{...styles.interactionButton, ...styles.shareButton}}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#dcfce7";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#f0fdf4";
              }}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
              </svg>
              Share
            </button>
          </div>

          {/* Content */}
          <div style={styles.content}>
            <h2 style={styles.title}>{video.title}</h2>
            <p style={styles.description}>{video.description}</p>

            {/* Action Buttons */}
            <div style={styles.actionsContainer}>
              {actions.map((action, i) => (
                <button
                  key={action}
                  style={{
                    ...styles.actionButton,
                    ...(i === 0 ? styles.primaryButton : styles.secondaryButton)
                  }}
                  onMouseEnter={(e) => {
                    if (i === 0) {
                      e.currentTarget.style.backgroundColor = "#2563eb";
                    } else {
                      e.currentTarget.style.backgroundColor = "#e2e8f0";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (i === 0) {
                      e.currentTarget.style.backgroundColor = "#3b82f6";
                    } else {
                      e.currentTarget.style.backgroundColor = "#f1f5f9";
                    }
                  }}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Chat */}
        <div style={styles.rightSection}>
          <div style={styles.chatSection}>
            <h3 style={styles.chatHeader}>Chat with {userType === "entrepreneur" ? "Investor" : "Entrepreneur"}</h3>
            
            <div style={styles.chatPlaceholder}>
              <div style={styles.chatIcon}>💬</div>
              <div>
                <p style={{margin: "0 0 0.5rem 0", fontWeight: "600"}}>Start a conversation</p>
                <p style={{margin: "0", fontSize: "0.875rem"}}>Connect directly to discuss opportunities</p>
              </div>
            </div>

            <button 
              style={styles.chatButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#2563eb";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#3b82f6";
              }}
            >
              💬 Start Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;