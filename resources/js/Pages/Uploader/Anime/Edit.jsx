import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import UploaderLayout from '@/Layouts/UploaderLayout';
import { router } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function Edit({ anime, categories }) {
    const { data, setData, put, processing, errors } = useForm({
        title: anime.title,
        description: anime.description,
        category_id: anime.category_id,
        type: anime.type,
        content_status: anime.content_status,
        cover_image: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('uploader.anime.update', anime.id), {
            onSuccess: () => {
                toast.success('Anime updated successfully');
            },
            onError: () => {
                toast.error('Failed to update anime');
            }
        });
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this anime? This action cannot be undone.')) {
            router.delete(route('uploader.anime.destroy', anime.id), {
                onSuccess: () => {
                    toast.success('Anime deleted successfully');
                },
                onError: () => {
                    toast.error('Failed to delete anime');
                }
            });
        }
    };

    return (
        <UploaderLayout>
            <Head title="Edit Anime" />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold text-gray-900">Edit Anime</h1>
                        <button
                            onClick={handleDelete}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Delete Anime
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="description"
                                rows={4}
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                        </div>

                        <div>
                            <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <select
                                id="category_id"
                                value={data.category_id}
                                onChange={e => setData('category_id', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category_id && <div className="text-red-500 text-sm mt-1">{errors.category_id}</div>}
                        </div>

                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                Type
                            </label>
                            <select
                                id="type"
                                value={data.type}
                                onChange={e => setData('type', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="tv">TV</option>
                                <option value="movie">Movie</option>
                                <option value="ova">OVA</option>
                                <option value="ona">ONA</option>
                                <option value="special">Special</option>
                            </select>
                            {errors.type && <div className="text-red-500 text-sm mt-1">{errors.type}</div>}
                        </div>

                        <div>
                            <label htmlFor="content_status" className="block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <select
                                id="content_status"
                                value={data.content_status}
                                onChange={e => setData('content_status', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="airing">Airing</option>
                                <option value="finished">Finished</option>
                                <option value="upcoming">Upcoming</option>
                            </select>
                            {errors.content_status && <div className="text-red-500 text-sm mt-1">{errors.content_status}</div>}
                        </div>

                        <div>
                            <label htmlFor="cover_image" className="block text-sm font-medium text-gray-700">
                                Cover Image
                            </label>
                            <input
                                type="file"
                                id="cover_image"
                                onChange={e => setData('cover_image', e.target.files[0])}
                                className="mt-1 block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-indigo-50 file:text-indigo-700
                                    hover:file:bg-indigo-100"
                            />
                            {errors.cover_image && <div className="text-red-500 text-sm mt-1">{errors.cover_image}</div>}
                            {anime.cover_image && (
                                <div className="mt-2">
                                    <img
                                        src={`/storage/${anime.cover_image}`}
                                        alt="Current cover"
                                        className="h-32 w-auto object-cover rounded-md"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => router.visit(route('uploader.uploads'))}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {processing ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </UploaderLayout>
    );
} 