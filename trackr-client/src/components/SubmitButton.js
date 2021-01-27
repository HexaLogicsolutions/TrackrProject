import React, { useState } from "react";

function SubmitButton(props) {
  const [className] = useState(props.className);
  const [value] = useState(props.value);

  return <input type="submit" className={className} value={value} />;
}
export default SubmitButton;
