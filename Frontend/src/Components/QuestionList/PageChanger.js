import React from 'react';

const PageChanger = ({ onclick, pageNumber, maxPageNumber }) => {
  return (
    <p style={{ width: "100%", textAllign: "center" }}>
      <a onClick={() => onclick(pageNumber - 1)}> back </a>
      page <span style={{fontWeight:"bold"}}> { pageNumber } </span> out of   {maxPageNumber}
    
      <a onClick={() => onclick(pageNumber + 1)}> forward </a></p>
  );
}

export default PageChanger;