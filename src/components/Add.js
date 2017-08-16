import React from 'react'
import styled from 'styled-components'

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

const AddForm = styled.div`
  margin: 80px auto 0;
  max-width: 75%;
  form {
    .formgroup {
      position: relative;
      display: block;
      margin: 10px auto 0;
      label {
        font-size: 14px;
      }
      input[type='text'],
      textarea {
        border-radius: 5px;
        border: 1px solid #eee;
        padding: 5px 0;
        width: 100%;
      }
      .input-success {
        font-size: 24px;
        color: green;
        position: absolute;
        top: 17px;
        right: -2px;
      }
      .input-fail {
        color: red;
        font-size: 13px;
      }
    }
    .selection {
      margin: 20px auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 90%;
      p,
      label {
        font-size: 13px;
        margin: 0 3px;
      }
    }
  }
`

export default Add
