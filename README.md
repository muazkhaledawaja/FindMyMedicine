# FindMyMedicine API

## Overview
FindMyMedicine is a backend API designed to provide medical information, including drug details, side effects, pharmacy locations, and purchasing options. The API helps users find medicines easily and understand their effects.

## Features
- User authentication & authorization
- Drug information retrieval
- Pharmacy location finder
- Order and purchase management
- Admin dashboard for managing medicines and pharmacies

## Tech Stack
- **Backend:** Node.js, Express, TypeScript
- **Database:** MySQL
- **Authentication:** JWT
- **Deployment:** Docker, Docker Compose

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/muazkhaledawaja/FindMyMedicine.git
   cd FindMyMedicine
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add necessary environment variables (check `.env.example`).

4. Run the development server:
   ```sh
   npm run dev
   ```

5. Run with Docker:
   ```sh
   docker-compose up --build
   ```

## API Endpoints
| Method | Endpoint            | Description                     |
|--------|--------------------|---------------------------------|
| GET    | /api/v1/user       | Get user information           |
| POST   | /api/v1/user       | Create a new user              |
| GET    | /api/v1/medicine   | Get medicine details           |
| GET    | /api/v1/pharmacy   | Find nearby pharmacies         |

## Contributing
1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes.
4. Push to your fork and submit a pull request.

## License
This project is licensed under the MIT License.

