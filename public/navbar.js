function NavBar(){
  const [active, setActive] = React.useState(true);
  
  function Logout(){
    UserContext.Provider = {name: undefined, email: undefined, password: undefined, 
      account: undefined, password: undefined};
    window.location.href = '/#';
    setActive(false);
  }

  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">BadBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item" style={{display: (UserContext.Provider.name==undefined) ? 'block' : 'none'}}>
            <a className="nav-link" href="#/CreateAccount/">Create Account</a>
          </li>
          <li className="nav-item" style={{display: (UserContext.Provider.name==undefined) ? 'block' : 'none'}}>
            <a className="nav-link" href="#/login/">Login</a>
          </li>
          <li className="nav-item" style={{display: (UserContext.Provider.name==undefined) ? 'none' : 'block'}}>
            <a className="nav-link" href="#/deposit/">Deposit</a>
          </li>
          <li className="nav-item" style={{display: (UserContext.Provider.name==undefined) ? 'none' : 'block'}}>
            <a className="nav-link" href="#/withdraw/">Withdraw</a>
          </li>
          <li className="nav-item" style={{display: (UserContext.Provider.name==undefined) ? 'none' : 'block'}}>
            <a className="nav-link" href="#/balance/">Balance</a>
          </li>
          <li className="nav-item" style={{display: (UserContext.Provider.name==undefined) ? 'none' : 'block'}}>
            <a className="nav-link" href="#/transactions/">Transactions</a>
          </li>
          <li className="nav-item" style={{display: (UserContext.Provider.name==undefined) ? 'none' : 'block'}}>
            <a className="nav-link" href="#/alldata/">Accounts</a>
          </li>
          <li className="nav-item" style={{display: (UserContext.Provider.name==undefined) ? 'none' : 'block'}}>
            <a className="nav-link" href="#/myprofile/">My Profile: {UserContext.Provider.name}</a>
          </li>
          <li className="nav-item" style={{display: (UserContext.Provider.name==undefined) ? 'none' : 'block'}}>
            <a className="nav-link" href="#" onClick={()=>Logout()}>Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}