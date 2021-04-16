import React from "react";
const UserComponent = () => {
  console.log("ran");
  // const { count } = useStore(UserComponent);
  // console.log(count);
  const [u, su] = React.useState([]);
  const [l, sl] = React.useState(false);
  React.useEffect(() => {
    sl(true);
    const arr: Array<Promise<Response>> = [];
    for (let i = 0; i < 5; i++) {
      arr.push(fetch("https://jsonplaceholder.typicode.com/users/" + (i + 1)));
    }
    Promise.all(arr)
      .then((res) => {
        const arr: Array<Promise<Response>> = [];
        res.forEach((x) => {
          arr.push(x.json());
        });
        return Promise.all(arr);
      })
      .then((res) => {
        su(res as never[]);
        sl(false);
        // console.log(res);
        // let arr = res.map((x) => x.results[0]);
        // console.log(arr);
        // store.dispatch({
        //   type: "LOADED",
        // });
        // store.dispatch({
        //   type: "ADD_USER",
        //   payload: res,
        // });
      });
  }, []);
  const addone = () => {
    fetch(
      "https://jsonplaceholder.typicode.com/users/" +
        (Math.floor(Math.random() * 9) + 1)
    )
      .then((res) => res.json())
      .then((res) => {
        su([...u, res as never]);
      });
  };
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          maxWidth: "1080px",
          margin: "0 auto",
          // backgroundColor: "red",
          flexWrap: "wrap",
        }}
      >
        {l ? "Loading" : u.length ? <Users data={u} /> : "no data"}
      </div>
      <AddUser handler={addone} />
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Users = (props: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return props.data.map((x: any) => {
    return (
      <div key={Math.floor(Math.random() * 10000000)} className="flex-center">
        <p>{x.name}</p>
        <img src="http://via.placeholder.com/100" alt="avatar" />
      </div>
    );
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AddUser = (props: any) => {
  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={props.handler}>Add user test comp</button>
    </div>
  );
};

export default UserComponent;
