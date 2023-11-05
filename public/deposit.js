function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <>
    <NavBar />
    <div className="container" style={{padding: "20px"}}>
      <Card
        bgcolor="warning"
        header="Deposit"
        status={status}
        body={show ? 
          <DepositForm setShow={setShow} setStatus={setStatus}/> :
          <DepositMsg setShow={setShow} setStatus={setStatus}/>}
      />
    </div>
  </>

  )
}

function DepositMsg(props){
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
      }}>
        Deposit again
    </button>
  </>);
} 

function DepositForm(props){
  const [email, setEmail]   = React.useState(UserContext.Provider.email);
  const [amount, setAmount] = React.useState('');
  const [isDisabled, setisDisabled]   = React.useState(true);
  const [emailplaceholder, setemailplaceholder]   = React.useState();
  const [iniciator, setIniciator]   = React.useState(UserContext.Provider.email);

  function handle(){
    if (amount< 0) {
      props.setStatus('Digit a positive amount');
      return;
    }

    fetch(`/account/update/${email}/${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            isDisabled ? props.setStatus(`Updated Balance: ${JSON.stringify(data.value.balance)}`) : props.setStatus('');
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Deposit failed')
            console.log('err:', text);
        }})
    .then(fetch(`/transaction/create/${iniciator}/${email}/${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            console.log('Transaction saved');
        } catch(err) {
            props.setStatus('Transaction not saved');
            console.log('err:', text);
        }
    }));
  }

  function Checkbox(){
    if (isDisabled==true) {
      setisDisabled(false);
      setemailplaceholder('Enter email');
    }
    else {
      setisDisabled(true);
      setEmail(UserContext.Provider.email);
    }
  }

  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder={emailplaceholder} 
      value={email}
      onChange={e => setEmail(e.currentTarget.value)}
      disabled={isDisabled}/><br/>
      
    Amount<br/>
    <input type="number"
      min="0"
      className="form-control" 
      placeholder="Enter amount"
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <div className="form-check">
      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
        onChange={Checkbox}/>
      <label className="form-check-label" htmlFor="flexCheckDefault">
      Deposit to External Account
      </label>
    </div><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>

  </>);
}