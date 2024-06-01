import { onSnapshot, query, collection, where } from "firebase/firestore";
import { db } from '../services/firebase';
import { useEffect, useState } from "react";
import { getMovieDetails } from "../services/omdb";
import CryptoJS from 'crypto-js';
import { useSearchParams } from 'react-router-dom';

export default function ShareList() {
    // get this from the URL
    const [searchParams] = useSearchParams();
    const uid = searchParams.get('uid');

    // Placeholder movie lists
    const [users, setUsers] = useState([]);
    const [moviesList, setMoviesList] = useState(null);

    const decryptUid = (uid) => {
        const secretKey = 'fa&%3!%a@3y4';
        const bytes = CryptoJS.AES.decrypt(uid, secretKey);
        const originalUid = bytes.toString(CryptoJS.enc.Utf8);
        return originalUid;
    };

    useEffect(() => {
        const myUserId = decryptUid(uid);
        const unsubscribe = onSnapshot(
            query(collection(db, "favorites"), where("user", "==", myUserId)),
            (snapshot) => {
                const usersList = [];
                snapshot.forEach((doc) => {
                    usersList.push({ id: doc.id, ...doc.data() });
                });
                setUsers(usersList);
            },
            (error) => {
                console.error("Error fetching users: ", error);
            }
        );

        return () => {
            unsubscribe();
        };
    }, []);


    useEffect(() => {
        const fetchAllMovieDetails = async () => {
            try {
                const movieDetailsPromises = users.map(user => getMovieDetails(user.imdbID));
                const movieDetails = await Promise.all(movieDetailsPromises);
                setMoviesList(movieDetails);
            } catch (error) {
                console.error("Error fetching all movie details: ", error);
            }
        };

        fetchAllMovieDetails();
    }, [users]);

    if (!moviesList) {
        return null;
    }

    return (
        <div className="px-3">
            {moviesList.map((list, index) => (
                <div key={index} className="ml-5 w-2/3 rounded overflow-hidden shadow-lg my-4 bg-slate-500">
                    <div className="flex px-4 py-3 gap-5">
                        <img src={list.data.Poster} alt="logo" style={{ maxWidth: '80px' }} />
                        <div>
                            <div className="font-bold text-xl mb-2">{list.data.Title}</div>
                            <p className="text-gray-700 font-semibold text-base">Released: {list.data.Released}</p>
                            <p className="text-gray-700 font-semibold text-base">IMDB: {list.data.imdbRating}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
