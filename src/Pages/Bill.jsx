import axios from 'axios'
import React, { useEffect } from 'react'
import { API } from '../global'
import { Button } from "antd"
import { useReactToPrint } from 'react-to-print';
import ReactToPrint from 'react-to-print';


function Bill() {

    const componentRef = React.useRef(null)

    const [billData, setBillData] = React.useState([])

    const getAllBills = () => {
        axios.get(`${API}/bills/get-bill`)
            .then((res) => {
                console.log(res.data)
                setBillData(res.data)
            })
    }


    useEffect(() => {
        getAllBills()
    }, [])

    console.log(billData)

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    // const reactToPrintContent = React.useCallback(() => {
    //     return componentRef.current
    // }, [componentRef.current])

    return (
        <div>
            <h1>Bill Details</h1>
            <table className='table table-bordered' ref={componentRef}>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Customer Phone Number</th>
                        <th>SubTotal</th>
                    </tr>
                </thead>
                <tbody>
                    {billData.map((item) => {
                        return (
                            <tr>
                                <td>{item.customerName}</td>
                                <td>{item.customerPhoneNumber}</td>
                                <td>{item.subTotal}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Button type="primary" onClick={handlePrint}>print Bill</Button>

            {/* <ReactToPrint
                content={reactToPrintContent}
                documentTitle="AwesomeFileName"

            /> */}

        </div>
    )
}

export default Bill