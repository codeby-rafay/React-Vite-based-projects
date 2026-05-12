# Notifications System - Quick Start Guide

## What's Been Created

### Backend Files:

1. **notification.model.js** - Notification database schema
2. **notification.controller.js** - Handles notification operations
3. **notification.routes.js** - Notification API endpoints
4. **email.js** - Email templates and sending logic
5. **order.controller.js** - Updated to send notifications and emails

### Frontend Files:

1. **Notifications.jsx** - Beautiful notifications page

---

## Simple Integration Steps

### Step 1: Setup Environment Variables

Create/Update `.env` in backend folder:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

See `EMAIL_SETUP.md` for detailed instructions on getting Gmail app password.

### Step 2: Restart Backend Server

```bash
cd backend
npm run dev
```

### Step 3: Test the System

#### Test Order Placed Email:

1. Go to frontend
2. Add items to cart
3. Go to checkout
4. Fill details and place order
5. Check:
   - Notifications page (should show notification)
   - Email inbox (should receive order receipt email)

#### Test Admin Status Update:

1. Go to Admin Dashboard → Manage Orders
2. Find an order
3. Change status to "confirmed", "shipped", or "delivered"
4. User will receive:
   - Notification in app
   - Email with status update

#### Test Order Cancellation:

1. User: Go to My Orders → Cancel order
2. User will receive:
   - Cancellation notification
   - Email with refund details

---

## Key Features

### Notifications Page Features:

- View all notifications with timestamps
- Mark individual notifications as read
- Mark all as read
- Delete individual notifications
- Clear all notifications
- Shows unread count badge
- Color-coded notification types (blue, green, purple, red)
- Auto-refresh every 30 seconds

### Email Features:

- Order placed email with receipt
- Order status update emails
- Cancellation email with refund info
- Payment method specific messages
- Professional HTML templates
- Responsive email design

### Notification Types:

- order_placed - Order successfully placed
- order_confirmed - Admin confirmed order
- order_shipped - Order on the way
- order_delivered - Order delivered
- order_cancelled - Order cancelled
- payment_completed - Payment successful

---

## Email Template Details

### Order Placed Email:

```
Subject: Order Confirmation - Your Order Has Been Placed

Content:
- Order ID and date
- Products list with prices
- Total amount
- Payment method specific message:
  - COD: "Keep cash ready" message
  - Card: "Thank you for payment" message
- Link to track order in notifications
```

### Status Update Email:

```
Subject: Order Confirmed/Shipped/Delivered/Cancelled

Content:
- Status change details
- Order information
- If cancelled: Refund details (5-7 business days)
- Link to notification page
```

---

## Troubleshooting

### Emails not sending?

1. Check `.env` file has correct credentials
2. Gmail: Make sure 2FA is enabled and using app password
3. Check backend console for errors

### Notifications not showing?

1. Make sure backend is running
2. Check network tab in browser dev tools
3. Verify userId is correct in Redux store

### Styles looking off?

- Make sure Tailwind CSS is properly configured
- All Tailwind classes are used (check tailwind.config.js)

---

## Files Structure

```
backend/
  src/
    models/
      ├── notification.model.js (NEW)
      └── order.model.js (EXISTING)
    controllers/
      ├── notification.controller.js (NEW)
      └── order.controller.js (UPDATED)
    routes/
      ├── notification.routes.js (NEW)
      └── order.routes.js (EXISTING)
    utils/
      └── email.js (NEW)
    app.js (UPDATED)

frontend/
  src/
    pages/
      └── Notifications.jsx (UPDATED)
```

---

## API Reference

### Get All Notifications

```
GET /api/notifications/:userId
Response: {
  notifications: [...],
  unreadCount: number,
  totalNotifications: number
}
```

### Mark as Read

```
PUT /api/notifications/:notificationId/read
```

### Mark All as Read

```
PUT /api/notifications/:userId/read-all
```

### Delete Notification

```
DELETE /api/notifications/:notificationId
```

### Clear All

```
DELETE /api/notifications/:userId/clear-all
```

---

## Next Steps

- Setup email credentials
- Test order placement
- Test admin status updates
- Test cancellation
- Verify emails and notifications working
- (Optional) Add push notifications
- (Optional) Add SMS notifications
