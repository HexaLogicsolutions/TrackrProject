import React from "react";
import {Helmet} from "react-helmet";
export default function Demo() {
  return (
    
<div>
<Helmet>
            <title>Nested Title</title>
            <meta name="description" content="Nested component" />
        </Helmet>
  <br></br>
<center>
  <div style={{maxWidth:'1500px', width:'90%',backgroundColor:'red',height:'500px', overflow:'auto'}} >
    <br></br>
<div style={{width:'50%',backgroundColor:'yellow',height:'200px', display:'inline-block'}}></div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<div style={{width:'%',backgroundColor:'green',height:'200px', display:'inline-block'}}></div>



    </div>
</center>
</div>

// /////////////////



  );
}
