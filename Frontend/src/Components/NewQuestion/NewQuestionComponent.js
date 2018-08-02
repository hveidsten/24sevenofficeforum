import React from 'react';

export const NewQuestionComponent = ({handleSubmit, questionHeading, handleChange, questionBody,categories}) => {
return(
  <div> 
        <h2>Nytt spørsmål</h2>
           <form onSubmit={handleSubmit} >

             <label >Overskrift: </label>
            <input size="50" type="text" name="questionHeading" value={questionHeading} onChange={handleChange} style={{marginBottom:"2em"}} />
              <br/>

             <label for="questionBody">Spørsmål: </label>
             <textarea rows="20" cols="55" name="questionBody" value={questionBody} onChange={handleChange} style={{marginBottom:"2em"}} />
             <br/> 

             <label>Kategori: </label>
              <select size="1" name="categoryId" onClick={handleChange}>
                <option value="-2">Velg kategori</option>
              {categories.map((c, key) => { return <option key= {key} value={c.id}>{c.categoryName}</option>})}
            </select>

             <input type="submit" value="Post" />
      </form>
      </div>
    );
}