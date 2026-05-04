# OTP Password Reset Setup Guide

## Overview
This guide helps you set up the real OTP (One-Time Password) functionality for password reset.

---

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install nodemailer
```

### 2. Configure Email in `.env` File

Edit `backend/.env` and add your Gmail credentials:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

### 3. How to Get Gmail App Password

**Step 1:** Enable 2-Factor Authentication on your Google Account
- Go to https://myaccount.google.com
- Click "Security" in the left menu
- Enable 2-Step Verification

**Step 2:** Create App Password
- Go to https://myaccount.google.com/apppasswords
- Select "Mail" and "Windows Computer" (or your OS)
- Google will generate a 16-character password
- Copy this password to `.env` file as `EMAIL_PASSWORD`

**Example:**
```env
EMAIL_USER=rafay@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

### 4. Start Backend Server
```bash
npm start
Server runs on http://localhost:3000
```

---

## Frontend Setup

The frontend is already configured to use the backend API endpoints:
- `POST /api/send-otp` - Send OTP to email
- `POST /api/verify-otp` - Verify OTP code
- `POST /api/reset-password` - Reset password with OTP

### Start Frontend Server
```bash
cd frontend
npm run dev
Open http://localhost:5173
```

---

## How OTP Feature Works

### Step 1: Send OTP
1. User enters email address
2. Backend checks if user exists
3. Generates 6-digit OTP
4. Sends OTP to user's email (valid for 10 minutes)
5. User receives email with OTP code

### Step 2: Verify OTP
1. User enters the 6-digit OTP received in email
2. Backend verifies if OTP is correct and not expired
3. If valid, moves to password reset step

### Step 3: Reset Password
1. User enters new password and confirms it
2. Backend validates password
3. Updates password in database
4. Clears OTP from memory
5. Redirects user to login page

---

## Testing the Feature

### Test Flow:
1. Go to `http://localhost:5173/reset-password`
2. Enter your registered email address
3. Click "Send OTP"
4. Check your email for OTP (check spam folder)
5. Enter the OTP code
6. Create a new password
7. You should be redirected to login page
8. Login with your new password

---

## Important Notes

**Security Notes:**
- OTP is stored in memory (clears when server restarts)
- For production, store OTP in Redis or Database
- OTP expires after 10 minutes
- Only 1 OTP per email at a time

**Gmail Setup Issues:**
- Make sure you're using Gmail (not other email providers)
- Enable 2-Factor Authentication first
- Use the 16-character app password (remove spaces)
- If email doesn't work, check backend console for errors

---

## File Structure

```
backend/
├── src/
│   ├── app.js (main app with OTP endpoints)
│   ├── utils/
│   │   └── otp.js (OTP utility functions)
│   └── models/
│       └── signup.model.js
├── .env (email credentials)
└── package.json

frontend/
└── src/pages/
    └── ResetPassword.jsx (UI for OTP flow)
```

---

## API Endpoints

### 1. Send OTP
```
POST /api/send-otp
Body: { email: "user@example.com" }
Response: { message: "OTP sent successfully to your email" }
```

### 2. Verify OTP
```
POST /api/verify-otp
Body: { email: "user@example.com", otp: "123456" }
Response: { message: "OTP verified successfully", verified: true }
```

### 3. Reset Password
```
POST /api/reset-password
Body: { 
  email: "user@example.com", 
  otp: "123456", 
  newPassword: "newpassword123" 
}
Response: { message: "Password reset successfully" }
```

---

## Troubleshooting

### Email not sending?
- Check `.env` file has correct EMAIL_USER and EMAIL_PASSWORD
- Verify Gmail 2FA and App Password are set up correctly
- Check backend console for error messages

### "User not found" error?
- Make sure you're using an email that's registered in the system
- Check your database for the user

### OTP expired?
- OTP is valid for 10 minutes only
- Click "Send OTP" again to get a new OTP

### OTP not received?
- Check email spam/junk folder
- Check backend console for sending errors
- Make sure EMAIL_USER is correct in .env

---

## Next Steps (Production)

For production deployment:
1. Store OTP in Redis instead of memory
2. Use environment variables for all sensitive data
3. Add rate limiting to prevent OTP spam
4. Add email verification logging
5. Implement OTP retry limits
6. Consider using SendGrid or AWS SES instead of Gmail
