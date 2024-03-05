import React, { useEffect, useState } from 'react';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import { Map } from './Map';
import { formatDateTime } from '../utils/formatDateTime';
import "../styles/Modal.css";

const Form = () => {
  const [selectedId, setSelectedId] = useState('1');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPassengers, setSelectedPassengers] = useState(1);
  const [selectedTime, setSelectedTime] = useState(moment());
  const [latitudeBegin, setLatitudeBegin] = useState(40.714)
  const [longitudeBegin, setLongitudeBegin] = useState(-74.0059)
  const [latitudeEnd, setLatitudeEnd] = useState('')
  const [longitudeEnd, setLongitudeEnd] = useState('')
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [travelTime, setTravelTime] = useState(0);

  const toggleModal = () => {
    setModal(!modal);

    if(!loading){
      setLoading(true);
    }
  };

  useEffect(() => {
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }
  }, [modal])

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

    toggleModal();

    //TO DO: Borrar
    setTimeout(() => {
      setTravelTime(123)
      setLoading(false)
    }, 3000)

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
      <h2 id='title'>Predecir duración del viaje</h2>
      <hr />
      <div>
        <label htmlFor="idSelect">Seleccione una empresa:</label>
        <select id="idSelect" value={selectedId} onChange={handleIdChange}>
          <option value="1">Uber</option>
          <option value="2">Yummy Rides</option>
        </select>
      </div>
      <div>
        <label htmlFor="passengers">Seleccione el número de pasajeros:</label>
        <input type="number" id="passengers" value={selectedPassengers} onChange={handlePassengersChange} />
      </div>
      <div>
        <label htmlFor="dateInput">Seleccione una fecha:</label>
        <input type="date" id="dateInput" value={selectedDate} onChange={handleDateChange} />
      </div>
      <div>
        <label htmlFor="timeInput">Seleccione la hora de inicio:</label>
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
        <p className='location-text'>Seleccione la ubicación de inicio:</p>
        <Map 
          latitude={latitudeBegin} 
          longitude={longitudeBegin} 
          setLatitude={setLatitudeBegin} 
          setLongitude={setLongitudeBegin} 
        />
        <p className='location-text'>Seleccione la ubicación de llegada:</p>
        <Map 
          latitude={latitudeEnd} 
          longitude={longitudeEnd} 
          setLatitude={setLatitudeEnd} 
          setLongitude={setLongitudeEnd} 
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
    {modal && 
      <div className="modal">
        <div onClick={toggleModal} className="overlay"></div>
        <div className="modal-content">

          {loading
            ?
              <h3>Cargando predicción...</h3>
            :
              <h3>La duración del viaje será de: {travelTime} segundos</h3>
          }
          <button className="close-modal" onClick={toggleModal}>
            <b>X</b>
          </button>
        </div>
    </div>
    }
    </div>
  );
};

export default Form;
