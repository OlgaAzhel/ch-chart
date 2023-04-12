import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import '../../index.css';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import MyStudioPage from '../MyStudioPage/MyStudioPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/NavBar';
import { getUser } from '../../utilities/users-service';
import NewCommnetForm from '../../components/NewCommnetForm/NewCommnetForm'
import CommentList from '../../components/CommentList/CommentList'
import * as commentsAPI from '../../utilities/comments-api';
import MainPage from '../MainPage/MainPage';


export default function App() {
  const [user, setUser] = useState(getUser());
  const [comments, setComments] = useState([])
  console.log(comments)
  useEffect(function () {
    commentsAPI.getComments().
      then(result => {
        setComments(result)
      })
  }, [])



  return (
    <main className="App">
      {user ?
        <>
          <NavBar user={user} setUser={setUser} />

        
          
          <Routes>
            <Route path="/" element={<MainPage user={user} setUser={setUser} comments={comments} setComments={setComments} getComments={commentsAPI.getComments} />} />
            <Route path="/mystudio" element={<MyStudioPage />} />
          </Routes>

        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}
