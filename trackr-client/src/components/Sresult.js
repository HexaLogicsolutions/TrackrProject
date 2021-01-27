import React from "react";

const Sresult = (props) => {
  const img = `http://localhost:5000/api/actiongroup/find?${props.name}`;
  // const img =  `http://sourse.unsplash.com/400*300/?`;
  return (
    <>
      <div>
        <img src={img} alt="search"></img>
      </div>
    </>
  );
};
export default Sresult;
