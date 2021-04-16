/* eslint-disable @typescript-eslint/no-explicit-any */
const Users = (props: any) => {
  return props.data.map((x: any) => {
    return (
      <div key={Math.floor(Math.random() * 10000000)} className="flex-center">
        <p>{x.name}</p>
        <img src="http://via.placeholder.com/100" alt="avatar" />
      </div>
    );
  });
};

export default Users;
