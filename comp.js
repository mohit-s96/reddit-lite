const Counter = () => {
  const { count, setCount, unsub, sub } = useStore("one");
  return (
    <div style={{ textAlign: "center" }}>
      <span id="count">{count}</span>
      <br />
      <button id="btn" onClick={() => setCount({ type: "INCREMENT" })}>
        Increase
      </button>
      <button onClick={() => unsub()}>Unsub</button>
      <button onClick={() => sub()}>Sub</button>
    </div>
  );
};
const Counter2 = () => {
  const { count, setCount, unsub, sub } = useStore("two");
  return (
    <div style={{ textAlign: "center" }}>
      <span id="count">{count}</span>
      <br />
      <button id="btn" onClick={() => setCount({ type: "DECREMENT" })}>
        Decrease
      </button>
      <button onClick={() => unsub()}>Unsub</button>
      <button onClick={() => sub()}>Sub</button>
    </div>
  );
};

const UserComponent = () => {
  const { count } = useStore();
  React.useEffect(() => {
    fetchOnLoad();
  }, []);
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          maxWidth: "1080px",
          margin: "0 auto",
          backgroundColor: "red",
          flexWrap: "wrap",
        }}
      >
        {count && count.loading ? (
          "Loading"
        ) : count && count.users.length ? (
          <Users data={count.users} />
        ) : (
          "no data"
        )}
      </div>
      <AddUser />
    </div>
  );
};
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
const fetchAndDispatch = () => {
  fetch("https://randomuser.me/api")
    .then((res) => res.json())
    .then((res) => {
      store.dispatch({
        type: "ADD_USER",
        payload: [res.results[0]],
      });
    });
};
const fetchOnLoad = () => {
  store.dispatch({
    type: "LOADING",
  });
  let arr = [];
  for (let i = 0; i < 5; i++) {
    arr.push(fetch("https://randomuser.me/api"));
  }
  Promise.all(arr)
    .then((res) => {
      let arr = [];
      res.forEach((x) => {
        arr.push(x.json());
      });
      return Promise.all(arr);
    })
    .then((res) => {
      let arr = res.map((x) => x.results[0]);
      store.dispatch({
        type: "LOADED",
      });
      store.dispatch({
        type: "ADD_USER",
        payload: arr,
      });
    });
};
const Users = (props) => {
  return props.data.map((x) => {
    return (
      <div key={Math.floor(Math.random() * 10000000)} className="flex-center">
        <p>{x.name.first}</p>
        <img src={x.picture.medium} alt="avatar" />
      </div>
    );
  });
};
const useAsyncFetch = () => {
  let [data, setData] = React.useState();
  React.useEffect(() => {
    fetch("https://randomuser.me/api")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);
  return { data };
};
const useStore = (str) => {
  let [count, setCount] = React.useState();
  const [unsub, setUnsub] = React.useState(() => () => {});
  const sub = () => {
    let uns = store.subscribe(setCount, str);
    setUnsub(() => uns);
  };
  React.useEffect(() => {
    // console.log("mounted");
    if (str) {
      setCount(store.getData()[str]);
    } else {
      setCount(store.getData());
    }
    sub();
  }, []);
  const dispatchAction = (action) => {
    store.dispatch(action);
  };
  return { count: count, setCount: dispatchAction, unsub: unsub, sub: sub };
};

const App = () => {
  return (
    <div>
      <Counter />
      <br />
      <Counter2 />
      <br />
      <UserComponent />
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
