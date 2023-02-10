import '../App.css'
import BatteryItem from '../components/BatteryItem'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

function Home() {

  const testData = [{id:"001", cap:"3000", battery:"80", borrow_mai:"0", yu_mai:"0"},
    {id:"002", cap:"3000", battery:"80", borrow_mai:"0", yu_mai:"1"},
    {id:"003", cap:"3000", battery:"80", borrow_mai:"1", yu_mai:"0"},
    {id:"004", cap:"3000", battery:"80", borrow_mai:"1", yu_mai:"1"}
  ]

  return (
    <div className="App">
      <div className="banner-container">
        <img src={logo} alt="banner-logo" />
        <div className="logo-text">
          <h2 className='first-line-banner-text'>Power Bank</h2>
          <h2 className='second-line-banner-text'>Lender</h2>
        </div>
      </div>

      <div className="card-container">
        {testData.map((data) => {
          return (
            <Link to={`/powerbank/${parseInt(data.id)}`}>
              <BatteryItem {...data}/>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Home
