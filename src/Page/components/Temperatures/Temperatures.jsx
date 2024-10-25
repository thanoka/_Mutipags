import { useEffect, useState } from "react";
import Variable from "../Variable/Variable";

import "./Temperatures.css";
function Temperature() {
  const [celsius, setCelsius] = useState(0);
  const [fahrenheit, setFahrenheit] = useState(32);
  const [kelvin, setKelvin] = useState(273.15);

  useEffect(() => {
    setFahrenheit((celsius * 9) / 5 + 32);
    setKelvin(celsius + 273.15);
  }, [celsius]);

 
  useEffect(() => {
    setCelsius(((fahrenheit - 32) * 5) / 9);
    setKelvin(((fahrenheit - 32) * 5) / 9 + 273.15);
  }, [fahrenheit]);

  
  useEffect(() => {
    setCelsius(kelvin - 273.15);
    setFahrenheit(((kelvin - 273.15) * 9) / 5 + 32);
  }, [kelvin]);
  return (
    <div className="temperature-container">
      <h3>TEMPERATURE</h3>
      <div className="temperature-display">
        <div className="badge bg-primary">{celsius.toFixed(2)} &deg;C</div>
        <div className="badge bg-primary">{fahrenheit.toFixed(2)} &deg;F</div>
        <div className="badge bg-primary">{kelvin.toFixed(2)} &deg;K</div>
      </div>
      <div className="temparature-value">
        <Variable name="CELSIUS" value={celsius} setValue={setCelsius} />
        <Variable name="FAHRENHEIT" value={fahrenheit} setValue={setFahrenheit}/>
        <Variable name="KELVIN" value={kelvin} setValue={setKelvin}/>
      </div>
    </div>
  );
}

export default Temperature;
