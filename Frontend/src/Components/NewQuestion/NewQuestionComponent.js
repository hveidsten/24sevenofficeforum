import React, { Fragment } from 'react';
import Button from '../CommonComponents/Button';

export const NewQuestionComponent = ({ handleSubmit, questionHeading, handleChange, questionBody, categories, categoryId, edit }) => {
  return (
    <Fragment>
      <h2>{edit ? "Edit question" : "New question"}</h2>
      <form onSubmit={handleSubmit} >

        <label >Heading: </label>
        <input size="50" type="text" name="questionHeading" value={questionHeading} onChange={handleChange} style={{ marginBottom: "2em" }} />
        <br />

        <label>Question: </label>
        <textarea rows="20" cols="75" name="questionBody" value={questionBody} onChange={handleChange} style={{ marginBottom: "2em", verticalAlign: "top" }} />
        <br />
        <label>Category: </label>
        <select size="1" name="categoryId" onChange={handleChange} value={categoryId}>
          <option value="none">Select category</option>
          {categories.map((c, key) => { return <option key={key} value={c.id}>{c.categoryName}</option> })}
        </select>

        <Button color="#49bd39" text={edit ? "Lagre" : "Post"} onclick={handleSubmit}/>
      </form>
    </Fragment>
  );
}