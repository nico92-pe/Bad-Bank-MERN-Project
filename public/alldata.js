function AllData(){
    const [data, setData] = React.useState('');
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        
        // fetch all accounts from API
        fetch('/account/all')
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
        <h5>Accounts:</h5>
            <table className="table table-striped table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th style={{ width: '20%' }}>Account</th>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '30%' }}>Email</th>
                        {/* <th>Balance</th> */}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => ( // Removed index since we use item._id for the key
                        <tr key={item._id}>
                            <td>{item.account_id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            {/* <td>{item.balance !== null ? item.balance : 'N/A'}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </>
    );
}
