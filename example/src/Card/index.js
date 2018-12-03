import React from 'react';

import './index.css';

const renderItem = item => (
  <div className="card" key={`${item.email}-${item.name.last}`}>
    <h1>
      {item.name.first} {item.name.last}
    </h1>
    <p className="title">{item.phone}</p>
    <button>Contact</button>
  </div>
);

const Card = ({ data }) => {
  const { results } = data;
  return results.map(item => renderItem(item));
};

export default Card;
