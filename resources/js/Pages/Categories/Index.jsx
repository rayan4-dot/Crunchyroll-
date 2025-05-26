import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import SearchBar from '@/Components/SearchBar';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Index() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Failed to load categories. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const filteredCategories = categories.filter(category => 
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.animes?.some(anime => 
            anime.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            anime.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

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
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Categories</h1>
                        <SearchBar 
                            placeholder="Search categories or animes..."
                            className="mb-4"
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-8">
                        {filteredCategories.map((category) => (
                            <div key={category.id} className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{category.name}</h2>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {category.animes?.map((anime) => (
                                            <div key={anime.id} className="bg-gray-50 rounded-lg overflow-hidden">
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
                                                    <div className="mt-4">
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
                            </div>
                        ))}
                    </div>

                    {filteredCategories.length === 0 && (
                        <div className="text-center py-12">
                            <h3 className="text-lg font-medium text-gray-900">No categories or animes found</h3>
                            <p className="mt-2 text-sm text-gray-500">Try adjusting your search</p>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
} 