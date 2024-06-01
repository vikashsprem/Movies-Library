# Movie Library Web Application

This project is a movie library web application built using JavaScript, React with Vite, and Tailwind CSS. It leverages Firebase for authentication and Firestore for the database. The application features user authentication, a movie search option using the OMDB API, and allows users to create and manage movie lists. Users can make these lists public or private, with public lists accessible to anyone with the link.

* Click here to see the live deployed page: [Link](https://movies-lib-vikash.vercel.app/)
* Click here to see the source code: [GitHub Repository](https://github.com/vikashsprem/Movies-Library.git)

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed Node.js(v18.16.0) and npm. If not, you can download and install them from [Node.js](https://nodejs.org/).
- You have a basic understanding of React and Tailwind CSS.
- You should have firebase account.

## Getting Started

Follow these instructions to set up the project on your local machine.

### 1. Clone the repository

First, clone this repository to your local machine:

```sh
git clone https://github.com/vikashsprem/Movies-Library.git
```
### 2. Navigate to the project directory

```sh
cd Movies-Library
```
### 3. Install dependencies
```sh
npm install
```
### 4. Run the server
```sh
npm run dev
```

## Setup Your Firebase
Before you run the server, ensure you have set it up your firebase authentication and database. If not follow these steps below.

- Create a firebase account https://console.firebase.google.com/

- Creat a project (any_name)

- Setup the authentication with email and password

### Now you will get the all information mention below ↓↓

```sh
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

### Now it's time to set the database
- Go to the Firestore Database section
- Go to Rules section
- Change the rule given below ↓↓
```sh
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Rules for the `favorites` collection
    match /favorites/{favoriteId} {
      // Allow read if the user is authenticated and is querying their own documents
      
      allow read: if (
        request.auth != null && resource.data.user == request.auth.uid || 
        get(/databases/$(database)/documents/userAccess/$(resource.data.user)).data.access == true
      );

      
      // Allow write if the user is authenticated and is writing their own document
      allow write: if request.auth != null && (request.resource.data.user == request.auth.uid || resource.data.user == request.auth.uid);
    }
    
    match /userAccess/{userAccessId} {
      // Allow read and write if the user is authenticated and is accessing their own document
      allow read, write: if request.auth != null && resource.data.user == request.auth.uid;
    }
    
    // Additional rules for other collections or documents can be added here
  }
}
```

### Setup you environment configuration

1. Create **.env** file in root directory
2. Put all information here
```sh
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

VITE_OMDB_API_KEY= (Get from https://www.omdbapi.com/ url)
``` 

### Congratulations  🎉 🎉 You have completed all the steps now you run the server and test the application.

Now open your browser and go to this url http://localhost:5173/

## Some URL Information
1. http://localhost:5173/ -> Home URL ( All info about you movies list )
2. http://localhost:5173/auth -> Authentication
3. http://localhost:5173/signup -> Register new user

## Social Media

Follow me on social media for updates and more! If you have any issues running this project, please feel free to drop me a message.

* [LinkedIn](https://www.linkedin.com/in/vikashsprem)
* [Twitter](https://twitter.com/vikashsprem)
* [GitHub](https://github.com/vikashsprem)