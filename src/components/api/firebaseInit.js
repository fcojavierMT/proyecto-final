import firebase from 'firebase'
import firebaseConfig from './firebaseConfig'

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.database()

export { db }
