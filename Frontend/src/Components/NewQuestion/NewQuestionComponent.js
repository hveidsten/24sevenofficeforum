import React from 'react';

export const NewQuestionComponent = ({handleSubmit, questionHeading, handleChange, questionBody,categories}) => {
return(
           <form onSubmit={handleSubmit}>

             <label >Overskrift: </label>
            <input type="text" name="questionHeading" value={questionHeading} onChange={handleChange} />
              <br/>

             <label>Spørsmål: </label>
             <textarea rows="10" cols="25" name="questionBody" value={questionBody} onChange={handleChange} />
             <br/>

             <label>Kategori: </label>
              <select size="10" name="categoryId" onChange={handleChange}>
              {categories.map((c,key) => { return <option key= {key} value={c.id}>{c.categoryName}</option>})}
            </select>

             <input type="submit" value="Post" />
      </form>
);
}