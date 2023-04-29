import { useDispatch } from 'react-redux';
import { CATEGORIES } from '../../data/categories';
import { setCurrentCategory } from '../../store/facts/facts.reducer';

const CategoryFilter = () => {
  const dispatch = useDispatch();

  const setCurrentCategoryHandler = (categoryName) => {
    dispatch(setCurrentCategory(categoryName));
  };

  return (
    <aside>
      <ul>
        <li className='category'>
          <button
            className='btn btn-all-categories'
            onClick={setCurrentCategoryHandler.bind(null, 'all')}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className='category'>
            <button
              className='btn btn-category'
              style={{ backgroundColor: cat.color }}
              onClick={setCurrentCategoryHandler.bind(null, cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategoryFilter;
