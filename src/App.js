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
  const [department, setDepartment] = useState("");
  const [newId, setNewId] = useState(0);

  const userCollectionRef = collection(db, "users");

  const createUser = async () => {

    await addDoc(userCollectionRef,
      {
        name: newName,
        newId: Number(newId),
        department: department
      });
    clear();
  };


  const clear = () => {
    setNewName("");
    setNewId("");
    setDepartment("");

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
    <div>
      <h1 className="text-center text-sm">Rezaul Karim</h1>
      <h1 className="text-center pb-5 text-3xl font-semibold text-orange-500">Creat Read & delete Using  Google firebase</h1>
      <div >
        <div className="grid grid-cols-2">
          <div className="text-xl text-center my-5">
            <input
              onChange={(event) => {
                setNewName(event.target.value);
              }}
              type="text"
              placeholder="name"
              className="w-[400px] border py-2 mt-2 rounded-lg"
            />
            <br />
            <input
              onChange={(event) => {
                setNewId(event.target.value);
              }}
              type="number"
              placeholder="id"
              className="w-[400px] border py-2 mt-2 rounded-lg"
            />
            <br />
            <input
              onChange={(event) => {
                setDepartment(event.target.value);
              }}
              type="text"
              placeholder="department"
              className="w-[400px] border py-2 mt-2 rounded-lg"
            />
            <br />

            <button
              onClick={createUser}
              className="px-4 py-2 bg-green-600 w-[400px] border mt-2 hover:bg-[#3945eb] hover:rounded-lg"
            >
              Create User
            </button>


          </div>
          <div>
            <div className="grid grid-cols-4 font-bold my-5">
              <h1> Name</h1>
              <h1> Id </h1>
              <h1> Department </h1>
            </div>

            {users.map((user) => {
              return (
                <div key={user.id} className="grid grid-cols-4 border ">
                  <h1>{user.name}</h1>
                  <h1>{user.newId}</h1>
                  <h1>{user.department}</h1>
                  <button
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                    className=" py-1 bg-red-600 w-[15 %] border mt-2 hover:bg-[#111111] hover:text-white rounded-2xl"
                  >
                    Delete user
                  </button>
                </div>
              );
            })}
          </div>
        </div >
      </div>

    </div >
  );
}

export default App;
