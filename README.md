# RideEase

RideEase is a ride-sharing platform that connects users with nearby drivers. Built with React, Node.js, and MongoDB.

## Features

- Real-time ride tracking
- Multiple vehicle options (Car, Auto, Motorcycle)
- Live fare calculation
- OTP verification system
- Driver-passenger matching
- Socket-based live location updates
- Interactive maps integration

## Tech Stack

### Frontend

- React (Vite)
- TailwindCSS
- Google Maps API
- Socket.io Client
- GSAP for animations
- Axios for API calls

### Backend

- Node.js
- Express.js
- MongoDB
- Socket.io
- JWT Authentication
- Google Maps Services

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Google Maps API key
- Git

### Environment Variables

#### Frontend (.env)

```
VITE_BASE_URL=http://localhost:4000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

#### Backend (.env)

```
MONGO_URI=your_mongodb_connection_string
DB_NAME=rideease
PORT=4000
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API=your_google_maps_api_key
ORIGIN_CORS=*
```

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/rideease.git
cd rideease
```

2. Install Backend Dependencies

```bash
cd backend
npm install
```

3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

4. Start Backend Server

```bash
cd backend
nodemon start
or
node start server.js
```

5. Start Frontend Development Server

```bash
cd frontend
npm run dev
```

## API Documentation

For detailed API documentation, see [API_DOCUMENTATION.md](backend/README.endpoints.md)

## Project Structure

```
rideease/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CaptainDetails.jsx
│   │   │   ├── ConfirmRidePopup.jsx
│   │   │   ├── FinishRide.jsx
│   │   │   ├── LiveTracking.jsx
│   │   │   └── ...
│   │   ├── context/
│   │   │   ├── CaptainContext.jsx
│   │   │   ├── SocketContext.jsx
│   │   │   ├── UserContext.jsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── UserLogin.jsx
│   │   │   ├── CaptainLogin.jsx
│   │   │   ├── Riding.jsx
│   │   │   └── ...
│   │   └── App.jsx
│   ├── public/
│   │   ├── rideease-logo.png
│   │   └── vite.svg
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── backend/
    ├── src/
    │   ├── controllers/
    │   │   ├── user.controller.js
    │   │   ├── captain.controller.js
    │   │   ├── maps.controller.js
    │   │   ├── ride.controller.js
    │   │   └── ...
    │   ├── models/
    │   │   ├── user.model.js
    │   │   ├── captain.model.js
    │   │   ├── ride.model.js
    │   │   ├── blackListToken.model.js
    │   │   └── ...
    │   ├── routes/
    │   │   ├── user.routes.js
    │   │   ├── captain.routes.js
    │   │   ├── maps.routes.js
    │   │   ├── ride.routes.js
    │   │   └── ...
    │   ├── services/
    │   │   ├── maps.service.js
    │   │   ├── ride.service.js
    │   │   └── ...
    │   ├── middleware/
    │   │   ├── auth.middleware.js
    │   │   └── ...
    │   ├── utils/
    │   │   ├── ApiError.js
    │   │   ├── ApiResponse.js
    │   │   ├── asyncHandler.js
    │   │   └── ...
    │   └── db/
    │       └── db.js
    ├── app.js
    ├── server.js
    ├── socket.js
    ├── package.json
    └── README.endpoints.md
```

## Key Features Explained

### User Features

- Register/Login as passenger or driver
- Book rides with different vehicle options
- Real-time ride tracking
- OTP verification for ride start
- Payment integration (Cash)

### Captain (Driver) Features

- Register/Login as captain
- Accept/Reject ride requests
- Real-time location updates
- Ride completion with fare details
- Profile management

### Maps Integration

- Real-time location tracking
- Distance and time calculation
- Fare estimation based on distance
- Location autocomplete suggestions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors

- Yuvraj Singh
- Bharti Jayprakash
- Yash Porwal
- Lakshay Shrivastava
