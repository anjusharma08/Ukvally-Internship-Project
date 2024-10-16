// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import NewsCard from './components/NewsCard';
import IndividualNews from './components/IndividualNews';
import AddNewsModal from './components/AddNewsModal';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './App.css';

import ai from './img/Ai.png';
import modi from './img/modi.png';

function App() {
  const [newsList, setNewsList] = useState([
    { id: '1', title: 'Nasscom Chief: India Excels In Global AI Talent and Skills!', 
      description: 'India leads on world AI stage in talent and domain skills, placing it on a strong footing in transformative era of Artificial Intelligence, Nasscom’s new chairperson Sindhu Gangadharan has said, asserting this is “the best time to be in India” particularly for those in the technology sector..', 
      extraDescription: 'India leads on world AI stage in talent and domain skills, placing it on a strong footing in transformative era of Artificial Intelligence, Nasscom’s new chairperson Sindhu Gangadharan has said, asserting this is “the best time to be in India” particularly for those in the technology sector..', date: '10/10/2024', image: ai },
    
    
      { id: '2', title: 'Government New Affordable Housing Scheme', description: 'The Indian government has announced a new affordable housing scheme aimed at providing affordable homes to low-income families.', extraDescription: 'The Indian government has announced a new affordable housing scheme aimed at providing affordable homes to low-income families. The scheme offers subsidies, interest rate reductions, and other incentives to make homeownership more accessible. The government hopes that this initiative will help address the housing shortage in the country.', date: '11/10/2024', image: modi },
  ]);

  const [showModal, setShowModal] = useState(false); // State to handle modal visibility

  const addNewsHandler = (newNews) => {
    setNewsList([...newsList, newNews]); // Function to add new news
    setShowModal(false); // Close the modal after adding news
  };

  const editNewsHandler = (id, updatedData) => {
    const updatedNewsList = newsList.map((news) =>
      news.id === id ? { ...news, ...updatedData } : news
    );
    setNewsList(updatedNewsList); // Update the state with the new news list
  };

  const deleteNewsHandler = (id) => {
    const updatedNewsList = newsList.filter((news) => news.id !== id);
    setNewsList(updatedNewsList); // Update the state with the filtered news list
  };

  return (
    <Router>
      <div className="App">
        {/* Navbar with Add Icon */}
        <nav className="navbar">
          <h1>NewsWave</h1>
          <Link to="#" className="add-icon" onClick={() => setShowModal(true)}>
            <i className="fas fa-plus"></i>
          </Link>
        </nav>

        {showModal && <AddNewsModal addNews={addNewsHandler} closeModal={() => setShowModal(false)} />}
        
        <Routes>
          <Route path="/" element={
            <div className="news-list">
              {newsList.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          } />
          <Route path="/news/:id" element={<IndividualNews newsList={newsList} editNews={editNewsHandler} deleteNews={deleteNewsHandler} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
