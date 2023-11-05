function Home(){
  return (
  <>
    <NavBar />
    <div>Hola</div>
    <div className="container" style={{padding: "20px"}}>
      <Card
        txtcolor="black"
        header="BadBank Landing Module"
        title="Welcome to the bank"
        text="You can move around using the navigation bar."
        body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
      />
    </div>
  </>
  );  
}
