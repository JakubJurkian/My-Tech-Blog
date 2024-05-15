import React from 'react';

function SearchInput(props: { value: string; onChange: React.ChangeEventHandler<HTMLInputElement>; }) {
  return (
    <input
      name="search"
      value={props.value}
      onChange={props.onChange}
      type="text"
      placeholder="Search a Post"
      className="smooth-transition-effect w-full my-3 p-3 rounded-md bg-[#111827] border-[1px] border-[#1c2f41] focus:outline-0 focus:shadow-[#3B82F6] focus:shadow-[0_0_0_2px_#3294f8]"
    />
  );
}

export default SearchInput;
//form-input smooth-transition-effect