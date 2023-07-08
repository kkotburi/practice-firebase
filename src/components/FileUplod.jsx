// components/FileUpload.js
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { auth, storage } from '../firebase';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
    await uploadBytes(imageRef, setSelectedFile);

    const downloadURL = await getDownloadURL(imageRef);
    console.log('downloadURL', downloadURL);
  };

  return (
    <div>
      <h2>파일 업로드 컴포넌트</h2>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
