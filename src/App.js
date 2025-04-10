import './App.css';
import WeeklySummary from './DashboardPage';
import ApexChart from './expanse_tracker';
import DashboardPage from '.DashboardPage'

function App() {
  return (
    <div className="App">

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light" >
        <a className="navbar-brand" href="#">FinBuddy</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="expanse_tracker.js">Daily Expense Tracker <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Stock Insights</a>
            </li>
            {/* / */}
            <li className="nav-item">
              <a className="nav-link" href="#">Chatbot</a>
            </li>
            
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      

      
    </nav>
    {/* Main Content */}
    <div className="Tracker_parent">
        <h2 id="your">Your Expense Tracker</h2>
        <div className="chart-container">
          <ApexChart />
        </div>
      </div>

      <div className="Weekly=summary">
        <h2 id="your">Weekly summary</h2>
        <div className="summary">
          <WeeklySummary />
        </div>
      </div>

      <div className="Dashboard_page">
        <h2 id="your">Dashboard Page</h2>
        <div className="dashboard">
          < DashboardPage/>
        </div>
      </div>
  </div>
  );
}

export default App;
