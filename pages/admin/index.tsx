"use client";
import { useState } from 'react';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { app } from '../../lib/firebase';

const storage = getStorage(app);

export default function AdminDashboard() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const fileRef = ref(storage, `uploads/${file.name}`);
    await uploadBytes(fileRef, file);
    alert('Uploaded');
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
