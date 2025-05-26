import client from './client';

export const auth = {
    login: (credentials) => client.post('/api/login', credentials),
    register: (userData) => client.post('/api/register', userData),
    logout: () => client.post('/api/logout'),
    getUser: () => client.get('/api/user'),
    updateProfile: (data) => client.put('/api/user/profile', data),
    deleteAccount: () => client.delete('/api/user/profile')
}; 