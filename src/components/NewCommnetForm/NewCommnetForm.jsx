import { useState } from "react";
import * as commentsAPI from '../../utilities/comments-api';


export default function NewCommnetForm({ user, comments, setComments, getComments }) {
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
        console.log("THESE ARE NEW COMMENTS:", newCommnets)
        setComments([...newCommnets])
        setFormData({
            text: "",
            rate: 3,
            user: user
        });
    }

    return (

        <form onSubmit={handleAddCommnet} className="form-horizontal shadow-sm p-3 mb-5 bg-body-tertiary rounded">
            <div className="form-group ">
                <label className="control-label" for="commnet-body">Create a comment:</label>

                <textarea className="form-control" rows="3"
                    id="commnet-body"
                    name="text"
                    value={formData.text}
                    placeholder="New Commnet"
                    onChange={handleChange}
                    required
                />

            </div>
            <div className="form-group">
                <label className="control-label" for="rate">Rate this app:</label>
                <div className="d-flex justify-content-start">
                    <select  name="rate"
                        className="form-control w-25"

                        onChange={handleChange}
                        required
                        value={formData.rate}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>

                        <button type="submit" className="btn btn-secondary">ADD COMMENT</button>

                </div>
            </div>
        </form>

    )
}

