import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

function Body() {
  const [addTodoModal, setAddTodoModal] = useState(false);
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [user] = useAuthState(auth);

  const addTodo = (e) => {
    e.preventDefault();

    setAddTodoModal(false);

    addDoc(collection(db, `user/${user?.uid}/todos`), {
      todoName: input,
      status: false,
      time: serverTimestamp(),
    })
      .then(() => console.log("Todo Added"))
      .catch((err) => alert(err.message));

    setInput("");
  };

  useEffect(() => {
    onSnapshot(
      query(collection(db, `user/${user?.uid}/todos`), orderBy("time", "desc")),
      (snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todoName: doc.data().todoName,
            time: doc.data().time,
            status: doc.data().status,
          }))
        );
      }
    );
  }, [user]);

  return (
    <div>
      <div className="flex items-center justify-between p-5">
        <h1 className="text-3xl font-bold">My Todos</h1>
        <button
          onClick={() => setAddTodoModal(true)}
          className="bg-green-500 p-3 text-white text-sm font-bold rounded-lg hover:scale-110 transition-all duration-200 ease-in-out"
        >
          Add Todo
        </button>
      </div>

      {/* Todo Entry Bar */}
      <div>
        {addTodoModal && (
          <div className=" flex items-center justify-between px-20 mt-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Enter your Todo "
              className="border p-2 flex-1 outline-none rounded-lg"
            />
            <button
              onClick={addTodo}
              className="bg-green-500 p-3 text-white text-sm font-bold rounded-lg hover:scale-110 transition-all duration-200 ease-in-out ml-3"
            >
              Add
            </button>
          </div>
        )}
      </div>

      {/* Full Todo List */}
      <div className="p-5">
        {todos?.map((todo) => (
          <TodoCard
            key={todo.id}
            id={todo.id}
            todoName={todo?.todoName}
            time={todo.time?.toDate().getTime()}
            status={todo?.status}
          />
        ))}
      </div>
    </div>
  );
}

export default Body;
