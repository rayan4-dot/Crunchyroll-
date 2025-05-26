import React from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import UploaderLayout from '@/Layouts/UploaderLayout';
import { toast } from 'react-hot-toast';

export default function EditEpisode({ episode }) {
    const { data, setData, put, processing, errors } = useForm({
        title: episode.title,
        description: episode.description || '',
        season: episode.season,
        episode_number: episode.episode_number,
        language: episode.language,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        put(route('uploader.episodes.update', episode.id), {
            onSuccess: () => {
                toast.success('Episode updated successfully');
                router.visit(route('uploader.episodes'));
            },
            onError: () => {
                toast.error('Failed to update episode');
            }
        });
    };

    return (
        <UploaderLayout>
            <Head title={`Edit Episode - ${episode.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold mb-2">Edit Episode</h2>
                                <p className="text-gray-600">
                                    {episode.anime.title} - Season {episode.season}, Episode {episode.episode_number}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.title && (
                                            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            rows={4}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.description && (
                                            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="season" className="block text-sm font-medium text-gray-700">
                                                Season
                                            </label>
                                            <input
                                                type="number"
                                                id="season"
                                                value={data.season}
                                                onChange={e => setData('season', e.target.value)}
                                                min="1"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                            {errors.season && (
                                                <p className="mt-1 text-sm text-red-600">{errors.season}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="episode_number" className="block text-sm font-medium text-gray-700">
                                                Episode Number
                                            </label>
                                            <input
                                                type="number"
                                                id="episode_number"
                                                value={data.episode_number}
                                                onChange={e => setData('episode_number', e.target.value)}
                                                min="1"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                            {errors.episode_number && (
                                                <p className="mt-1 text-sm text-red-600">{errors.episode_number}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                                            Language
                                        </label>
                                        <select
                                            id="language"
                                            value={data.language}
                                            onChange={e => setData('language', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        >
                                            <option value="japanese">Japanese</option>
                                            <option value="english">English</option>
                                        </select>
                                        {errors.language && (
                                            <p className="mt-1 text-sm text-red-600">{errors.language}</p>
                                        )}
                                    </div>

                                    <div className="flex justify-end space-x-4">
                                        <button
                                            type="button"
                                            onClick={() => router.visit(route('uploader.episodes'))}
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                        >
                                            Save Changes
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