// Mock API Service - Replaces real backend API calls with hardcoded data
import {
  mockUsers,
  mockDoctors,
  mockAppointments,
  mockRatings,
  mockNotifications,
  mockDepartments,
  mockSpecializations,
  mockCountries,
  mockCities,
  getAverageRating,
  getTotalRatings,
  getDoctorRatings,
  searchDoctors,
  getApprovedDoctors,
  getUserAppointments,
  getDoctorAppointments,
  getUserNotifications
} from './mockData';

// Simulate API delay
const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 300));

// Mock API Service Class
class MockApiService {
  // User APIs
  async login(credentials) {
    await simulateApiDelay();
    
    // Simulate login validation
    const user = mockUsers.find(u => 
      u.email === credentials.email && 
      (credentials.password === 'password' || credentials.password === '123456')
    );
    
    if (user) {
      return {
        data: {
          success: true,
          message: "Login successful",
          data: {
            user: {
              _id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              isDoctor: user.isDoctor,
              isAdmin: user.isAdmin
            },
            token: `mock_jwt_token_${user._id}`
          }
        }
      };
    } else {
      throw new Error("Invalid credentials");
    }
  }

  async register(userData) {
    await simulateApiDelay();
    
    // Simulate user registration
    const newUser = {
      _id: `user_${Date.now()}`,
      ...userData,
      isDoctor: false,
      isAdmin: false,
      seenNotifications: [],
      unseenNotifications: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockUsers.push(newUser);
    
    return {
      data: {
        success: true,
        message: "User registered successfully",
        data: newUser
      }
    };
  }

  async getUserProfile(userId) {
    await simulateApiDelay();
    
    const user = mockUsers.find(u => u._id === userId);
    if (!user) {
      throw new Error("User not found");
    }
    
    return {
      data: {
        success: true,
        data: user
      }
    };
  }

  // Doctor APIs
  async getAllApprovedDoctors() {
    await simulateApiDelay();
    
    const approvedDoctors = getApprovedDoctors();
    const doctorsWithRatings = approvedDoctors.map(doctor => ({
      ...doctor,
      averageRating: getAverageRating(doctor._id),
      totalRatings: getTotalRatings(doctor._id)
    }));
    
    return {
      data: {
        success: true,
        data: doctorsWithRatings
      }
    };
  }

  async getDoctorRatings(doctorId) {
    await simulateApiDelay();
    
    const ratings = getDoctorRatings(doctorId);
    const averageRating = getAverageRating(doctorId);
    const totalRatings = getTotalRatings(doctorId);
    
    return {
      data: {
        success: true,
        data: {
          ratings,
          averageRating: parseFloat(averageRating),
          totalRatings
        }
      }
    };
  }

  async searchDoctors(searchTerm) {
    await simulateApiDelay();
    
    const results = searchDoctors(searchTerm);
    const doctorsWithRatings = results.map(doctor => ({
      ...doctor,
      averageRating: getAverageRating(doctor._id),
      totalRatings: getTotalRatings(doctor._id)
    }));
    
    return {
      data: {
        success: true,
        data: doctorsWithRatings
      }
    };
  }

  // Appointment APIs
  async bookAppointment(appointmentData) {
    await simulateApiDelay();
    
    const newAppointment = {
      _id: `appointment_${Date.now()}`,
      ...appointmentData,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockAppointments.push(newAppointment);
    
    return {
      data: {
        success: true,
        message: "Appointment booked successfully",
        data: newAppointment
      }
    };
  }

  async getUserAppointments(userId) {
    await simulateApiDelay();
    
    const appointments = getUserAppointments(userId);
    
    return {
      data: {
        success: true,
        data: appointments
      }
    };
  }

  async getDoctorAppointments(doctorId) {
    await simulateApiDelay();
    
    const appointments = getDoctorAppointments(doctorId);
    
    return {
      data: {
        success: true,
        data: appointments
      }
    };
  }

  async updateAppointmentStatus(appointmentId, status) {
    await simulateApiDelay();
    
    const appointment = mockAppointments.find(a => a._id === appointmentId);
    if (appointment) {
      appointment.status = status;
      appointment.updatedAt = new Date().toISOString();
    }
    
    return {
      data: {
        success: true,
        message: "Appointment status updated successfully"
      }
    };
  }

  // Rating APIs
  async submitRating(ratingData) {
    await simulateApiDelay();
    
    const newRating = {
      _id: `rating_${Date.now()}`,
      ...ratingData,
      createdAt: new Date().toISOString()
    };
    
    mockRatings.push(newRating);
    
    return {
      data: {
        success: true,
        message: "Rating submitted successfully",
        data: newRating
      }
    };
  }

  // Notification APIs
  async getUserNotifications(userId) {
    await simulateApiDelay();
    
    const notifications = getUserNotifications(userId);
    
    return {
      data: {
        success: true,
        data: notifications
      }
    };
  }

  async markNotificationAsRead(notificationId) {
    await simulateApiDelay();
    
    const notification = mockNotifications.find(n => n._id === notificationId);
    if (notification) {
      notification.isRead = true;
    }
    
    return {
      data: {
        success: true,
        message: "Notification marked as read"
      }
    };
  }

  async markAllNotificationsAsRead(userId) {
    await simulateApiDelay();
    
    mockNotifications.forEach(notification => {
      if (notification.userId === userId) {
        notification.isRead = true;
      }
    });
    
    return {
      data: {
        success: true,
        message: "All notifications marked as read"
      }
    };
  }

  // Admin APIs
  async getAllUsers() {
    await simulateApiDelay();
    
    return {
      data: {
        success: true,
        data: mockUsers
      }
    };
  }

  async getAllDoctors() {
    await simulateApiDelay();
    
    const doctorsWithRatings = mockDoctors.map(doctor => ({
      ...doctor,
      averageRating: getAverageRating(doctor._id),
      totalRatings: getTotalRatings(doctor._id)
    }));
    
    return {
      data: {
        success: true,
        data: doctorsWithRatings
      }
    };
  }

  async updateDoctorStatus(doctorId, status) {
    await simulateApiDelay();
    
    const doctor = mockDoctors.find(d => d._id === doctorId);
    if (doctor) {
      doctor.status = status;
      doctor.updatedAt = new Date().toISOString();
    }
    
    return {
      data: {
        success: true,
        message: "Doctor status updated successfully"
      }
    };
  }

  // Doctor Profile APIs
  async updateDoctorProfile(doctorId, profileData) {
    await simulateApiDelay();
    
    const doctor = mockDoctors.find(d => d._id === doctorId);
    if (doctor) {
      Object.assign(doctor, profileData);
      doctor.updatedAt = new Date().toISOString();
    }
    
    return {
      data: {
        success: true,
        message: "Profile updated successfully",
        data: doctor
      }
    };
  }

  // Utility APIs
  async getDepartments() {
    await simulateApiDelay();
    
    return {
      data: {
        success: true,
        data: mockDepartments
      }
    };
  }

  async getSpecializations(department) {
    await simulateApiDelay();
    
    return {
      data: {
        success: true,
        data: mockSpecializations[department] || []
      }
    };
  }

  async getCountries() {
    await simulateApiDelay();
    
    return {
      data: {
        success: true,
        data: mockCountries
      }
    };
  }

  async getCities(country) {
    await simulateApiDelay();
    
    return {
      data: {
        success: true,
        data: mockCities[country] || []
      }
    };
  }
}

// Create and export a singleton instance
const mockApiService = new MockApiService();
export default mockApiService; 