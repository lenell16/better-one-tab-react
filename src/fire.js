import * as firebase from "firebase"

const config = {
  apiKey: "AIzaSyA4FvBg5o5x1mSLSN7awysEvO1rDjQphiQ",
  authDomain: "better-one-tab.firebaseapp.com",
  databaseURL: "https://better-one-tab.firebaseio.com",
  projectId: "better-one-tab",
  storageBucket: "",
  messagingSenderId: "193045030022"
}

firebase.initializeApp(config)

export default firebase