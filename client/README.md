# Balsam Healthcare - Frontend Application

A React-based healthcare appointment booking system with Iraqi context and Arabic language support, featuring mock data for frontend-only deployment.

## 🚀 Features

- **User Authentication**: Login/Register with mock credentials
- **Doctor Search**: Browse and search for doctors by specialty, location, or name
- **Appointment Booking**: Schedule appointments with available doctors
- **Rating System**: Rate and review doctors
- **Admin Panel**: Manage users and doctors (admin access)
- **Doctor Dashboard**: Manage appointments and profile (doctor access)
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🛠️ Mock Data Setup

This application uses hardcoded mock data instead of a backend API, making it perfect for frontend-only deployment.

### Mock Credentials

Use these credentials to test different user roles:

#### Regular User
- **Email**: `ahmed.mohammed@example.com`
- **Password**: `password`

#### Doctor User
- **Email**: `fatima.ahmed@balsam.com`
- **Password**: `password`

#### Admin User
- **Email**: `admin@balsam.com`
- **Password**: `123456`

### Mock Data Includes

- **Users**: 3 sample users (regular, doctor, admin) with Arabic names
- **Doctors**: 4 sample doctors with different specialties from Iraqi cities
- **Appointments**: Sample appointment data with Arabic context
- **Ratings**: Sample doctor ratings and reviews in Arabic
- **Notifications**: Sample user notifications in Arabic
- **Departments & Specializations**: Medical specialties data in Arabic
- **Countries & Cities**: Middle Eastern and Iraqi geographic data

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── Pages/              # Page components
│   ├── Admin/          # Admin panel pages
│   ├── Doctor/         # Doctor dashboard pages
│   └── ...             # Other pages
├── services/           # Mock API services
│   ├── mockData.js     # Hardcoded data
│   └── mockApiService.js # Mock API endpoints
├── config/             # Configuration files
│   └── apiConfig.js    # API configuration
├── redux/              # State management
└── images/             # Static images
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Switching Between Mock and Real APIs

The application can easily switch between mock data and real backend APIs:

1. **Edit** `src/config/apiConfig.js`
2. **Set** `USE_MOCK_API = true` for mock data
3. **Set** `USE_MOCK_API = false` for real backend

### Environment Variables

Create a `.env` file in the client directory for production settings:

```env
REACT_APP_API_BASE_URL=https://your-backend-api.com/api
NODE_ENV=production
```

## 📱 Available Pages

### Public Pages
- **Landing Page**: Welcome and introduction
- **Login**: User authentication
- **Register**: User registration
- **About Us**: Company information
- **Contact Us**: Contact form

### User Pages (After Login)
- **Home**: Doctor search and browsing
- **Appointments**: View and manage appointments
- **Profile**: User profile management
- **Notifications**: User notifications
- **Book Appointment**: Schedule new appointments
- **Rating Page**: Rate doctors

### Doctor Pages (Doctor Role)
- **Doctor Profile**: Manage doctor profile
- **Doctor Appointments**: View and manage appointments

### Admin Pages (Admin Role)
- **Users List**: Manage all users
- **Doctors List**: Approve/reject doctor applications

## 🎨 UI Components

The application uses **Ant Design** for UI components, providing:
- Modern, professional appearance
- Responsive design
- Accessibility features
- Consistent styling

## 📊 State Management

Uses **Redux Toolkit** for state management:
- User authentication state
- Loading states
- Application alerts
- User data persistence

## 🚀 Deployment

### Frontend-Only Deployment

This application is designed for frontend-only deployment:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `build` folder** to any static hosting service:
   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3
   - Firebase Hosting

### With Backend Deployment

To use with a real backend:

1. **Set** `USE_MOCK_API = false` in `apiConfig.js`
2. **Configure** your backend API URL
3. **Deploy** both frontend and backend

## 🔒 Security Features

- **Protected Routes**: Role-based access control
- **Token-based Authentication**: JWT token management
- **Input Validation**: Form validation and sanitization
- **Route Protection**: Prevents unauthorized access

## 📱 Responsive Design

- **Mobile-first approach**
- **Tablet optimization**
- **Desktop enhancement**
- **Touch-friendly interface**

## 🧪 Testing

The application includes:
- **Unit tests** for components
- **Integration tests** for user flows
- **Mock data testing** for API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Review the mock data structure
- Test with provided credentials
- Check console for any errors

## 🔄 Updates

To update mock data:
1. **Edit** `src/services/mockData.js`
2. **Modify** data structures as needed
3. **Test** the changes
4. **Rebuild** and redeploy

---

**Note**: This is a frontend-only application with mock data. For production use with real data, you'll need to implement a backend API and update the configuration accordingly.
