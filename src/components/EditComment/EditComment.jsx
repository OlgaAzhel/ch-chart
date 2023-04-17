import { useState } from "react";
import * as commentsAPI from '../../utilities/comments-api';

export default function EditComment({ user, comment, comments, setComments, setEdit, getComments }) {
    const [editFormData, setEditFormData] = useState({
        text: comment.text,
        rate: comment.rate,
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
        <form onSubmit={handleEditComment} className="form-horizontal shadow-sm p-3 mb-5 bg-body-tertiary rounded bg-warning-subtle">
            <div className="form-group ">
                <label className="control-label" for="commnet-body">Edit your comment:</label>

                <textarea className="form-control" rows="3"
                    name="text"
                    value={editFormData.text}
                    placeholder="New Note"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label className="control-label" for="rate">Edit rate:</label>
                <div className="d-flex justify-content-start">
                    <select name="rate"
                        className="form-control w-25"
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
                    <button type="submit" className="btn btn-secondary">SAVE CHANGES</button>
                </div>
            </div>
        </form>

    )
}