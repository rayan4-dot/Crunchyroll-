import client from './client';

export const anime = {
    list: (params) => client.get('/animes', { params }),
    get: (id) => client.get(`/animes/${id}`),
    create: (data) => client.post('/animes', data),
    update: (id, data) => client.put(`/animes/${id}`, data),
    delete: (id) => client.delete(`/animes/${id}`),
    getEpisodes: (id) => client.get(`/animes/${id}/episodes`),
    getSubtitles: (episodeId) => client.get(`/episodes/${episodeId}/subtitles`),
    addToFavorites: (id) => client.post(`/animes/${id}/favorite`),
    removeFromFavorites: (id) => client.delete(`/animes/${id}/favorite`),
    addToWatchLater: (id) => client.post(`/animes/${id}/watch-later`),
    removeFromWatchLater: (id) => client.delete(`/animes/${id}/watch-later`)
}; 