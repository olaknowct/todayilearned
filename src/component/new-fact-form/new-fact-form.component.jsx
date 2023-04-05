import { useState } from 'react';
import { isValidHttpUrl } from '../../helper/helper';
import supabase from '../../supabase';
import { CATEGORIES } from '../../data/categories';

const NewFactForm = ({ setFacts, setShowForm }) => {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    // Prevent browser reload
    e.preventDefault();
    console.log(text, source, category);

    // Create new fact if data is valid
    if (text && isValidHttpUrl(source) && category) console.log('there is valida data');

    setIsUploading(true);
    // Upload fact to supabase and receive the new fact object
    const { data: newFact, error } = await supabase
      .from('facts')
      .insert([{ text, source, category }])
      .select();
    setIsUploading(false);

    // add the new fact to the UI: add the fact to the state
    if (!error) setFacts((facts) => [newFact[0], ...facts]);

    // reset the input fields
    setText('');
    setSource('');
    setCategory('');

    // close the form
    setShowForm(false);
  }

  return (
    <form className='fact-form' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Share a fact with the world...'
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        type='text'
        placeholder='Trustworthy source...'
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
