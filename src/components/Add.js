import React from 'react'
import AddForm from './themes/Form'

const Add = () => {
  return (
    <AddForm>
      <form method="post" autoComplete="off">
        <div className="formgroup">
          <h2>Add Article</h2>
        </div>
        <div className="formgroup">
          <label htmlFor="title"> Title:
            <input type="text" data-error="true" id="title" title="title" autoFocus />
          </label>
        </div>
        <div className="formgroup">
          <label htmlFor="author"> Author:
            <input type="text" data-error="true" id="author" name="author" />
          </label>
        </div>
        <div className="formgroup">
          <label htmlFor="content"> Content:
            <textarea data-error="true" id="content" name="content" />
          </label>
        </div>
        <div className="formgroup">
          <input className="post-data button" type="submit" name="submit" value="Submit" />
        </div>
      </form>
    </AddForm>
  )
}

export default Add
