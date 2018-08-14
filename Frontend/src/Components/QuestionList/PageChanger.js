import React from 'react';

const PageChanger = ({onclick, pageNumber}) => {
return(
<p style={{width:"100%", textAllign:"center"}}>
                <a onClick={ () => onclick(pageNumber-1)}> back </a>
              {pageNumber}
                <a onClick={() => onclick(pageNumber+1)}> forward </a></p>
                );

}

export default PageChanger;