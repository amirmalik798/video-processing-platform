# Video Processing API

A RESTful video processing API built with Node.js, Express, FFmpeg, and Server-Sent Events (SSE).

The API allows clients to upload videos and perform media processing operations such as:

- Video compression
- Audio extraction
- Thumbnail generation
- Video format conversion

Real-time operation progress is streamed to clients using Server-Sent Events (SSE).

## Features

- Upload video files
- Compress videos using FFmpeg
- Extract audio as MP3
- Generate video thumbnails
- Convert video formats
- Download generated artifacts
- Real-time progress updates with SSE
- Validation middleware
- Centralized error handling
- Automatic storage initialization

## Tech Stack

### Backend

- Node.js
- Express.js

### Media Processing

- FFmpeg
- FFprobe

### File Upload Handling

- Multer

### Real-Time Progress Updates

- Server-Sent Events (SSE)

## Project Structure

```text
src/
├── app.js
├── server.js
│
├── config/
│   └── multer.config.js
│
├── controllers/
│   ├── sse.controller.js
│   └── video.controller.js
│
├── errors/
│   └── AppError.js
│
├── middleware/
│   ├── error.middleware.js
│   ├── validateClientId.middleware.js
│   ├── validateFilename.middleware.js
│   └── validateUploadedFileExists.middleware.js
│
├── routes/
│   ├── sse.routes.js
│   └── video.routes.js
│
├── services/
│   └── video.service.js
│
├── store/
│   └── sse.store.js
│
└── utils/
    ├── ffmpeg.util.js
    ├── media.util.js
    ├── sse.util.js
    └── storage.util.js
```

### Architecture Overview

- Controllers handle HTTP requests and responses.
- Services coordinate media operations and progress tracking.
- Middleware validates requests and handles errors.
- Utilities provide reusable helpers for FFmpeg execution, media metadata, storage management, and SSE events.
- SSE Store manages active client connections.
- Routes define API endpoints.

## Installation

### Clone the Repository

```bash
git clone <repository-url>
cd video-processing-api
```

### Install Dependencies

```bash
npm install
```

### Install FFmpeg

Ensure FFmpeg and FFprobe are installed and available in your system PATH.

Verify Installation:

```bash
ffmpeg -version
ffprobe -version
```

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000

STORAGE_DIR=storage
UPLOADS_DIR=storage/uploads
PROCESSED_DIR=storage/processed
THUMBNAILS_DIR=storage/thumbnails
AUDIO_DIR=storage/audio
```

## Running the Application

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

The server will start on: 

```text
http://localhost:3000
```

## API Endpoints

### Health Check

```http
GET /api/health
```

### Version

```http
GET /api/version
```

### Establish SSE Connection

```http
GET /api/sse/events
```

Returns a unique `clientId` that must be included in subsequent processing requests.

### Upload Video

```http
POST /api/video/upload
```

#### Form Data

```text
video: <video-file>
```

### Compress Video

```http
POST /api/video/compress
```

#### Request Body

```json
{
    "clientId": "your-client-id",
    "filename": "uploaded-file.mp4"
}
```

### Extract Audio

```http
POST /api/video/extract-audio
```

#### Request Body

```json
{
    "clientId": "your-client-id",
    "filename": "uploaded-file.mp4"
}
```

### Generate Thumbnail

```http
POST /api/video/thumbnail
```

#### Request Body

```json
{
    "clientId": "your-client-id",
    "filename": "uploaded-file.mp4"
}
```

### Convert Format

```http
POST /api/video/convert
```

#### Request Body

```json
{
    "clientId": "your-client-id",
    "filename": "uploaded-file.mp4",
    "format": "webm"
}
```

#### Supported Formats

- mp4
- webm
- mov
- mkv

### Download Artifact

```http
GET /api/video/download/:type/:filename
```

#### Supported artifact types:

- processed
- audio
- thumbnails

## SSE Events

### Connected

```text
event: connected
data: {"clientId":"..."}
```

### Progress

```text
event: progress
data: {"progress":45}
```

### Completed

```text
event: completed
data: {"status":"completed"}
```

## Processing Workflow

```text
1. Establish SSE connection
2. Receive clientId
3. Upload a video
4. Receive generated filename
5. Perform one or more processing operations
6. Receive progress updates through SSE
7. Download generated artifacts
```

## Future Improvements

- Video trimming
- Video merging
- Watermark support
- GIF generation
- Scheduled cleanup of old files
- Authentication and authorization

## License

MIT