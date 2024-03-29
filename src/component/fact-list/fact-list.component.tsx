import { useSelector } from 'react-redux';
import Fact from '../fact/fact.component';
import { selectFactsCount, selectFactList } from '../../store/facts/facts.selector';
import React from 'react';
import { FactType } from '../../store/facts/facts.reducer';

const FactList = () => {
  const facts = useSelector(selectFactList);
  const factCounts = useSelector(selectFactsCount);

  if (factCounts === 0)
    return <p className='message'>No facts for this category yet! Create the first one ✌️</p>;

  return (
    <section>
      <ul className='facts-list'>
        {facts?.map((fact: FactType) => (
          <Fact key={fact.id} fact={fact} />
        ))}
      </ul>
      <p>There are {factCounts} facts in the database. Add your own!</p>
    </section>
  );
};

export default FactList;
