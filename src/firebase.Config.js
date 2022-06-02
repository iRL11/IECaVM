import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDIiYMMEP177IJLAH8wS_Gzrq7Os_4bftc",
  authDomain: "income-expense-5290c.firebaseapp.com",
  projectId: "income-expense-5290c",
  storageBucket: "income-expense-5290c.appspot.com",
  messagingSenderId: "698018174414",
  appId: "1:698018174414:web:83730bdd8b0cdd9c47079f"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyDkVfHoDiB7JAxtEkIt5kIFo31EAbvp87s",
//   authDomain: "income-expense-39951.firebaseapp.com",
//   projectId: "income-expense-39951",
//   storageBucket: "income-expense-39951.appspot.com",
//   messagingSenderId: "256836073986",
//   appId: "1:256836073986:web:fa268f6408f1aceb44851b",
//   measurementId: "G-EFYGSWHMRS"
//};
// const firebaseConfig = {
//   apiKey: "AIzaSyCUZhMAuKleUR0ZTmxm77alwoXKVlwkddY",
//   authDomain: "expense-d787b.firebaseapp.com",
//   projectId: "expense-d787b",
//   storageBucket: "expense-d787b.appspot.com",
//   messagingSenderId: "958985903311",
//   appId: "1:958985903311:web:ad8dfbe158e738e3b3ebba"
// };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default firebaseConfig;
