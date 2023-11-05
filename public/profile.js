function Profile(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
  <>
    <NavBar />
    <div className="container" style={{padding: "20px"}}>
      <Card
        bgcolor="danger"
        header="My Profile"
        status={status}
        body={show ? 
          <ProfileForm setShow={setShow} setStatus={setStatus}/> :
          <ProfileMsg setShow={setShow} setStatus={setStatus}/>}
      />
    </div>
  </>
  )
}

function ProfileMsg(props){
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
      }}>
        Update again
    </button>
  </>);
} 

function ProfileForm(props){
  const account                   = UserContext.Provider.account;
  const [name, setName]           = React.useState(UserContext.Provider.name);
  const [email, setEmail]         = React.useState(UserContext.Provider.email);
  const [password, setPassword]   = React.useState(UserContext.Provider.password);

  function handle(){
    if ((name=='') || (email=='') || (password=='')) {
      props.setStatus('Digit the three values');
      return;
    }
    fetch(`/user/update/${account}/${name}/${email}/${password}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            UserContext.Provider = {name: data.value.name, email: data.value.email, password: data.value.password, 
              account: data.value.account_id, password: data.value.password};
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('User not found')
            console.log('err:', text);
        }})
  }

  return(<>

    Name<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Update Name" 
      value={name}
      onChange={e => setName(e.currentTarget.value)}/><br/>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Update Email" 
      value={email}
      onChange={e => setEmail(e.currentTarget.value)}/><br/>
      
    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Update Password" 
      value={password}
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Update</button>

  </>);
}