import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@theme/Layout';
import './TextHighlighter.css';

const TextHighlighter = () => {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const highlightText = (text) => {
    // Substrings to highlight and their corresponding colors
    const substrings = {
      'React': 'red',
      'JavaScript': 'green',
      'HTML': 'blue'
    };

    // Create a regex pattern to match any of the substrings
    const pattern = new RegExp(Object.keys(substrings).join('|'), 'gi');

    // Replace substrings within the text with colored spans
    const highlightedText = text.split(pattern).reduce((acc, part, index, arr) => {
      if (index < arr.length - 1) {
        const match = text.match(pattern)[index];
        const color = substrings[match];
        acc.push(part, <span key={index} style={{ color }}>{match}</span>);
      } else {
        acc.push(part);
      }
      return acc;
    }, []);

    return highlightedText.map((part, index) => (
      <React.Fragment key={index}>{part}</React.Fragment>
    ));
  };

  const [variable, setVariable] = useState(0);

  // Function to handle button clicks
  const handleClick = (value) => {
    setVariable(value);
  };

  return (
    <Layout title="Coloreador Sintáctico" description="Coloreador Sintáctico">
      <div id="artHighLocal">
        <article>
          <h1>Coloreador Sintáctico para Tablaturas</h1>

          <h3>Seleccione una clave: {variable}</h3>
      <div className="navbarButtons">
        {/* Render 7 buttons with different values */}
        <button onClick={() => handleClick('C')}>DO (C)</button>
        <button onClick={() => handleClick('C#')}>DO# (C#)</button>
        <button onClick={() => handleClick('D')}>RE (D)</button>
        <button onClick={() => handleClick('D#')}>RE# (D#)</button>
        <button onClick={() => handleClick('E')}>MI (E)</button>
        <button onClick={() => handleClick('F')}>FA (F)</button>
        <button onClick={() => handleClick('F#')}>FA# (F#)</button>
        <button onClick={() => handleClick('G')}>SOL (G)</button>
        <button onClick={() => handleClick('G#')}>SOL# (G#)</button>
        <button onClick={() => handleClick('A')}>LA (A)</button>
        <button onClick={() => handleClick('Bb')}>SIb (Bb)</button>
        <button onClick={() => handleClick('SI')}>SI (B)</button>
      </div>
          <textarea
            value={text}
            onChange={handleChange}
            placeholder="Pegue o escriba una tabaltura aquí"
            rows="13"
            cols="74"
          />
          <pre className="highlighted-text">
            {highlightText(text)}
          </pre>
        </article>
      </div>
    </Layout>
  );
};

export default TextHighlighter; 