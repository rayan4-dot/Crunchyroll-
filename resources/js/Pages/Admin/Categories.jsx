import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { router } from '@inertiajs/react';

export default function Categories({ categories }) {
    const [newCategory, setNewCategory] = useState({ name: '' });
    const [editingCategory, setEditingCategory] = useState(null);

    const handleCreate = (e) => {
        e.preventDefault();
        router.post(route('admin.categories.store'), newCategory, {
            onSuccess: () => setNewCategory({ name: '' })
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        router.put(route('admin.categories.update', editingCategory.id), editingCategory, {
            onSuccess: () => setEditingCategory(null)
        });
    };

    const handleDelete = (categoryId) => {
        if (confirm('Are you sure you want to delete this category?')) {
            router.delete(route('admin.categories.delete', categoryId));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Categories" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Create New Category */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-8">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Create New Category</h2>
                            <form onSubmit={handleCreate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        value={newCategory.name}
                                        onChange={(e) => setNewCategory({ name: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                                >
                                    Create Category
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Categories List */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Categories</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Animes Count</th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {categories.map((category) => (
                                            <tr key={category.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {editingCategory?.id === category.id ? (
                                                        <input
                                                            type="text"
                                                            value={editingCategory.name}
                                                            onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                        />
                                                    ) : (
                                                        category.name
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{category.animes_count}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {editingCategory?.id === category.id ? (
                                                        <>
                                                            <button
                                                                onClick={handleUpdate}
                                                                className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingCategory(null)}
                                                                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => setEditingCategory(category)}
                                                                className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(category.id)}
                                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                            >
                                                                Delete
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
} 