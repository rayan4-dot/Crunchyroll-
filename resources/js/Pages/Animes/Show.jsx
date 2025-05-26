import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Show({ anime }) {
    return (
        <MainLayout>
            <div className="min-h-screen bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        {anime.cover_image && (
                            <div className="relative h-96">
                                <img
                                    src={anime.cover_image}
                                    alt={anime.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                    <h1 className="text-4xl font-bold text-white">{anime.title}</h1>
                                </div>
                            </div>
                        )}
                        
                        <div className="p-6">
                            <div className="flex items-center space-x-4 mb-4">
                                {anime.category && (
                                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                                        {anime.category.name}
                                    </span>
                                )}
                            </div>
                            
                            <p className="text-gray-600 mb-6">{anime.description}</p>
                            
                            <div className="flex space-x-4">
                                <Link
                                    href="/animes"
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Back to List
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 