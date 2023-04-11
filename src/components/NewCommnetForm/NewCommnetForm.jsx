import { useState } from "react";
import * as commentsAPI from '../../utilities/comments-api';
import './NewCommentForm.css'

export default function NewCommnetForm( {user, comments, setComments, getComments }) {
    const [formData, setFormData] = useState({
        text: "",
        rate: 3,
        user: user
    });

    function handleChange(evt) {
        const newFormData = {
            ...formData,
            [evt.target.name]: evt.target.value,
            user: user
        };
        setFormData(newFormData);
    }

    async function handleAddCommnet(evt) {
        evt.preventDefault();
        const newComment = await commentsAPI.createComment(formData);
        const newCommnets = await getComments()
        console.log("THESE ARE NEW COMMENTS:",newCommnets)
        setComments([...newCommnets])
        setFormData({
            text: "",
            rate: 3,
            user: user
        });
    }

    return (
        <form onSubmit={handleAddCommnet}>
            <label>Create a comment:</label>
            <input className="note-input"
                name="text"
                value={formData.text}
                placeholder="New Commnet"
                onChange={handleChange}
                required
            />
            <label>Rate this app:</label>
            <select name="rate"
            onChange={handleChange}
            required
            value={3}
            >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
            </select>
            <button type="submit">SUBMIT</button>

    </form>
    )
}