import React, { useState, useRef, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { toast } from 'react-hot-toast';

export default function WatchEpisode({ episode }) {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const [hasWatched, setHasWatched] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const { post, processing } = useForm();

    useEffect(() => {
        // Debug logging for episode data
        console.log('Episode data:', episode);
        console.log('Subtitles:', episode.subtitles);

        // Initialize Plyr with enhanced subtitle configuration
        const player = new Plyr(videoRef.current, {
            controls: [
                'play-large',
                'play',
                'progress',
                'current-time',
                'mute',
                'volume',
                'captions',
                'settings',
                'pip',
                'airplay',
                'fullscreen'
            ],
            captions: {
                active: true,
                language: 'auto',
                update: true,
                available: episode.subtitles?.map(sub => sub.language) || []
            },
            quality: {
                default: 720,
                options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240]
            }
        });

        playerRef.current = player;

        // Add subtitle change event listener
        player.on('languagechange', (event) => {
            console.log('Subtitle language changed:', event.detail.language);
        });

        // Event listeners
        player.on('timeupdate', () => {
            setCurrentTime(player.currentTime);
        });

        player.on('loadedmetadata', () => {
            setDuration(player.duration);
            // Log available subtitle tracks
            const tracks = videoRef.current.textTracks;
            console.log('Available subtitle tracks:', tracks);
            for (let i = 0; i < tracks.length; i++) {
                console.log(`Track ${i}:`, {
                    label: tracks[i].label,
                    language: tracks[i].language,
                    mode: tracks[i].mode
                });
            }
        });

        player.on('ended', () => {
            setHasWatched(true);
            // Mark episode as watched in session
            router.post(route('admin.episodes.mark-watched', episode.id), {}, {
                preserveScroll: true,
                preserveState: true
            });
        });

        // Cleanup
        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        };
    }, []);

    const handleApprove = () => {
        if (!hasWatched) {
            toast.error('You must watch the entire episode before approving it.');
            return;
        }
        
        router.post(route('admin.episodes.approve', episode.id), {}, {
            onSuccess: () => {
                toast.success('Episode approved successfully!');
                router.visit(route('admin.dashboard'));
            },
            onError: () => {
                toast.error('Failed to approve episode. Please try again.');
            }
        });
    };

    const handleReject = () => {
        if (!hasWatched) {
            toast.error('You must watch the entire episode before rejecting it.');
            return;
        }
        
        router.post(route('admin.episodes.reject', episode.id), {}, {
            onSuccess: () => {
                toast.success('Episode rejected successfully!');
                router.visit(route('admin.dashboard'));
            },
            onError: () => {
                toast.error('Failed to reject episode. Please try again.');
            }
        });
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <AdminLayout>
            <Head title={`Watch Episode - ${episode.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold mb-2">{episode.title}</h2>
                                <p className="text-gray-600">
                                    {episode.anime.title} - Season {episode.season}, Episode {episode.episode_number}
                                </p>
                            </div>

                            <div className="aspect-w-16 aspect-h-9 mb-4">
                                <video
                                    ref={videoRef}
                                    className="plyr-react plyr"
                                    crossOrigin="anonymous"
                                    playsInline
                                >
                                    <source
                                        src={route('episodes.stream', episode.id)}
                                        type="video/mp4"
                                    />
                                    {episode.subtitles && episode.subtitles.map((subtitle) => (
                                        <track
                                            key={subtitle.id}
                                            kind="captions"
                                            src={route('subtitles.stream', subtitle.id)}
                                            srcLang={subtitle.language}
                                            label={subtitle.language === 'japanese' ? 'Japanese' : 'English'}
                                            default={subtitle.language === 'english'}
                                        />
                                    ))}
                                </video>
                            </div>

                            {/* Add subtitle debug info */}
                            {episode.subtitles && episode.subtitles.length > 0 && (
                                <div className="mt-4 p-4 bg-gray-100 rounded">
                                    <h3 className="font-semibold mb-2">Available Subtitles:</h3>
                                    <ul className="list-disc list-inside">
                                        {episode.subtitles.map((subtitle) => (
                                            <li key={subtitle.id}>
                                                {subtitle.language === 'japanese' ? 'Japanese' : 'English'} 
                                                ({subtitle.language})
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="flex justify-between items-center mb-6">
                                <div className="text-sm text-gray-600">
                                    {formatTime(currentTime)} / {formatTime(duration)}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {hasWatched ? (
                                        <span className="text-green-600">✓ Watched</span>
                                    ) : (
                                        <span className="text-yellow-600">Watching...</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={handleReject}
                                    disabled={!hasWatched || processing}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                                >
                                    Reject
                                </button>
                                <button
                                    onClick={handleApprove}
                                    disabled={!hasWatched || processing}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                                >
                                    Approve
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
} 