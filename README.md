# Accommodation Service Platform

## Overview

Welcome to the Accommodation Service Platform! This web application provides a seamless experience for users to browse, list, and book accommodations. Inspired by Airbnb, this platform features a robust backend built with Node.js, Express.js, and MongoDB, and a dynamic frontend.

## Features

- **User Authentication**: Secure sign-up and login.
- **Accommodation Listings**: Create, view, and manage property listings.
- **Booking Management**: Handle reservations and check availability.
- **Reviews**: Leave and view reviews for listings.
- **Geolocation**: Display the location of accommodations on an interactive map.

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: HTML, CSS, JavaScript
- **Geocoding and Mapping**: MapTiler SDK

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB Atlas](https://www.mongodb.com/try/download/community)
- [Express.js](https://www.npmjs.com/package/express)
- [Cloudinary](https://cloudinary.com)
- [Maptiler](https://www.maptiler.com/)
### Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/accommodation-service-platform.git
    cd accommodation-service-platform
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```env
    MAP_API_KEY=your_map_api_key_here
    MONGO_URI=your_mongodb_connection_string_here
    ```

4. **Start the application:**

     ```bash
    node app.js
    ```

    The app should now be running on `http://localhost:8080`.

## Usage

1. **User Registration and Login**: Sign up and log in to access all features.
2. **Browse Listings**: View available accommodations.
3. **Manage Listings**: Add, edit, or delete your own property listings if you are the owner.
4. **Booking**: Make bookings and manage your reservations.
5. **Leave Reviews**: Rate and review accommodations.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please fork the repository and submit a pull request.


## Contact

For any questions or feedback, feel free to reach out to me at altamashsheikh077@gmail.com.
