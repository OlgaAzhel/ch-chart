import CommentListItem from '../CommentListItem/CommentListItem'

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
            <div className="commnet-list">

                <ul className="commnet-list-item">{CommentListItems}</ul>
            </div>
        </>
    )

}