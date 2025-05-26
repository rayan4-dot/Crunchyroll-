import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { router } from '@inertiajs/react';

export default function Animes({ animes, categories }) {
    const [newAnime, setNewAnime] = useState({
        title: '',
        description: '',
        category_id: '',
        release_year: '',
        status: 'ongoing',
        episodes: '',
        image_url: ''
    });
    const [editingAnime, setEditingAnime] = useState(null);

    const handleCreate = (e) => {
        e.preventDefault();
        router.post(route('admin.animes.store'), newAnime, {
            onSuccess: () => setNewAnime({
                title: '',
                description: '',
                category_id: '',
                release_year: '',
                status: 'ongoing',
                episodes: '',
                image_url: ''
            })
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        router.put(route('admin.animes.update', editingAnime.id), editingAnime, {
            onSuccess: () => setEditingAnime(null)
        });
    };

    const handleDelete = (animeId) => {
        if (confirm('Are you sure you want to delete this anime?')) {
            router.delete(route('admin.animes.delete', animeId));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Animes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Create New Anime */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-8">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Create New Anime</h2>
                            <form onSubmit={handleCreate} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Title</label>
                                        <input
                                            type="text"
                                            value={newAnime.title}
                                            onChange={(e) => setNewAnime({ ...newAnime, title: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Category</label>
                                        <select
                                            value={newAnime.category_id}
                                            onChange={(e) => setNewAnime({ ...newAnime, category_id: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Release Year</label>
                                        <input
                                            type="number"
                                            value={newAnime.release_year}
                                            onChange={(e) => setNewAnime({ ...newAnime, release_year: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Status</label>
                                        <select
                                            value={newAnime.status}
                                            onChange={(e) => setNewAnime({ ...newAnime, status: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        >
                                            <option value="ongoing">Ongoing</option>
                                            <option value="completed">Completed</option>
                                            <option value="upcoming">Upcoming</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Episodes</label>
                                        <input
                                            type="number"
                                            value={newAnime.episodes}
                                            onChange={(e) => setNewAnime({ ...newAnime, episodes: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                        <input
                                            type="url"
                                            value={newAnime.image_url}
                                            onChange={(e) => setNewAnime({ ...newAnime, image_url: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        value={newAnime.description}
                                        onChange={(e) => setNewAnime({ ...newAnime, description: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        rows="3"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                                >
                                    Create Anime
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Animes List */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Animes</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Episodes</th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {animes.map((anime) => (
                                            <tr key={anime.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {editingAnime?.id === anime.id ? (
                                                        <input
                                                            type="text"
                                                            value={editingAnime.title}
                                                            onChange={(e) => setEditingAnime({ ...editingAnime, title: e.target.value })}
                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                        />
                                                    ) : (
                                                        anime.title
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {editingAnime?.id === anime.id ? (
                                                        <select
                                                            value={editingAnime.category_id}
                                                            onChange={(e) => setEditingAnime({ ...editingAnime, category_id: e.target.value })}
                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                        >
                                                            {categories.map((category) => (
                                                                <option key={category.id} value={category.id}>
                                                                    {category.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        anime.category?.name
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {editingAnime?.id === anime.id ? (
                                                        <select
                                                            value={editingAnime.status}
                                                            onChange={(e) => setEditingAnime({ ...editingAnime, status: e.target.value })}
                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                        >
                                                            <option value="ongoing">Ongoing</option>
                                                            <option value="completed">Completed</option>
                                                            <option value="upcoming">Upcoming</option>
                                                        </select>
                                                    ) : (
                                                        anime.status
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {editingAnime?.id === anime.id ? (
                                                        <input
                                                            type="number"
                                                            value={editingAnime.episodes}
                                                            onChange={(e) => setEditingAnime({ ...editingAnime, episodes: e.target.value })}
                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                        />
                                                    ) : (
                                                        anime.episodes
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {editingAnime?.id === anime.id ? (
                                                        <>
                                                            <button
                                                                onClick={handleUpdate}
                                                                className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingAnime(null)}
                                                                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => setEditingAnime(anime)}
                                                                className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(anime.id)}
                                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                            >
                                                                Delete
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
} 