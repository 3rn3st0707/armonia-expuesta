import React, { useState, useEffect } from 'react';
import styles from './TextHighlighter.module.css'; // CSS module for scoped styles
import Layout from '@theme/Layout'; // Docusaurus Layout component for page structure

// Chord and function data (unchanged from your script)
const substringsSets = {
    'C': { 'Bb ': 'rgba(238, 83, 142, 0.89)', 'A# ': 'rgba(238, 83, 142, 0.89)', 'G# ': 'rgba(238, 83, 142, 0.89)', 'Ab ': 'rgba(238, 83, 142, 0.89)', 'Gm ': 'rgba(238, 83, 142, 0.89)', 'Fm ': 'rgba(238, 83, 142, 0.89)', 'D# ': 'rgba(238, 83, 142, 0.89)', 'Eb ': 'rgba(238, 83, 142, 0.89)', 'C7': 'rgb(156, 103, 230)', 'A ': 'rgb(156, 103, 230)', 'A7': 'rgb(156, 103, 230)', 'D ': 'rgb(156, 103, 230)', 'D7': 'rgb(156, 103, 230)', 'E ': 'rgb(156, 103, 230)', 'E7': 'rgb(156, 103, 230)' },
    'C#': { 'A ': 'rgba(238, 83, 142, 0.89)', 'B ': 'rgba(238, 83, 142, 0.89)', 'E ': 'rgba(238, 83, 142, 0.89)', 'F#m ': 'rgba(238, 83, 142, 0.89)', 'G#m ': 'rgba(238, 83, 142, 0.89)', 'Abm ': 'rgba(238, 83, 142, 0.89)', 'Gbm ': 'rgba(238, 83, 142, 0.89)', 'C#7': 'rgb(156, 103, 230)', 'A# ': 'rgb(156, 103, 230)', 'A#7': 'rgb(156, 103, 230)', 'D# ': 'rgb(156, 103, 230)', 'D#7': 'rgb(156, 103, 230)', 'F ': 'rgb(156, 103, 230)', 'F7': 'rgb(156, 103, 230)' },
    'D': { 'C ': 'rgba(238, 83, 142, 0.89)', 'Bb ': 'rgba(238, 83, 142, 0.89)', 'A# ': 'rgba(238, 83, 142, 0.89)', 'F ': 'rgba(238, 83, 142, 0.89)', 'Gm ': 'rgba(238, 83, 142, 0.89)', 'Am ': 'rgba(238, 83, 142, 0.89)', 'E7': 'rgb(156, 103, 230)', 'E ': 'rgb(156, 103, 230)', 'F#7': 'rgb(156, 103, 230)', 'F# ': 'rgb(156, 103, 230)', 'D7': 'rgb(156, 103, 230)', 'B ': 'rgb(156, 103, 230)', 'B7': 'rgb(156, 103, 230)' },
    'D#': { 'C# ': 'rgba(238, 83, 142, 0.89)', 'B ': 'rgba(238, 83, 142, 0.89)', 'F# ': 'rgba(238, 83, 142, 0.89)', 'G#m ': 'rgba(238, 83, 142, 0.89)', 'Abm ': 'rgba(238, 83, 142, 0.89)', 'A#m ': 'rgba(238, 83, 142, 0.89)', 'F7': 'rgb(156, 103, 230)', 'F ': 'rgb(156, 103, 230)', 'G7': 'rgb(156, 103, 230)', 'G ': 'rgb(156, 103, 230)', 'D#7': 'rgb(156, 103, 230)', 'C ': 'rgb(156, 103, 230)', 'C7': 'rgb(156, 103, 230)' },
    'E': { 'G ': 'rgba(238, 83, 142, 0.89)', 'C ': 'rgba(238, 83, 142, 0.89)', 'D ': 'rgba(238, 83, 142, 0.89)', 'Am ': 'rgba(238, 83, 142, 0.89)', 'Bm ': 'rgba(238, 83, 142, 0.89)', 'F#7 ': 'rgb(156, 103, 230)', 'F# ': 'rgb(156, 103, 230)', 'G#7 ': 'rgb(156, 103, 230)', 'G# ': 'rgb(156, 103, 230)', 'C#7 ': 'rgb(156, 103, 230)', 'C# ': 'rgb(156, 103, 230)', 'E7 ': 'rgb(156, 103, 230)' },
    'F': { 'G# ': 'rgba(238, 83, 142, 0.89)', 'Ab ': 'rgba(238, 83, 142, 0.89)', 'C# ': 'rgba(238, 83, 142, 0.89)', 'Db ': 'rgba(238, 83, 142, 0.89)', 'Eb ': 'rgba(238, 83, 142, 0.89)', 'D# ': 'rgba(238, 83, 142, 0.89)', 'A#m ': 'rgba(238, 83, 142, 0.89)', 'Bbm ': 'rgba(238, 83, 142, 0.89)', 'Cm ': 'rgba(238, 83, 142, 0.89)', 'G7': 'rgb(156, 103, 230)', 'G ': 'rgb(156, 103, 230)', 'A7': 'rgb(156, 103, 230)', 'A ': 'rgb(156, 103, 230)', 'D7 ': 'rgb(156, 103, 230)', 'D ': 'rgb(156, 103, 230)', 'F7 ': 'rgb(156, 103, 230)' },
    'F#': { 'A ': 'rgba(238, 83, 142, 0.89)', 'D ': 'rgba(238, 83, 142, 0.89)', 'E': 'rgba(238, 83, 142, 0.89)', 'Bm ': 'rgba(238, 83, 142, 0.89)', 'C#m ': 'rgba(238, 83, 142, 0.89)', 'G#7': 'rgb(156, 103, 230)', 'G# ': 'rgb(156, 103, 230)', 'A#7': 'rgb(156, 103, 230)', 'A# ': 'rgb(156, 103, 230)', 'Bb7': 'rgb(156, 103, 230)', 'Bb ': 'rgb(156, 103, 230)', 'Eb7': 'rgb(156, 103, 230)', 'Eb ': 'rgb(156, 103, 230)', 'D#7': 'rgb(156, 103, 230)', 'D# ': 'rgb(156, 103, 230)', 'F#7 ': 'rgb(156, 103, 230)' },
    'G': { 'A# ': 'rgba(238, 83, 142, 0.89)', 'Bb ': 'rgba(238, 83, 142, 0.89)', 'D# ': 'rgba(238, 83, 142, 0.89)', 'Eb ': 'rgba(238, 83, 142, 0.89)', 'F ': 'rgba(238, 83, 142, 0.89)', 'Cm ': 'rgba(238, 83, 142, 0.89)', 'Dm ': 'rgba(238, 83, 142, 0.89)', 'A7': 'rgb(156, 103, 230)', 'A ': 'rgb(156, 103, 230)', 'B7': 'rgb(156, 103, 230)', 'B ': 'rgb(156, 103, 230)', 'E7': 'rgb(156, 103, 230)', 'E ': 'rgb(156, 103, 230)', 'G7 ': 'rgb(156, 103, 230)' },
    'G#': { 'B ': 'rgba(238, 83, 142, 0.89)', 'E ': 'rgba(238, 83, 142, 0.89)', 'F# ': 'rgba(238, 83, 142, 0.89)', 'C#m ': 'rgba(238, 83, 142, 0.89)', 'D#m ': 'rgba(238, 83, 142, 0.89)', 'Ebm ': 'rgba(238, 83, 142, 0.89)', 'A#7': 'rgb(156, 103, 230)', 'A# ': 'rgb(156, 103, 230)', 'C7': 'rgb(156, 103, 230)', 'C ': 'rgb(156, 103, 230)', 'F7': 'rgb(156, 103, 230)', 'F ': 'rgb(156, 103, 230)', 'G#7 ': 'rgb(156, 103, 230)' },
    'A': { 'C ': 'rgba(238, 83, 142, 0.89)', 'F ': 'rgba(238, 83, 142, 0.89)', 'G ': 'rgba(238, 83, 142, 0.89)', 'Dm ': 'rgba(238, 83, 142, 0.89)', 'Em ': 'rgba(238, 83, 142, 0.89)', 'A7': 'rgb(156, 103, 230)', 'B ': 'rgb(156, 103, 230)', 'B7': 'rgb(156, 103, 230)', 'C# ': 'rgb(156, 103, 230)', 'C#7': 'rgb(156, 103, 230)', 'F# ': 'rgb(156, 103, 230)', 'F#7 ': 'rgb(156, 103, 230)' },
    'Bb': { 'C# ': 'rgba(238, 83, 142, 0.89)', 'Db ': 'rgba(238, 83, 142, 0.89)', 'F# ': 'rgba(238, 83, 142, 0.89)', 'G# ': 'rgba(238, 83, 142, 0.89)', 'Ab ': 'rgba(238, 83, 142, 0.89)', 'D#m ': 'rgba(238, 83, 142, 0.89)', 'Ebm ': 'rgba(238, 83, 142, 0.89)', 'Fm ': 'rgba(238, 83, 142, 0.89)', 'A#7': 'rgb(156, 103, 230)', 'Bb7': 'rgb(156, 103, 230)', 'C ': 'rgb(156, 103, 230)', 'C7': 'rgb(156, 103, 230)', 'D ': 'rgb(156, 103, 230)', 'D7': 'rgb(156, 103, 230)', 'G ': 'rgb(156, 103, 230)', 'G7 ': 'rgb(156, 103, 230)' },
    'B': { 'D ': 'rgba(238, 83, 142, 0.89)', 'G ': 'rgba(238, 83, 142, 0.89)', 'A ': 'rgba(238, 83, 142, 0.89)', 'Em ': 'rgba(238, 83, 142, 0.89)', 'F#m ': 'rgba(238, 83, 142, 0.89)', 'B7': 'rgb(156, 103, 230)', 'C# ': 'rgb(156, 103, 230)', 'C#7': 'rgb(156, 103, 230)', 'D# ': 'rgb(156, 103, 230)', 'D#7': 'rgb(156, 103, 230)', 'Eb ': 'rgb(156, 103, 230)', 'Eb7': 'rgb(156, 103, 230)', 'Ab ': 'rgb(156, 103, 230)', 'Ab7 ': 'rgb(156, 103, 230)', 'G# ': 'rgb(156, 103, 230)', 'G#7 ': 'rgb(156, 103, 230)' }
  };

  const substringFn = {
    'C': { 'Bb ': 'bvii', 'A# ': 'bvii', 'G# ': 'bvi', 'Ab ': 'bvi', 'Gm ': 'v', 'Fm ': 'iv', 'D# ': 'biii', 'Eb ': 'biii', 'C7': 'vdeiv', 'A ': 'vdeii', 'A7': 'vdeii', 'D ': 'vdev', 'D7': 'vdev', 'E ': 'vdevi', 'E7': 'vdevi' },
    'C#': { 'A ': 'bvi', 'B ': 'bvii', 'E ': 'biii', 'F#m ': 'iv', 'Gbm ': 'iv', 'G#m ': 'v', 'Abm ': 'v', 'C#7': 'vdeiv', 'A# ': 'vdeii', 'A#7': 'vdeii', 'D# ': 'vdev', 'D#7': 'vdev', 'F ': 'vdevi', 'F7': 'vdevi' },
    'D': { 'C ': 'bvii', 'Bb ': 'bvi', 'A# ': 'bvi', 'F ': 'biii', 'Gm ': 'iv', 'Am ': 'v', 'E7': 'vdev', 'E ': 'vdev', 'F#7': 'vdevi', 'F# ': 'vdevi', 'D7': 'vdeiv', 'B ': 'vdeii', 'B7': 'vdeii' },
    'D#': { 'C# ': 'bvii', 'B ': 'bvi', 'F# ': 'biii', 'G#m ': 'iv', 'Abm ': 'iv', 'A#m ': 'v', 'F7': 'vdev', 'F ': 'vdev', 'G7': 'vdevi', 'G ': 'vdevi', 'D#7': 'vdeiv', 'C ': 'vdeii', 'C7': 'vdeii' },
    'E': { 'G ': 'biii', 'C ': 'bvi', 'D ': 'bvii', 'Am ': 'iv', 'Bm ': 'v', 'F#7 ': 'vdev', 'F# ': 'vdev', 'G#7 ': 'vdevi', 'G# ': 'vdevi', 'C#7 ': 'vdeii', 'C# ': 'vdeii', 'E7 ': 'vdeiv' },
    'F': { 'G# ': 'biii', 'Ab ': 'biii', 'C# ': 'bvi', 'Db ': 'bvi', 'Eb ': 'bvii', 'D# ': 'bvii', 'A#m ': 'iv', 'Bbm ': 'iv', 'Cm ': 'v', 'G7': 'vdev', 'G ': 'vdev', 'A7': 'vdevi', 'A ': 'vdevi', 'D7 ': 'vdeii', 'D ': 'vdeii', 'F7 ': 'vdeiv' },
    'F#': { 'A ': 'biii', 'D ': 'bvi', 'E': 'bvii', 'Bm ': 'iv', 'C#m ': 'v', 'G#7': 'vdev', 'G# ': 'vdev', 'A#7': 'vdevi', 'A# ': 'vdevi', 'Bb7': 'vdevi', 'Bb ': 'vdevi', 'Eb7': 'vdeii', 'Eb ': 'vdeii', 'D#7': 'vdeii', 'D# ': 'vdeii', 'F#7 ': 'vdeiv' },
    'G': { 'A# ': 'biii', 'Bb ': 'biii', 'D# ': 'bvi', 'Eb ': 'bvi', 'F ': 'bvii', 'Cm ': 'iv', 'Dm ': 'v', 'A7': 'vdev', 'A ': 'vdev', 'B7': 'vdevi', 'B ': 'vdevi', 'E7': 'vdeii', 'E ': 'vdeii', 'G7 ': 'vdeiv' },
    'G#': { 'B ': 'biii', 'E ': 'bvi', 'F# ': 'bvii', 'C#m ': 'iv', 'Dbm ': 'iv', 'D#m ': 'v', 'Ebm ': 'v', 'A#7': 'vdev', 'A# ': 'vdev', 'C7': 'vdeii', 'C ': 'vdeii', 'F7': 'vdevi', 'F ': 'vdevi', 'G#7 ': 'vdeiv' },
    'A': { 'C ': 'biii', 'F ': 'bvi', 'G ': 'bvii', 'Dm ': 'iv', 'Em ': 'v', 'A7': 'vdeiv', 'B ': 'vdev', 'B7': 'vdev', 'C# ': 'vdevi', 'C#7': 'vdevi', 'F# ': 'vdeii', 'F#7 ': 'vdeii' },
    'Bb': { 'C# ': 'biii', 'Db ': 'biii', 'F# ': 'bvi', 'G# ': 'bvii', 'Ab ': 'bvii', 'D#m ': 'iv', 'Ebm ': 'iv', 'Fm ': 'v', 'A#7': 'vdeiv', 'Bb7': 'vdeiv', 'C ': 'vdev', 'C7': 'vdev', 'D ': 'vdevi', 'D7': 'vdevi', 'G ': 'vdeii', 'G7 ': 'vdeii' },
    'B': { 'D ': 'biii', 'G ': 'bvi', 'A ': 'bvii', 'Em ': 'vi', 'F#m ': 'v', 'B7': 'vdeiv', 'C# ': 'vdev', 'C#7': 'vdev', 'D# ': 'vdevi', 'D#7': 'vdevi', 'Eb ': 'vdevi', 'Eb7': 'vdevi', 'Ab ': 'vdeii', 'Ab7 ': 'vdeii', 'G# ': 'vdeii', 'G#7 ': 'vdeii' }
  };

  const substringFnLinks = {
    'vdev': { text: 'VdeV', href: '/armonia/arm2#dom-sec' },
    'vdevi': { text: 'Vdevi', href: '/armonia/arm2#dominante-del-relativo-menor-vdevi' },
    'vdeiv': { text: 'VdeIV', href: '/armonia/arm2#dominante-de-iv' },
    'vdeii': { text: 'Vdeii', href: '/armonia/arm2#el-grado-ii-y-su-modulaciones' },
    'bvii': { text: 'bVII prestado del modo paralelo menor', href: '/armonia/arm3#acordes-prestados-del-modo-paralelo' },
    'bvi': { text: 'bVI prestado del modo paralelo menor', href: '/armonia/arm3#el-acorde-bvi-prestado' },
    'biii': { text: 'bIII prestado del modo paralelo menor', href: '/armonia/arm3#biii' },
    'v': { text: 'v prestado del modo paralelo menor', href: '/armonia/arm3#bvii-i-y-v-i-v-menor' },
    'iv': { text: 'iv prestado del modo paralelo menor', href: '/armonia/arm2#el-cliché-iv-iv-iv-mayor-menor' }
  };
  
  const displayStrings = {
    'C': `      I       ii      iii IV      V       vi      VII I
     |C  |   |Dm |   |Em |F  |   |G  |   |Am |   |Bº |C `,
    'C#': `      I       ii      iii IV      V       vi      VII I
     |C# |   |D#m|   |Fm |F# |   |G# |   |Bb |   |C* |C# `,
    'D': `      I       ii      iii IV      V       vi      VII I
     |D  |   |Em |   |F#m|G  |   |A  |   |Bm |   |C#º|D `,
    'D#': `      I       ii      iii IV      V       vi      VII I
     |D# |   |Fm |   |Gm |G# |   |Bb |   |Cm |   |Dº |D#`,
    'E': `      I       ii      iii IV      V       vi      VII I
     |E  |   |F#m|   |G#m|A  |   |B  |   |C#m|   |D#º|E `,
    'F': `      I       ii      iii IV      V       vi      VII I
     |F  |   |Gm |   |Am |Bb |   |C  |   |Dm |   |Eº |F `,
    'F#': `      I       ii      iii IV      V       vi      VII I
     |F# |   |G#m|   |A#m|B  |   |C# |   |D#m|   |Fº |F# `,
    'G': `      I       ii      iii IV      V       vi      VII I
     |G  |   |Am |   |Bm |C  |   |D  |   |Em |   |F#º|G `,
    'G#': `      I       ii      iii IV      V       vi      VII I
     |G# |   |A#m|   |C#m|C# |   |D# |   |Fm |   |Gº |G# `,
    'A': `      I       ii      iii IV      V       vi      VII I
     |A  |   |Bm |   |C#m|D  |   |E  |   |F#m|   |G#º|A `,
    'Bb': `      I       ii      iii IV      V       vi      VII I
     |Bb |   |Cm |   |Dm |Eb |   |F  |   |Gm |   |Aº |Bb `,
    'B': `      I       ii      iii IV      V       vi      VII I
     |B  |   |C#m|   |D#m|E  |   |F# |   |G#m|   |A#º|B `
  };

