# Lost & Found Management System

A full-stack MERN application for managing lost and found items on a college campus.

## Technologies Used
- **Frontend**: React, Vite, Axios, Tailwind-like CSS (Vanilla CSS), Lucide React.
- **Backend**: Node.js, Express, MongoDB, Mongoose.
- **Security**: JWT (JSON Web Tokens), Bcryptjs for password hashing.

## Features
- **Authentication**: Secure registration and login.
- **Dashboard**: View all lost and found items.
- **Item Management**: 
  - Post new lost or found items.
  - Search items by name.
  - Update or Delete your own posts.
- **Protected Routes**: Only logged-in users can access the dashboard and manage items.

## API Documentation

### Auth APIs
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login and receive a JWT.

### Item APIs
- `GET /api/items`: Get all items.
- `GET /api/items/search?name=xyz`: Search items by name.
- `POST /api/items`: Add a new item (Auth required).
- `PUT /api/items/:id`: Update an item (Owner only).
- `DELETE /api/items/:id`: Delete an item (Owner only).

## Deployment Instructions

### Backend (Render)
1. Create a new Web Service on Render.
2. Connect your GitHub repository.
3. Set the Root Directory to `server`.
4. Add Environment Variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A secure random string.
5. Set Build Command: `npm install`
6. Set Start Command: `node server.js`

### Frontend (Vite/Vercel/Netlify)
1. Set the Root Directory to `client`.
2. Set Build Command: `npm run build`
3. Set Output Directory: `dist`
4. Update the `baseURL` in `client/src/utils/api.js` to point to your live backend URL.

## Conclusion
This system provides a secure and efficient way to handle lost and found items, ensuring that users can easily report and recover their belongings.
