import { useEffect, useState, useRef } from "react";

export default function PieChart({ scale, data, color, length } = { }) {
  const [size, setSize] = useState(scale || 120);

  const canvasRef = useRef( );

  useEffect(( ) => {
    setSize(scale || size);

    const context = canvasRef.current.getContext("2d");

    PieChart.drawData(context, data, color, length);
  }, [data, scale]);

  return (
    <canvas ref={canvasRef} width={size} height={size} ></canvas>
  );
};

PieChart.PI = Math.PI * 2;

PieChart.drawArc = function(context, angle, percent, color, length = 1) {
  context.save( );

  context.beginPath( );

  context.translate((context.canvas.width / 2), (context.canvas.height / 2));
  context.rotate((angle) * (Math.PI));

  context.arc(0, 0, (context.canvas.width / 2) - 4, 0, PieChart.PI * percent);

  context.lineWidth = length;
  context.strokeStyle = color;
  context.stroke( );

  context.restore( );
};

PieChart.drawData = function(context, data, color = "#cccccc", length = 2) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  PieChart.drawArc(context, 0, 1, color, length);

  let x = 0;
  let total = data.reduce((t, { value }) => t += value, 0);

  let text = data.find(({ view }) => view);

  for(let { value, color } of data) {
    value = value / total;

    PieChart.drawArc(context, x, value, color, length);

    x += (value * 2);
  };

  if(text) {
    context.fillStyle = text.color;
    text = ((text.value / total) || 0) * 100;
    text = `${text.toFixed(2)} %`;
    
    let fontSize = (context.canvas.width * 0.175);

    context.font = fontSize + "px sans-serif";
    context.fillText(
      text,
      (context.canvas.width / 2) - (context.measureText(text).width / 2),
      (context.canvas.height / 2) + (fontSize / 2)
    );
  };
}