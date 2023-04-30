import { useDispatch, useSelector } from 'react-redux';
import { selectShowForm } from '../../store/facts/facts.selector';
import { setShowForm } from '../../store/facts/facts.reducer';
import React from 'react';

const Header = () => {
  const dispatch = useDispatch();
  const showForm = useSelector(selectShowForm);

  const setShowFormHandler = () => {
    dispatch(setShowForm(!showForm));
  };
  const appTitle = 'Today I learned';
  return (
    <header className='header'>
      <div className='logo'>
        <img src='logo.png' height='68' width='68' alt='Today I Learned Logo' />
        <h1>{appTitle}</h1>
      </div>

      <button className='btn btn-large btn-open' onClick={setShowFormHandler}>
        {showForm ? 'Close' : 'Share a fact'}
      </button>
    </header>
  );
};

export default Header;
