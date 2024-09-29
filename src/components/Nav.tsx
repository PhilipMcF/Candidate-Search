import { Link } from 'react-router-dom';

const Nav = () => {
  // navigation bar and link between the pages
  return (
    // <div>Nav</div>
    <nav className='nav'>
      <ul>
        <Link to="/" className='nav-item'>
          Home
        </Link>
        <Link to="/SavedCandidates" className='nav-item'>
          Potential Candidates
        </Link>
      </ul>
    </nav>
  )
};

export default Nav;
