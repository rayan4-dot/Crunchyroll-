import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import UploaderLayout from '@/Layouts/UploaderLayout';

export default function AddEpisodes({ anime }) {
    const [episodes, setEpisodes] = useState([{
        title: '',
        description: '',
        video_file: null,
        season: 1,
        episode_number: anime.episodes.length + 1,
        language: 'japanese',
        subtitle_file: null
    }]);

    const { data, setData, post, processing, errors } = useForm({
        episodes: episodes
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        episodes.forEach((episode, index) => {
            formData.append(`episodes[${index}][title]`, episode.title);
            formData.append(`episodes[${index}][description]`, episode.description);
            formData.append(`episodes[${index}][season]`, episode.season);
            formData.append(`episodes[${index}][episode_number]`, episode.episode_number);
            formData.append(`episodes[${index}][language]`, episode.language);
            
            // Handle video file
            if (episode.video_file) {
                formData.append(`episodes[${index}][video_file]`, episode.video_file);
            }
            
            // Handle subtitle file
            if (episode.subtitle_file) {
                formData.append(`episodes[${index}][subtitle_file]`, episode.subtitle_file);
            }
        });

        post(route('uploader.anime.episodes.store', anime.id), {
            forceFormData: true,
            data: formData,
            onSuccess: () => {
                // Clear the form after successful submission
                setEpisodes([{
                    title: '',
                    description: '',
                    video_file: null,
                    season: 1,
                    episode_number: anime.episodes.length + 1,
                    language: 'japanese',
                    subtitle_file: null
                }]);
            }
        });
    };

    const handleEpisodeChange = (index, field, value) => {
        const newEpisodes = [...episodes];
        let processedValue = value;

        // Handle numeric fields
        if (field === 'season' || field === 'episode_number') {
            // Convert to number and handle empty/invalid input
            const numValue = parseInt(value);
            processedValue = isNaN(numValue) ? 1 : numValue;
        }

        newEpisodes[index] = { ...newEpisodes[index], [field]: processedValue };
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
            <Head title={`Add Episodes - ${anime.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-4">Add Episodes to {anime.title}</h2>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-6">
                                    {/* Episodes */}
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
                                                                value={episode.season || 1}
                                                                onChange={e => handleEpisodeChange(index, 'season', e.target.value)}
                                                                min="1"
                                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700">Episode Number</label>
                                                            <input
                                                                type="number"
                                                                value={episode.episode_number || 1}
                                                                onChange={e => handleEpisodeChange(index, 'episode_number', e.target.value)}
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

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Upload Episodes
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