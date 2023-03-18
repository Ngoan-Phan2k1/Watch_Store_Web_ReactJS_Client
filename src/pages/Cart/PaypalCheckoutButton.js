import { useState } from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";

const PaypalCheckoutButton = (props) => {
    // const { sanpham } = props;
    // console.log(sanpham);
    const { total } = props;
    console.log(total);
    
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);

    const handleApprove = (orderId) => {
        setPaidFor(true);
    };

    if(paidFor){
        alert("Cam on da mua hang");
    }

    if(error){
        alert(error);
    }

    return( <PayPalButtons
                style={{
                    color: "silver",
                    layout: "horizontal",
                    height: 48,
                    tagline: false,
                    
                    
                }}

                onClick={(data, actions) => {
                    // const hasAlreadyBought = false;
                    // if(hasAlreadyBought){
                    //     setError("You already bought this product");
                    //     return actions.reject()
                    // }
                    // else{
                    //     return actions.resolve();
                    // }

                    //window.location.reload();

                    const hasAlreadyBought = true;
                    if(hasAlreadyBought){
                        //setError("This Page will reload");
                       
                        window.location.reload();
                        return actions.reject();
                    }
                    else{
                        return actions.resolve();
                    }
                }}

                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                // desciption: sanpham.description,
                                amount: {
                                    // currency: sanpham.currency,
                                    //value: sanpham.price
                                    value: total
                                }

                            }
                        ]
                    });
                }}

                onApprove={async(data, actions) => {
                    const order = await actions.order.capture();
                    console.log("order", order)

                    handleApprove(data.orderID);
                }}

                onCancel={() => {

                }}

                onError={(err) => {
                    setError(err);
                    console.log("Paypal Checkout onError", err);
                }}
            />
        )   
};

export default PaypalCheckoutButton;