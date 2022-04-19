import { useEffect, useState } from "react";
import dict from "@/utils/dict";

export default function DictParse(props) {
  const { dictKey, value } = props;
  const [text, setText] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(dict[dictKey] || []);
  }, [dictKey]);

  useEffect(() => {
    const found = options.find((item) => item.value === value);
    setText(found ? found.label : value);
  }, [options, value]);

  return <div>{text}</div>;
}
