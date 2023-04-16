import NewCommnetForm from "../../components/NewCommnetForm/NewCommnetForm"
import CommentList from "../../components/CommentList/CommentList"
import NavBar from "../../components/NavBar/NavBar"
import * as commentsAPI from '../../utilities/comments-api'



export default function MainPage({ user, setUser, setComments, getComments, comments }) {



    return (
        <>

            <br />

            <br />
            <div className="app-descr-ctr">
                Chromatic Harmonica is a simple app that shows the note layout of chromatic harmonica in different keys.
                The application also, shows a set of scales in different tonalities for each key of chromatic harmonica.
            </div>
            <br />
            <br />

            
            <NewCommnetForm user={user} setComments={setComments} getComments={commentsAPI.getComments} />
            <CommentList user={user} comments={comments} setComments={setComments} getComments={commentsAPI.getComments} />
        </>
    )
}


const boxStyle = { border: "grey solid 2px", borderRadius: "10px", padding: "5px" };


