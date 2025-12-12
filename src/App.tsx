import { useState } from "react";
import "./index.css";

type Item = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];
function App() {
  const [items, setItems] = useState<Item[]>(initialItems);
  function handleAddItem(item: Item) {
    setItems(() => [...items, item]);
  }

  return (
    <>
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList items={items} />
      <Stats />
    </>
  );
}

function Logo() {
  return (
    <div>
      <h1>🌴 Far Away 🚌</h1>
    </div>
  );
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };
    //console.log(newItem);
    onAddItem(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3> The types of documents</h3>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name=""
          id=""
        />
        <button>Add</button>
      </form>
    </>
  );
}

function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} />
        ))}
      </ul>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Item({ item }: any) {
  return (
    <div>
      <span>
        {item.quantity}&nbsp;
        {item.description}
      </span>
    </div>
  );
}

function Stats() {
  return (
    <div className="stats">
      <p>There are X things are packed from X amount</p>
    </div>
  );
}
export default App;
