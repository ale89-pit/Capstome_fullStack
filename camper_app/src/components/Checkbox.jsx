import React, { useEffect } from 'react';
import { GiChewedHeart } from 'react-icons/gi';
import { useParams } from 'react-router';

const Checkbox = ({ label, checked, onClick }) => {

  const param = useParams()
  let id = param.id


  const handleChange = () => {
    onClick(!checked);

  };

  useEffect(() => {

  }, [id])

  return (
    <div className='m-1' >

      <label className={`checkbox-label ${checked ? 'selected' : ''}`}>
        <input className="checkbox-input" type="checkbox" checked={checked} onClick={handleChange} />

        {label}
      </label>
    </div>
  );
};

export default Checkbox;