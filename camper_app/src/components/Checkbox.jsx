import React from 'react';

const Checkbox = ({ label, checked, onClick}) => {
    const handleChange = () => {
      onClick(!checked);
      
    };
  
    return (
      <div className='mx-1 ' >
        <label className='btn btn-primary "'>
          <input class="btn-check" id="btn-check"  type="checkbox"  checked={checked} onClick={handleChange} />
          {label}
        </label>
      </div>
    );
  };
  
  export default Checkbox;