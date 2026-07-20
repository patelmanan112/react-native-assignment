# 📱 Smart Field Survey & Inspection App

A modern **React Native** application built with **Expo** that helps field employees perform surveys and inspections efficiently. The application integrates multiple native device features such as **Camera, Contacts, Location, and Clipboard**, providing a complete field survey experience with an intuitive and responsive user interface.

---

## 🚀 Features

### 🏠 Dashboard

* Welcome Screen
* Student Information
* Today's Survey Counter
* Quick Action Cards
* Recent Survey Summary
* Custom App Header

### 📝 Create Survey

* Create a new survey
* Site Name
* Client Name
* Survey Description
* Priority Selection
* Date Picker
* Required Field Validation

### 📷 Camera

* Camera Permission Handling
* Capture Survey Photos
* Image Preview
* Display Capture Time
* Retake Photo
* Delete Photo
* Confirmation Alert
* Loading Indicator

### 📍 Location

* Request Location Permission
* Fetch Current GPS Coordinates
* Display Latitude & Longitude
* Display Accuracy
* Refresh Location
* Copy Location to Clipboard
* Success Alert

### 👥 Contacts

* Request Contacts Permission
* Fetch Device Contacts
* Search Contacts
* Contact Counter
* Pull-to-Refresh
* Contact Avatar using Initial
* Copy Contact Number
* Show "No Number" if unavailable
* Empty State Screen

### 📋 Clipboard

* Copy Survey ID
* Copy Contact Number
* Copy Current Location
* Paste Notes
* Clear Clipboard Data

### 👀 Survey Preview

* Preview Complete Survey
* Display:

  * Site Details
  * Client Details
  * Captured Image
  * Selected Contact
  * GPS Location
  * Notes
* Edit Survey
* Submit Survey

### 📚 Survey History

* FlatList Performance
* View Survey Details
* Search Surveys
* Filter by Priority
* Delete Survey
* Confirmation Alert

---

# 📸 Screenshots

> Add your screenshots inside a `screenshots/` folder.

| Dashboard                      | Survey                      | Camera                      |
| ------------------------------ | --------------------------- | --------------------------- |
| ![](screenshots/dashboard.png) | ![](screenshots/survey.png) | ![](screenshots/camera.png) |

| Contacts                      | Location                      | History                      |
| ----------------------------- | ----------------------------- | ---------------------------- |
| ![](screenshots/contacts.png) | ![](screenshots/location.png) | ![](screenshots/history.png) |

---

# 🛠 Tech Stack

### Frontend

* React Native
* Expo
* JavaScript

### Navigation

* Expo Router
* React Navigation
* Bottom Tabs
* Drawer Navigation

### Expo APIs

* Expo Camera
* Expo Location
* Expo Contacts
* Expo Clipboard

### React Native Components

* View
* Text
* Image
* Pressable
* FlatList
* ScrollView
* TextInput
* Alert
* ActivityIndicator
* RefreshControl

### React Hooks

* useState
* useEffect

---

# 📂 Project Structure

```text
Smart-Field-Survey-App/
│
├── app/
├── components/
├── assets/
├── hooks/
├── utils/
├── constants/
├── screenshots/
├── package.json
└── README.md
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/yourusername/smart-field-survey-app.git
```

Navigate to the project

```bash
cd smart-field-survey-app
```

Install dependencies

```bash
npm install
```

Start Expo

```bash
npx expo start
```

---

# 📦 Required Packages

```bash
expo-camera
expo-location
expo-contacts
expo-clipboard
expo-router
@react-navigation/native
react-native-safe-area-context
react-native-screens
```

---

# 🎯 Learning Outcomes

This project helped me understand:

* React Native Fundamentals
* Expo APIs
* Native Device Permissions
* Navigation (Tabs + Drawer)
* State Management with Hooks
* Form Validation
* Clipboard Operations
* Camera Integration
* GPS Location Services
* Contact Management
* Responsive Mobile UI Design
* FlatList Optimization

---

# 📈 Future Improvements

* Firebase Authentication
* Cloud Image Upload
* Offline Survey Storage
* Dark Mode
* Push Notifications
* PDF Report Generation
* Maps Integration
* Survey Analytics Dashboard

---

# 👨‍💻 Author

**Manan Patel**

* GitHub: https://github.com/patelmanan112
* LinkedIn: https://www.linkedin.com/in/manan-patel-557535390/

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates me to build more React Native applications.

---

## 📜 License

This project is created for educational purposes and is free to use and modify.
