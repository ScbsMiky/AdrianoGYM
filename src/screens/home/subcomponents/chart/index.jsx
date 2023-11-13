import { useEffect, useRef, useState } from "react";
import { Container } from "./styles";
import DonutChart from "react-donut-chart";

export default function Chart({ paid, upcoming, due }) {
  const canvas = useRef( );
  
  const [total, setTotal] = useState(paid + upcoming + due);
  const [percents, setPercent] = useState({ due: 0, paid: 0, upcoming: 0 });

  useEffect(( ) => {  
    setTotal(paid + upcoming + due);

    setPercent({
      due: (due / total) * 100,
      paid: (paid / total) * 100,
      upcoming: (upcoming / total) * 100
    });
  }, [paid, upcoming, due]);

  return (
    <Container>
      
    </Container>
  );
};