const TablatureHighlighter = () => {
  // State management
  const [text, setText] = useState('');
  const [varClave, setVarClave] = useState('C');

  // Load state from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const savedText = sessionStorage.getItem('highlighterText') || '';
      const savedKey = sessionStorage.getItem('highlighterVarClave') || 'C';
      setText(savedText);
      setVarClave(savedKey);
    }
  }, []);

  // Save state to sessionStorage when text or key changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem('highlighterText', text);
      sessionStorage.setItem('highlighterVarClave', varClave);
    }
  }, [text, varClave]);

  // Event handlers
  const handleChange = (event) => {
    const inputText = event.target.value;
    const lines = inputText.split('\n');
    if (lines.length > 30) {
      const trimmedText = lines.slice(0, 30).join('\n');
      setText(trimmedText);
      alert('Máximo de 30 líneas excedido, edite su input');
    } else {
      setText(inputText);
    }
  };

  const handleClick = (value) => {
    if (value && typeof value === 'string') {
      setVarClave(value);
    } else {
      console.error('Invalid key value:', value);
    }
  };

  const handleReset = () => {
    setText('');
  };

  // Text processing functions
  const addSpaceAtEndOfLines = (text) => {
    return text.split('\n').map(line => line + ' ').join('\n');
  };

  const highlightText = (text) => {
    const substrings = substringsSets[varClave] || {};
    const fnSubstrings = substringFn[varClave] || {};

    const pattern = new RegExp(Object.keys(substrings).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
    const fnPattern = new RegExp(Object.keys(fnSubstrings).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');

    const textWithSpaces = addSpaceAtEndOfLines(text);
    const matchedFnPatterns = new Set();
    const fnMatches = textWithSpaces.match(fnPattern);
    if (fnMatches) {
      fnMatches.forEach(match => matchedFnPatterns.add(match));
    }

    // Create harmonic function elements
    const fnElements = Array.from(matchedFnPatterns).map((pattern, index) => {
      const color = substrings[pattern] || 'inherit';
      const fnValue = fnSubstrings[pattern] || '';
      const linkInfo = substringFnLinks[fnValue] || { text: fnValue, href: '#' };
      return (
        <div key={`fn-${index}`} className={styles.fnMatch}>
          <span style={{ color }}>{pattern}</span>: <a className={`${styles.lnk} lnk`} href={linkInfo.href} target="_blank">{linkInfo.text}</a>
        </div>
      );
    });

    // Highlight chords
    const highlightedText = [];
    let lastIndex = 0;
    textWithSpaces.replace(pattern, (match, offset) => {
      const before = textWithSpaces.slice(lastIndex, offset);
      if (before) highlightedText.push(before);
      highlightedText.push(<span key={`chord-${offset}`} style={{ color: substrings[match] }}>{match}</span>);
      lastIndex = offset + match.length;
      return match;
    });
    if (lastIndex < textWithSpaces.length) {
      highlightedText.push(textWithSpaces.slice(lastIndex));
    }

    // Combine output
    const finalOutput = [...highlightedText];
    if (fnElements.length > 0) {
      finalOutput.push(<div key="separator" className={styles.highlightSeparator}></div>);
    }
    finalOutput.push(...fnElements);

    return finalOutput;
  };

  // Render
  return (
    <Layout title="Coloreador Sintáctico para Tablaturas">
      <div className={styles.artHighLocal}>
        <article>
          <h1>Coloreador Sintáctico para Tablaturas</h1>
          <div className={styles.textareaContainer}>
            <textarea
              id="inputText"
              className={styles.textarea}
              placeholder="Pegue o escriba una tabaltura aquí"
              rows={14}
              value={text}
              onChange={handleChange}
            />
            <button className={styles.resetButton} onClick={handleReset} title="Reset textarea">
              Reset
            </button>
          </div>
          <h3>Seleccione una clave. Clave Actual: <span>{varClave}</span></h3>

          <div className={styles.navbarButtons}>
            {['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'].map(key => (
              <button key={key} onClick={() => handleClick(key)}>
                {key.replace('#', '♯').replace('b', '♭')}<br />({key})
              </button>
            ))}
          </div>
          <pre className={styles.highlightedText}>
            {displayStrings[varClave]}
            <br /><br />
            {highlightText(text)}
          </pre>
        </article>
      </div>
    </Layout>
  );
};

export default TablatureHighlighter;