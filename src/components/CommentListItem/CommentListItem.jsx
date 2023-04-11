import '../CommentListItem/CommentListItem.css'
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

    return (
        <li className="CommentListItem">
            <div className="comment-ctr">
                {
                    edit ?
                <EditComment comment={comment} comments={comments} setComments={setComments} getComments={getComments} setEdit={setEdit}/>
:
                <>
                    <span className='user-name'>{user.name}</span>
                    <span className='comment-text'>{comment.text}</span>

                    <span className='date-time'>{formattedDateTime}</span>
                    <span className='comment-rate'>Rating: {comment.rate}</span>

                    {
                        user._id === comment.user &&
                        <div className='buttons'>
                            <button onClick={handleEdit}>EDIT COMMENT</button>
                            <button onClick={handleClick}>❌ DELETE</button>
                        </div>
                    }
                </>
                }



            </div>
        </li>
    )
}