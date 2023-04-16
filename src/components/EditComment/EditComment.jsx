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
        <form onSubmit={handleEditComment} class="form-horizontal shadow-sm p-3 mb-5 bg-body-tertiary rounded bg-warning-subtle">
            <div class="form-group ">
                <label class="control-label" for="commnet-body">Edit your comment:</label>

                <textarea class="form-control" rows="3"
                    name="text"
                    value={editFormData.text}
                    placeholder="New Note"
                    onChange={handleChange}
                    required
                />
            </div>
            <div class="form-group">
                <label class="control-label" for="rate">Edit rate:</label>
                <div class="d-flex justify-content-start">
                    <select name="rate"
                        class="form-control w-25 p-3"
                        onChange={handleChange}
                        required
                        value={editFormData.rate}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <button type="submit" class="btn btn-secondary">SAVE CHANGES</button>
                </div>
            </div>
        </form>

    )
}