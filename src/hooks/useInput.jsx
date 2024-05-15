import { useState } from "react";

function useInput(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  const onValueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const onInnerHTMLHandler = (event) => {
    setValue(event.target.innerHTML);
  };

  return [value, onValueChangeHandler, onInnerHTMLHandler];
}

export default useInput;
