// import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { searchGithubUser } from '../api/API';

async function main(){
  const candidates = await searchGithub();

  let potentialCandidates = [];
  for (const candidate of candidates) {
    const login = candidate.login;
    const loginResponse = await searchGithubUser(login);

    if (loginResponse){
      potentialCandidates.push(loginResponse);
    }
    // console.log(loginResponse);
  }
  console.log(potentialCandidates);
}

main();

const CandidateSearch = () => {
  return <h1>CandidateSearch</h1>;
};

export default CandidateSearch;
