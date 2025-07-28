## Overview

Cross-platform gamified learning app inspired by Duolingo. Core modules include:
* User authentication and profiles with progress tracking.
* Admin dashboard to upload learning materials that trigger Vertex AI to create lessons and quizzes.
* Gamified course map, quizzes, streaks and XP with leaderboard.
* Progressive Web App support and Firebase integration.

### Firestore Data Schema

*   **users (collection)**:
    *   `userId` (document ID: Auth UID)
    *   `email` (string)
    *   `displayName` (string)
    *   `createdAt` (timestamp)
    *   `lastLogin` (timestamp)
    *   `xp` (number, default: 0)
    *   `streak` (number, default: 0)
    *   `completedLessons` (map: { courseId: { lessonId: true, ... }, ...})
    *   `badges` (array of strings)
    *   `level` (string, determined by placement test)

*   **courses (collection)**:
    *   `courseId` (document ID)
    *   `title` (string)
    *   `description` (string)
    *   `language` (string)
    *   `createdAt` (timestamp)
    *   `updatedAt` (timestamp)
    *   **modules (subcollection)**:
        *   `moduleId` (document ID)
        *   `title` (string)
        *   `order` (number)
        *   **lessons (subcollection)**:
            *   `lessonId` (document ID)
            *   `title` (string)
            *   `content` (string: lesson text/markdown)
            *   `estimatedTime` (number: in minutes)
            *   `prerequisites` (array of strings: lessonIds)
            *   `order` (number)
            *   **questions (subcollection)**:
                *   `questionId` (document ID)
                *   `type` (string: 'multiple-choice', 'fill-in-the-blank', 'matching', 'translation')
                *   `questionText` (string)
                *   `options` (array of strings: for multiple-choice)
                *   `correctAnswer` (string or array: depending on question type)
                *   `matchingPairs` (array of objects: { term: string, definition: string } for matching)
                *   `sourceLanguage` (string: for translation)
                *   `targetLanguage` (string: for translation)

*   **leaderboard (collection)**:
    *   `leaderboardId` (document ID: e.g., 'global', 'weekly')
    *   `entries` (array of objects: { userId: string, displayName: string, xp: number, updatedAt: timestamp })

### Firestore Security Rules

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read any document, but restrict write access
    match /{document=**} {
      allow read: if
          request.auth != null;
    }

    // Specific rules for the 'users' collection
    match /users/{userId} {
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && request.auth.uid == userId;
      // Prevent users from deleting their own profiles
      allow delete: if false;
    }

    // Courses, modules, and lessons can only be created/updated/deleted by admins (handled by Cloud Functions)
    match /courses/{courseId} {
      allow create, update, delete: if false;

      match /modules/{moduleId} {
        allow create, update, delete: if false;

        match /lessons/{lessonId} {
          allow create, update, delete: if false;

          match /questions/{questionId} {
            allow create, update, delete: if false;
          }
        }
      }
    }

    // Leaderboard can only be written by Cloud Functions
    match /leaderboard/{document=**} {
      allow write: if false;
    }
  }
}
```

### Example Cloud Function (Placeholder)

```typescript
// This is a placeholder file for Firebase Cloud Functions.
// You will need to set up the Firebase CLI and initialize functions separately.
// For now, this file demonstrates the basic structure for a function
// that could interact with Vertex AI.

import * as functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
// Import Vertex AI SDK here

initializeApp();
const db = getFirestore();

export const processUploadedContent = functions.storage.object().onFinalize(async (object) => {
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.

  // Exit if this is a deletion or a directory.
  if (!filePath || !contentType) {
    return null;
  }

  // Exit if the image is already processed.
  if (filePath.startsWith('processed/')) {
    return null;
  }

  // TODO: Download the file and extract text (for PDF/text files).
  // TODO: Call Vertex AI (Gemini) to process the text and generate lessons/questions.
  // TODO: Store the generated lessons and questions in Firestore.
  // TODO: Optionally delete the original file or move it to a processed folder.

  console.log(`Processing file: ${filePath}`);

  return null;
});

// TODO: Add other Cloud Functions for gamification, analytics, etc.
```

### Instructions for Running Locally and Deploying

#### Running Locally with Firebase Emulators

1.  **Install Firebase CLI:** If you haven't already, install the Firebase CLI: `npm install -g firebase-tools`
2.  **Login:** Log in to your Firebase account: `firebase login`
3.  **Initialize Firebase in your project:** Navigate to your project's root directory and run `firebase init`. Select the features you want to set up (Functions, Firestore, Hosting, Storage, etc.). Follow the prompts to configure your project.
4.  **Start Emulators:** Run `firebase emulators:start` to start the Firebase emulators for the services you configured.
5.  **Run Next.js dev server:** In a separate terminal, run `npm run dev`.
6.  Your Next.js application will connect to the running emulators.

#### Deploying to Firebase Hosting or Vercel

**Firebase Hosting:**

1.  **Build your Next.js application:** `npm run build`
2.  **Deploy to Firebase Hosting:** `firebase deploy --only hosting`

**Vercel:**

1.  **Install Vercel CLI:** `npm install -g vercel`
2.  **Login:** `vercel login`
3.  **Deploy:** Navigate to your project directory and run `vercel`. Follow the prompts to configure and deploy your project.

Remember to set up your Firebase environment variables (e.g., `NEXT_PUBLIC_FIREBASE_API_KEY`) in your hosting provider's settings.

### Current Plan

* Scaffold reusable React components for course map, quiz, leaderboard and profile dashboard.
* Provide example Cloud Function using Vertex AI for automatic lesson generation.
* Add Firebase security rules enforcing admin-only writes to course content.
* Stub admin upload page that uploads files to Cloud Storage which triggers the function.
* Add placeholder pages demonstrating leaderboard and lesson quizzes.