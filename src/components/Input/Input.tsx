import { IInput, InputProps } from "./types";
import { InputStyled } from "./styles";
import { forwardRef, useEffect, useRef } from "react";

export const patterns = {
  text: (event: EventTarget & HTMLInputElement) => event.value,
  date: (event: EventTarget & HTMLInputElement) => event.value,
  number: (event: EventTarget & HTMLInputElement) => event.value,
  select: (event: EventTarget & HTMLInputElement) => event.value,

  cpf: (event: EventTarget & HTMLInputElement) => {
    let end = event.selectionEnd ?? 0;
    let start = event.selectionStart ?? 0;

    event.value = event.value.replace(/\D/g, "");

    // 123 4
    if(event.value.length >= 4) {
      event.value = `${event.value.slice(0, 3)}.${event.value.slice(3)}`;
    };

    // 123 456 7
    if(event.value.length >= 7) {
      event.value = `${event.value.slice(0, 7)}.${event.value.slice(7)}`;
    };

    // 123 456 789 1
    if(event.value.length >= 11) {
      event.value = `${event.value.slice(0, 11)}-${event.value.slice(11, 13)}`;
    };

    if(event.value.length == 5 || event.value.length == 8 || event.value.length == 12) {
      end ++;
      start ++;
    };

    event.selectionEnd = end;
    event.selectionStart = start;

    return event.value;
  },

  phone: (event: EventTarget & HTMLInputElement) => {
    let end = event.selectionEnd ?? 0;
    let start = event.selectionStart ?? 0;

    event.value = event.value.replace(/\D/g, "");

    let [ddd, first, second] = [event.value.slice(0, 2), event.value.slice(2, 7), event.value.slice(7, 12)];

    if(event.value.length >= 2) event.value = `${ddd} `;
    if(first) event.value = `${ddd} ${first}`;
    if(second) event.value = `${ddd} ${first}-${second}`;

    // (23)
    if(event.value.length <= 4) {
      end += 3;
      start += 3;
    };

    // (23) 67891
    if(event.value.length == 10) {
      end ++;
      start ++;
    };
    
    event.selectionEnd = end;
    event.selectionStart = start;

    return event.value;
  }
};

export default forwardRef<HTMLInputElement, IInput<keyof InputProps>>((props, _ref) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(( ) => {
    if(!ref.current || !props.value) return;

    const input = ref.current.querySelector("input")!;

    input.value = props.value;
  
    (props.pattern || patterns[props.type || "text"])(input);

    if(input.value.length) {
      ref.current.classList.add("focus");
    };
  }, [props]);

  return (
    <InputStyled ref={ref} data-label={props.label}>
      <input
        ref={_ref}

        onKeyUp={({ currentTarget, key }) => {
          if(props.pattern && props.pattern.name == "phone" && key == "Backspace" && currentTarget.value.length == 3) {
            if(currentTarget.selectionStart == 1) currentTarget.value = currentTarget.value.slice(1);
            else if(currentTarget.selectionStart == 2 || currentTarget.selectionStart == 3) currentTarget.value = currentTarget.value[0];
          };
        }}

        onChange={({ currentTarget }) => (props.pattern || patterns[props.type || "text"])(currentTarget)}
        
        onFocus={( ) => ref.current ? ref.current.classList.add("focus") : null}
        onBlur={({ currentTarget: { value } }) => (ref.current && !value.length) ? ref.current.classList.remove("focus") : null}

        defaultValue={props.value}
        type={props.type == "date" ? "date" : "text"}
        
        name={props.name}
      />
    </InputStyled>
  );
});