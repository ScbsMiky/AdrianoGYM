export module Calendar {
  export const MonthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Novembro",
    "Outubro",
    "Dezembro",
  ];

  export function CreateDayList(date: Date) {
    date = new Date(date.getFullYear( ), date.getMonth( ) + 1, 0);

    return new Array(date.getDate( )).fill(0).map((_, index) => (index + 1).toString( ).padStart(2, "0"));
  };

  export function DateToInputValue(value: string) {
    let date = new Date(value);
    
    value = `${date.getFullYear( )}-${(date.getMonth( ) + 1).toString( ).padStart(2, "0")}-${date.getDate( ).toString( ).padStart(2, "0")}`;

    date = undefined!;

    return value;
  };
};