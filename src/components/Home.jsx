import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { searchMovies } from '../services/omdb';
import { updateDoc, doc, collection, addDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../services/firebase';
import Search from './Search';
import MovieList from './MovieList';
import Notification from './Notification';
import lib from '../assets/library_add.svg';
import copyImg from '../assets/copy.svg';
import './loader.css';
import CryptoJS, { enc } from 'crypto-js';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import LockButton from './LockButton';


export default function Home() {
  const { signOut, currentUser } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState(null);
  const [loader, setLoader] = useState(false);
  const [shareableLink, setShareableLink] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationKey, setNotificationKey] = useState(0);

  // configure add a movie to the favourite list
  async function addFavoriteMovie(userId, imdbId) {
    try {
      const docRef = await addDoc(collection(db, "favorites"), {
        user: userId,
        imdbID: imdbId,
      });
      setNotificationMessage('Movie added to your favourite list successfully!');
      setNotificationKey(prevKey => prevKey + 1);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // add a movie to the favourite list
  const handleAdd = () => {
    if (movies && movies.imdbID) {
      addFavoriteMovie(currentUser.uid, movies.imdbID);
    }
    else {
      alert('Invalid movie cannot be added to your favourite list');
    }
  }

  // Configure public and private list of movies
  async function manageAccess(userId, key) {
    try {
      const userAccessDocRef = doc(db, "userAccess", userId);
      await setDoc(userAccessDocRef, {
        user: userId,
        access: key,
      });
      console.log("Document written with ID: ", userId);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // Function to update access status for a user
  const updateUserAccess = async (userId, key) => {
    try {
      await updateDoc(doc(db, "userAccess", userId), {
        access: key
      });
      console.log("User access updated successfully!");
    } catch (error) {
      console.error("Error updating user access: ", error);
    }
  };

  // make the list of movies public and private
  const handleShare = async () => {
    if (currentUser) {
      const userAccessDoc = await getDoc(doc(db, "userAccess", currentUser.uid));
      if (userAccessDoc.exists()) {
        const currentAccess = userAccessDoc.data().access;
        updateUserAccess(currentUser.uid, !currentAccess);
        if (currentAccess) {
          setNotificationMessage('Your favourite list is now private!');
          setNotificationKey(prevKey => prevKey + 1);
        }
        else {
          setNotificationMessage('Your favourite list is now public!');
          setNotificationKey(prevKey => prevKey + 1);
        }
      }
      else {
        manageAccess(currentUser.uid, true);
        setNotificationMessage('Your favourite list is now public!');
        setNotificationKey(prevKey => prevKey + 1);
        console.log("manage access created successfully!")
      }
    }
  };


  useEffect(() => {
    const encryptUid = () => {
      if (currentUser) {
        const encrypted = CryptoJS.AES.encrypt(currentUser.uid, 'fa&%3!%a@3y4').toString();
        // Generate shareable link
        const shareableLink = `${window.location.origin}/share/?uid=${encodeURIComponent(encrypted)}`;
        setShareableLink(shareableLink);
      } else {
        console.log('No user is currently authenticated');
      }
    };
    encryptUid();
  }, [currentUser]);

  // logout the user
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch {
      console.error("Failed to sign out");
    }
  };

  // search movies
  const handleSearch = () => {
    setLoader(true);
    setMovies(null);
    if (searchTerm) {
      searchMovies(searchTerm).then(response => {
        setMovies(response.data);
      })
        .catch(error => {
          console.error("Error fetching movies:", error);
        });
    }
  };

  useEffect(() => {
    console.log(movies);
    if (movies !== null) {
      setLoader(false);
    }
  }, [movies]);

  return (
    <>
      <div>
        <nav className="bg-gray-800 p-4 border-b-2 border-gray-700">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-white text-3xl font-bold">Movie Library</h1>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
          </div>
        </nav>

        <div className="container mx-auto mt-4">
          <div className="flex mb-4 justify-center">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700"
            />
            <button onClick={handleSearch} className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded ml-2">Search</button>
            <div><Notification message={notificationMessage} key={notificationKey} /></div>
          </div>
        </div>

        <div className='md:flex grid gap-5 justify-center p-2'>
          <div className='md:w-1/3 w-full border border-gray-600 h-[640px] overflow-scroll scroll-container order-2'>
            <div className='flex justify-between bg-slate-700 px-5'>
              <h1 className="title flex justify-center">Favourite Movies</h1>
              <div className='flex px-2'>
                <button className='ml-1' onClick={handleShare}><LockButton /></button>
                <CopyToClipboard text={shareableLink}>
                  <button className='ml-10 text-sm' onClick={() => {
                    setNotificationMessage('Coppid to clipboard successfully!');
                    setNotificationKey(prevKey => prevKey + 1);
                  }}><img src={copyImg} alt="logo" style={{ minWidth:'22px', maxWidth:'22px' }} /></button>
                </CopyToClipboard>
              </div>
            </div>
            <MovieList />
          </div>
          <div className='md:w-2/3 w-full order-1 border border-gray-600 h-[640px] overflow-scroll scroll-container'>
            <div className='flex bg-slate-700 justify-between px-5 gap-5'>
              <h1>{!loader ? <span className='title'>Details of your search movies</span> : <div className="loader p-3"></div>}</h1>
              <button onClick={handleAdd}><img src={lib} alt="logo" /></button>
            </div>

            {!loader && <Search movies={movies} />}
          </div>
        </div>
      </div>
    </>
  );
}