import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import NotFound from './Components/NotFound/NotFound';
import { useEffect, useState } from 'react';
import Notes from './Components/Notes/Notes/Notes';
import 'react-toastify/dist/ReactToastify.css';

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'




// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCkK_Ih_qk1SfBxF3TdyuVkCkCuyM630cU",
  authDomain: "my-note-app-ccc18.firebaseapp.com",
  projectId: "my-note-app-ccc18",
  storageBucket: "my-note-app-ccc18.appspot.com",
  messagingSenderId: "249332574978",
  appId: "1:249332574978:web:82e89e15df18049ba9301b"

};






// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)



function App() {
  const [user, setUser] = useState(false)
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   signOut(auth)
  // })


  return (
    <div className="App">

      <Routes>
        {user ? (
          <Route path="/" element={<Notes />} />
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path='*' element={<NotFound />} />
          </>
        )
        }
      </Routes>
    </div>
  );
}

export default App;
