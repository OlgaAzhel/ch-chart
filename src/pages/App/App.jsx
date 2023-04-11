import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import '../../index.css';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/NavBar';
import { getUser } from '../../utilities/users-service';
import NewCommnetForm from '../../components/NewCommnetForm/NewCommnetForm'
import CommentList from '../../components/CommentList/CommentList'
import * as commentsAPI from '../../utilities/comments-api';


export default function App() {
  const [user, setUser] = useState(getUser());
  const [comments, setComments] = useState([])
  console.log(comments)
  useEffect(function(){
    commentsAPI.getComments().
      then(result => {
        setComments(result)
      })
  }, [])



  return (
    <main className="App">
      { user ?
          <>

            <NavBar user={user} setUser={setUser} />
            <br />
            <br />
          <div className="app-descr-ctr">
            Chromatic Harmonica is a simple app that shows the note layout of chromatic harmonica in different keys.
            The application also, shows a set of scales in different tonalities for each key of chromatic harmonica.
            </div>
            <br />
            <br />
          <NewCommnetForm user={user} setComments={setComments} getComments={commentsAPI.getComments}/>
          <CommentList user={user} comments={comments} setComments={setComments} getComments={commentsAPI.getComments} />
            <Routes>
              {/* Route components in here */}
              <Route path="/orders/new" element={<NewOrderPage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser}/>
      }
    </main>
  );
}
