import { Link } from '@inertiajs/react';

export default function MainLayout({ children, user }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/" className="text-xl font-bold text-indigo-600">
                                    Crunchyroll Clone
                                </Link>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <Link href="/animes" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                                    Animes
                                </Link>
                                <Link href="/categories" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                                    Categories
                                </Link>
                                {user && (
                                    <>
                                        <Link href="/favorites" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                                            Favorites
                                        </Link>
                                        <Link href="/watch-later" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                                            Watch Later
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <Link href="/notifications" className="text-sm text-gray-700">
                                        Notifications
                                    </Link>
                                    <Link href="/profile" className="text-sm text-gray-700">
                                        Profile
                                    </Link>
                                    <Link href="/logout" method="post" as="button" className="text-sm text-gray-700">
                                        Logout
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link href="/login" className="text-sm text-gray-700">
                                        Login
                                    </Link>
                                    <Link href="/register" className="text-sm text-gray-700">
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
} 