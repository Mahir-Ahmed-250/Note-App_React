import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import NotFound from './Components/NotFound/NotFound';
import { useEffect, useState } from 'react';
import Notes from './Components/Notes/Notes/Notes';
import Create from './Components/Notes/Create/Create'
import 'react-toastify/dist/ReactToastify.css';
import loadingImg from "./Components/images/1.gif";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'


// Firebase configuration

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
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const authSubscription = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false)
      }
      else {
        setUser(null)
        setLoading(false)
      }
    })

    return authSubscription;
  }, [])


  if (loading) {
    return (
      <>
        <center>
          <img src={loadingImg} alt="" className='loading-gif' />
        </center>
      </>
    )
  }

  return (
    <div className="App">

      <Routes>
        {user ? (
          <>

            <Route path="/" element={<Notes user={user} />} />
            <Route path='create' element={<Create />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>

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
