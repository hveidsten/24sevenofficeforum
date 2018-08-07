import React from 'react';

export const NewQuestionComponent = ({handleSubmit, questionHeading, handleChange, questionBody,categories,categoryId,endre}) => {
return(
  <div> 
        <h2>{endre? "Endre spørsmål":"Nytt spørsmål"}</h2>
           <form onSubmit={handleSubmit} >

             <label >Overskrift: </label>
            <input size="50" type="text" name="questionHeading" value={questionHeading} onChange={handleChange} style={{marginBottom:"2em"}} />
            <br/>

             <label>Spørsmål: </label>
             <textarea rows="20" cols="75" name="questionBody" value={questionBody} onChange={handleChange} style={{marginBottom:"2em", verticalAlign: "top"}} />
             <br/>
             <label>Kategori: </label>
              <select size="1" name="categoryId" onChange={handleChange} value={categoryId}>
                <option value="nei">Velg kategori</option>
              {categories.map((c, key) => { return <option key= {key} value={c.id}>{c.categoryName}</option>})}
            </select>

             <input type="submit" value="Post" />
      </form>
      </div>
    );
}