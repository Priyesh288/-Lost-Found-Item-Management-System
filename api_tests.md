# Lost & Found Management System - API Testing Guide

Use these commands to test your backend APIs directly from the terminal. Replace `<TOKEN>` with the JWT received after login.

### 1. User Registration
```bash
curl.exe -X POST https://lost-found-item-management-system.onrender.com/api/auth/register \
-H "Content-Type: application/json" \
-d "{\"name\": \"Test User\", \"email\": \"test_user@example.com\", \"password\": \"password123\"}"
```

### 2. User Login
```bash
curl.exe -X POST https://lost-found-item-management-system.onrender.com/api/auth/login \
-H "Content-Type: application/json" \
-d "{\"email\": \"test_user@example.com\", \"password\": \"password123\"}"
```

### 3. Add Item (Requires Token)
```bash
curl.exe -X POST https://lost-found-item-management-system.onrender.com/api/items \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <TOKEN>" \
-d "{\"itemName\": \"Wallet\", \"description\": \"Brown leather wallet\", \"type\": \"Lost\", \"location\": \"Cafeteria\", \"contactInfo\": \"1234567890\"}"
```

### 4. Get All Items
```bash
curl.exe -X GET https://lost-found-item-management-system.onrender.com/api/items
```

### 5. Search Items
```bash
curl.exe -X GET "https://lost-found-item-management-system.onrender.com/api/items/search?name=Wallet"
```
