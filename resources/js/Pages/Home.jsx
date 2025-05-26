import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { anime } from '@/api/anime';
import MainLayout from '@/Layouts/MainLayout';
import SearchBar from '@/Components/SearchBar';

export default function Home() {
    const { auth } = usePage().props;
    const [featuredAnimes, setFeaturedAnimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeaturedAnimes = async () => {
            try {
                const response = await anime.list({ featured: true, limit: 6 });
                if (response && response.data) {
                    setFeaturedAnimes(response.data.data || []);
                } else {
                    setFeaturedAnimes([]);
                }
            } catch (error) {
                console.error('Error fetching featured animes:', error);
                setError('Failed to load featured animes. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedAnimes();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <MainLayout>
            <div className="min-h-screen bg-gray-100">
                {/* Hero Section */}
                <div className="relative bg-indigo-800">
                    <div className="absolute inset-0">
                        <img
                            className="w-full h-full object-cover"
                            src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80"
                            alt="Anime background"
                        />
                        <div className="absolute inset-0 bg-indigo-800 mix-blend-multiply" />
                    </div>
                    <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Welcome to Crunchyroll
                        </h1>
                        <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
                            Your ultimate destination for anime streaming. Discover, watch, and enjoy your favorite anime series and movies.
                        </p>
                        <div className="mt-8 max-w-xl">
                            <SearchBar 
                                placeholder="Search for your favorite anime..."
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Featured Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Featured Animes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {featuredAnimes?.map((anime) => (
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
                </div>

                {/* Features Section */}
                <div className="bg-white">
                    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900">
                                Why Choose Crunchyroll?
                            </h2>
                            <p className="mt-4 text-lg text-gray-500">
                                The best anime streaming service with exclusive content and features.
                            </p>
                        </div>
                        <div className="mt-12">
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                <div className="pt-6">
                                    <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                                        <div className="-mt-6">
                                            <div>
                                                <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                                                    <svg
                                                        className="h-6 w-6 text-white"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                </span>
                                            </div>
                                            <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                                                HD Quality
                                            </h3>
                                            <p className="mt-5 text-base text-gray-500">
                                                Watch your favorite anime in high definition quality.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                                        <div className="-mt-6">
                                            <div>
                                                <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                                                    <svg
                                                        className="h-6 w-6 text-white"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                        />
                                                    </svg>
                                                </span>
                                            </div>
                                            <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                                                New Episodes
                                            </h3>
                                            <p className="mt-5 text-base text-gray-500">
                                                Get new episodes as soon as they air in Japan.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                                        <div className="-mt-6">
                                            <div>
                                                <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                                                    <svg
                                                        className="h-6 w-6 text-white"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                </span>
                                            </div>
                                            <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                                                Exclusive Content
                                            </h3>
                                            <p className="mt-5 text-base text-gray-500">
                                                Access exclusive anime content not available anywhere else.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 