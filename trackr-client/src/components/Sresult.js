import React from "react";

const Sresult = (props) => {
  //const img = `http://localhost:5000/api/actiongroup/find?${props.name}`;
   const img =  `https://cdn.dribbble.com/users/1940197/screenshots/14101002/media/6939f51c2401d2d823bacaddc0867160.gif`;
  return (
    <>
      <div>
        
      <center>
      <img src={img} alt="search"></img>
      </center>
      </div>
    </>
  );
};
export default Sresult;
