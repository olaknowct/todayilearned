import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { useDispatch } from 'react-redux';
import { updateFactStart } from '../../store/facts/facts.reducer';
import { FactType } from '../../store/facts/facts.reducer';

export type handleVoteType = {
  factType: 'votesInteresting' | 'votesMindBlowing' | 'votesFalse';
  factId: number;
  totalVote: number;
};

const Fact = ({ fact }: { fact: FactType }) => {
  const dispatch = useDispatch();
  const isDisputed = fact.votesInteresting + fact.votesMindBlowing < fact.votesFalse;

  const handleVote = (factType: handleVoteType['factType'], factId: handleVoteType['factId']) => {
    const totalVote: handleVoteType['totalVote'] = fact[factType] + 1;
    const updateObject = { factType, factId, totalVote };
    dispatch(updateFactStart(updateObject));
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
          style={{ backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)?.color }}
        >
          {fact.category}
        </span>
        <div className='vote-buttons'>
          <button onClick={handleVote.bind(null, 'votesInteresting', fact.id)}>
            👍 {fact.votesInteresting}
          </button>
          <button onClick={handleVote.bind(null, 'votesMindBlowing', fact.id)}>
            🤯 {fact.votesMindBlowing}
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
