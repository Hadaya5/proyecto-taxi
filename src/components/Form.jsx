import React, { useState } from 'react';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import { Map } from './Map';
import { formatDateTime } from '../utils/formatDateTime';


const Form = () => {
  const [selectedId, setSelectedId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPassengers, setSelectedPassengers] = useState(1);
  const [selectedTime, setSelectedTime] = useState(moment());
  const [latitudeBegin, setLatitudeBegin] = useState(40.714)
  const [longitudeBegin, setLongitudeBegin] = useState(-74.0059)
  const [latitudeEnd, setLatitudeEnd] = useState('')
  const [longitudeEnd, setLongitudeEnd] = useState('')

  const handleIdChange = (e) => {
    setSelectedId(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (value) => {
    setSelectedTime(value);
  };

  const handlePassengersChange = (e) => {
    setSelectedPassengers(e.target.value);
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
        idVendor: selectedId,
        numberPassengers: selectedPassengers,
        time: formatDateTime(selectedTime, selectedDate),
        latitudeBegin: latitudeBegin,
        longitudeBegin: longitudeBegin,
        latitudeEnd: latitudeEnd,
        longitudeEnd: longitudeEnd
    }
    console.log(data)

    // fetch('ENDPOINT', {
    //     method: "POST",
    //     headers: {"Content-type": "application/json; charset=UTF-8"},
    //     body: JSON.stringify(data)
    // })
    // .then(response => response.json()) 
    // .then(json => console.log(json))
    // .catch(err => console.log(err));

  };

  return (
    <div className="flex justify-center">
    <form onSubmit={handleSubmit} id="form-taxi">
      <div>
        <label htmlFor="idSelect">Selecciona un ID:</label>
        <select id="idSelect" value={selectedId} onChange={handleIdChange}>
          <option value="">Selecciona una empresa:</option>
          <option value="1">Uber</option>
          <option value="2">Yummy Rides</option>
        </select>
      </div>
      <div>
        <label htmlFor="passengers">Selecciona el número de pasajeros:</label>
        <input type="number" id="passengers" value={selectedPassengers} onChange={handlePassengersChange} />
      </div>
      <div>
        <label htmlFor="dateInput">Selecciona una fecha:</label>
        <input type="date" id="dateInput" value={selectedDate} onChange={handleDateChange} />
      </div>
      <div>
        <label htmlFor="timeInput">Selecciona el tiempo de inicio:</label>
        &nbsp;&nbsp;
        <TimePicker
            id="timeInput"
            showSecond={true}
            onChange={handleTimeChange}
            defaultValue={selectedTime}
            allowEmpty
        />
      </div>
      <div>
        <p>Selecciona la ubicación de inicio:</p>
        <Map 
          latitude={latitudeBegin} 
          longitude={longitudeBegin} 
          setLatitude={setLatitudeBegin} 
          setLongitude={setLongitudeBegin} 
        />
        <p>Selecciona la ubicación de llegada:</p>
        <Map 
          latitude={latitudeEnd} 
          longitude={longitudeEnd} 
          setLatitude={setLatitudeEnd} 
          setLongitude={setLongitudeEnd} 
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
    </div>
  );
};

export default Form;
