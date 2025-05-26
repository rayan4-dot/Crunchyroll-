import React from 'react';
import { Head, Link } from '@inertiajs/react';
import UploaderLayout from '@/Layouts/UploaderLayout';

export default function Dashboard({ stats = {}, recentUploads = [] }) {
    return (
        <UploaderLayout>
            <Head title="Uploader Dashboard" />

            <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Animes</dt>
                                        <dd className="text-lg font-medium text-gray-900">{stats.totalUploads}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Pending Animes</dt>
                                        <dd className="text-lg font-medium text-gray-900">{stats.pendingUploads}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Approved Animes</dt>
                                        <dd className="text-lg font-medium text-gray-900">{stats.approvedUploads}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Episodes</dt>
                                        <dd className="text-lg font-medium text-gray-900">{stats.totalEpisodes}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Pending Episodes</dt>
                                        <dd className="text-lg font-medium text-gray-900">{stats.pendingEpisodes}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Approved Episodes</dt>
                                        <dd className="text-lg font-medium text-gray-900">{stats.approvedEpisodes}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Uploads */}
                <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Uploads</h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <ul className="divide-y divide-gray-200">
                            {recentUploads.map((anime) => (
                                <li key={anime.id} className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-indigo-600 truncate">{anime.title}</p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Category: {anime.category?.name || 'Uncategorized'}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Status: <span className={`font-medium ${anime.approval_status === 'approved' ? 'text-green-600' : anime.approval_status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                                                    {anime.approval_status.charAt(0).toUpperCase() + anime.approval_status.slice(1)}
                                                </span>
                                            </p>
                                            {anime.episodes && anime.episodes.length > 0 && (
                                                <div className="mt-2">
                                                    <p className="text-sm font-medium text-gray-700">Episodes:</p>
                                                    <ul className="mt-1 space-y-2">
                                                        {anime.episodes.map((episode) => (
                                                            <li key={episode.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                                                <div>
                                                                    <p className="text-sm text-gray-600">{episode.title}</p>
                                                                    <p className="text-xs text-gray-500">Season {episode.season}, Episode {episode.episode_number}</p>
                                                                </div>
                                                                <div>
                                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                                        episode.approval_status === 'approved' ? 'bg-green-100 text-green-800' :
                                                                        episode.approval_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                        'bg-red-100 text-red-800'
                                                                    }`}>
                                                                        {episode.approval_status.charAt(0).toUpperCase() + episode.approval_status.slice(1)}
                                                                    </span>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            <div className="mt-4">
                                                {anime.approval_status === 'approved' && (
                                                    <Link
                                                        href={route('uploader.anime.episodes.add', anime.id)}
                                                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                                    >
                                                        Add Episodes
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </UploaderLayout>
    );
} 