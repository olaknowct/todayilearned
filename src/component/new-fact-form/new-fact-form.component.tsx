import React, { useState, ChangeEvent, FormEvent } from 'react';
import { isValidHttpUrl } from '../../helper/helper';
import { CATEGORIES } from '../../data/categories';
import { useDispatch, useSelector } from 'react-redux';
import { setShowForm, createFactStart } from '../../store/facts/facts.reducer';
import { selectFactsisUploading } from '../../store/facts/facts.selector';

const defaultFormFields = {
  fact: '',
  source: '',
  category: '',
};

const NewFactForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [error, setError] = useState('');
  const { fact, source, category } = formFields;
  const factLength = fact.length;

  const isUploading = useSelector(selectFactsisUploading);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!(fact && isValidHttpUrl(source) && category)) {
      return setError('Invalid data. please try again');
    }

    dispatch(createFactStart(formFields));

    resetFormFields();
    // close the form
    dispatch(setShowForm(false));
  };

  return (
    <form className='fact-form' onSubmit={handleSubmit}>
      <div>
        <input
          type='text'
          placeholder='Share a fact with the world...'
          value={fact}
          onChange={handleChange}
          disabled={isUploading}
          name='fact'
        />
        <span>{error}</span>
      </div>
      <span>{200 - factLength}</span>
      <input
        type='text'
        placeholder='Trustworthy source...'
        value={source}
        name='source'
        onChange={handleChange}
      />
      <select value={category} name='category' onChange={handleChange}>
        <option value=''>Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className='btn btn-large' disabled={isUploading}>
        Post
      </button>
    </form>
  );
};

export default NewFactForm;
