import './App.css'
import React, {useState, useEffect} from 'react'
import CustomerService from './services/Customer'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'
import CustomerEdit from './CustomerEdit'

const CustomerList = ({setIsPositive, setShowMessage, setMessage})  => {

    // Komponentin tilan määritys
const [customers, setCustomers] = useState([])
const [showCustomers, setShowCustomers] = useState(false)
const [lisäystila, setLisäystila] = useState(false)
const [muokkausstila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaCustomer, setMuokattavaCustomer] = useState(false)
const [search, setSearch] = useState("")


useEffect(() => {
    CustomerService.getAll()
    .then(data => {
        setCustomers(data)
    })
},[lisäystila, reload, muokkausstila]
)

//Hakukentän onChange tapahtumankäsittelijä
const handleSearchInputChange = (event) => {
    setShowCustomers(true)
    setSearch(event.target.value.toLowerCase())
}

const editCustomer = (customer) => {
    setMuokattavaCustomer(customer)
    setMuokkaustila(true)
}

  return (
    <>
        <h2><nobr style={{ cursor: 'pointer' }}
                onClick={() => setShowCustomers(!showCustomers)}>Customers</nobr>

                {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h2>

                {!lisäystila && !muokkausstila &&
                <input placeholder="Search by company name" value={search} onChange={handleSearchInputChange} />
                }

                {lisäystila && <CustomerAdd setLisäystila={setLisäystila}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                />}

                {muokkausstila && <CustomerEdit setMuokkaustila={setMuokkaustila}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                muokattavaCustomer={muokattavaCustomer}
                />}


        {
            !lisäystila && !muokkausstila && showCustomers && customers && customers.map(c => 
                {
                    const lowerCaseName = c.companyName.toLowerCase()
                if (lowerCaseName.indexOf(search) > -1) {
                    return (
                        <Customer key={c.customerId} customer={c} reloadNow={reloadNow} reload={reload}
                        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                        editCustomer={editCustomer} />
                    )
                }
                }
            )
        }
    </>
  )
}

export default CustomerList