import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { authSuccess } from '../store/authSlice';
import { updateName, updateEmail } from '../store/profileSlice';
import { Dispatch } from 'react';

export const handleAuthStateChange = (dispatch: Dispatch<any>) => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      const name = docSnap.data()?.name;
      dispatch(authSuccess({ name, email: user.email, uid: user.uid }));
      dispatch(updateName(name));
      dispatch(updateEmail(user.email));
    }
  });

  return () => unsubscribe();
};
