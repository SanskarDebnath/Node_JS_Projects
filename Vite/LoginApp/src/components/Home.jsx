import React, { useState } from "react";
import "./Home.css";

const Home = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqItems = [
    {
      question: "How long does account verification take?",
      answer: "Account verification typically completes within 24 hours. We verify your Aadhar details with government databases to ensure 'One Aadhar, One Mail' policy compliance."
    },
    {
      question: "Is my data secure with your email service?",
      answer: "Yes, we implement end-to-end encryption and follow the highest security standards. Business accounts get additional security layers including advanced threat protection."
    },
    {
      question: "Can I upgrade from Personal to Business email?",
      answer: "Absolutely! You can upgrade anytime from your account settings. Your data will be preserved and storage will be expanded to 30GB immediately."
    },
    {
      question: "What platforms are currently supported?",
      answer: "Currently we support web access and desktop applications for Windows and macOS. iOS and Android apps are in development and will be released soon."
    },
    {
      question: "How does the ad-free experience work?",
      answer: "Unlike other email services, we don't rely on advertising revenue. Our business model ensures you'll never see ads in your inbox, keeping your communications private."
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Made in India Email</h1>
          <p>Secure, private, and ad-free email service for every Indian</p>
          <div className="cta-buttons">
            <button className="cta-button primary">Create Account</button>
            <button className="cta-button secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="email-visual">
            <div className="email-header">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
            <div className="email-content">
              <div className="email-line short"></div>
              <div className="email-line medium"></div>
              <div className="email-line long"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Our Email Service?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Highest Standard of Privacy</h3>
            <p>Your data stays in India with military-grade encryption protecting all communications</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Cross-Platform Availability</h3>
            <p>Access your email on desktop, iOS, and Android devices with seamless synchronization</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚫</div>
            <h3>Always Ad-Free</h3>
            <p>No advertisements, no tracking, just clean email experience</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Advanced Spam Protection</h3>
            <p>AI-powered filters block 99.9% of spam and phishing attempts</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏰</div>
            <h3>Schedule & Snooze</h3>
            <p>Full control over when emails are sent and when they appear in your inbox</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Monthly Reviews</h3>
            <p>Get insights into your email habits with personalized monthly reports</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <h2>Simple, Transparent Pricing</h2>
        <p className="section-subtitle">Choose the plan that works best for you</p>
        
        <div className="pricing-toggle">
          <button 
            className={activeTab === "personal" ? "active" : ""}
            onClick={() => setActiveTab("personal")}
          >
            Personal
          </button>
          <button 
            className={activeTab === "business" ? "active" : ""}
            onClick={() => setActiveTab("business")}
          >
            Business
          </button>
        </div>
        
        <div className="pricing-cards">
          <div className={`price-card ${activeTab === "personal" ? "highlighted" : ""}`}>
            <h3>Personal</h3>
            <div className="price">
              <span className="amount">Free</span>
              <span className="period">forever</span>
            </div>
            <ul className="features-list">
              <li>15GB Secure Storage</li>
              <li>One Aadhar One Mail</li>
              <li>Ad-Free Experience</li>
              <li>Basic Spam Protection</li>
              <li>Password Protection</li>
            </ul>
            <button className="plan-button">
              {activeTab === "personal" ? "Current Plan" : "Choose Personal"}
            </button>
          </div>
          
          <div className={`price-card business ${activeTab === "business" ? "highlighted" : ""}`}>
            <div className="popular-badge">Most Popular</div>
            <h3>Business</h3>
            <div className="price">
              <span className="amount">₹250</span>
              <span className="period">per month</span>
            </div>
            <ul className="features-list">
              <li>30GB Secure Storage</li>
              <li>Extra Security Layers</li>
              <li>Priority Support</li>
              <li>Advanced Spam Protection</li>
              <li>Email Scheduling</li>
              <li>Custom Domain Options</li>
            </ul>
            <button className="plan-button primary">
              {activeTab === "business" ? "Current Plan" : "Choose Business"}
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeFaq === index ? "active" : ""}`}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question">
                <h4>{item.question}</h4>
                <span className="faq-toggle">{activeFaq === index ? "−" : "+"}</span>
              </div>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Your Indian Email Address?</h2>
          <p>Join thousands of Indians who have chosen privacy and security</p>
          <button className="cta-button large">Create Your Account Now</button>
        </div>
      </section>
    </div>
  );
};

export default Home;