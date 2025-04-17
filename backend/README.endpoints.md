# RideEase API Documentation

## Overview

This documentation provides detailed information about the API endpoints available in the RideEase application. The API is organized into four main sections: User, Captain, Maps, and Rides.

## Authentication

Most endpoints require JWT authentication. Include the token in the request header:

```
Authorization: Bearer <jwt_token>
```

## User Endpoints

### 1. Register User

Creates a new user account in the system.

**Endpoint:** `POST /user/register`

```json
Request Body:
{
  "fullname": {
    "firstname": "Yuvraj",
    "lastname": "Singh"
  },
  "email": "yuvraj@example.com",
  "password": "password123"
}
```

**Response:** Returns user details and authentication token.

### 2. Login User

Authenticates existing user and provides access token.

**Endpoint:** `POST /user/login`

```json
Request Body:
{
  "email": "yuvraj@example.com",
  "password": "password123"
}
```

**Response:** Returns user details and authentication token.

### 3. Get User Profile

Retrieves the profile information of the logged-in user.

**Endpoint:** `GET /user/user-profile`

**Response:** Returns user profile details.

### 4. User Logout

Invalidates the current user session.

**Endpoint:** `GET /user/logout`

**Response:** Confirms successful logout.

## Captain Endpoints

### 1. Register Captain

Creates a new captain account with vehicle details.

**Endpoint:** `POST /captain/register`

```json
Request Body:
{
  "fullname": {
    "firstname": "Bharti",
    "lastname": "Jayprakash"
  },
  "email": "bharti@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Response:** Returns captain details and authentication token.

### 2. Captain Login

Authenticates existing captain and provides access token.

**Endpoint:** `POST /captain/login`

```json
Request Body:
{
  "email": "bharti@example.com",
  "password": "password123"
}
```

**Response:** Returns captain details and authentication token.

### 3. Get Captain Profile

Retrieves the profile information of the logged-in captain.

**Endpoint:** `GET /captain/profile`

**Response:** Returns captain profile details.

### 4. Captain Logout

Invalidates the current captain session.

**Endpoint:** `GET /captain/logout`

**Response:** Confirms successful logout.

## Maps Endpoints

### 1. Get Location Coordinates

Converts address to geographical coordinates.

**Endpoint:** `GET /maps/get-coordinates?address=Example+Address`

**Response:** Returns latitude and longitude.

### 2. Get Distance and Time

Calculates distance and estimated time between two locations.

**Endpoint:** `GET /maps/get-distance-time?origin=Start+Location&destination=End+Location`

**Response:** Returns distance and duration information.

### 3. Get Location Suggestions

Provides autocomplete suggestions for location search.

**Endpoint:** `GET /maps/get-suggestions?input=search_text`

**Response:** Returns array of location suggestions.

### 4. Get Ride Fare

Calculates estimated fare for different vehicle types.

**Endpoint:** `GET /maps/get-fare?pickup=Start+Location&destination=End+Location`

**Response:** Returns fare estimates for different vehicle types.

## Ride Endpoints

### 1. Create New Ride

Initiates a new ride request.

**Endpoint:** `POST /rides/create`

```json
Request Body:
{
  "pickup": "Start Location",
  "destination": "End Location",
  "vehicleType": "car"
}
```

**Response:** Returns ride details.

### 2. Confirm Ride

Allows captain to accept and confirm a ride.

**Endpoint:** `POST /rides/confirm`

```json
Request Body:
{
  "rideId": "ride_id_here"
}
```

**Response:** Returns confirmed ride details.

### 3. Verify OTP

Verifies ride start OTP provided by user.

**Endpoint:** `POST /rides/verify-otp`

```json
Request Body:
{
  "rideId": "ride_id_here",
  "otp": "1234"
}
```

**Response:** Returns OTP verification status.

### 4. End Ride

Completes an ongoing ride.

**Endpoint:** `POST /rides/end-ride`

```json
Request Body:
{
  "rideId": "ride_id_here"
}
```

**Response:** Returns completed ride details.

## Error Handling

All endpoints return appropriate HTTP status codes:

- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Rate Limiting

API requests are limited to 100 requests per IP per hour.

## Security

- All endpoints use HTTP
- Authentication required for protected routes
- Input validation implemented
- CORS enabled
