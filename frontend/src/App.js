import React, { useEffect, useState } from "react";

const App = () => {
  const inputTemplate = {
    _id: 0,
    description: "",
    price: 0,
    quantity: 1,
    subtotal: 0,
  };

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

  const onChangeInput = (e, index) => {
    const updatedValue = inupFields.map((inputField, i) =>
      index === i
        ? Object.assign(inputField, { [e.target.name]: e.target.value })
        : inputField
    );
    setInupFields(updatedValue);
  };
  return (
    <section
      className="container mx-auto px-5 sm:px-12"
      onKeyDown={clickKeybord}
    >
      <h2 className="text-3xl font-bold text-center px-5 py-3 my-2 bg-slate-50 rounded">
        Calulate Products
      </h2>

      <form onSubmit={handleSubmit}>
        {inupFields.map((inupField, index) => (
          <div key={index} className="flex gap-1 mb-2">
            <input
              name="_id"
              type="number"
              className="border p-2"
              placeholder="product id"
              onChange={(e) => onChangeInput(e, index)}
            />

            <input
              name="description"
              type="text"
              className="border p-2 w-full"
              placeholder="description"
              onChange={(e) => onChangeInput(e, index)}
            />

            <input
              name="price"
              type="number"
              className="border p-2"
              placeholder="price"
              onChange={(e) => onChangeInput(e, index)}
            />

            <input
              name="quantity"
              type="number"
              className="border p-2"
              placeholder="quantity"
              onChange={(e) => onChangeInput(e, index)}
            />

            <input
              name="subtotal"
              type="text"
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
          <span className="p-2 bg-slate-50 w-[60%] border text-center">
            {total}
          </span>
        </div>
      </form>
    </section>
  );
};

export default App;
