import app from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  iOSAppBundleId: process.env.REACT_APP_IOS_APP_BUNDLE_ID,
};

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(config);
    }

    this.db = app.firestore();
    this.surveys = (userID) => this.db.collection(`studies/${config.iOSAppBundleId}/users/${userID}/surveys/`);
  }
}

export default Firebase;
