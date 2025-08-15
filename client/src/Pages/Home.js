import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Col, Row, Input, Button, message, Modal, Card, Typography, Space, Divider } from "antd";
import { SearchOutlined, AudioOutlined, UserOutlined, CalendarOutlined, StarOutlined } from '@ant-design/icons';
import Doctor from "../components/Doctor";
import ResultsPage from "../components/ResultsPage";
import { apiService } from "../config/apiConfig";
import { useSelector } from "react-redux";

const { Title, Paragraph, Text } = Typography;

export default function Home() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [ratings, setRatings] = useState({});
  const { user } = useSelector((state) => state.user) || {};
  const isAuthenticated = !!user?.user;

  const getData = async () => {
    try {
      setLoading(true);
      let response;
      if (apiService) {
        response = await apiService.getAllApprovedDoctors();
      } else {
        const axios = require('axios');
        response = await axios.get("/api/user/get-all-approved-doctors", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
      }
      setLoading(false);
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching doctors:", error);
    }
  };

  const getRatings = async () => {
    try {
      if (apiService) {
        const doctors = await apiService.getAllApprovedDoctors();
        const ratingsData = {};
        
        for (const doctor of doctors.data.data) {
          const doctorRatings = await apiService.getDoctorRatings(doctor._id);
          ratingsData[doctor._id] = {
            averageRating: doctorRatings.data.data.averageRating,
            totalRatings: doctorRatings.data.data.totalRatings
          };
        }
        
        setRatings(ratingsData);
      } else {
        const axios = require('axios');
        const response = await axios.get("/api/user/doctor-ratings", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        const ratingsData = response.data.data.reduce((acc, rating) => {
          acc[rating._id] = {
            averageRating: rating.averageRating,
            totalRatings: rating.totalRatings
          };
          return acc;
        }, {});

        setRatings(ratingsData);
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      message.warning("Please enter a search term");
      return;
    }
    
    try {
      setLoading(true);
      let response;
      if (apiService) {
        response = await apiService.searchDoctors(searchQuery);
      } else {
        const axios = require('axios');
        response = await axios.get(
          `/api/user/search-doctors?query=${searchQuery}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
      }
      setLoading(false);
      if (response.data.success) {
        setDoctors(response.data.data);
        setShowResults(true);
      } else {
        setDoctors([]);
        setShowResults(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error searching doctors:", error);
    }
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
    if (!SpeechRecognition) {
      message.error("Sorry, your browser doesn't support Speech Recognition.");
      return;
    }
  
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    setLoading(true);
  
    recognition.onstart = () => console.log("Voice recognition started.");
  
    recognition.onresult = async (event) => {
      const query = event.results[0][0].transcript;
      console.log("Voice Query: ", query);
  
      try {
        let response;
        if (apiService) {
          response = await apiService.searchDoctors(query);
        } else {
          const axios = require('axios');
          response = await axios.post(
            "/api/user/search-doctors-ai", 
            { query },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
        }
  
        if (response.data.success) {
          if (response.data.data.length > 0) {
            setDoctors(response.data.data);
            setShowResults(true);
  
            Modal.info({
              title: 'Medical Specialty Recommendation',
              content: (
                <div>
                  <p><strong>AI Analysis:</strong> {response.data.aiAnalysis}</p>
                  <p><strong>Recommended Specialty:</strong> {response.data.recommendedSpecialty}</p>
                  <p>We've found {response.data.data.length} doctors in this specialty.</p>
                </div>
              ),
              onOk() {},
            });
          } else {
            message.info(`No doctors found for the recommended specialty`);
            setDoctors([]);
            setShowResults(false);
          }
        } else {
          message.error("Unable to complete medical search");
          setDoctors([]);
          setShowResults(false);
        }
      } catch (error) {
        console.error("Error with medical search:", error);
        message.error("An error occurred during medical search");
        setDoctors([]);
        setShowResults(false);
      } finally {
        setLoading(false);
      }
    };
  
    recognition.onerror = (event) => {
      console.error("Voice recognition error:", event.error);
      setLoading(false);
      
      switch(event.error) {
        case 'no-speech':
          message.warning("No speech was detected. Please try again.");
          break;
        case 'audio-capture':
          message.error("Audio capture failed. Check your microphone.");
          break;
        default:
          message.error("An error occurred with voice recognition.");
      }
    };
  
    recognition.onend = () => setLoading(false);
  
    recognition.start();
  };

  useEffect(() => {
    getData();
    getRatings();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      {!isAuthenticated && (
        <Card className="hero-section" style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          color: 'white', 
          marginBottom: '2rem',
          border: 'none',
          borderRadius: '16px',
          overflow: 'hidden'
        }}>
          <div style={{ textAlign: 'center', padding: '3rem 2rem' }}>
            <Title level={1} style={{ color: 'white', marginBottom: '1rem' }}>
              Welcome to Balsam Healthcare
            </Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginBottom: '2rem' }}>
              Connect with top healthcare professionals and book appointments seamlessly
            </Paragraph>
            <Space size="large">
              <Button 
                type="primary" 
                size="large" 
                onClick={() => navigate("/register")}
                style={{ 
                  height: '48px', 
                  padding: '0 32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  borderRadius: '8px',
                  background: 'white',
                  color: '#667eea',
                  border: 'none'
                }}
              >
                Get Started
              </Button>
              <Button 
                size="large" 
                onClick={() => navigate("/login")}
                style={{ 
                  height: '48px', 
                  padding: '0 32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.1)', 
                  color: 'white', 
                  border: '2px solid rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                Sign In
              </Button>
            </Space>
          </div>
        </Card>
      )}
      
      {/* Search Section */}
      <Card className="search-section" style={{ marginBottom: '2rem' }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#1e293b' }}>
          Find Your Perfect Doctor
        </Title>
        <Paragraph style={{ textAlign: 'center', marginBottom: '2rem', color: '#64748b' }}>
          Search by name, location, specialization, city, or country
        </Paragraph>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <Input
            size="large"
            placeholder="Search for doctors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onPressEnter={handleSearch}
            prefix={<SearchOutlined style={{ color: '#cbd5e1' }} />}
            style={{ flex: 1, minWidth: '300px' }}
          />
          <Button 
            type="primary" 
            size="large" 
            onClick={handleSearch}
            loading={loading}
            icon={<SearchOutlined />}
            style={{ 
              height: '48px', 
              padding: '0 24px',
              borderRadius: '8px'
            }}
          >
            Search
          </Button>
          <Button 
            size="large" 
            onClick={handleVoiceSearch}
            loading={loading}
            icon={<AudioOutlined />}
            style={{ 
              height: '48px', 
              padding: '0 24px',
              borderRadius: '8px',
              border: '2px solid #e2e8f0',
              background: 'white',
              color: '#64748b'
            }}
          >
            Voice Search
          </Button>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <Text type="secondary" style={{ fontSize: '14px' }}>
            💡 Try our AI-powered voice search for a more natural experience
          </Text>
        </div>
      </Card>
      
      {/* Info Banner */}
      {!isAuthenticated && (
        <Card style={{ 
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
          border: '1px solid #bae6fd',
          borderRadius: '12px'
        }}>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <Space direction="vertical" size="small">
              <Text strong style={{ color: '#0369a1', fontSize: '16px' }}>
                🎯 Explore Doctors Without an Account
              </Text>
              <Text style={{ color: '#0c4a6e' }}>
                Search and browse available doctors. To book appointments, please login or register.
              </Text>
            </Space>
          </div>
        </Card>
      )}

      {/* Results Section */}
      {showResults ? (
        <ResultsPage doctors={doctors} />
      ) : (
        <div>
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <Title level={4} style={{ color: '#1e293b', marginBottom: '0.5rem' }}>
              Available Doctors
            </Title>
            <Text type="secondary">
              {doctors.length} doctors available for consultation
            </Text>
          </div>
          
          <Row gutter={[24, 24]}>
            {doctors.map((doctor) => (
              <Col xs={24} sm={24} md={12} lg={8} xl={6} key={doctor._id}>
                <Doctor doctor={doctor} rating={ratings[doctor._id]} />
              </Col>
            ))}
          </Row>
          
          {doctors.length === 0 && !loading && (
            <Card style={{ textAlign: 'center', padding: '3rem' }}>
              <Space direction="vertical" size="large">
                <UserOutlined style={{ fontSize: '48px', color: '#cbd5e1' }} />
                <div>
                  <Title level={4} style={{ color: '#64748b' }}>
                    No Doctors Found
                  </Title>
                  <Text type="secondary">
                    Try adjusting your search criteria or browse all available doctors
                  </Text>
                </div>
              </Space>
            </Card>
          )}
        </div>
      )}
    </Layout>
  );
}
