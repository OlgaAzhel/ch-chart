import { useState } from "react";
import * as commentsAPI from '../../utilities/comments-api';

export default function EditComment({ user, comment, comments, setComments, setEdit, getComments }) {
    const [editFormData, setEditFormData] = useState({
        text: comment.text,
        rating: comment.rating,
        user: user,
        id: comment._id
    });
    async function handleEditComment(evt) {
        evt.preventDefault();
        const newComment = await commentsAPI.editComment(editFormData);
        setEdit(false)
        const newComments = await getComments()
        setComments([...newComments])

    }

    function handleChange(evt) {
        const newEditFormData = {
            ...editFormData,
            [evt.target.name]: evt.target.value,
            user: user,
            id: comment._id
        };
        setEditFormData(newEditFormData);
    }

    return (
        <form onSubmit={handleEditComment}>
            <input className="note-edit-input"
                name="text"
                value={editFormData.text}
                placeholder="New Note"
                onChange={handleChange}
                required
            />
            <button type="submit">SAVE CHANGES</button>
        </form>

    )
}