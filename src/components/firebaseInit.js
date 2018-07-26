import Firebase from 'firebase'
import 'firebase/firestore'
import FirebaseConfig from './firebaseConfig'
import FirebaseConfigInventory from './firebaseConfigInventory'
const db = Firebase.initializeApp(FirebaseConfig)
const dbinventory = Firebase.initializeApp(FirebaseConfigInventory,'dbinventory')
const firestore = Firebase.firestore();
firestore.settings( { timestampsInSnapshots: true })
var inventoryFirestore = dbinventory.firestore()
var complaintFirestore = db.firestore()
export default{
    complaintFirestore,
    inventoryFirestore
}