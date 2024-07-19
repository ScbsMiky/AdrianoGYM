export type InputProps = {
  text: {
    value?: string;
  };

  date?: {
    value?: string;
  };

  number?: {
    value?: string;
  };

  select?: {
    value?: string;
    fields: [string, string][];
  }
};

export type IInput<T extends keyof InputProps> = InputProps[T] & {
  type?: T;
  name?: string;
  label?: string;

  children?: JSX.Element[ ] | JSX.Element;

  pattern?(event: EventTarget & HTMLInputElement): string;

  onChange?(value: string): void;
};