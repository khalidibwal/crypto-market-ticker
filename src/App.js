import React, {useState, useEffect} from 'react'
// import {binanceTicker,GetAllasset} from './Database/Api'
import Table, { AvatarCell, SelectColumnFilter, StatusPill, ButtonCell, Curencydlr } from './Component/main/Table'
import {ContextGen} from './Context/ContextGen';
import axios from 'axios';

const App = () =>{
  const [tableData, setTableData] = useState([]);
  const [assetdata, setAssetData] = useState([]);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
    const columns = React.useMemo(() => [
        {
          Header: "Name",
          accessor: 'assetCode',
          Cell: AvatarCell,
          imgAccessor: "fullLogoUrl",
          emailAccessor: "assetName",
        },
        {
          Cell: Curencydlr,
          Header: "Last Price",
          accessor: 'freeUserChargeAmount',
        },
        {
          Header: "24h Change",
          accessor: 'status',
          Cell: StatusPill,
        },
        {
          Header: "Market Cap",
          accessor: 'age',
        },
        {
          Header: "Tags",
          accessor: 'tags',
          Filter: SelectColumnFilter,  // Filter Tags from crypto
          filter: 'includes',
        },
        {
          accessor: 'unknown',
          Cell: ButtonCell,
          filter: 'includes',
        },
      ], [])
    

    const getData = async() => {
      let endpoints = [
        'https://api.binance.com/api/v3/ticker/24hr',
        'https://www.binance.com/bapi/asset/v2/public/asset/asset/get-all-asset'
      ];
      
      // Return our response in the allData variable as an array
      await Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(([{data: ticker}, {data: asset}] )=> {
       setTableData(asset.data)
      });
       
      }
    
      useEffect(() => {
      const intervalId = setInterval(() => {
        getData()
      }, 5000)
      return () => clearInterval(intervalId); //refresh page 5 second because 2 second are just to short from my opinion
      }, []);

    
    return(
        <ContextGen.Provider value={{tableData, setTableData, assetdata,setAssetData, sortField, setSortField, order, setOrder}}>        
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <div className="">
                 <h1 className="text-xl font-semibold">Tailwind CSS</h1>
                </div>
                <div className="mt-6">
                <Table columns={columns} data={tableData}/>
                </div>
            </main>
            </div>
        </ContextGen.Provider>
    )
}

export default App
