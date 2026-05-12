# Email & Notifications Setup Guide

## Environment Variables Setup

Add these environment variables to your `.env` file in the backend folder:

```
# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

### How to Get Gmail App Password:

1. Go to [Google Account](https://myaccount.google.com/)
2. Click on "Security" in the left menu
3. Enable "2-Step Verification" if not already enabled
4. Scroll down and find "App passwords"
5. Select "Mail" and "Windows Computer" (or your device)
6. Generate a 16-character password
7. Copy and paste it as `EMAIL_PASSWORD` in your `.env` file

### Alternative Email Providers:

If you want to use a different email provider, update the `email.js` file:

```javascript
// For Gmail
service: "gmail"

// For Outlook
service: "outlook"

// For Custom SMTP
host: "your-smtp-host.com"
port: 587
secure: false
auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASSWORD
}
```

## Features Implemented

### Order Placed Notification
- Sends welcome email with order receipt
- COD orders: "Keep cash ready" message
- Card orders: "Thanks for payment" message
- Notification appears in app

### Order Status Updates
- Admin updates order status → User gets notification + email
- Supports: pending, confirmed, shipped, delivered, cancelled
- Each status has custom email template

### Order Cancellation
- User/Admin cancels order → Notification + Email
- Includes refund information
- Payment method specific refund details

### Real-time Notifications
- Notifications page refreshes every 30 seconds
- Mark as read / unread
- Delete individual or all notifications
- Unread count badge

## Testing

### Create Test Order (via Frontend):
1. Add products to cart
2. Fill checkout details
3. Choose payment method (COD or Card)
4. Place order
5. Check notification page and email

### Update Order Status (via Admin):
1. Go to Admin Dashboard
2. Find order in "Manage Orders"
3. Change status (confirmed, shipped, etc.)
4. User will receive notification + email

### Cancel Order:
1. User can cancel from "My Orders" page
2. Admin can cancel from "Manage Orders"
3. Cancellation email with refund details sent

## Database Models

### Notification Schema:
- userId (Reference to user)
- orderId (Reference to order)
- type (order_placed, order_confirmed, order_shipped, etc.)
- title (Notification title)
- message (Notification message)
- isRead (Boolean)
- orderDetails (Contains order info for quick reference)
- createdAt (Timestamp)

## API Endpoints

### Notifications:
- `GET /api/notifications/:userId` - Get all user notifications
- `PUT /api/notifications/:notificationId/read` - Mark as read
- `PUT /api/notifications/:userId/read-all` - Mark all as read
- `DELETE /api/notifications/:notificationId` - Delete single
- `DELETE /api/notifications/:userId/clear-all` - Delete all
