import NewCommnetForm from "../../components/NewCommnetForm/NewCommnetForm"
import CommentList from "../../components/CommentList/CommentList"
import NavBar from "../../components/NavBar/NavBar"
import * as commentsAPI from '../../utilities/comments-api'
import Xarrow from "react-xarrows";


export default function MainPage({ user, setUser, setComments, getComments, comments }) {



    return (
        <>

            <br />
            <div id="box1Ref" style={boxStyle}>hey</div>
            <br />
            <div className="app-descr-ctr">
                Chromatic Harmonica is a simple app that shows the note layout of chromatic harmonica in different keys.
                The application also, shows a set of scales in different tonalities for each key of chromatic harmonica.
            </div>
            <br />
            <br />
            
                
                <p id="elem2" style={boxStyle}>hey2</p>
                <Xarrow
                    start="box1Ref" //can be react ref
                    end="elem2" //or an id
                />
            
            <NewCommnetForm user={user} setComments={setComments} getComments={commentsAPI.getComments} />
            <CommentList user={user} comments={comments} setComments={setComments} getComments={commentsAPI.getComments} />
        </>
    )
}


const boxStyle = { border: "grey solid 2px", borderRadius: "10px", padding: "5px" };


