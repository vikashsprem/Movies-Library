import { onSnapshot, query, collection, where } from "firebase/firestore";
import { db } from '../services/firebase';
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../services/omdb";
import remove from '../assets/remove.png';
import { deleteDoc, doc } from "firebase/firestore";

export default function MovieList() {
  // Placeholder movie lists
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [moviesList, setMoviesList] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "favorites"), where("user", "==", currentUser.uid)),
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

  // Function to delete a movie from favorites
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "favorites", id));
      alert("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };


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
        <div key={index} className="flex justify-between w-full rounded overflow-hidden shadow-lg my-4 bg-slate-500">
          <div className="flex px-4 py-3 gap-5">
            <img src={list.data.Poster} alt="logo" style={{ width: '80px' }} />
            <div>
              <div className="font-bold text-xl mb-2">{list.data.Title}</div>
              <p className="text-gray-700 font-semibold text-base">Released: {list.data.Released}</p>
              <p className="text-gray-700 font-semibold text-base">IMDB: {list.data.imdbRating}</p>
            </div>
          </div>
          <button className="bg-gray-400 hover:bg-red-800 text-white px-1  rounded" onClick={() => handleDelete(users[index].id)}><img src={remove} alt="logo" style={{ maxWidth: '50px' }} /></button>
        </div>
      ))}
    </div>
  );
}
