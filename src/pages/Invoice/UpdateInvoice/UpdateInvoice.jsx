import React, { useEffect, useState } from 'react';
import styles from "./style.module.css"
import { toast } from 'react-toastify';
const UpdateInvoice = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${process.env.REACT_APP_BACKEND_Link}/invoice`, { signal });
                const result = await response.json();
                // const totalLength = result.length;
                // setCount(totalLength);
                setData(result);
                setIsLoading(false);
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    console.error('Error fetching data:', error);
                }
                setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            abortController.abort();
        };
    }, [])
    const [formData, setFormData] = useState({
        distributorName: '',
        invoiceNumber: '',
        amount: '',
        date: '',
        paymentType: '',
        comment: '',
        deliveredBy: '',
        billType: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formatDate = (date) => {
            const formattedDate = new Date(date).toISOString();
            return formattedDate;
        };
        const Uploaddata = {
            distributor_name: formData.distributorName,
            invoice_number: formData.invoiceNumber,
            amount: formData.amount,
            date: formatDate(formData.date),
            payment_type: formData.paymentType,
            comment: formData.comment,
            delivered_by: formData.deliveredBy,
            bill_type: formData.billType
        };
        fetch(`${process.env.REACT_APP_BACKEND_Link}/invoice/update/${formData.invoiceNumber}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Uploaddata)
        }).then(response => response.json())
            .then(data => {
                console.log('API response:', data);
                toast("data added")
                // Reset form data after successful submission
                setFormData({
                    distributorName: '',
                    invoiceNumber: '',
                    amount: '',
                    date: '',
                    paymentType: '',
                    comment: '',
                    deliveredBy: '',
                    billType: '',
                });
                alert('Invoice added successfully!');
            })
            .catch(error => {
                console.error('Error adding invoice:', error);
                alert('Error adding invoice. Please try again.');
            });
    };

    return (
        <div className={styles.main} >
            <h2>Update Invoice</h2>
            {
                !isLoading && <form className={styles.Addform} onSubmit={handleSubmit}>
                    <label>
                        Distributor Name:
                        <input
                            type="text"
                            name="distributorName"
                            value={formData.distributorName}
                            onChange={handleChange}
                            list="distributorList"
                        />
                        <datalist id="distributorList">
                            {[...new Set(data.map(item => item.distributor_name))].map((item, index) => (
                                <option key={index} value={item} />
                            ))}
                        </datalist>
                    </label>

                    <label>
                        Invoice Number:
                        <input
                            type="text"
                            name="invoiceNumber"
                            value={formData.invoiceNumber}
                            onChange={handleChange}
                            list="invoiceNumberList"
                        />
                        <datalist id="invoiceNumberList">
                            {[...new Set(data.map(item => item.invoice_number))].map((item, index) => (
                                <option key={index} value={item} />
                            ))}
                        </datalist>
                    </label>
                    <label>
                        Amount:
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            list="amountList"
                        />
                        <datalist id="amountList">
                            
                            {[...new Set(data.map(item => item.amount))].map((amount, index) => (
                                <option key={index} value={amount} />
                            ))}
                        </datalist>
                    </label>
                    <label>
                        Date:
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            list="dateList"
                        />
                        <datalist id="dateList">
                           
                            {data && [...new Set(data.map(item => item.date.slice(0, 10)))].map((date, index) => (
                                <option key={index} value={date} />
                            ))}
                        </datalist>
                    </label>
                    <label>
                        Payment Type:
                        <input
                            type="text"
                            name="paymentType"
                            value={formData.paymentType}
                            onChange={handleChange}
                            list="paymentTypeList"
                        />
                        <datalist id="paymentTypeList">
                            
                            {data && [...new Set(data.map(item => item.payment_type))].map((paymentType, index) => (
                                <option key={index} value={paymentType} />
                            ))}
                        </datalist>
                    </label>
                    <label>
                        Comment:
                        <input
                            type="text"
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            list="commentList"
                        />
                        <datalist id="commentList">
                           
                            {data && [...new Set(data.map(item => item.comment))].map((comment, index) => (
                                <option key={index} value={comment} />
                            ))}
                        </datalist>
                    </label>
                    <label>
                        Delivered By:
                        <input
                            type="text"
                            name="deliveredBy"
                            value={formData.deliveredBy}
                            onChange={handleChange}
                            list="deliveredByList"
                        />
                        <datalist id="deliveredByList">
                           
                            {data && [...new Set(data.map(item => item.delivered_by))].map((deliveredBy, index) => (
                                <option key={index} value={deliveredBy} />
                            ))}
                        </datalist>
                    </label>
                    <label>
                        Bill Type:
                        <input
                            type="text"
                            name="billType"
                            value={formData.billType}
                            onChange={handleChange}
                            list="billTypeList"
                        />
                        <datalist id="billTypeList">
                           
                            {data && [...new Set(data.map(item => item.bill_type))].map((billType, index) => (
                                <option key={index} value={billType} />
                            ))}
                        </datalist>
                    </label>
                    <button type="submit">Submit</button>
                </form>
            }

        </div>
    );
};

export default UpdateInvoice;
