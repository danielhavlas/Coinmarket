import {initializeApp} from 'firebase/app'
import { getAuth,signInWithPopup,signInWithRedirect,GoogleAuthProvider, createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { getFirestore,doc,getDoc,setDoc,updateDoc } from "firebase/firestore";

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


export const updateDocument = async (user, object) => {
  const userDocRef = doc(db,'users',user.uid)
  await updateDoc(userDocRef,object)
}

export const getDocument = async (user) => {
  const userDocRef = doc(db,'users',user.uid)
  try{
    const docSnapshot = await getDoc(userDocRef)
    const data = docSnapshot.data()
    return data
  }catch(error){
    console.log(error);
  }
}


export const createUserDocumentFromAuth = async (userAuth,additionalInformation) => {
  if(!userAuth) return;
  const userDocRef = doc(db,'users',userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)


  if(!userSnapshot.exists()){
      const {displayName, email} = userAuth 
      const createdAt = new Date()

      try{
        await setDoc(userDocRef,{displayName,email,createdAt,...additionalInformation})
      }catch(error){
        console.log(error.message);
      }

  }
  return userDocRef
}

export const signInGuest = () => signInAnonymously(auth)

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth,email,password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth,email,password)
}

export const signOutUser = async() => {
  await signOut(auth)
  window.location.reload()
}

export const onAuthStateChangedListener = (callback) => {
  if(!callback) return;
  onAuthStateChanged(auth,callback)
}

