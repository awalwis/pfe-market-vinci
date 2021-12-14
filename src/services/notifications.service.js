import axios from "axios";
const apiurl = process.env.REACT_APP_URL_API + '/api/notifications'

const getAllNotificationsByUserId = (userId) => {
    return axios.get(`${apiurl}/${userId}`)
}

const createNotification = newNotification => {
    return axios.post(apiurl, newNotification); 
}

const updateNotification = (id, notification) => {
    return axios.put(`${apiurl}/${id}`, notification)
}

const deleteNotification = (id) => {
    return axios.delete(`${apiurl}/${id}`)
}

export const notificationService = {
    createNotification, 
    deleteNotification, 
    updateNotification,
    getAllNotificationsByUserId
}