function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <>
    <NavBar />
    <div className="container" style={{padding: "20px"}}>
      <Card
        bgcolor="info"
        header="Balance"
        status={status}
        body={show ?
          <BalanceForm setShow={setShow} setStatus={setStatus}/> :
          <BalanceMsg setShow={setShow} setStatus={setStatus}/>}
      />
    </div>
  </>
  )
}

function BalanceMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props){
  const [email, setEmail]   = React.useState(UserContext.Provider.email);
  const [balance, setBalance] = React.useState('');  

  function handle(){
    fetch(`/account/findOne/${email}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(`Balance: ${JSON.stringify(data.balance)}`);
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
        }
    });
  }

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder={email} 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}
      disabled='true'/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>

  </>);
}