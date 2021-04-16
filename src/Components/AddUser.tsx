import { fetchAndDispatch } from "../utils/actions";
const AddUser = () => {
  const addUserData = () => {
    fetchAndDispatch();
  };
  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={addUserData}>Add user</button>
    </div>
  );
};

export default AddUser;
