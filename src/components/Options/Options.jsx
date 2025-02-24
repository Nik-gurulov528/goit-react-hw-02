import css from './Options.module.css';

export default function Options({ handleFeedback, handleReset, total }) {
  return (
    <div className={css.collectionOfButtons}>
      <button onClick={() => handleFeedback('good')}>Good</button>
      <button onClick={() => handleFeedback('neutral')}>Neutral</button>
      <button onClick={() => handleFeedback('bad')}>Bad</button>
      {total !== 0 && <button onClick={handleReset}>Reset</button>}
    </div>
  );
}
