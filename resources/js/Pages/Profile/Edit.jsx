import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/api/auth';

export default function Edit() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        current_password: '',
        password: '',
        password_confirmation: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await auth.getUser();
                setUser(response.data);
                setFormData(prev => ({
                    ...prev,
                    name: response.data.name,
                    email: response.data.email
                }));
            } catch (error) {
                console.error('Error fetching user:', error);
                navigate('/login');
            }
        };

        fetchUser();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            await auth.updateProfile(formData);
            setFormData(prev => ({
                ...prev,
                current_password: '',
                password: '',
                password_confirmation: ''
            }));
            alert('Profile updated successfully!');
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: 'An error occurred. Please try again.' });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            return;
        }

        try {
            await auth.deleteAccount();
            localStorage.removeItem('token');
            navigate('/');
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: 'An error occurred. Please try again.' });
            }
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
            <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <div className="max-w-xl">
                        <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Update your account's profile information and email address.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                            {errors.general && (
                                <div className="text-sm text-red-600">
                                    {errors.general}
                                </div>
                            )}

                            <div>
                                <label className="block font-medium text-sm text-gray-700" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    onChange={handleChange}
                                    required
                                />
                                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name[0]}</div>}
                            </div>

                            <div>
                                <label className="block font-medium text-sm text-gray-700" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    onChange={handleChange}
                                    required
                                />
                                {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email[0]}</div>}
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    disabled={loading}
                                >
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <div className="max-w-xl">
                        <h2 className="text-lg font-medium text-gray-900">Update Password</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Ensure your account is using a long, random password to stay secure.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                            <div>
                                <label className="block font-medium text-sm text-gray-700" htmlFor="current_password">
                                    Current Password
                                </label>
                                <input
                                    id="current_password"
                                    type="password"
                                    name="current_password"
                                    value={formData.current_password}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    onChange={handleChange}
                                />
                                {errors.current_password && (
                                    <div className="text-red-500 text-sm mt-1">{errors.current_password[0]}</div>
                                )}
                            </div>

                            <div>
                                <label className="block font-medium text-sm text-gray-700" htmlFor="password">
                                    New Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    onChange={handleChange}
                                />
                                {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password[0]}</div>}
                            </div>

                            <div>
                                <label className="block font-medium text-sm text-gray-700" htmlFor="password_confirmation">
                                    Confirm Password
                                </label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    onChange={handleChange}
                        />
                    </div>

                            <div className="flex items-center gap-4">
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    disabled={loading}
                                >
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <div className="max-w-xl">
                        <h2 className="text-lg font-medium text-gray-900">Delete Account</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Once your account is deleted, all of its resources and data will be permanently deleted.
                        </p>

                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={handleDeleteAccount}
                                className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
