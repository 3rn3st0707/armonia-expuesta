import React, { useState, useEffect } from 'react';

const DynamicDisplay = () => {
  // Function to determine which class should be shown
  const getActiveClass = () => {
    const options = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];
    // Example: Randomly select a class (you can modify this logic)
    return options[Math.floor(Math.random() * options.length)];
  };

  const [activeClass, setActiveClass] = useState('');

  useEffect(() => {
    setActiveClass(getActiveClass());
  }, []);

  return (
    <div>
      <div className={activeClass === 'day1' ? 'visible' : 'hidden'}>
        Monday: Start the week strong!
      </div>
      <div className={activeClass === 'day2' ? 'visible' : 'hidden'}>
        Tuesday: Keep the momentum going!
      </div>
      <div className={activeClass === 'day3' ? 'visible' : 'hidden'}>
        Wednesday: Hump day hustle!
      </div>
      <div className={activeClass === 'day4' ? 'visible' : 'hidden'}>
        Thursday: Almost there!
      </div>
      <div className={activeClass === 'day5' ? 'visible' : 'hidden'}>
        Friday: Finish strong!
      </div>
      <div className={activeClass === 'day6' ? 'visible' : 'hidden'}>
        Saturday: Time to relax!
      </div>
      <div className={activeClass === 'day7' ? 'visible' : 'hidden'}>
        Sunday: Recharge for the week!
      </div>
    </div>
  );
};

// CSS for visibility control
const styles = `
  .visible {
    display: block;
  }
  .hidden {
    display: none;
  }
`;

// Add styles to document head
const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default DynamicDisplay;