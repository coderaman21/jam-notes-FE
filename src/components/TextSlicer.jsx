import React from 'react'

const TextSlicer = ({ text, maxLength }) => {
    if (text.length <= maxLength) {
      return <span > {text} </span> ;
    }
  
    const slicedText = text.slice(0, maxLength) + '...';
  
    return <span > {slicedText} </span>;
  };

export default TextSlicer