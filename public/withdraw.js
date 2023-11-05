function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <>
      <NavBar />
      <div className="container" style={{padding: "20px"}}>
        <Card
          bgcolor="success"
          header="Withdraw"
          status={status}
          body={show ? 
            <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
            <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
        />
      </div>
    </>
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  const [amount, setAmount] = React.useState('');

  function handle(){
    if (amount=='') {
      props.setStatus('Deposit failed');
      return;
    }
    if (amount< 0) {
      props.setStatus('Digit a positive amount');
      //props.setStatus('Deposit failed');
      return;
    } 

    fetch(`/account/update/${UserContext.Provider.email}/-${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(`Updated Balance: ${JSON.stringify(data.value.balance)}`);
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Deposit failed');
            console.log('err:', text);
        }
    })
    .then(fetch(`/transaction/create/${UserContext.Provider.email}/${UserContext.Provider.email}/-${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            console.log('Transaction saved');
        } catch(err) {
            props.setStatus('Transaction not saved');
            console.log('err:', text);
        }
    }))    
    ;
  }

  return(<>

    Amount<br/>
    <input type="number"
      min="0"
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}
