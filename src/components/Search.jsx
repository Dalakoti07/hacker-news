import React from 'react';


function Search(props) {
    const { value, onChange, children,onSubmit } = props;
    return (
      <form onSubmit={onSubmit}>
        {children} <input
          type="text"
          value={value}
          onChange={onChange}
        />
      </form>
    );
  }

export default Search;