import Firebase from 'firebase'
import 'firebase/firestore'
import FirebaseConfig from './firebaseConfig'
const db = Firebase.initializeApp(FirebaseConfig)
const firestore = Firebase.firestore();
firestore.settings( { timestampsInSnapshots: true })
export default db.firestore()