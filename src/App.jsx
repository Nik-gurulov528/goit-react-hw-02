import './App.css';
import Description from './components/Description/Description';
import Options from './components/Options/Options';
import Feedback from './components/Feedback/Feedback';
import Notification from './components/Notification/Notification';
import { useState, useEffect } from 'react';

function App() {
  const [dataFeedback, setFeedback] = useState(() => {
    const savedData = localStorage.getItem('saved-data');

    if (savedData !== null) {
      const parsedData = JSON.parse(savedData);
      return parsedData;
    }

    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  });

  const totalFeedback =
    dataFeedback.good + dataFeedback.neutral + dataFeedback.bad;

  const percentOfPositive = Math.round(
    (dataFeedback.good / totalFeedback) * 100
  );

  const updateFeedback = feedbackType => {
    setFeedback({
      ...dataFeedback,
      [feedbackType]: dataFeedback[feedbackType] + 1,
    });
  };
  const resetFeedback = () => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  useEffect(() => {
    localStorage.setItem('saved-data', JSON.stringify(dataFeedback));
  }, [dataFeedback]);

  return (
    <>
      <Description />
      <Options
        handleFeedback={updateFeedback}
        handleReset={resetFeedback}
        total={totalFeedback}
      />
      {totalFeedback === 0 ? (
        <Notification />
      ) : (
        <Feedback
          good={dataFeedback.good}
          neutral={dataFeedback.neutral}
          bad={dataFeedback.bad}
          total={totalFeedback}
          positive={percentOfPositive}
        />
      )}
    </>
  );
}

export default App;
