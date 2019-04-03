import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

// const settings = {timestampsInSnapshots: true};
const settings = {};

const config = {
  	apiKey: "AIzaSyCelZYqfc3f-Kwaghi4rof6W_qnrlG7S88",
	authDomain: "school-management-system-f66c3.firebaseapp.com",
	databaseURL: "https://school-management-system-f66c3.firebaseio.com",
	projectId: "school-management-system-f66c3",
	storageBucket: "school-management-system-f66c3.appspot.com",
	messagingSenderId: "867679890969"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;