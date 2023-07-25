import React from 'react'

function Spinner() {
  return (
    <div className="w-100 text-center">
      <div class="spinner-grow" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner