import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import UploaderLayout from '../../Layouts/UploaderLayout';

export default function UploadAnime({ categories }) {
    const [episodes, setEpisodes] = useState([{
        title: '',
        description: '',
        video_file: null,
        season: 1,
        episode_number: 1,
        language: 'japanese', // default to japanese
        subtitle_file: null
    }]);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        category_id: '',
        type: '',
        content_status: 'upcoming', // default to upcoming
        cover_image: null,
        episodes: episodes
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        // Add anime details
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category_id', data.category_id);
        formData.append('type', data.type);
        formData.append('content_status', data.content_status);
        if (data.cover_image) {
            formData.append('cover_image', data.cover_image);
        }

        // Only add episodes if content_status is not upcoming
        if (data.content_status !== 'upcoming') {
            episodes.forEach((episode, index) => {
                formData.append(`episodes[${index}][title]`, episode.title);
                formData.append(`episodes[${index}][description]`, episode.description);
                formData.append(`episodes[${index}][season]`, episode.season);
                formData.append(`episodes[${index}][episode_number]`, episode.episode_number);
                formData.append(`episodes[${index}][language]`, episode.language);
                if (episode.video_file) {
                    formData.append(`episodes[${index}][video_file]`, episode.video_file);
                }
                if (episode.subtitle_file) {
                    formData.append(`episodes[${index}][subtitle_file]`, episode.subtitle_file);
                }
            });
        }

        post(route('uploader.anime.store'), {
            forceFormData: true,
            data: formData
        });
    };

    const handleFileChange = (e) => {
        setData('cover_image', e.target.files[0]);
    };

    const handleEpisodeChange = (index, field, value) => {
        const newEpisodes = [...episodes];
        newEpisodes[index] = { ...newEpisodes[index], [field]: value };
        setEpisodes(newEpisodes);
        setData('episodes', newEpisodes);
    };

    const handleEpisodeFileChange = (index, field, file) => {
        const newEpisodes = [...episodes];
        newEpisodes[index] = { ...newEpisodes[index], [field]: file };
        setEpisodes(newEpisodes);
        setData('episodes', newEpisodes);
    };

    const addEpisode = () => {
        const newEpisode = {
            title: '',
            description: '',
            video_file: null,
            season: episodes[episodes.length - 1].season,
            episode_number: episodes[episodes.length - 1].episode_number + 1,
            language: 'japanese',
            subtitle_file: null
        };
        setEpisodes([...episodes, newEpisode]);
    };

    const removeEpisode = (index) => {
        const newEpisodes = episodes.filter((_, i) => i !== index);
        setEpisodes(newEpisodes);
        setData('episodes', newEpisodes);
    };

    return (
        <UploaderLayout>
            <Head title="Upload Anime" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Upload New Anime</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-6">
                                    {/* Anime Details */}
                                    <div className="border-b pb-6">
                                        <h3 className="text-lg font-medium mb-4">Anime Details</h3>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                                <input
                                                    type="text"
                                                    value={data.title}
                                                    onChange={e => setData('title', e.target.value)}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                />
                                                {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                                <textarea
                                                    value={data.description}
                                                    onChange={e => setData('description', e.target.value)}
                                                    rows="4"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                />
                                                {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                                <select
                                                    value={data.category_id}
                                                    onChange={e => setData('category_id', e.target.value)}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                >
                                                    <option value="">Select a category</option>
                                                    {categories.map(category => (
                                                        <option key={category.id} value={category.id}>
                                                            {category.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.category_id && <div className="text-red-500 text-sm mt-1">{errors.category_id}</div>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Type</label>
                                                <select
                                                    value={data.type}
                                                    onChange={e => setData('type', e.target.value)}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                >
                                                    <option value="">Select a type</option>
                                                    <option value="OVA">OVA</option>
                                                    <option value="movie">Movie</option>
                                                    <option value="series">Series</option>
                                                    <option value="special">Special</option>
                                                </select>
                                                {errors.type && <div className="text-red-500 text-sm mt-1">{errors.type}</div>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                                <select
                                                    value={data.content_status}
                                                    onChange={e => setData('content_status', e.target.value)}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                >
                                                    <option value="upcoming">Upcoming</option>
                                                    <option value="airing">Airing</option>
                                                    <option value="finished">Finished</option>
                                                </select>
                                                {errors.content_status && <div className="text-red-500 text-sm mt-1">{errors.content_status}</div>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Cover Image</label>
                                                <input
                                                    type="file"
                                                    onChange={handleFileChange}
                                                    className="mt-1 block w-full"
                                                    accept="image/*"
                                                />
                                                {errors.cover_image && <div className="text-red-500 text-sm mt-1">{errors.cover_image}</div>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Episodes - Only show if content_status is not upcoming */}
                                    {data.content_status !== 'upcoming' && (
                                        <div>
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-lg font-medium">Episodes</h3>
                                                <button
                                                    type="button"
                                                    onClick={addEpisode}
                                                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                                >
                                                    Add Episode
                                                </button>
                                            </div>

                                            {episodes.map((episode, index) => (
                                                <div key={index} className="border rounded-lg p-4 mb-4">
                                                    <div className="flex justify-between items-center mb-4">
                                                        <h4 className="text-md font-medium">Episode {index + 1}</h4>
                                                        {episodes.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => removeEpisode(index)}
                                                                className="text-red-600 hover:text-red-800"
                                                            >
                                                                Remove
                                                            </button>
                                                        )}
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700">Title</label>
                                                            <input
                                                                type="text"
                                                                value={episode.title}
                                                                onChange={e => handleEpisodeChange(index, 'title', e.target.value)}
                                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700">Description</label>
                                                            <textarea
                                                                value={episode.description}
                                                                onChange={e => handleEpisodeChange(index, 'description', e.target.value)}
                                                                rows="2"
                                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                            />
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700">Season</label>
                                                                <input
                                                                    type="number"
                                                                    value={episode.season}
                                                                    onChange={e => handleEpisodeChange(index, 'season', parseInt(e.target.value))}
                                                                    min="1"
                                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700">Episode Number</label>
                                                                <input
                                                                    type="number"
                                                                    value={episode.episode_number}
                                                                    onChange={e => handleEpisodeChange(index, 'episode_number', parseInt(e.target.value))}
                                                                    min="1"
                                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700">Language</label>
                                                            <select
                                                                value={episode.language}
                                                                onChange={e => handleEpisodeChange(index, 'language', e.target.value)}
                                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                            >
                                                                <option value="japanese">Japanese</option>
                                                                <option value="english">English</option>
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700">Video File</label>
                                                            <input
                                                                type="file"
                                                                onChange={e => handleEpisodeFileChange(index, 'video_file', e.target.files[0])}
                                                                className="mt-1 block w-full"
                                                                accept="video/*"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700">Subtitle File (Optional)</label>
                                                            <input
                                                                type="file"
                                                                onChange={e => handleEpisodeFileChange(index, 'subtitle_file', e.target.files[0])}
                                                                className="mt-1 block w-full"
                                                                accept=".srt,.vtt"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            {processing ? 'Uploading...' : 'Upload Anime'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </UploaderLayout>
    );
} 