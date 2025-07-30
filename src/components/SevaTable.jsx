import React, { useEffect, useState } from 'react';
import '../styles/Sevas.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SplineLayer from './SplineLayer';


const SevaTable = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('high-to-low'); // default sorting
  const [sevaList, setSevaList] = useState([
    { id: 1, name: 'Archana', amount: 50, rank: 0 },
    { id: 2, name: 'Abhishekam', amount: 100, rank: 0 },
    { id: 3, name: 'Deepa Alankara Seva', amount: 150, rank: 0 },
    { id: 4, name: 'Tulasi Archana', amount: 60, rank: 0 },
    { id: 5, name: 'Kumkuma Archana', amount: 70, rank: 0 },
    { id: 6, name: 'Panchamrita Abhishekam', amount: 200, rank: 0 },
    { id: 7, name: 'Sahasranama Archana', amount: 120, rank: 0 },
    { id: 8, name: 'Nitya Pooja Seva', amount: 300, rank: 0 },
    { id: 9, name: 'Udayasthamana Seva', amount: 1000, rank: 0 },
    { id: 10, name: 'Kalyanotsava', amount: 1500, rank: 0 },
    { id: 11, name: 'Vahana Seva', amount: 800, rank: 0 },
    { id: 12, name: 'Rathotsava', amount: 2000, rank: 0 },
    { id: 13, name: 'Annadana Seva', amount: 500, rank: 0 },
    { id: 14, name: 'Pushpalankara Seva', amount: 250, rank: 0 },
    { id: 15, name: 'Navagraha Shanti', amount: 750, rank: 0 },
    { id: 16, name: 'Homa / Havan Seva', amount: 900, rank: 0 },
    { id: 17, name: 'Chandana Alankara', amount: 350, rank: 0 },
    { id: 18, name: 'Ekadasa Rudrabhisheka', amount: 1100, rank: 0 },
    { id: 19, name: 'Laksha Deepotsava', amount: 5000, rank: 0 },
    { id: 20, name: 'Special Darshan Seva', amount: 100, rank: 0 },
    { id: 21, name: 'Vaikunta Ekadasi Seva', amount: 400, rank: 0 },
    { id: 22, name: 'Swarna Tulasi Archana', amount: 600, rank: 0 },
    { id: 23, name: 'Sahasra Deepa Alankara', amount: 700, rank: 0 },
    { id: 24, name: 'Vastra Seva', amount: 450, rank: 0 },
    { id: 25, name: 'Go Seva', amount: 300, rank: 0 }
  ]);

  useEffect(() => {
    axios.get('https://mahalasa-temple-backend.onrender.com/get-ranks')
      .then((response) => {
        const resultArray = response.data;

        const updatedList = sevaList.map(seva => {
          const match = resultArray.find(item => item.name === seva.name);
          return match ? { ...seva, rank: match.bookings } : seva;
        });

        setSevaList(updatedList);
      })
      .catch((err) => {
        console.error('Error fetching ranks:', err.message);
      });
  }, []);

  const handleBook = (seva) => {
    localStorage.setItem('seva_name', seva.name);
    localStorage.setItem('seva_amount', seva.amount);
    navigate('/sevas/checkout');
  };

  const getSortedSevas = () => {
    let filteredSevas = sevaList.filter(seva =>
      seva.name.toLowerCase().includes(search.toLowerCase())
    );

    switch (sortOption) {
      case 'low-to-high':
        return filteredSevas.sort((a, b) => a.amount - b.amount);
      case 'high-to-low':
        return filteredSevas.sort((a, b) => b.amount - a.amount);
      case 'a-z':
        return filteredSevas.sort((a, b) => a.name.localeCompare(b.name));
      case 'z-a':
        return filteredSevas.sort((a, b) => b.name.localeCompare(a.name));
      case 'relevance':
        return filteredSevas.sort((a, b) => b.rank - a.rank);
      default:
        return filteredSevas;
    }
  };

  return (
    <>
    <div className='seva-overlay'>
      <div className='left-drawer'>
        <p>SEVAS</p>
      </div>
      <div className='right-drawer'>
        <p>SECTION</p>
      </div>
    </div>
    <div id="seva-container">
      {/* <SplineLayer/> */}

      <h2 className="text-xl font-semibold mb-4" id='seva-heading'>SEVA LIST</h2>

      <div className="search-div">
        <label>Search the seva here: </label>
        <input
          className="seva-search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <div style={{ marginTop: '10px' }} className="filter-div">
          <label>Sort by: </label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="filter-select"
          >
            <option value="high-to-low">Amount (High → Low)</option>
            <option value="low-to-high">Amount (Low → High)</option>
            <option value="a-z">Name (A - Z)</option>
            <option value="z-a">Name (Z - A)</option>
            <option value="relevance">Relevance</option>
          </select>
        </div>
      </div>

      <table className="min-w-full border border-gray-300" id="table">
        <thead className="bg-gray-100">
          <tr id="parameters">
            <th className="">Sl. No</th>
            <th className="">Seva</th>
            {sortOption == 'relevance' && <th className="">Booking<br/> Analytics</th>}
            <th className="">Amount (₹)</th>
            <th className="">Action</th>
          </tr>
        </thead>
        <tbody id="tbody">
          {getSortedSevas().map((seva, index) => (
            <tr key={seva.id} className="hover:bg-gray-50" id="each-seva">
              <td className="border px-4 py-2" >{index + 1}</td>
              <td className="border px-4 py-2" id="seva-name">{seva.name}</td>
              {sortOption == "relevance" && <td  className="border px-4 py-2">{seva.rank} bookings</td>}
             

              <td className="border px-4 py-2">₹ {seva.amount}</td>
              <td className="border px-4 py-2" id='seva-btns'>
                <button
                  className="book-btn"
                  onClick={() => handleBook(seva)}
                  id="book-btn"
                >
                  Book
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default SevaTable;
