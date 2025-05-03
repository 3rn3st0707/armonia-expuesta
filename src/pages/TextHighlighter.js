import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@theme/Layout';
import './TextHighlighter.css';

const TextHighlighter = () => {
  const [text, setText] = useState('');
  const [varClave, setVariable] = useState('C');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleClick = (value) => {
    setVariable(value);
  };

  const addSpaceAtEndOfLines = (text) => {
    return text.split('\n').map(line => line + ' ').join('\n');
  };

  const highlightText = (text) => {

    // Define different sets of substrings based on varClave
    const substringsSets = {
      'C': { 'Bb ': 'rgba(238, 83, 142, 0.89)',
             'A# ': 'rgba(238, 83, 142, 0.89)', 
             'G# ': 'rgba(238, 83, 142, 0.89)', 
             'Ab ': 'rgba(238, 83, 142, 0.89)', 
             'Gm ': 'rgba(238, 83, 142, 0.89)',
             'Fm ': 'rgba(238, 83, 142, 0.89)',             
             'D# ': 'rgba(238, 83, 142, 0.89)',
             'Eb ': 'rgba(238, 83, 142, 0.89)',          
            
             'C7': 'rgb(156, 103, 230)',             
             'A ': 'rgb(156, 103, 230)',
             'A7': 'rgb(156, 103, 230)', 
             'D ': 'rgb(156, 103, 230)',
             'D7': 'rgb(156, 103, 230)',
             'E ': 'rgb(156, 103, 230)',
             'E7': 'rgb(156, 103, 230)',  
            },

      'C#': { 
        'A ': 'rgba(238, 83, 142, 0.89)', 
        'B ': 'rgba(238, 83, 142, 0.89)', 
        'E ': 'rgba(238, 83, 142, 0.89)', 
        'F#m ': 'rgba(238, 83, 142, 0.89)',
        'G#m ': 'rgba(238, 83, 142, 0.89)', 
        'Abm ': 'rgba(238, 83, 142, 0.89)',
        'Gbm ': 'rgba(238, 83, 142, 0.89)',          
       
        'C#7': 'rgb(156, 103, 230)',             
        'A# ': 'rgb(156, 103, 230)',
        'A#7': 'rgb(156, 103, 230)', 
        'D# ': 'rgb(156, 103, 230)',
        'D#7': 'rgb(156, 103, 230)',
        'F ': 'rgb(156, 103, 230)',
        'F7': 'rgb(156, 103, 230)',  
       },

       'D': { 
        'C ': 'rgba(238, 83, 142, 0.89)', 
        'Bb ': 'rgba(238, 83, 142, 0.89)', 
        'A# ': 'rgba(238, 83, 142, 0.89)', 
        'F ': 'rgba(238, 83, 142, 0.89)', 
        'Gm ': 'rgba(238, 83, 142, 0.89)', 
        'Am ': 'rgba(238, 83, 142, 0.89)',
         
       
        'E7': 'rgb(156, 103, 230)',             
        'E ': 'rgb(156, 103, 230)',
        'F#7': 'rgb(156, 103, 230)', 
        'F# ': 'rgb(156, 103, 230)',
        'D7': 'rgb(156, 103, 230)',
        'B ': 'rgb(156, 103, 230)',
        'B7': 'rgb(156, 103, 230)',  
       },

        'D#': { 
          'C# ': 'rgba(238, 83, 142, 0.89)', 
          'B ': 'rgba(238, 83, 142, 0.89)', 
          'F# ': 'rgba(238, 83, 142, 0.89)', 
          'G#m ': 'rgba(238, 83, 142, 0.89)',
          'Abm ': 'rgba(238, 83, 142, 0.89)',        
          'A#m ': 'rgba(238, 83, 142, 0.89)',
                
          'F7': 'rgb(156, 103, 230)',             
          'F ': 'rgb(156, 103, 230)',
          'G7': 'rgb(156, 103, 230)', 
          'G ': 'rgb(156, 103, 230)',
          'D#7': 'rgb(156, 103, 230)',
          'C ': 'rgb(156, 103, 230)',
          'C7': 'rgb(156, 103, 230)',        
        },

      'E': { 
        'G ': 'rgba(238, 83, 142, 0.89)', 
        'C ': 'rgba(238, 83, 142, 0.89)', 
        'D ': 'rgba(238, 83, 142, 0.89)', 
        'Am ': 'rgba(238, 83, 142, 0.89)',
        'Bm ': 'rgba(238, 83, 142, 0.89)',        
              
        'F#7 ': 'rgb(156, 103, 230)',             
        'F# ': 'rgb(156, 103, 230)',
        'G#7 ': 'rgb(156, 103, 230)', 
        'G# ': 'rgb(156, 103, 230)',
        'C#7 ': 'rgb(156, 103, 230)',
        'C# ': 'rgb(156, 103, 230)',
        'E7 ': 'rgb(156, 103, 230)',        
      },

      'F': { 
        'G# ': 'rgba(238, 83, 142, 0.89)',
        'Ab ': 'rgba(238, 83, 142, 0.89)',        
        'C# ': 'rgba(238, 83, 142, 0.89)', 
        'Db ': 'rgba(238, 83, 142, 0.89)', 
        'Eb ': 'rgba(238, 83, 142, 0.89)',
        'D# ': 'rgba(238, 83, 142, 0.89)',
        'A#m ': 'rgba(238, 83, 142, 0.89)',
        'Bbm ': 'rgba(238, 83, 142, 0.89)',
        'Cm ': 'rgba(238, 83, 142, 0.89)',        
             
        'G7': 'rgb(156, 103, 230)',             
        'G ': 'rgb(156, 103, 230)',
        'A7': 'rgb(156, 103, 230)', 
        'A ': 'rgb(156, 103, 230)',
        'D7 ': 'rgb(156, 103, 230)',
        'D ': 'rgb(156, 103, 230)',
        'F7 ': 'rgb(156, 103, 230)',        
      },

      'F#': { 
        'A ': 'rgba(238, 83, 142, 0.89)',      
        'D ': 'rgba(238, 83, 142, 0.89)', 
        'E': 'rgba(238, 83, 142, 0.89)',
        'Bm ': 'rgba(238, 83, 142, 0.89)',
        'C#m ': 'rgba(238, 83, 142, 0.89)',
              
        'G#7': 'rgb(156, 103, 230)',             
        'G# ': 'rgb(156, 103, 230)',
        'A#7': 'rgb(156, 103, 230)', 
        'A# ': 'rgb(156, 103, 230)',
        'Bb7': 'rgb(156, 103, 230)', 
        'Bb ': 'rgb(156, 103, 230)',
        'Eb7': 'rgb(156, 103, 230)',
        'Eb ': 'rgb(156, 103, 230)',
        'D#7': 'rgb(156, 103, 230)',
        'D# ': 'rgb(156, 103, 230)',
        'F#7 ': 'rgb(156, 103, 230)',
      },

      'G': { 
        'A# ': 'rgba(238, 83, 142, 0.89)',
        'Bb ': 'rgba(238, 83, 142, 0.89)',
        'D# ': 'rgba(238, 83, 142, 0.89)', 
        'Eb ': 'rgba(238, 83, 142, 0.89)',
        'F ': 'rgba(238, 83, 142, 0.89)',
        'Cm ': 'rgba(238, 83, 142, 0.89)',
        'Dm ': 'rgba(238, 83, 142, 0.89)',
      
        'A7': 'rgb(156, 103, 230)',
        'A ': 'rgb(156, 103, 230)',
        'B7': 'rgb(156, 103, 230)', 
        'B ': 'rgb(156, 103, 230)',
        'E7': 'rgb(156, 103, 230)',
        'E ': 'rgb(156, 103, 230)',
        'G7 ': 'rgb(156, 103, 230)',      
      },

      'G#': { 
        'B ': 'rgba(238, 83, 142, 0.89)',
        'E ': 'rgba(238, 83, 142, 0.89)',
        'F# ': 'rgba(238, 83, 142, 0.89)',
        'C#m ': 'rgba(238, 83, 142, 0.89)',
        'D#m ': 'rgba(238, 83, 142, 0.89)',        
        'Ebm ': 'rgba(238, 83, 142, 0.89)',       
      
        'A#7': 'rgb(156, 103, 230)',             
        'A# ': 'rgb(156, 103, 230)',
        'C7': 'rgb(156, 103, 230)', 
        'C ': 'rgb(156, 103, 230)',
        'F7': 'rgb(156, 103, 230)',
        'F ': 'rgb(156, 103, 230)',
        'G#7 ': 'rgb(156, 103, 230)',      
      },

      'A': { 
        'C ': 'rgba(238, 83, 142, 0.89)',
        'F ': 'rgba(238, 83, 142, 0.89)',
        'G ': 'rgba(238, 83, 142, 0.89)',
        'Dm ': 'rgba(238, 83, 142, 0.89)',
        'Em ': 'rgba(238, 83, 142, 0.89)',        
        
        'A7': 'rgb(156, 103, 230)',             
        'B ': 'rgb(156, 103, 230)',
        'B7': 'rgb(156, 103, 230)', 
        'C# ': 'rgb(156, 103, 230)',
        'C#7': 'rgb(156, 103, 230)',
        'F# ': 'rgb(156, 103, 230)',
        'F#7 ': 'rgb(156, 103, 230)',
      
      },

      'Bb': { 
        'C# ': 'rgba(238, 83, 142, 0.89)',
        'Db ': 'rgba(238, 83, 142, 0.89)',
        'F# ': 'rgba(238, 83, 142, 0.89)',
        'G# ': 'rgba(238, 83, 142, 0.89)',
        'Ab ': 'rgba(238, 83, 142, 0.89)',
        'D#m ': 'rgba(238, 83, 142, 0.89)',
        'Ebm ': 'rgba(238, 83, 142, 0.89)',
        'Fm ': 'rgba(238, 83, 142, 0.89)',          
      
        'A#7': 'rgb(156, 103, 230)',
        'Bb7': 'rgb(156, 103, 230)',             
        'C ': 'rgb(156, 103, 230)',
        'C7': 'rgb(156, 103, 230)', 
        'D ': 'rgb(156, 103, 230)',
        'D7': 'rgb(156, 103, 230)',
        'G ': 'rgb(156, 103, 230)',
        'G7 ': 'rgb(156, 103, 230)',     
      },

      'B': { 
        'D ': 'rgba(238, 83, 142, 0.89)',
        'G ': 'rgba(238, 83, 142, 0.89)',
        'A ': 'rgba(238, 83, 142, 0.89)',
        'Em ': 'rgba(238, 83, 142, 0.89)',
        'F#m ': 'rgba(238, 83, 142, 0.89)',        
        
        'B7': 'rgb(156, 103, 230)',             
        'C# ': 'rgb(156, 103, 230)',
        'C#7': 'rgb(156, 103, 230)', 
        'D# ': 'rgb(156, 103, 230)',
        'D#7': 'rgb(156, 103, 230)',
        'Eb ': 'rgb(156, 103, 230)',
        'Eb7': 'rgb(156, 103, 230)',
        'Ab ': 'rgb(156, 103, 230)',
        'Ab7 ': 'rgb(156, 103, 230)',
        'G# ': 'rgb(156, 103, 230)',
        'G#7 ': 'rgb(156, 103, 230)',      
      },

    };

 // Define substringFn for pattern matching and div visibility
 const substringFn = {
  'C': {
    'Bb ': 'bvii',
    'A# ': 'bvii',
    'G# ': 'bvi',
    'Ab ': 'bvi',
    'Gm ': 'v',
    'Fm ': 'iv',
    'D# ': 'iii',
    'Eb ': 'iii',
    'C7': 'vdeiv',
    'A ': 'vdeii',
    'A7': 'vdeii',
    'D ': 'vdev',
    'D7': 'vdev',
    'E ': 'vdevi',
    'E7': 'vdevi',
  },
  'C#': {
    'A ': 'bvi',
    'B ': 'bvii',
    'E ': 'iii',
    'F#m ': 'iv',
    'Gbm ': 'iv',
    'G#m ': 'v',
    'Abm ': 'v',
    'C#7': 'vdeiv',
    'A# ': 'vdeii',
    'A#7': 'vdeii',
    'D# ': 'vdev',
    'D#7': 'vdev',
    'F ': 'vdevi',
    'F7': 'vdevi',
  },
  'D': {
    'C ': 'bvii',
    'Bb ': 'bvi',
    'A# ': 'bvi',
    'F ': 'iii',
    'Gm ': 'iv',
    'Am ': 'v',
    'E7': 'vdev',
    'E ': 'vdev',
    'F#7': 'vdevi',
    'F# ': 'vdevi',
    'D7': 'vdeiv',
    'B ': 'vdeii',
    'B7': 'vdeii',
  },
  'D#': {
    'C# ': 'bvii',
    'B ': 'bvi',
    'F# ': 'iii',
    'G#m ': 'iv',
    'Abm ': 'iv',
    'A#m ': 'v',
    'F7': 'vdev',
    'F ': 'vdev',
    'G7': 'vdevi',
    'G ': 'vdevi',
    'D#7': 'vdeiv',
    'C ': 'vdeii',
    'C7': 'vdeii',
  },
  'E': {
    'G ': 'iii',
    'C ': 'bvi',
    'D ': 'bvii',
    'Am ': 'iv',
    'Bm ': 'v',
    'F#7 ': 'vdev',
    'F# ': 'vdev',
    'G#7 ': 'vdevi',
    'G# ': 'vdevi',
    'C#7 ': 'vdeii',
    'C# ': 'vdeii',
    'E7 ': 'vdeiv',
  },
  'F': {
    'G# ': 'iii',
    'Ab ': 'iii',
    'C# ': 'bvi',
    'Db ': 'bvi',
    'Eb ': 'bvii',
    'D# ': 'bvii',
    'A#m ': 'iv',
    'Bbm ': 'iv',
    'Cm ': 'v',
    'G7': 'vdev',
    'G ': 'vdev',
    'A7': 'vdevi',
    'A ': 'vdevi',
    'D7 ': 'vdeii',
    'D ': 'vdeii',
    'F7 ': 'vdeiv',
  },
  'F#': {
    'A ': 'iii',
    'D ': 'bvi',
    'E': 'bvii',
    'Bm ': 'iv',
    'C#m ': 'v',
    'G#7': 'vdev',
    'G# ': 'vdev',
    'A#7': 'vdevi',
    'A# ': 'vdevi',
    'Bb7': 'vdevi',
    'Bb ': 'vdevi',
    'Eb7': 'vdeii',
    'Eb ': 'vdeii',
    'D#7': 'vdeii',
    'D# ': 'vdeii',
    'F#7 ': 'vdeiv',
  },
  'G': {
    'A# ': 'iii',
    'Bb ': 'iii',
    'D# ': 'bvi',
    'Eb ': 'bvi',
    'F ': 'bvii',
    'Cm ': 'iv',
    'Dm ': 'v',
    'A7': 'vdev',
    'A ': 'vdev',
    'B7': 'vdevi',
    'B ': 'vdevi',
    'E7': 'vdeii',
    'E ': 'vdeii',
    'G7 ': 'vdeiv',
  },
  'G#': {
    'B ': 'iii',
    'E ': 'bvi',
    'F# ': 'bvii',
    'C#m ': 'iv',
    'Dbm ': 'iv',
    'D#m ': 'v',
    'Ebm ': 'v',
    'A#7': 'vdev',
    'A# ': 'vdev',
    'C7': 'vdeii',
    'C ': 'vdeii',
    'F7': 'vdevi',
    'F ': 'vdevi',
    'G#7 ': 'vdeiv',
  },
  'A': {
    'C ': 'iii',
    'F ': 'bvi',
    'G ': 'bvii',
    'Dm ': 'iv',
    'Em ': 'v',
    'A7': 'vdeiv',
    'B ': 'vdev',
    'B7': 'vdev',
    'C# ': 'vdevi',
    'C#7': 'vdevi',
    'F# ': 'vdeii',
    'F#7 ': 'vdeii',
  },
  'Bb': {
    'C# ': 'iii',
    'Db ': 'iii',
    'F# ': 'bvi',
    'G# ': 'bvii',
    'Ab ': 'bvii',
    'D#m ': 'iv',
    'Ebm ': 'iv',
    'Fm ': 'v',
    'A#7': 'vdeiv',
    'Bb7': 'vdeiv',
    'C ': 'vdev',
    'C7': 'vdev',
    'D ': 'vdevi',
    'D7': 'vdevi',
    'G ': 'vdeii',
    'G7 ': 'vdeii',
  },
  'B': {
    'D ': 'iii',
    'G ': 'bvi',
    'A ': 'bvii',
    'Em ': 'vi',
    'F#m ': 'v',
    'B7': 'vdeiv',
    'C# ': 'vdev',
    'C#7': 'vdev',
    'D# ': 'vdevi',
    'D#7': 'vdevi',
    'Eb ': 'vdevi',
    'Eb7': 'vdevi',
    'Ab ': 'vdeii',
    'Ab7 ': 'vdeii',
    'G# ': 'vdeii',
    'G#7 ': 'vdeii',
  },
};

// Get the appropriate substrings set based on varClave
const substrings = substringsSets[varClave] || {};
const fnSubstrings = substringFn[varClave] || {};

// Create regex patterns for both substringsSets and substringFn
const pattern = new RegExp(Object.keys(substrings).join('|'), 'g');
const fnPattern = new RegExp(Object.keys(fnSubstrings).join('|'), 'g');

// Add space at the end of each line before highlighting
const textWithSpaces = addSpaceAtEndOfLines(text);

// Track unique matched patterns from substringFn
const matchedFnPatterns = new Set();
const fnMatches = textWithSpaces.match(fnPattern);
if (fnMatches) {
  fnMatches.forEach((match) => matchedFnPatterns.add(match));
}

// Generate div elements for matched substringFn patterns
const fnDivs = Array.from(matchedFnPatterns).map((pattern, index) => (
  <div
    key={`fn-match-${index}`}
    className={`fn-match ${matchedFnPatterns.has(pattern) ? 'visible' : 'hidden'}`}
  >
    The pattern {pattern} has been matched
  </div>
));

// Replace substrings within the text with colored spans (original functionality)
const highlightedText = textWithSpaces.split(pattern).reduce((acc, part, index, arr) => {
  if (index < arr.length - 1) {
    const match = textWithSpaces.match(pattern)[index];
    const color = substrings[match];

    acc.push(part, <span key={index} style={{ color }}>{match}</span>);
  } else {
    acc.push(part);
  }

  return acc;
}, []);

// Combine highlighted text and fnDivs
const finalOutput = [
  ...highlightedText,
  ...fnDivs,
];

return finalOutput.map((part, index) => (
  <React.Fragment key={index}>{part}</React.Fragment>
));
};
  // final de highlightText()

 

  // Define the display strings based on varClave
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
     |B  |   |C#m|   |D#m|E  |   |F# |   |G#m|   |A#º|B `,
  };

  return (
    <Layout title="Coloreador Sintáctico" description="Coloreador Sintáctico">
      <div id="artHighLocal">
        <article>
          <h1>Coloreador Sintáctico para Tablaturas</h1>

          <h3>Seleccione una clave. Clave Actual: {varClave}</h3>
          <div className="navbarButtons">
            {/* Render 12 buttons with different values */}
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
            <button onClick={() => handleClick('B')}>SI (B)</button>
          </div>
          <textarea
            value={text}
            onChange={handleChange}
            placeholder="Pegue o escriba una tabaltura aquí"
            rows="13"
            cols="74"
          />
          <pre className="highlighted-text" style={{backgroundColor: '#161d24'}}>
            {[
            displayStrings[varClave], 
            
            <br key="line-break-1" />, 
            <br key="line-break-2" />, 
            
            ...highlightText(text)
            // ...displayFunction(varClave)
            ]}            
          </pre>

          <a class="lnk"  href="/#el-formato" target='_blank' >formato</a> <br />

          <a class="lnk"  href="/docs/armonia/arm2#dom-sec" >VdeV</a> <br />


          <a class="lnk"  href="/armonia/arm2#dom-rel-men" >Vdevi</a>  <br />


          <a class="lnk"  href="/armonia/arm3#acordes-prestados-del-modo-paralelo" >acorde no-diatónico bVII</a> <br />


        </article>
      </div>
    </Layout>
  );  
};

export default TextHighlighter;