import { useState } from 'react';
import { CATEGORIES } from '../../data/categories';
import supabase from '../../supabase';

const Fact = ({ fact, setFacts }) => {
  const [isUpdatingVI, setIsUpdatingVI] = useState(false);
  const [isUpdatingMB, setIsUpdatingMB] = useState(false);
  const [isUpdatingF, setIsUpdatingF] = useState(false);
  const isDisputed = fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  const setIsUpdating = (vote, isUpdating) => {
    switch (vote) {
      case 'votesInteresting':
        setIsUpdatingVI(isUpdating);
        break;
      case 'votesMindblowing':
        setIsUpdatingMB(isUpdating);
        break;
      case 'votesFalse':
        setIsUpdatingF(isUpdating);
        break;
      default:
        console.log('Sorry, no category');
    }
  };

  const handleVote = async (columnName) => {
    setIsUpdating(columnName, true);

    const { data: updatedFact, error } = await supabase
      .from('facts')
      .update({ [columnName]: fact[columnName] + 1 })
      .eq('id', fact.id)
      .select();

    setIsUpdating(columnName, false);

    if (!error)
      setFacts((facts) => {
        return facts.map((f) => (f.id === fact.id ? updatedFact[0] : f));
      });
  };

  return (
    <li className='fact'>
      <p>
        {isDisputed ? <span className='disputed'>[⛔️ DISPUTED]</span> : null}
        {fact.text}
        <a className='source' href={fact.source} target='_blank' rel='noreferrer'>
          (Source)
        </a>
      </p>
      <span
        className='tag'
        style={{ backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category).color }}
      >
        {fact.category}
      </span>
      <div className='vote-buttons'>
        <button onClick={() => handleVote('votesInteresting')} disabled={isUpdatingVI}>
          👍 {fact.votesInteresting}
        </button>
        <button onClick={() => handleVote('votesMindblowing')} disabled={isUpdatingMB}>
          🤯 {fact.votesMindblowing}
        </button>
        <button onClick={() => handleVote('votesFalse')} disabled={isUpdatingF}>
          ⛔️ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
};

export default Fact;
