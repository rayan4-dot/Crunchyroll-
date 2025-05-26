import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import UploaderLayout from '@/Layouts/UploaderLayout';
import { toast } from 'react-hot-toast';

export default function EpisodesIndex({ episodes }) {
    const handleDelete = (episodeId) => {
        if (window.confirm('Are you sure you want to delete this episode?')) {
            router.delete(route('uploader.episodes.delete', episodeId), {
                onSuccess: () => {
                    toast.success('Episode deleted successfully');
                },
                onError: () => {
                    toast.error('Failed to delete episode');
                }
            });
        }
    };

    return (
        <UploaderLayout>
            <Head title="My Episodes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">My Episodes</h2>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Title
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Anime
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Season/Episode
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {episodes.data.map((episode) => (
                                            <tr key={episode.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {episode.title}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {episode.anime.title}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        S{episode.season}E{episode.episode_number}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                        ${episode.approval_status === 'approved' ? 'bg-green-100 text-green-800' : 
                                                          episode.approval_status === 'rejected' ? 'bg-red-100 text-red-800' : 
                                                          'bg-yellow-100 text-yellow-800'}`}>
                                                        {episode.approval_status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-3">
                                                        <Link
                                                            href={route('uploader.episodes.edit', episode.id)}
                                                            className="text-blue-600 hover:text-blue-900"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(episode.id)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="mt-4">
                                {/* Add pagination links here if needed */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UploaderLayout>
    );
} 