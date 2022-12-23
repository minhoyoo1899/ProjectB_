import { applicationDefault, initializeApp, refreshToken } from 'firebase-admin/app';

const myRefreshToken = '...'; // Get refresh token from OAuth2 flow

initializeApp({
  credential: refreshToken(myRefreshToken),
  databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});


initializeApp({
  credential: applicationDefault(),
  databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});

const app = initializeApp();


// // Initialize the default app
// const defaultApp = initializeApp(defaultAppConfig);

// console.log(defaultApp.name);  // '[DEFAULT]'

// // Retrieve services via the defaultApp variable...
// let defaultAuth = getAuth(defaultApp);
// let defaultDatabase = getDatabase(defaultApp);

// // ... or use the equivalent shorthand notation
// defaultAuth = getAuth();
// defaultDatabase = getDatabase();


// // Initialize the default app
// initializeApp(defaultAppConfig);

// // Initialize another app with a different config
// var otherApp = initializeApp(otherAppConfig, 'other');

// console.log(getApp().name);  // '[DEFAULT]'
// console.log(otherApp.name);     // 'other'

// // Use the shorthand notation to retrieve the default app's services
// const defaultAuth = getAuth();
// const defaultDatabase = getDatabase();

// // Use the otherApp variable to retrieve the other app's services
// const otherAuth = getAuth(otherApp);
// const otherDatabase = getDatabase(otherApp);