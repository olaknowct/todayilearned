import { CATEGORIES } from '../../data/categories';
import { useDispatch } from 'react-redux';
import { updateFactStart } from '../../store/facts/facts.reducer';

const Fact = ({ fact }) => {
  const dispatch = useDispatch();
  const isDisputed = fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  const handleVote = (factType, factId) => {
    const totalVote = fact[factType] + 1;
    dispatch(updateFactStart({ factType, factId, totalVote }));
  };

  return (
    <>
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
          <button onClick={handleVote.bind(null, 'votesInteresting', fact.id)}>
            👍 {fact.votesInteresting}
          </button>
          <button onClick={handleVote.bind(null, 'votesMindblowing', fact.id)}>
            🤯 {fact.votesMindblowing}
          </button>
          <button onClick={handleVote.bind(null, 'votesFalse', fact.id)}>
            ⛔️ {fact.votesFalse}
          </button>
        </div>
      </li>
    </>
  );
};

export default Fact;
