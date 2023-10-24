
import React, { useState, useEffect } from 'react';
import './Home.css';
import { SearchOutlined } from '@ant-design/icons';
function Home() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (query.trim() !== '') {
      try {
        const response = await fetch(`http://hn.algolia.com/api/v1/search?query=${query}`);
        const data = await response.json();
        setSearchResults(data.hits);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      // Fetch the latest news when the search field is empty
      try {
        const response = await fetch('http://hn.algolia.com/api/v1/search?tags=front_page');
        const data = await response.json();
        setSearchResults(data.hits);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  useEffect(() => {
    // Fetch the latest news when the component mounts (initial load)
    handleSearch();
  }, []);

  return (
    <div>
    <header className='nav-bar'>
      <h1>Hacker News </h1>
      
     
     <div className='search'>
     <input
        type="text"
        placeholder="Search Hacker News"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        
      />
      <button className="search-btn" onClick={handleSearch} type='submit'><SearchOutlined  /></button>
      
     </div>
      
</header>
      <ul>
        {searchResults.map((result) => (
      
          <div className="news" key={result.objectID}>
  <div>
  <h3><a href={`/post/${result.objectID}`}>{result.title}</a></h3>
    <p>

    {result.points} points by {result.author} | {result.num_comments} comments | {result.created_at}
    </p>
  </div>
 
</div>
        ))}
      </ul>


    </div>
  );}

export default Home;
