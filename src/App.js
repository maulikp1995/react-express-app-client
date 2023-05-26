import { useState, useEffect } from 'react';

function App() {

const ESTIMATED_DELIVERY = "Nov 24, 2021";

// const [data, setData] = useState([]);
const [expressData, setExpressData] = useState([]);
const [subtotal, setSubtotal] = useState(0);
const [hst, setHst] = useState(0);
const [shippingFee] = useState(15); // added flat shipping fee
const [total, setTotal] = useState(0);

// remove line item function
const removeLineItem = (lineItemId) => {
  const newLineItems = expressData.filter(item => item.id !== lineItemId);
  setExpressData(newLineItems);
}

// add line item function
const addLineItem = () => {
  setExpressData(expressData => [...expressData, {id: 4, title: "Grey Sofa", price: 499.99,quantity: 1, image:"https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F2_Single_shot_DARK_GREY_OFF_OFF_SLOPE_17f0f115-11f8-4a78-b412-e9a2fea4748d.png%3Fv%3D1629310667&w=1920&q=75", swatchColor: "#959392", swatchTitle: "Grey"}]
  )
}

// calculate fees function
const calculateFees = () => {
  let subtotal = 0;
  let hst = 0;
  let total = 0;

  expressData.map(item => {

    subtotal += item.price;
    hst = subtotal * 0.13;
    total = subtotal + hst + shippingFee;

    // update state 
    setSubtotal(subtotal);
    setHst(hst);
    setTotal(total);
  })
}

// handle postal code input post request
const handleChange = async (e) =>{
  console.log(e.target.value);

  const cartLineItems = expressData.map(item => item.id);

  const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          { 
            postal: e.target.value, ids:cartLineItems
          }
        )
    };

    const response = await fetch('/api', requestOptions);
    const data = await response.json();

    // update state with new data
    setExpressData(data.lineItems);
}

// fetch data useEffect
useEffect(() => {
  fetch('/api').then(res => res.json()).then(data => {
    setExpressData(data.lineItems);
  })
  .catch((err) => {
    console.log(err.message);
  });
}, []);

// load function on page load
useEffect(() => {
  calculateFees();
}, [expressData]);

console.log(expressData);

  return (
    <div className="p-10 max-w-screen-lg mx-auto">
      <h2 className="text-5xl text-purple-900 mb-10 inline-block">Your Cart</h2>
      <button className='float-right text-green-700 border border-green-700 p-2' id="btn" onClick={addLineItem}>Add Item</button>
      <div>
        {expressData.map((item, i) => (
          <div className='flex gap-8 mb-10' key={i}>
            <img className='w-32 md:w-80' src={item.image} alt={item.title} />

            <div className='grow'>
              <h3 className=' text-purple-900 mb-1 font-bold md:mb-5 md:text-xl'>{item.title}</h3>
              <div className="w-5 h-5 rounded-full border-gray-400 border relative md:w-8 md:h-8" style={{backgroundColor: item.swatchColor}}> 
                <span className='text-xs absolute left-6 top-1/2 transform -translate-y-1/2 md:left-12 md:text-base'>{item.swatchTitle}</span>
              </div>
            </div>

            <div className='text-right'>
              <h3 className='font-bold'>${item.price}</h3>
              <h3 className='text-xs mt-2  md:mt-10 md:text-base'>Estimated Delivery Date: 
                <span className='text-purple-900 block md:inline'>{item.estimatedDeliveryDate ? item.estimatedDeliveryDate : ESTIMATED_DELIVERY}</span>
              </h3>
              <button className='mt-3 font-bold underline' id="btn" onClick={() => removeLineItem(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className='flex mb-2'>
        <h3>Subtotal</h3>
        <h3 className='ml-auto'>${subtotal.toFixed(2)}</h3>
      </div>

       <div className='flex mb-2'>
        <h3>Taxes (estimated)</h3>
        <h3 className='ml-auto'>${hst.toFixed(2)}</h3>
      </div>

       <div className='flex mb-10'>
        <h3>Shipping</h3>
        <h3 className='ml-auto'>${shippingFee}</h3>
      </div>

       <div className='flex mb-2'>
        <h3 className='text-purple-900'>Total</h3>
        <h3 className='ml-auto text-purple-900'>${total.toFixed(2)}</h3>
      </div>

      <div className='flex mb-2'>
        <h3 className=''>Postal Code</h3>
        <h3 className='ml-auto text-purple-900'>
          <input className='border rounded border-purple-900 px-2 w-20' onChange={handleChange}/>
        </h3>
      </div>
      
    </div>
  );
}

export default App;
