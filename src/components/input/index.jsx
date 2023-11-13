import { useState } from "react";
import { Container, Content, Title } from "./styles";

export function Telphone({ onChange, value, placeholder }) {
  const [phone, setPhone] = useState(value || "");

  const handleChange = ({ target: { value }}) => {
    value = value.slice(0, value.length - (value[value.length - 1] == ")" ? 2 : 0)).replace(/[\s()]/g, "");
    value = [value.slice(0, value[0] == "0" ? 3 : 2), value.slice(value[0] == "0" ? 3 : 2)]

    setPhone(value[0] ? `(${value[0]}) ${value[1]}` : "");

    if(typeof onChange == "function") {
      onChange(value[0] ? `${value[0]}${value[1]}` : "");
    };
  };

  return (
    <input onChange={handleChange} type="text" placeholder={placeholder} value={phone} />
  );
};

export default function Input({ onChange, title, placeholder, type, value, leftIcon, rightIcon }) {
  return (
    <Container>
      {title ? <Title>{title}</Title> : <></>}
      
      <Content>
        {leftIcon}
        <input
          onChange={({ target: { value: _value } }) => onChange(_value)}
          type={type}
          value={value}
          placeholder={placeholder}
        />
        {rightIcon}
      </Content>
    </Container>
  );
};