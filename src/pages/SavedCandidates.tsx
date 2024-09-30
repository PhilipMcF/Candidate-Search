import { useState } from 'react';

const SavedCandidates = () => {
  const storedCandidates = localStorage.getItem('savedCandidates');
  const candidateList = JSON.parse(storedCandidates || '[]');

  const [candidates, setCandidates] = useState(candidateList); 

  
  const handleReject = (login: string) => {
    const updatedCandidates = candidates.filter(
      (candidate: { login: string }) => candidate.login !== login
    );
    
    setCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));

    console.log(`Candidate with login: ${login} has been rejected`);
  };

  return (
    <>
      <h1>Potential Candidates</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name/User</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {candidateList.map(
          (candidate: { avatar_url: any; name: any; login: any; location: any; email: any; company: any; bio: any; }) => (
            <tr key={candidate.login}>
              <td className="tableImage"><img src={candidate.avatar_url} alt="Avatar" className="tableAvatar" /></td>
              <td>{candidate.name ? `${candidate.name} (${candidate.login})` : candidate.login || "Unknown"}</td>
              <td>{candidate.location || "Unknown"}</td>
              <td>{candidate.email || "N/A"}</td>
              <td>{candidate.company || "N/A"}</td>
              <td>{candidate.bio || "N/A"}</td>
              <td className="tableRejectButton"><button className="rejectButton" onClick={() => handleReject(candidate.login)}>X</button></td>
            </tr>
          )
        )}
        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;
