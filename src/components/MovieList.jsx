
export default function MovieList() {
  // Placeholder movie lists
  const movieLists = [
    { id: 1, name: "My Favorite Movies", movies: ["Movie 1", "Movie 2"] },
    { id: 2, name: "Watch Later", movies: ["Movie 3", "Movie 4"] }
  ];

  return (
    <div>
      <h2 className="text-2xl mb-4">Your Movie Lists</h2>
      {movieLists.map(list => (
        <div key={list.id} className="max-w-sm rounded overflow-hidden shadow-lg my-4">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{list.name}</div>
            <p className="text-gray-700 text-base">{list.movies.join(", ")}</p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">View List</button>
          </div>
        </div>
      ))}
    </div>
  );
}
