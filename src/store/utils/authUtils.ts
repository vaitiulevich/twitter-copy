import { User } from '@store/types';
import { generateSlug } from '@utils/generateSlug';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

import { db } from '../../firebase';

interface UserDataProps extends User {
  userId: string;
  userSlug: string;
  followers: string[];
  following: string[];
  posts: string[];
}
export async function checkDocUserExists(
  email?: string,
  phone?: string
): Promise<boolean | null> {
  const usersRef = collection(db, 'users');
  const emailQuery = email
    ? query(usersRef, where('email', '==', email))
    : null;
  const phoneQuery = phone
    ? query(usersRef, where('phone', '==', phone))
    : null;

  const emailExists = emailQuery ? await getDocs(emailQuery) : null;
  const phoneExists = phoneQuery ? await getDocs(phoneQuery) : null;

  return (
    !!(emailExists && !emailExists.empty) ||
    !!(phoneExists && !phoneExists.empty)
  );
}

export function* addUserToDatabase(
  uid: string,
  userData: UserDataProps
): Generator {
  const userRef = doc(db, 'users', uid);
  yield setDoc(userRef, userData);
}

export function createUserData(
  uid: string,
  payload: User & { password?: string }
) {
  const userSlug = generateSlug(payload.name, uid);
  const userData = {
    userId: uid,
    userSlug,
    ...payload,
    avatar: null,
    profileImg: null,
    followers: [],
    following: [],
    posts: [],
  };
  return userData;
}
