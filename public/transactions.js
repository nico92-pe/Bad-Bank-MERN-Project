function Transactions(){

  const [data, setData] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
      
      // fetch my transactions from API
      fetch(`/transactions/${UserContext.Provider.email}/${UserContext.Provider.email}`)
          .then(response => response.json())
          .then(data => {
              console.log(data);
              setData(data);                
              setLoading(false);
          });
  }, []);

  if (loading) {
      return <div>Loading...</div>;
  }

  return (
    <>
        <NavBar />
        <div className="container" style={{padding: "20px"}}>
            <h5>My Transactions:</h5>
            <table className="table table-striped table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th style={{ width: '15%' }}>Transaction id</th>
                        <th style={{ width: '25%' }}>Initiator</th>
                        <th style={{ width: '25%' }}>Beneficiary</th>
                        <th style={{ width: '25%' }}>Amount</th>
                        {/* <th>Balance</th> */}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => ( // Removed index since we use item._id for the key
                        <tr key={item._id}>
                            <td>{item.transaction_id}</td>
                            <td>{item.initiator}</td>
                            <td>{item.beneficiary}</td>
                            <td>{item.amount}</td>
                            {/* <td>{item.balance !== null ? item.balance : 'N/A'}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  );
}