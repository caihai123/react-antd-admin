import { useEffect, useState } from "react";
import { Select } from "antd";
import dict from "@/utils/dict";

const { Option } = Select;

export default function DictSelect(props) {
  const { dictKey, ...rest } = props;
  const [dictData, setDictData] = useState([]);

  useEffect(() => {
    setDictData(dict[dictKey] || []);
  }, [dictKey]);
  return (
    <Select {...rest}>
      {dictData.map((item) => (
        <Option key={item.value} value={item.value}>
          {item.label}
        </Option>
      ))}
    </Select>
  );
}
