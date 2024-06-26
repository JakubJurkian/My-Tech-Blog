import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc, getDoc } from 'firebase/firestore';

import { db, storage } from '../firebase';
import { RootState } from '../store/store';
import { updateAvatar } from '../store/profileSlice';

import guestUser from '/guest-user.webp';

import classes from './MyProfile.module.css';

const MyProfilePage: React.FC = () => {
  const [transition] = useAutoAnimate();
  const [file, setFile] = useState<File | null>(null);
  const [percentage, setPercentage] = useState<number | null>(null);
  const [isFileSet, setIsFileSet] = useState<boolean | null>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const uid = useSelector((state: RootState) => state.auth.user?.uid);
  const avatarUrl = useSelector((state: RootState) => state.profile.avatarUrl);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    async function getAvatar() {
      setIsLoading(true);
      if (uid) {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const avatar = docSnap.data().avatar || guestUser;
          dispatch(updateAvatar(avatar));
          setImagePreview(avatar);
        } else {
          console.log('No such document!');
        }
        setIsLoading(false);
      }
    }
    getAvatar();
  }, [uid, dispatch]);

  const { name, email } = useSelector((state: RootState) => state.profile);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
      setIsFileSet(true);
    } else {
      toast.error('Something went wrong!', { transition: Slide });
      setIsFileSet(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const uploadFile = () => {
      if (file) {
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, name);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            setIsLoading(true);
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setPercentage(progress);
          },
          (error) => {
            setIsLoading(false);
            console.log(error);
            toast.error('Something went wrong!', { transition: Slide });
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              if (uid) {
                const ref = doc(db, 'users', uid);
                setDoc(ref, { avatar: downloadURL }, { merge: true });
                dispatch(updateAvatar(downloadURL));
                setIsLoading(false);
                toast.success('File uploaded successfully!', {
                  transition: Slide,
                });
              }
            });
          }
        );
      }
    };

    file && uploadFile();

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setFile(null);
    setIsFileSet(false);
  };

  let content;
  if (isLoading) {
    content = (
      <div role="status" className="animate-pulse w-full">
        <div className="flex items-center justify-center w-full h-56 my-2 rounded-3xl bg-gray-700">
          <svg
            className="w-12 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 640 512"
          >
            <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
          </svg>
        </div>
      </div>
    );
  } else {
    content = (
      <div className={`${classes['avatar-upload']}`}>
        <div className={`${classes['avatar-edit']}`}>
          <input
            type="file"
            id="imageUpload"
            onChange={handleFileChange}
            ref={fileInputRef}
            accept="image/*"
          />
          <label htmlFor="imageUpload"></label>
        </div>
        <div className={`${classes['avatar-preview']}`}>
          <div
            style={{
              backgroundImage: `url(${imagePreview})`,
              transition: 'background-image 0.3s ease-in-out',
            }}
            className={`${classes['image-preview']}`}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col place-items-center py-3">
      <ToastContainer theme="dark" autoClose={4000} />
      <h2 className="text-3xl self-center mb-4">My Profile</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col place-items-center"
      >
        <button
          className="bg-blue-500 hover:bg-blue-400 my-4 w-full p-1 text-lg rounded-md disabled:bg-gray-500 smooth-transition-effect"
          disabled={(percentage !== null && percentage < 100) || !isFileSet}
        >
          {avatarUrl ? 'Change image' : 'Upload Image'}
        </button>
        <div className="w-56 h-56 flex items-center" ref={transition}>
          {content}
        </div>
      </form>
      <div className="md:flex gap-8">
        <div className="mt-2 text-lg self-center">
          <p>
            Name: <span className="text-slate-300">{name}</span>
          </p>
          <p>
            Email: <span className="text-slate-300">{email}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
