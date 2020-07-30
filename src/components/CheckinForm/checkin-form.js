import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { configureLocalStorage } from '../../lib/magic/use-local-storage';

const useLocalStorage = configureLocalStorage('checkin');
// import styles from './question-form.module.css';
const noop = () => {
  return;
};

const CheckinForm = () => {
  const [state, setState] = useState({
    checkBoxList: [],
    blockerList: [],
    checkBoxCounter: 1,
    blockerCounter: 1,
    inputValue: '',
  });

  const addInputField = (event) => {
    const inputValue = event.target.value;
    const newList = [
      ...state.checkBoxList,
      { value: inputValue, id: state.checkBoxCounter + 1 },
    ];
    setState((prevState) => {
      return {
        ...prevState,
        checkBoxList: newList,
        checkBoxCounter: prevState.checkBoxCounter + 1,
      };
    });
  };

  const addBlockerField = (event) => {
    const inputValue = event.target.value;
    const newList = [
      ...state.blockerList,
      { value: inputValue, id: state.blockerCounter + 1 },
    ];
    setState((prevState) => {
      return {
        ...prevState,
        blockerList: newList,
        blockerCounter: prevState.blockerCounter + 1,
      };
    });
  };

  const handleCheckBoxChange = (event) => {
    const { id, value } = event.target;
    setState((prevState) => {
      const newList = prevState.checkBoxList.map((element) => {
        if (id == element.id) {
          element.value = value;
        }
        return element;
      });
      return {
        ...prevState,
        checkBoxList: newList,
        checkBoxCounter: prevState.checkBoxCounter,
      };
    });
  };

  const handleBlockerChange = (event) => {
    const { id, value } = event.target;
    setState((prevState) => {
      const newList = prevState.blockerList.map((element) => {
        if (id == element.id) {
          element.value = value;
        }
        return element;
      });
      return {
        ...prevState,
        blockerList: newList,
        blockerCounter: prevState.blockerCounter,
      };
    });
  };

  const deleteCheckbox = (id) => {
    const newList = state.checkBoxList.filter((el) => el.id != id);

    setState((prevState) => ({
      ...prevState,
      checkBoxList: newList,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    //  <form onSubmit={onSubmit} className={styles.checkinForm}>
    <div className="formContainer">
      <form className="checkinForm">
        <div className="checkboxContainer">
          {state.checkBoxList.map((el) => {
            return (
              <div key={el.id}>
                <input
                  type="checkbox"
                  id={el.id}
                  value={el.value}
                  name="checkin"
                  onChange={handleCheckBoxChange}
                />
                <label>
                  <input />
                </label>
                <button onClick={() => deleteCheckbox(el.id)}>X</button>
              </div>
            );
          })}
        </div>
        <div className="submit-div">
          <button type="button" onClick={addInputField}>
            +
          </button>
          <span>Add another item</span>
        </div>
        <p>
          {' '}
          where there any blockers? if so, please list briefely below (one line
          each)
        </p>
        <div className="blockersContainer">
          {state.blockerList.map((el) => {
            return (
              <div key={el.id}>
                <input
                  type="checkbox"
                  id={el.id}
                  value={el.value}
                  name="checkin"
                  onChange={handleBlockerChange}
                />
                <label>
                  <input />
                </label>
              </div>
            );
          })}
        </div>
        <div className="submit-div">
          <button type="button" name="submit" onClick={addBlockerField}>
            +
          </button>
          <span>Add a blocker from your previous checkin</span>
        </div>
      </form>
      <style jsx>{`
        .formContainer {
          max-width: 90%;
          width: 50vw;
          height: 66vh;
          display: flex;
          flex-flow: column;
          align-items: center;
          border: 3px solid black;
          border-radius: 1em;
          overflow: auto;
        }
        .checkinForm {
          max-width: 100%;
          width: 90%;
          max-height: 50vh;
          height: 50vh;
        }
        .checkboxContainer,
        .blockersContainer {
          border: 3px solid red;
          border-radius: 1em;
          max-width: 100%;
          width: 90%;
          height: 40%;
          max-height: 40%;
          overflow: auto;
        }
        label > span {
          font-weight: 600;
        }
        input {
          padding: 0px;
          margin: 0.2em;
        }
        input[type='checkbox'] {
          max-width: 100%;
          width: 3em;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        form:first-child {
          margin-top: 0.4em;
        }
        .submit-div {
          width: 100%;
        }
        .submit-div > a {
          text-decoration: none;
        }
        .submit-div > button {
          padding: 0.1rem 1rem;
          cursor: pointer;
          background: #fff;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .submit-div > button:hover {
          border-color: #888;
        }
        .error {
          color: brown;
          margin: 1rem 0 0;
        }
        span,
        p {
          font-size: 1em;
        }
      `}</style>
    </div>
  );
};
CheckinForm.propTypes = {
  errorMessage: PropTypes.string,
  onRejectedSubmit: PropTypes.func,
  onAcceptedSubmit: PropTypes.func,
  onInputChange: PropTypes.func,
  state: PropTypes.object,
};

export default CheckinForm;
