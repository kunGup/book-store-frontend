import React,{useState,useEffect} from 'react'

function Radiobox({ prices, handleFilters }) {
  const [value, setValue] = useState(0);
  const handleChange = (e) => {
    handleFilters(e.target.value);
    setValue(e.target.value)
  };
  return prices.map((p, i) => (
    <li key={i} className="list-unstyled">
      <input
        type="radio"
        className="mr-2"
        name={p}
        onChange={handleChange}
        value={`${p._id}`}
      />
      <label className="form-check-label">{p.name}</label>
    </li>
  ));
}

export default Radiobox