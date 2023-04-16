import CommentListItem from '../CommentListItem/CommentListItem'
import NewCommnetForm from '../NewCommnetForm/NewCommnetForm';
import * as commentsAPI from '../../utilities/comments-api'

export default function CommentList({comments, setComments, user, getComments}) {
    const CommentListItems = comments.map((c, idx) => (
        <CommentListItem
            comment={c}
            index={idx}
            key={idx}
            user={user}
            comments={comments}
            setComments={setComments}
            getComments={getComments}

        />
    ));
    return (
        <>
            <div className="comment-list shadow-sm p-3 mb-5 bg-body-tertiary rounded bg-opacity-50">
                <NewCommnetForm user={user} setComments={setComments} getComments={commentsAPI.getComments} />
            <h4>Commnets:</h4>

                <div class="row">{CommentListItems}</div>
            </div>
        </>
    )

}