import DOMPurify from 'dompurify';
import classes from './Post.module.css';
import 'react-quill/dist/quill.snow.css';
import { deletePost } from '../util/deletePost';
import { getAuth } from 'firebase/auth';
import { database } from '../firebase';
import { ref, remove } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

export default function Post(props: {
  postId: string;
  author: string;
  addedXAgo: string;
  title: string;
  img: string;
  text: string;
}) {
  const auth = getAuth();
  const navigate = useNavigate();
  const email = useSelector((state: RootState) => state.profile.email);
  const [showModal, setShowModal] = useState(false);

  const deletePostHandler = async () => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const postRef = ref(database, `posts/${userId}/${props.postId}`);
      await remove(postRef);
    } else {
      console.log('Something went wrong.');
    }
    navigate('/');
  };

  const deleteBtn = (
    <span
      className="p-2 sm:py-2 sm:px-4 self-start text-sm xs:text-base bg-[#ff2b2b] rounded-b-md cursor-pointer hover:bg-red-900 smooth-transition-effect"
      onClick={() => setShowModal(true)}
    >
      X
    </span>
  );

  return (
    <>
      {showModal && (
        <ConfirmationModal
          onCloseModal={() => setShowModal(false)}
          onConfirmDelete={deletePostHandler}
        />
      )}
      <div className="flex flex-col w-[98%] max-w-4xl bg-[#04031c6e] rounded-2xl shadow-lg overflow-hidden">
        <div className="flex justify-between">
          <span className="p-2 self-start text-sm xs:text-base bg-[#5c37b0] rounded-b-md">
            Author: {props.author}
          </span>
          {email === 'kuba.jur03@gmail.com' && deleteBtn}
          <span className="p-2 self-start text-sm  xs:text-base bg-[#5c37b0] rounded-b-md">
            Added: {props.addedXAgo}
          </span>
        </div>
        <h1 className="text-2xl text-center smPlus:text-3xl self-center my-4 mx-3">
          {props.title}
        </h1>
        <img src={props.img} />
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.text) }}
          className={`text-lg mx-3 break-words ${classes['post-content']}`}
        />
      </div>
    </>
  );
}
