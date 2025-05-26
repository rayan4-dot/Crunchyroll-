import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { router } from '@inertiajs/react';

export default function Uploaders({ uploaders }) {
    const handleApprove = (uploaderId) => {
        if (confirm('Are you sure you want to approve this uploader?')) {
            router.post(route('admin.uploaders.approve', uploaderId));
        }
    };

    const handleReject = (uploaderId) => {
        if (confirm('Are you sure you want to reject this uploader?')) {
            router.post(route('admin.uploaders.reject', uploaderId));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Uploaders" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Uploader Requests</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested At</th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {uploaders.map((uploader) => (
                                            <tr key={uploader.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {uploader.user.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        uploader.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                        uploader.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {uploader.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {new Date(uploader.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {uploader.status === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleApprove(uploader.id)}
                                                                className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => handleReject(uploader.id)}
                                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                            >
                                                                Reject
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