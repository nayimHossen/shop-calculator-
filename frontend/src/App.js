import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const App = () => {
  const inputTemplate = {
    _id: 0,
    description: "",
    price: 0,
    quantity: 1,
    subtotal: 0,
  };

  const productId = useRef(1);
  const pId = Number(productId.current.value);
  console.log(typeof quan);
  const [loading, setLoading] = useState(false);
  const [loadData, setLoadData] = useState({});
  let sub;
  console.log("sub", sub);
  console.log("load api", loadData);

  const [inupFields, setInupFields] = useState([inputTemplate]);
  const [total, setTotal] = useState(0);

  //grand total sum
  useEffect(() => {
    let sum;
    sum = inupFields.map((input) => Number(input.subtotal) + 0);
    let total = sum.reduce(function (a, b) {
      return Number(a) + Number(b);
    }, 0);
    setTotal(total);
  }, [inupFields]);

  //add new input field
  const clickKeybord = (e) => {
    if (e.key === "Tab") {
      setInupFields([...inupFields, inputTemplate]);
    }
  };

  //delete input field
  const handleDelete = (index) => {
    const values = [...inupFields];
    values.splice(index, 1);
    setInupFields(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //update input value
  const onChangeInput = (e, index) => {
    const updatedValue = inupFields.map((inputField, i) =>
      index === i
        ? Object.assign(inputField, {
            [e.target.name]: e.target.value,
            description: loadData?.description,
            price: loadData?.price,
            [e.target.name]: e.target.value,
            [e.target.name]: e.target.value,
          })
        : inputField
    );
    setInupFields(updatedValue);
  };

  //fetch api by id
  useEffect(() => {
    if (pId <= 10 && pId > 0) {
      const loadPost = async () => {
        setLoading(true);
        const response = await axios.get(
          `https://calcu.onrender.com/api/v1/product/${pId}`
        );

        setLoadData(response.data.product);

        setLoading(false);
      };

      loadPost();
    } else {
      console.log(pId);
    }
  }, [pId]);

  return (
    <section
      className="container mx-auto px-5 sm:px-12 relative"
      onKeyDown={clickKeybord}
    >
      <h2 className="text-3xl font-bold text-center px-5 py-3 my-2 bg-slate-50 rounded">
        Calulate Products
      </h2>
      <span className="absulite">{loading && "Loading..."}</span>

      <form onSubmit={handleSubmit}>
        {inupFields.map((inupField, index) => (
          <div key={index} className="flex gap-1 mb-2">
            <input
              name="_id"
              type="number"
              className="border p-2"
              placeholder="product id"
              onChange={(e) => onChangeInput(e, index)}
              ref={productId}
            />

            <input
              name="description"
              type="text"
              value={inupField?.description}
              className="border p-2 w-full"
              placeholder="description"
              onChange={(e) => onChangeInput(e, index)}
            />

            <input
              name="price"
              type="number"
              value={inupField?.price}
              className="border p-2"
              placeholder="price"
              onChange={(e) => onChangeInput(e, index)}
            />

            <input
              name="quantity"
              type="number"
              value={inupField?.quantity}
              className="border p-2"
              placeholder="quantity"
              onChange={(e) => onChangeInput(e, index)}
            />

            <input
              name="subtotal"
              type="text"
              value={inupField?.subtotal}
              className="border p-2"
              placeholder="subtotal"
              onChange={(e) => onChangeInput(e, index)}
            />

            <button
              onClick={() => handleDelete(index)}
              className="bg-[#ff4545] roundex text-white p-2"
            >
              Delete
            </button>
          </div>
        ))}
        <div className="flex justify-between">
          <span className="p-2 bg-slate-50 w-[60%] border font-bold">
            Total
          </span>
          <span className="p-2 bg-slate-50 w-[60%] border text-center font-bold">
            {total}
          </span>
        </div>
      </form>
    </section>
  );
};

export default App;
