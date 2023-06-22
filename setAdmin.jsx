// Import Firebase Admin SDK
const admin = require('firebase-admin');

// Get your serviceAccount
const serviceAccount = require('path/to/serviceAccountKey.json');

// Initialize your Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// The UID of the user you want to make an admin
let uid = 'BgEzBppPQbg9FYn3SkjlnFX5W6C3';

// Assign the 'admin' custom claim
admin.auth().setCustomUserClaims(uid, {admin: true}).then(() => {
    console.log(`Custom claims set for user ${uid}`);
}).catch((error) => {
    console.log('Error setting custom claims:', error);
});
