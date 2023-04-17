
import EditComment from "../EditComment/EditComment"
import * as commentsAPI from "../../utilities/comments-api"
import { useState } from 'react'


export default function CommentListItem({ user, comment, comments, setComments, getComments }) {
    const date = new Date(comment.createdAt)

    const formattedDateTime = date.toLocaleString('en-US', {
        timeZone: 'EST', year: "numeric", month: "short",
        day: "numeric", hour: 'numeric', minute: 'numeric', hour12: true
    })

    const [edit, setEdit] = useState(false)

    const handleEdit = () => {
        setEdit(true)
    }

    const handleClick = async () => {
        const deleteComplete = await commentsAPI.deleteComment(comment);
        if (deleteComplete) {
            const newComments = comments.filter(c => {
                return c._id !== comment._id
            })
            console.log("NEW comments ARRIVED:", newComments)
            setComments(newComments)

        }
    };

    function starGen(num) {
        let stars = []
        for (let i = parseInt(num); i > 0; i--) {

            stars.push(<span key={`star+${i}`}>⭐</span>)

        }
        return stars
    }

    return (

        <div className="comment-ctr ">

            <div className="card mb-4 opacity-75">
                {
                    edit ?
                        <div className="row">
                            <EditComment comment={comment} comments={comments} setComments={setComments} getComments={getComments} setEdit={setEdit} />
                        </div>
                        :

                        <div className="row">
                            <div className="col-sm-2 text-center">
                                <p className="small text-muted mb-0">{comment.rate}</p>
                                {
                                    starGen(comment.rate)
                                }
                            </div>

                            <div className="col-sm-6">
                                <div><span className="fw-bolder">{comment.author}&nbsp;&nbsp;&nbsp; </span><span className="fw-light">{formattedDateTime}</span></div>
                                <p>{comment.text}</p>

                            </div>


                            {
                                user._id === comment.user &&


                                <div className="d-flex flex-row-reverse">
                                    <button onClick={handleEdit} className="btn btn-sm btn-secondary">EDIT COMMENT</button>
                                    <button onClick={handleClick} className="btn btn-sm btn-outline-secondary">DELETE</button>

                                </div>
                            }

                        </div>
                }

            </div>




        </div>

    )
}