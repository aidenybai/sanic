import { useState, useRef, useEffect } from 'react';
import './App.css';

const profile = {
  mod_scheme: 'gmsk',
  checksum_scheme: 'crc32',
  inner_fec_scheme: 'v27',
  outer_fec_scheme: 'none',
  frame_length: 34,
  modulation: {
    center_frequency: 19000,
    gain: 0.02,
  },
  interpolation: {
    shape: 'rrcos',
    samples_per_symbol: 14,
    symbol_delay: 4,
    excess_bandwidth: 0.35,
  },
  encoder_filters: {
    dc_filter_alpha: 0.01,
  },
  resampler: {
    delay: 13,
    bandwidth: 0.45,
    attenuation: 60,
    filter_bank_size: 64,
  },
};

let created = false;
const createTransmitter = () => {
  if (created) return;
  created = true;
  return Quiet.transmitter({
    profile,
    onFinish: () => {},
  });
};

function App() {
  const [messages, setMessages] = useState([]);
  const [transmitter] = useState(createTransmitter());
  const inputRef = useRef();

  useEffect(() => {
    const onReceive = (payload) => {
      const newMessage = Quiet.ab2str(payload);
      console.log(newMessage);
    };

    window.Quiet.receiver({
      profile,
      onReceive,
    });
  }, []);

  return (
    <div className="App">
      <img src="/sanic.webp" className="logo" />
      <div className="card">
        <h1>Sanic</h1>
        <p>Imagine messaging but ultrasonic</p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            transmitter?.transmit(Quiet.str2ab(inputRef.current.value));
            setMessages([...messages, inputRef.current.value]);
          }}
        >
          <input ref={inputRef} type="text" name="message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
