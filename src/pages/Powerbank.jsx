import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import BatteryItem from '../components/BatteryItem'
import '../styles/powerbank.css'
import { get_powerbank_status, borrow_laew } from '../services/pw_data'
import back from "../assets/back.png"


function Powerbank() {

  const navigate = useNavigate();

  const [powerbankInfo, setPowerbankInfo] = useState({})
  const {id} = useParams()
  const [uid, setUid] = useState("");
  const [upw, setUpw] = useState("");
  const [loginStatus, setLoginStatus] = useState(0);
  /// state 0 = not loged in
  /// state 1 = success
  /// state 2 = incorrect password
  /// state 3 = blacklisted

  useEffect(() => {
    const fetchData = async () => {
      get_powerbank_status(id).then(data => {
        setPowerbankInfo(data)
        if (data.borrow_mai == 1) {
          navigate(`../../inuse/${data.powerbank_ID}`)
        } else if (data.yu_mai == 0) {
          navigate("../../")
        }
      })
    };

    const intervalId = setInterval(fetchData, 300);
    return () => clearInterval(intervalId);
  }, [])

  const borrowHandler = async () => {
    try {
      if (uid == "" || upw == "") {
        setLoginStatus(2)
        return
      }
      await borrow_laew(uid, upw, powerbankInfo.powerbank_ID)
      setLoginStatus(1)
      navigate(`../../inuse/${powerbankInfo.powerbank_ID}`)
    } catch(err) {
      if (err.response.status == 401) {
        setLoginStatus(2)
      } else if (err.response.status == 402) {
        setLoginStatus(3)
      }
      
    }
  }

  const borderStyle = {
    border: "2px solid red"
  }

  return (
    <div className='powerbank-container'>

      <div className='powerbank-info-container'>
        <Link to='/' className='back-button'>
          {/* <h2>Back</h2> */}
          <img src={back} alt="back-button" className='back-arrow'/>

        </Link>
        <BatteryItem {...powerbankInfo} className="battery-icon"/>
        <form className='user-login'>
            <div className='inputtext'>
              <label>User ID</label>
              <input
                type="number"
                value={uid}
                onChange={e => setUid(e.target.value)}
                style={loginStatus ? {...borderStyle} : {}}
              />
            </div>
            <div className='inputtext'>
              <label>Password</label>
              <input
                type="password"
                value={upw}
                onChange={e => setUpw(e.target.value)}
                style={loginStatus ? {...borderStyle} : {}}
              />
            </div>
            <a className='forgot' href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">FORGOT PASSWORD ?</a>
        </form>
        { loginStatus == 2 ? <p className='warning-text'>{"INCORRECT USERNAME OR PASSWORD"}</p> : null}
        { loginStatus == 3 ? <p className='warning-text'>{"THIS USER CAN’T BORROW RIGHT NOW PLEASE CONTACT OUR STAFF"}</p> : null}
        <button className='borrow-button' onClick={borrowHandler} >BORROW NOW !</button>
      </div>
    </div>
  )
}

export default Powerbank