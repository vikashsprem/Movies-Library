// import { useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// // import { useHistory } from 'react-router-dom';
// import Search from './Search';
// import MovieList from './MovieList';

// export default function Home() {
//   const { currentUser, signOut } = useAuth();
//   // const history = useHistory();
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleLogout = async () => {
//     try {
//       await signOut();
//       // history.push('/auth');
//     } catch {
//       console.error("Failed to sign out");
//     }
//   };

//   return (
//     <>
//       <nav className="bg-gray-800 p-4">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-white text-3xl font-bold">Movie Library</h1>
//           <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
//         </div>
//       </nav>
//       <div className="container mx-auto mt-4">
//         <h2 className="text-2xl mb-4">Welcome, {currentUser.email}</h2>
//         <div className="flex mb-4">
//           <input
//             type="text"
//             placeholder="Search movies..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//           <button onClick={() => {}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">Search</button>
//         </div>
//         <Search searchTerm={searchTerm} />
//         <MovieList />
//       </div>
//     </>
//   );
// }

export default function Home(){ return <div>Home</div>;}