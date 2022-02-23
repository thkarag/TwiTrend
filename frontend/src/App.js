import logo from './twitter.svg'
import './App.css'
import { FaCrosshairs } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [trends, setTrends] = useState([])
  const [woeid, setWoeid] = useState('1')

  useEffect(() => getTrends(), [woeid])

  // Get parameter woeid from twitter api
  function getTrends() {
    axios
      .get('/api/trends', {
        params: {
          woeid,
        },
      })
      .then(response => {
        console.log(response.data)
        setTrends(response.data[0].trends)
      })
      .catch(error => console.log(error.message))
  }

  // Find geolocation of user
  function handleLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          axios
            .get('/api/near-me', {
              params: {
                lat: position.coords.latitude,
                long: position.coords.longitude,
              },
            })
            .then(response => {
              console.log(response.data[0].woeid)
              setWoeid(response.data[0].woeid)
            })
            .catch(error => console.log(error.message))
        },
        error => {
          console.log(error.message)
        }
      )
    } else {
      alert(`Geolocation not supported`)
    }
  }

  // List twitter trends
  function listTrends() {
    return (
      <ul>
        {trends.map((trend, index) => {
          return (
            <li key={index}>
              <a href={trend.url}>{trend.name}</a>
              {trend.tweet_volume && (
                <span className='tweet_volume'>{trend.tweet_volume}</span>
              )}
            </li>
          )
        })}
      </ul>
    )
  }
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='logo' alt='twitter' />
        <h3>TwiTrend</h3>
      </header>
      <div className='menu'>
        <select name='trending-place' onChange={e => setWoeid(e.target.value)}>
          <option value='1'>Worldwide</option>
          <option value='2459115'>New York,US</option>
          <option value='23424975'>United Kingdom</option>
          <option value='23424829'>Germany</option>
          <option value='23424833'>Greece</option>
          <option value='23424833'>Athens,GR</option>
          <option value='23424833'>Thessaloniki,GR</option>
          <option value='1105779'>Sydney,AU</option>
        </select>
        <div className='location' onClick={handleLocation}>
          <FaCrosshairs />
        </div>
      </div>
      <div className='content'>{listTrends()}</div>
    </div>
  )
}

export default App
