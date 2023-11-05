function Login(props){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
  <>
    <NavBar />
    <div className="container" style={{padding: "20px"}}>
      <div style={{display: (UserContext.Provider.name==undefined) ? 'block' : 'none'}}>
        <Card
          bgcolor="secondary"
          header="Login"
          status={status}
          body={show ? 
            <LoginForm setShow={setShow} setStatus={setStatus}/> :
            <LoginMsg setShow={setShow} setStatus={setStatus}/>}
        />
      </div>
    </div>

  </>
  ) 
}

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
      <a className="btn btn-light" href="#">Go to my site</a>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function handle(){
    fetch(`/account/login/${email}/${password}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('');
            props.setShow(false);
            console.log('JSON:', data);
            UserContext.Provider = {name: data.name, email, password, account: data.account_id, password: data.password};
        } catch(err) {
            props.setStatus('Wrong credentials')
            console.log('err:', text);
        }
    });
  }
  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
   
  </>);
}