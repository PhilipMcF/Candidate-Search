// import { useState, useEffect } from 'react';
// import { searchGithub } from '../api/API';
// import { searchGithubUser } from '../api/API';
// import { Candidate } from '../interfaces/Candidate.interface';

// async function main(){
//   const candidates = await searchGithub();

//   let potentialCandidates: Candidate[] = [];
//   for (const candidate of candidates) {
//     const login = candidate.login;
//     const loginResponse = await searchGithubUser(login);

//     if (loginResponse){
//       potentialCandidates.push(loginResponse);
//     }
//     // console.log(loginResponse);
//   }
//   console.log(potentialCandidates);
//   return potentialCandidates;
// }



// const CandidateSearch = () => {
//   const [candidateList, setCandidateList] = useState<Candidate[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await main();
//       setCandidateList(result);
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       <h1>CandidateSearch</h1>
//       <div className="card">
//         <img src={""} alt="Avatar" className="avatar"/>
//         <div className="info">
//           <h2>John Doe</h2>
//           <p>Location: </p>
//           <p>Email:</p>
//           <p>Company: </p>
//           <p>Bio: </p>
//         </div>  
//       </div>
//       </>
//   )
// };

// export default CandidateSearch;

import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

async function main() {
  try {
    const candidates = await searchGithub();
    let potentialCandidates: Candidate[] = [];

    for (const candidate of candidates) {
      const login = candidate.login;
      const loginResponse = await searchGithubUser(login);

      if (loginResponse) {
        potentialCandidates.push(loginResponse);
      }
    }
    return potentialCandidates;
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return []; // Return an empty array in case of error
  }
}

const CandidateSearch = () => {
  const [candidateList, setCandidateList] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0); // State for current candidate index

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const result = await main();

      if (result.length === 0) {
        setError("No candidates found.");
      } else {
        setCandidateList(result);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleNext = () => {
    // Move to the next candidate if there are more
    if (currentIndex <= candidateList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSave = () => {
    // Save current candidate's properties to localStorage
    let localstorage = localStorage.getItem('savedCandidates');
    const candidateToSave = candidateList[currentIndex];
    if (localstorage) {
      let savedCandidates = JSON.parse(localstorage);
      savedCandidates.push(candidateToSave);
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    } else {
      localStorage.setItem('savedCandidates', JSON.stringify([candidateToSave]));
    }
    alert("Candidate saved to localStorage!"); // Optional: Provide user feedback
    if (currentIndex <= candidateList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Render loading, error, or current candidate
  return (
    <>
      <h1>Candidate Search</h1>
      {loading ? (
        <p className='loading'>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : currentIndex <= candidateList.length-1 ? (
        <div className="card">
          <img
            src={candidateList[currentIndex].avatar_url || "https://via.placeholder.com/420"}
            alt="Avatar"
            className="avatar"
          />
          <div className="info">
            <h2>{candidateList[currentIndex].login || "Unknown"}</h2>
            <p>Location: {candidateList[currentIndex].location || "Unknown"}</p>
            <p>Email: {candidateList[currentIndex].email || "N/A"}</p>
            <p>Company: {candidateList[currentIndex].company || "N/A"}</p>
            <p>Bio: {candidateList[currentIndex].bio || "N/A"}</p>
          </div>
          <div className="buttons">
            <button onClick={handleNext}>
              -
            </button>
            <button onClick={handleSave}>
              +
            </button>
          </div>
        </div>
      ) : (
        <p className='candidateEnd'>No more candidates to review. Refresh the page for a list of new candidates.</p>
      )}
    </>
  );
};

export default CandidateSearch;

