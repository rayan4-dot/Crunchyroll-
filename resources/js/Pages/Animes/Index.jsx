import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import SearchBar from '@/Components/SearchBar';
import { useState, useEffect } from 'react';
import { anime } from '@/api/anime';

export default function Index() {
    const [animes, setAnimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        category: '',
        status: '',
        type: '',
        sort_by: 'created_at',
        sort_order: 'desc'
    });

    useEffect(() => {
        const fetchAnimes = async () => {
            try {
                setLoading(true);
                const params = new URLSearchParams(window.location.search);
                const searchTerm = params.get('search');
                
                const queryParams = {
                    ...filters,
                    ...(searchTerm && { search: searchTerm })
                };

                console.log('Fetching animes with params:', queryParams);
                const response = await anime.list(queryParams);
                console.log('Full API Response:', response);
                
                if (response?.data?.data) {
                    console.log('Setting animes with:', response.data.data);
                    setAnimes(response.data.data);
                } else {
                    console.log('No anime data found in response');
                    setAnimes([]);
                }
                setError(null);
            } catch (error) {
                console.error('Error fetching animes:', error);
                setError(error.response?.data?.message || 'Failed to load animes. Please try again later.');
                setAnimes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimes();
    }, [filters, window.location.search]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-xl text-gray-600">Loading...</div>
                </div>
            </MainLayout>
        );
    }

    if (error) {
        return (
            <MainLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-xl text-red-600">{error}</div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="min-h-screen bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Browse Animes</h1>
                        <SearchBar className="mb-4" />
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <select
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Categories</option>
                                <option value="15">Action</option>
                                <option value="16">Adventure</option>
                                <option value="17">Comedy</option>
                                <option value="18">Drama</option>
                                <option value="19">Fantasy</option>
                            </select>

                            <select
                                value={filters.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Status</option>
                                <option value="airing">Airing</option>
                                <option value="finished">Finished</option>
                                <option value="upcoming">Upcoming</option>
                            </select>

                            <select
                                value={filters.type}
                                onChange={(e) => handleFilterChange('type', e.target.value)}
                                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Types</option>
                                <option value="OVA">OVA</option>
                                <option value="movie">Movie</option>
                                <option value="series">Series</option>
                                <option value="special">Special</option>
                            </select>

                            <select
                                value={`${filters.sort_by}-${filters.sort_order}`}
                                onChange={(e) => {
                                    const [sort_by, sort_order] = e.target.value.split('-');
                                    handleFilterChange('sort_by', sort_by);
                                    handleFilterChange('sort_order', sort_order);
                                }}
                                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="created_at-desc">Latest</option>
                                <option value="title-asc">Title A-Z</option>
                                <option value="title-desc">Title Z-A</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {animes.map((anime) => (
                            <div key={anime.id} className="bg-white overflow-hidden shadow rounded-lg">
                                {anime.cover_image && (
                                    <img
                                        src={anime.cover_image}
                                        alt={anime.title}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-4">
                                    <h3 className="text-lg font-medium text-gray-900">{anime.title}</h3>
                                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">{anime.description}</p>
                                    <div className="mt-4 flex justify-between items-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                            {anime.category?.name}
                                        </span>
                                        <Link
                                            href={`/animes/${anime.id}`}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            Watch Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {animes.length === 0 && (
                        <div className="text-center py-12">
                            <h3 className="text-lg font-medium text-gray-900">No animes found</h3>
                            <p className="mt-2 text-sm text-gray-500">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
} 