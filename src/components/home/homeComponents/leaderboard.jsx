// import React, { useState, useEffect } from 'react';

// const Leaderboard = () => {
//   const [leaderboardData, setLeaderboardData] = useState([]);

//   useEffect(() => {
//     // Replace 'YOUR_API_ENDPOINT' with the actual endpoint to fetch leaderboard data
//     fetch('YOUR_API_ENDPOINT')
//       .then((response) => response.json())
//       .then((data) => setLeaderboardData(data))
//       .catch((error) => console.error('Error fetching leaderboard data:', error));
//   }, []);

//   return (
//     <div>
//       <h2>Leaderboard</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Username</th>
//             <th>Jobs Applied</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaderboardData.map((user, index) => (
//             <tr key={index}>
//               <td>{user.username}</td>
//               <td>{user.jobsApplied}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Leaderboard;
