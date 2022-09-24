import {initializeApp} from 'firebase/app'
import { getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInAnonymously,
  User,
  NextOrObserver,
 } from "firebase/auth";
import { getFirestore,doc,getDoc,setDoc,updateDoc, QueryDocumentSnapshot } from "firebase/firestore";
import { IPortfolio } from '../store/portfolio/portfolio.types';

const firebaseConfig = {
    apiKey: "AIzaSyCtUiO-2Df0y_KNtDd_N_MuCafRYsef5kw",
    authDomain: "coinmarket-db.firebaseapp.com",
    projectId: "coinmarket-db",
    storageBucket: "coinmarket-db.appspot.com",
    messagingSenderId: "947163167091",
    appId: "1:947163167091:web:e9ab7e0636671d2671ad06"
  }
  
const app = initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({ 
  prompt:"select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider)

export const db = getFirestore()

export const updateDocument = async (user: User, portfolio: IPortfolio ): Promise<void> => {
  const userDocRef = doc(db,'users',user.uid)
  await updateDoc(userDocRef, {portfolio})
}

export const getDocument = async (user: User): Promise<IPortfolio | void> => {
  const userDocRef = doc(db,'users',user.uid)
  try{
    const docSnapshot = await getDoc(userDocRef)
    const data = docSnapshot.data()
    return data as IPortfolio
  }catch(error){
    console.log(error);
  }
}

type AdditionalInformation = {
  displayName?: string
}

export type UserData = {
  createdAt: Date,
  displayName: string,
  email: string,
  portfolio: IPortfolio
}


export const createUserDocumentFromAuth = async (userAuth: User,additionalInformation = {} as AdditionalInformation): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if(!userAuth) return;
  const userDocRef = doc(db,'users',userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)


  if(!userSnapshot.exists()){
      const {displayName, email} = userAuth 
      const createdAt = new Date()
      const portfolio = {} as IPortfolio
      try{
        await setDoc(userDocRef,{displayName,email,createdAt, portfolio,...additionalInformation})
      }catch(error){
        console.log(error.message);
      }

  }
  return userSnapshot as QueryDocumentSnapshot<UserData>
}

export const signInGuest = () => signInAnonymously(auth)

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth,email,password)
}

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth,email,password)
}

export const signOutUser = async() => {
  await signOut(auth)
  window.location.reload()
}

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
  if(!callback) return;
  onAuthStateChanged(auth,callback)
}

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};

