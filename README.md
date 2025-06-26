# Clinic Management App

CMS clinic management app for admins and users dashboard.

## Screenshots

- Admin Dashboard
![admin dashboard](https://github.com/amgadfikry/admin_clinic_app/blob/main/admin.PNG)
- User Dashboard
![user dashboard](https://github.com/amgadfikry/admin_clinic_app/blob/main/user.PNG)
- Landing Page
![landing page](https://github.com/amgadfikry/admin_clinic_app/blob/main/land.PNG)

## Introduction

Clinic Management System is a comprehensive solution designed to streamline the management of medical clinics, offering features for both administrators and users. The project consists of a backend built with Flask and SQLAlchemy for database management, providing a secure API with authentication using hashed passwords and tokens. The front end is developed using React and Tailwind CSS, offering an admin panel for clinic management and a patient-user dashboard.

## Admin Panel Features

- Manage specialties, doctors, offers
- Control appointments and testimonials/reviews
- Create dates for doctor appointments

## User Dashboard Features

- Search for doctors by name or specialty
- Make, modify, and view appointments
- Update profile settings
- Add testimonials and reviews

## The Story

The inspiration behind the project came from the challenges faced by me as a physiotherapist in managing both the clinic and its online presence. The clinic app aims to simplify the digital presence of medical service providers, making clinic and record management efficient.

## Author

[Amgad Fikry Mohamed](https://github.com/amgadfikry)

## Installation

1. Clone the repository.
  ```git clone https://github.com/amgadfikry/clinic_management_app.git```
2. Navigate to the project directory
  ```cd clinic_management_app```
3. Install Docker and docker-compose if not installed
4. Up the docker-compose file in the background
  ```docker compose up -d```
5. Show logs of the container and make sure both front-end and backend services are running
  ```docker compose logs -f```

## Usage

1. Access the admin dashboard at <http://localhost:5173/> with the provided credentials email: <admin@example.com>, password: admin, please do not change the password or email.
2. Explore and manage clinic-related features like adding new specialties, new doctors, new offers,and new times
3. Access the user landing page and dashboard at <http://localhost:5174/>.
4. Sign up, explore features, and make appointments.

## Contributing

If you would like to contribute to the project, please follow these steps:

- Fork the repository.
- Create a new branch for your feature: git checkout -b feature-name
- Commit your changes: git commit -m 'Add a new feature'
- Push to the branch: git push origin feature-name
- Submit a pull request.

## Licensing

This project is licensed under the MIT License.
