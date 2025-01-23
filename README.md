## Website Title
**ParcelPilot**: A Comprehensive Platform for Booking, Managing, and Delivering Parcels

## Website Description
The **ParcelPilot** is an online platform designed to make parcel booking, delivery, and tracking easy and efficient. With user-friendly interfaces, seamless payment integration, and a robust backend, it allows users to book parcels, track their status, and manage deliveries. Admins can assign delivery personnel, view statistics, and manage bookings, while delivery men can easily manage their assigned parcels.

---

## Admin Login Credentials

- **Admin Username**: admin@gmail.com
- **Admin Password**: Admin@1

## Delivery Man Login Credentials

- **Delivery Man Username**: ridoybabu@gmail.com
- **Delivery Man Password**: 123456

## Live Site URL

- [ParcelPilot](https://parcel-pilot-72663.web.app/)


## Frontend Technology Stack
- **React**: A JavaScript library for building user interfaces, enabling dynamic and responsive front-end components.
- **React Router**: A standard library for routing and navigation in React applications.
- **Tailwind CSS**: A utility-first CSS framework for creating modern, responsive web designs with ease.
- **TanStack Query**: A data fetching and caching library used to manage and optimize API calls (for GET requests).
- **Axios**: A promise-based HTTP client for making API requests.
- **React Confetti**: A library for adding a confetti effect (used on the payment success page).
- **React ApexCharts**: For data visualization and creating interactive charts.
- **React Hook Form**: A library for managing form state and validation, making form handling easier and more efficient.

## Features of the Parcel Management System

1. **User Registration and Login**:

   - Secure registration and login for users using email/password and social login integration (e.g., Google, Facebook).

2. **User Dashboard**:

   - Personalized dashboard where users can book parcels, manage their bookings, and view their profile.
   - Access to "Book a Parcel", "My Parcels", and "My Profile" based on the user role.

3. **Parcel Booking**:

   - Users can book parcels by providing details like type, weight, receiver's information, and delivery address.
   - Price is automatically calculated based on the weight of the parcel (e.g., 50Tk for 1kg, 100Tk for 2kg).

4. **Admin Dashboard**:

   - Admins can view and manage all parcels, users, and delivery men.
   - Admin can also view statistics like the total number of parcels booked, delivered, and total users.

5. **Delivery Management**:

   - Admins can assign parcels to delivery men and track the status (e.g., "On the Way", "Delivered").
   - Delivery men can view their assigned parcels and mark them as delivered or canceled.

6. **Stripe Payment Integration**:

   - Secure payment system using Stripe, allowing users to pay for parcels upon booking.
   - After successful payment, users are redirected to a Payment Success Page with a React Confetti Explosion effect.

7. **Parcel Status Tracking**:

   - Users can track the status of their parcels in real-time (e.g., pending, on the way, delivered, canceled).
   - Admins and users can update the parcel status accordingly.

8. **User and Delivery Man Profile Management**:

   - Users and delivery men can upload and update their profile pictures.
   - Admins have the ability to change user roles, e.g., from User to Delivery Man or Admin.

9. **Real-Time Notifications**:

   - Notifications for successful authentication, booking updates, and payment completion.
   - Sweet alerts and toast notifications for all CRUD operations.

10. **Responsive Design**:

    - Fully responsive and mobile-optimized application.
    - User and Admin dashboards are also responsive for mobile, tablet, and desktop views.

11. **Interactive Charts for Admin**:

    - The Admin Dashboard features two charts:
      - A bar chart to show bookings by date.
      - A line chart to compare booked vs delivered parcels.

12. **Delivery Men Reviews**:

    - Users can leave reviews and ratings for delivery men after successful parcel delivery.
    - Delivery men can view feedback on their "My Reviews" page.

13. **Map Integration**:

    - View the delivery location on a map with a pin using the parcel's latitude and longitude.
    - Integrated with MapBox or React MapGL for interactive maps.

14. **Shadcn Component Library**:

    - All UI components are designed using Shadcn, ensuring modern and clean UI/UX.

15. **Admin User Management**:
    - Admins can convert users into Delivery Men or Admins from the Admin Dashboard.
    - User information is editable, including contact details and role.

## Installation Instructions

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or above)
- MongoDB (or MongoDB Atlas account)
- Firebase account for image hosting (if necessary)
- Stripe account for payment integration

### Steps to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/parcel-management-system.git
   cd parcel-management-system
   ```
2. **Install dependencies**:

   npm install

3. **Set up environment variables**:
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   FIREBASE_CONFIG=your_firebase_config
4. **Run the application**:
    npm run dev
