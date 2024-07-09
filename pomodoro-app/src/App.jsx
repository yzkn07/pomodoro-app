import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(1500)
  const [isActive, setIsActive] = useState(false)
  const [isSession, setIsSession] = useState(true)

    useEffect(() => {
      let interval = null
      if (isActive) {
        interval = setInterval(() => {
          setTime((time) => (time > 0 ? time - 1 : 0))
        }, 1000);
      } else if (!isActive && time !== 0) {
        clearInterval(interval)
      }
    
      return () =>  clearInterval(interval);
      
    }, [isActive, time])
    
    useEffect(() => {
      if (time === 0) {
        alert(isSession ? "çalışma süresi bitti" : "mola bitti")
        setIsSession(!isSession)
        setTime(isSession ?  300 : 1500)
        setIsActive(false)
      }
    }, [time, isSession])

    const toggle = () => {
      setIsActive(!isActive);
    };
  
    const reset = () => {
      setIsActive(false);
      setTime(isSession ? 1500 : 300);
    };
    
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
  

  return (
    <div className="App">
      <h1>{isSession ? 'Çalışma Süresi' : 'Mola Süresi'}</h1>
      <div className="time">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={toggle}>{isActive ? 'Durdur' : 'Başlat'}</button>
        <button onClick={reset}>Sıfırla</button>
      </div>
    </div>
  )
}

export default App
