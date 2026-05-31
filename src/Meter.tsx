import { useEffect, useRef, useState } from 'react'
import './Meter.css'

const segmentLength = 8;

const segmentImages: Record<string, string> = import.meta.glob('./assets/segments/*.png', {
  eager: true,
  import: 'default'
});

const segments: Record<string, string> = {};
for (const [path, url] of Object.entries(segmentImages)) {
  let name = path.match(/\/([^/]+)\.png$/)?.[1] ?? '';
  if (name === 'space') {
    name = ' ';
  }
  if (name === 'dot') {
    name = '.';
  }
  segments[name] = url;
}

function getTime() {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}.${minutes}.${seconds}`;
}

function Meter() {
  const [display, setDisplay] = useState<string>(getTime());
  const intervalID = useRef<ReturnType<typeof setInterval> | null>(null);

  const clock = () => {
    setDisplay(getTime());
  }

  useEffect(() => {
    intervalID.current = setInterval(clock, 1000);
    return () => {
      if (intervalID.current) {
        clearInterval(intervalID.current);
      }
    };
  }, []);

  const handleMeterClick = () => {
    if (intervalID.current) {
      clearInterval(intervalID.current);
      intervalID.current = null;
      setDisplay(Math.random().toString().slice(0, 8));
    } else {
      intervalID.current = setInterval(clock, 1000);
      clock();
    }
  };

  return (
    <div id='meter' onClick={handleMeterClick}>
      {Array.from({ length: segmentLength }, (_, i) => (
        <img key={i} src={display[i] in segments ? segments[display[i]] : segments[' ']} />
      ))}
    </div>
  )
}

export default Meter
