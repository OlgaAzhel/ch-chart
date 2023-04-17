import NewCommnetForm from "../../components/NewCommnetForm/NewCommnetForm"
import CommentList from "../../components/CommentList/CommentList"
import mainimg from "../../mainimg.jpeg"
import * as commentsAPI from '../../utilities/comments-api'



export default function MainPage({ user, setUser, setComments, getComments, comments }) {

    function renderImg(imgpath) {
        return (
            <img src={imgpath} className="card-img-top" alt="hands holding harmonica" />
        )
    }

    return (
        <>


            <section className="main-section">
                <div className="app-descr-ctr card">
                    {renderImg(mainimg)}
                    <div className="card-body">
                        <h5 className="card-title">
                            Harmonika Key Finder can be a great tool for musicians of all skill who want to explore different keys and play scales quickly and easily. It's a visualizer of a chromatic harmonica tuned into various keys, and a hole chart for any Key to play in on top of it.  Major and Natural Minor keys are supported. This is especially useful for finding a good combination of layout and key option on Lekholm DM48 MIDI instrument, but can be very helpful with any chromatic harmonica.
                        </h5>
                        <h6 className="card-text">
                             </h6>
                        <a href="/mystudio" className="btn btn-secondary">TRY IT !</a>
                    </div>
                </div>


                <CommentList user={user} comments={comments} setComments={setComments} getComments={commentsAPI.getComments} />
            </section>
        </>
    )
}

