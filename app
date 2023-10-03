import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { db } from "./Firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

function App() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newId, setNewId] = useState(0);
  const [updateValue, setUpdateValue] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  const userCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(userCollectionRef, { name: newName, age: Number(newId) });
  };

  const updateUser = async () => {
    if (!selectedUserId || !updateValue) {
      // Ensure a user is selected and an update value is provided
      return;
    }
    const userDoc = doc(db, "users", selectedUserId);
    const updateFields = {};
    updateFields["name"] = updateValue;
    await updateDoc(userDoc, updateFields);
    setSelectedUserId(null); // Clear the selected user
    setUpdateValue("");
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [userCollectionRef]);

  return (
    <div className="text-xl text-center my-20">
      <input
        onChange={(event) => {
          setNewName(event.target.value);
        }}
        type="text"
        placeholder="name"
        className="w-[400px] border py-2 mt-2"
      />
      <br />
      <input
        onChange={(event) => {
          setNewId(event.target.value);
        }}
        type="number"
        placeholder="id"
        className="w-[400px] border py-2 mt-2"
      />
      <br />

      <button
        onClick={createUser}
        className="px-4 py-3 bg-green-600 w-[400px] border mt-2 hover:bg-[#f2668b]"
      >
        Create User
      </button>

      <div className="flex justify-evenly font-bold my-5">
        <h1> Name</h1>
        <h1> Id </h1>
      </div>

      {users.map((user) => {
        return (
          <div key={user.id} className="flex border justify-evenly">
            <h1>{user.name}</h1>
            <h1>{user.age}</h1>

            <button
              onClick={() => {
                setSelectedUserId(user.id); // Set the selected user ID
              }}
              className="px-2 py-2 bg-blue-600 w-[15%] border mt-2 hover:bg-[#f2668b] rounded-2xl"
            >
              Select User
            </button>

            <button
              onClick={updateUser}
              className="px-2 py-2 bg-green-600 w-[15%] border mt-2 hover:bg-[#f2668b] rounded-2xl"
            >
              Update User
            </button>

            <button
              onClick={() => {
                deleteUser(user.id);
              }}
              className="px-2 py-2 bg-red-600 w-[15%] border mt-2 hover:bg-[#f2668b] rounded-2xl"
            >
              Delete user
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
