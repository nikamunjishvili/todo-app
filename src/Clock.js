import React,{useState,useEffect} from 'react'
import './Clock.css';
const Clock = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()),1000)
        return () => clearInterval(timer)
    })
  return (
    <div  className="clock">
        <div className='ChildClock'>
        <p> {date.toLocaleTimeString()} </p>
        <p> {date.toLocaleDateString()} </p>
        </div>
    </div>
  )
}

export default Clock