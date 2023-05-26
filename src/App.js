import { useState, useEffect } from 'react';

function App() {

//First part given
const lineItems = [
  {
    id: 1,
    title: "Grey Sofa",
    price: 499.99,
    quantity: 1,
    image:"https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F2_Single_shot_DARK_GREY_OFF_OFF_SLOPE_17f0f115-11f8-4a78-b412-e9a2fea4748d.png%3Fv%3D1629310667&w=1920&q=75",
    swatchColor: "#959392",
    swatchTitle: "Grey"
  },
  {
    id: 2,
    title: "Blue Sofa",
    price: 994.99,
    quantity: 1,
    image:"https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F3_Seater_SofaSofa_Ottoman_Off_Arm_Configuration_Two_Arms_Arm_Design_Slope_Chaise_Off_Fabric_Navy_Blue2.png%3Fv%3D1629231450&w=1920&q=75",
    swatchColor: "#191944",
    swatchTitle: "Blue"
  },
  {
    id: 3,
    title: "White Sofa",
    price: 599.99,
    quantity: 1,
    image:"https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F2_Single_shot_IVORY_OFF_OFF_SLOPE_5379af1f-9318-4e37-b514-962d33d1ce64.png%3Fv%3D1629231450&w=1920&q=75",
    swatchColor: "#F8F1EC",
    swatchTitle: "White"
  },
];

// Styling variables
const BLUE = "#172162"; //"rgb(23, 33, 98)";
const LIGHT_GREY = "#6e7484";
const BLACK = "#000000";


const SUBTOTAL = 2094.97; // Moved this to state
const HST = 272.3461;  // Moved this to state
const TOTAL = 2382.3161; // Moved this to state
const ESTIMATED_DELIVERY = "Nov 24, 2021";

const [data, setData] = useState(lineItems);
const [subtotal, setSubtotal] = useState(0);
const [hst, setHst] = useState(0);
const [shippingFee, setShippingFee] = useState(15); // added flat shipping fee
const [total, setTotal] = useState(0);

// remove line item function
const removeLineItem = (lineItemId) => {
  const newLineItems = data.filter(item => item.id !== lineItemId);
  console.log(newLineItems);
  setData(newLineItems);
}

// add line item function
const addLineItem = () => {
  setData(data => [...data, {id: 4, title: "Grey Sofa", price: 499.99,quantity: 1, image:"https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F2_Single_shot_DARK_GREY_OFF_OFF_SLOPE_17f0f115-11f8-4a78-b412-e9a2fea4748d.png%3Fv%3D1629310667&w=1920&q=75", swatchColor: "#959392", swatchTitle: "Grey"}]
  )
}

// calculate fees function
const calculateFees = () => {
  let subtotal = 0;
  let hst = 0;
  let total = 0;

  data.map(item => {

    subtotal += item.price;
    hst = subtotal * 0.13;
    total = subtotal + hst + shippingFee;

    // update state 
    setSubtotal(subtotal);
    setHst(hst);
    setTotal(total);
  })
}

// load function on page load
useEffect(() => {
  calculateFees();
}, [data]);

  return (
     <div className="p-10 max-w-screen-lg mx-auto">
      <h2 className="text-5xl text-purple-900 mb-10 inline-block">Your Cart</h2>
      <button className='float-right text-green-700 border border-green-700 p-2' id="btn" onClick={addLineItem}>Add Item</button>
      <div>
        {data.map((item, i) => (
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
        <h3 className='ml-auto'>{shippingFee}</h3>
      </div>

       <div className='flex mb-2'>
        <h3 className='text-purple-900'>Total</h3>
        <h3 className='ml-auto text-purple-900'>${total.toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default App;
