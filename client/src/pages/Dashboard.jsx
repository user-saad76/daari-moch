import React, { useState } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");

  return (

    <div className="container">
      <div className="row">
      {/* Sidebar Tabs */}
      <div className="col-3">
        <div className="nav flex-column nav-pills">
          <button
            className={`nav-link ${activeTab === "home" ? "active" : ""}`}
            onClick={() => setActiveTab("home")}
          >
            Home
          </button>
          <button
            className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`nav-link ${activeTab === "messages" ? "active" : ""}`}
            onClick={() => setActiveTab("messages")}
          >
            Messages
          </button>
          <button
            className={`nav-link ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="col-9">
        <div className="tab-content">
          {activeTab === "home" && (
            <div className="tab-pane fade show active">
              <h3>Home</h3>
              <p>This is the home tab content. You can add any HTML here.</p>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="tab-pane fade show active">
              <h3>Profile</h3>
              <p>This is the profile tab content. Add forms, images, etc.</p>
            </div>
          )}

          {activeTab === "messages" && (
            <div className="tab-pane fade show active">
              <h3>Messages</h3>
              <p>This is the messages tab content. Add message UI here.</p>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="tab-pane fade show active">
              <h3>Settings</h3>
              <p>This is the settings tab content. Add forms or options here.</p>
            </div>
          )}
        </div>
      </div>
    </div>

    </div>
   
  );
}
