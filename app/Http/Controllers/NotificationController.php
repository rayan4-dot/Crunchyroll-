<?php

namespace App\Http\Controllers;

use App\Events\NewNotification;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $notifications = Notification::with('user')->get();
        return response()->json($notifications);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'message' => 'required|string',
            'read_status' => 'boolean',
            'type' => 'required|string'
        ]);

        $notification = Notification::create($validated);
        broadcast(new NewNotification($notification))->toOthers();
        return response()->json($notification, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Notification $notification): JsonResponse
    {
        return response()->json($notification->load('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Notification $notification): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => 'sometimes|required|exists:users,id',
            'message' => 'sometimes|required|string',
            'read_status' => 'boolean',
            'type' => 'sometimes|required|string'
        ]);

        $notification->update($validated);
        broadcast(new NewNotification($notification))->toOthers();
        return response()->json($notification);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notification $notification): JsonResponse
    {
        $notification->delete();
        return response()->json(null, 204);
    }

    public function send(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'message' => 'required|string',
            'type' => 'required|string'
        ]);

        $notification = Notification::create([
            'user_id' => $validated['user_id'],
            'message' => $validated['message'],
            'read_status' => false,
            'type' => $validated['type']
        ]);

        broadcast(new NewNotification($notification))->toOthers();
        return response()->json($notification, 201);
    }

    public function markAsRead(Notification $notification): JsonResponse
    {
        $notification->update(['read_status' => true]);
        broadcast(new NewNotification($notification))->toOthers();
        return response()->json($notification);
    }
}
