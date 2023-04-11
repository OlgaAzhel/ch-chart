import sendRequest from './send-request';
const BASE_URL = '/api/comments';


export async function getComments() {
    const res = await sendRequest(`${BASE_URL}/show`, 'GET')
    
    return res
}

export function createComment(newCommentData) {
    return sendRequest(`${BASE_URL}`, 'POST', newCommentData);
}

export async function deleteComment(comment) {
    const res = await sendRequest(`${BASE_URL}/delete`, 'POST', comment);
    return res
}

export async function editComment(editCommentFormData) {
    return sendRequest(`${BASE_URL}/edit`, 'POST', editCommentFormData);
}