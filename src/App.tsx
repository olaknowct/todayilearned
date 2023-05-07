import { useEffect } from 'react';
import './style.css';
import Loader from './component/loader/loader.component';
import Header from './component/header/header.component';
import NewFactForm from './component/new-fact-form/new-fact-form.component';
import CategoryFilter from './component/category-filter/category-filter.component';
import FactList from './component/fact-list/fact-list.component';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFactsStart } from './store/facts/facts.reducer';
import {
  selectCurrentCategory,
  selectFactsisLoading,
  selectShowForm,
} from './store/facts/facts.selector';

function App() {
  const dispatch = useDispatch();
  const currentCategory = useSelector(selectCurrentCategory);
  const isLoading = useSelector(selectFactsisLoading);
  const showForm = useSelector(selectShowForm);

  useEffect(() => {
    dispatch(fetchFactsStart());
  }, [currentCategory, dispatch]);

  return (
    <>
      <Header />

      {showForm && <NewFactForm />}

      <main className='main'>
        <CategoryFilter />
        {isLoading ? <Loader /> : <FactList />}
      </main>
    </>
  );
}

export default App;
