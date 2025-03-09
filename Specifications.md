
# Anilab - Anime Streaming Platform Specifications

## 1. Project Overview

Anilab is a full-stack anime streaming platform inspired by Crunchyroll. It allows users to browse, stream, and download anime content. Users can track their activities (favorites, watch later, continue watching), toggle between subbed and dubbed versions, and receive real-time notifications about new episodes. Authenticated users can request to become uploaders, and admins oversee approvals and platform management.

## 2. Key Features

- **Anime Browsing & Filtering**
  - Browse by categories, tags, type (OVA, movie, series, special)
  - Filter by status (airing, finished, upcoming)
  - Filter by popularity (rating)
  - View recent releases & upcoming schedules

- **Authentication**
  - User registration/login/logout

- **User Activity Tracking**
  - Add to favorites
  - Watch later
  - Watch history
  - Continue watching

- **Watch Episodes**
  - Toggle between subbed/dubbed
  - Rate animes
  - Download episodes for offline watching

- **Uploader Role**
  - Authenticated users can request to become uploaders
  - Upload animes, episodes, subtitles (pending admin approval)

- **Admin Role**
  - Approve uploaders and content submissions
  - View statistics of users, animes, categories

- **Real-Time Notifications**
  - New episodes
  - Upload approvals
  - Announcements

## 3. User Roles

- **Guest**
  - Browse animes
  - Search for anime titles
  - View anime details

- **Authenticated User**
  - Access full streaming and download features
  - Track activities (favorites, watch later, history)
  - Rate animes and receive notifications
  - Request uploader role

- **Uploader (Approved User)**
  - Upload anime content and related media (pending admin approval)

- **Admin**
  - Approve/reject uploaders and uploaded content
  - Monitor platform stats

## 4. Tech Stack

| Layer          | Technology                         |
|----------------|-----------------------------------|
| Backend        | Laravel (REST API)                |
| Frontend       | Blade, TailwindCSS, JavaScript    |
| Real-time      | Laravel WebSockets, Pusher        |
| Database       | MySQL or PostgreSQL               |
| Authentication | Laravel Sanctum or Firebase/Auth0 |
| Storage        | Local / Cloud (optional)          |
| Subtitles      | Stored in .srt or .vtt formats    |
| Deployment     | VPS, Laravel Forge (optional), Nginx |
| Version Control| Git + GitHub                      |

## 5. Requirements

- PHP 8.2+
- Composer
- MySQL/PostgreSQL
- Node.js & NPM
- Redis (optional for queues)
- Laravel WebSockets or Pusher

## 6. Non-Requirements (Future Scope)

- Premium subscriptions/payment integration
- AI-based recommendations
- Community chat/forums
- Docker setup

## 7. Use Case Flows

### User Flow (Regular User)
1. Register/Login
2. Browse/Search Animes
3. View Anime Details
4. Watch Episodes (Subbed/Dubbed)
5. Add Anime to Favorites/Watch Later
6. Continue Watching
7. Rate Anime
8. Receive Notifications

### Uploader Flow
1. Request uploader role
2. Admin reviews and approves
3. Uploader submits new anime/episodes/subtitles
4. Admin approves/rejects submission

### Admin Flow
1. Review uploader requests
2. Approve/reject uploads
3. Monitor platform stats

## 8. User Stories

| Role            | Action                                 | Benefit                                   |
|-----------------|----------------------------------------|-------------------------------------------|
| Guest           | Browse and search animes               | Discover content easily                   |
| User            | Add to favorites/watch later/history   | Track and organize anime watching         |
| User            | Watch episodes, toggle subbed/dubbed   | View content in preferred format          |
| User            | Download episodes                      | Watch offline                             |
| User            | Request uploader role                  | Contribute content to the platform        |
| Uploader        | Upload animes/episodes/subtitles       | Share anime with the community            |
| Admin           | Approve uploaders and content          | Ensure quality and moderation             |
| Admin           | View stats                             | Track engagement and platform activity    |

## 9. API Overview

| Method | Endpoint                     | Description                           |
|--------|------------------------------|---------------------------------------|
| GET    | /api/animes                  | List all animes                      |
| GET    | /api/animes/{id}             | Get anime details                    |
| POST   | /api/animes                  | Create anime (Uploader/Admin)        |
| PUT    | /api/animes/{id}             | Update anime (Uploader/Admin)        |
| DELETE | /api/animes/{id}             | Delete anime (Admin)                 |
| POST   | /api/episodes                | Upload episode (Uploader/Admin)      |
| GET    | /api/episodes/{id}           | Get episode details                  |
| POST   | /api/subtitles               | Upload subtitle file                 |
| POST   | /api/user/favorites          | Add anime to favorites               |
| POST   | /api/user/watch-later        | Add anime to watch later             |
| POST   | /api/uploader/request        | Request uploader role                |
| GET    | /api/admin/dashboard         | Admin stats and reports              |
| POST   | /api/notifications/send      | Send notification (Admin)            |

## 10. Database Structure

### Users
- id
- name
- email
- password
- role (user, uploader, admin)

### Categories
- id
- name

### Animes
- id
- title
- description
- category_id
- status (airing, finished, upcoming)
- type (OVA, movie, series, special)

### Episodes
- id
- anime_id
- title
- description
- video_url
- season
- episode_number

### Subtitles
- id
- episode_id
- language
- file_url

### User Activities
- id
- user_id
- anime_id
- action_type (watch_history, favorites, watch_later, continue_watching)

### Anime Uploaders
- id
- user_id
- status (pending, approved, rejected)
- approved_at

### Ratings
- id
- user_id
- anime_id
- rating

### Notifications
- id
- user_id
- message
- read_status
- type

### Watchlist
- id
- user_id
- anime_id

## 11. Real-Time Events (WebSockets)

| Channel             | Event                    | Description                          |
|---------------------|--------------------------|--------------------------------------|
| notifications.{id}  | NewEpisodeNotification   | Notify user of new episodes          |
| admin.dashboard     | UploadRequestNotification| Notify admin of new uploader request |
| uploader.status     | UploadApprovalStatus     | Notify uploader of content approval  |

