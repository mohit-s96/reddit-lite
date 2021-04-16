import { State } from "../pmr/interfaces";

export function objectComparator() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let diffState: any = {};
  const objHeirarchy: Array<string> = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const objDiff = (newState: any, oldState: any) => {
    // console.log(newState, oldState);
    if (
      typeof newState !== "object" ||
      typeof oldState !== "object" ||
      !newState ||
      !oldState
    ) {
      throw new Error("Arguments to objDiff must be object type");
    }
    if (Array.isArray(newState) && Array.isArray(oldState)) {
      if (newState.length !== oldState.length) {
        diffState = setNestedKeys(diffState, objHeirarchy, true);
      } else {
        newState.forEach((item: State, i) => {
          if (Array.isArray(item)) {
            objDiff(item as State, oldState[i] as State);
          } else if (typeof item !== "object") {
            if (item !== oldState[i]) {
              diffState = setNestedKeys(diffState, objHeirarchy, true);
            }
          } else {
            objDiff(item as State, oldState[i] as State);
          }
        });
      }
    } else {
      for (const key in newState) {
        if (oldState[key] !== undefined && oldState[key] !== null) {
          if (typeof newState[key] !== "object") {
            if (newState[key] !== oldState[key]) {
              if (!objHeirarchy.length) {
                diffState[key] = true;
              } else {
                diffState = setNestedKeys(diffState, objHeirarchy, key);
              }
            }
          } else {
            objHeirarchy.push(key);
            objDiff(newState[key], oldState[key]);
            objHeirarchy.pop();
          }
        } else {
          diffState[key] = true;
        }
      }
    }
    return diffState;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function setNestedKeys(state: any, keys: Array<string>, finalKey: any) {
    const tempState = { ...state };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let nextKey: any = null;
    const n = keys.length;
    keys.forEach((key, i) => {
      if (!nextKey) {
        if (!tempState[key]) {
          tempState[key] = {};
        }
        nextKey = tempState[key];
        if (n == 1) {
          nextKey[finalKey] = true;
        }
      } else {
        if (i === n - 1) {
          nextKey[key] = finalKey;
        } else {
          nextKey[key] = {};
          nextKey = nextKey[key];
        }
      }
    });
    //   console.log(tempState);
    return tempState;
  }
  return {
    objDiff: objDiff,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function deepCopyObject(target: any, obj: any) {
  const copy = target;

  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      copy[key] = deepCopyArray([], obj[key]);
    } else if (typeof obj[key] !== "object") {
      copy[key] = obj[key];
    } else {
      copy[key] = deepCopyObject({}, obj[key]);
    }
  }

  return copy;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepCopyArray(target: any, array: any) {
  const copy = target;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  array.forEach((key: any, i: string | number) => {
    if (Array.isArray(key)) {
      copy[i] = deepCopyArray([], key);
    } else if (typeof key !== "object") {
      copy[i] = key;
    } else {
      copy[i] = deepCopyObject({}, key);
    }
  });

  return copy;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSkeletonObject(objArray: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let prevObj: any;
  objArray.forEach((string: string) => {
    const splitString = string.split(".");

    splitString.forEach((obj, i) => {
      if (i > 0) {
        prevObj[obj] = {};
        prevObj = prevObj[obj];
      }
    });
  });
}

export function getObjectMatchFromFunctionString(str: string) {
  const match = /([a-zA-Z0-9_]*\.[a-zA-Z0-9_]*)/;

  const splitFunction = str.split(" ");

  const removedCommas = splitFunction.map((n) =>
    n.split(",").length > 1 ? n.split(",")[0] : n
  );

  const filteredObjectsArray = removedCommas
    .filter((n) => match.test(n))
    .map((n) => n.split("\n")[0])
    .map((n) => n.split(".").slice(1).join("."));

  return filteredObjectsArray;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function compareArrayToObject(obj: any, array: any) {
  let result = false;
  if (array) {
    array.forEach((string: string) => {
      if (populateObjectFromArray(obj, string)) {
        result = true;
      }
    });
  }
  return result;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function populateObjectFromArray(target: any, string: any) {
  const splitString = string.split(".");
  let res = false;
  if (splitString.length < 2) {
    res = Boolean(target[splitString[0]]);
    // console.log(target[splitString[0]]);
    return res;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    splitString.forEach((x: any, i: number) => {
      if (target[x] && splitString[i + 1]) {
        res = populateObjectFromArray(
          target[x],
          splitString.slice(1).join(".")
        );
      }
    });
  }
  return res;
}
// let t1 = ["users", "loading", "test.newTest.isAuth"];
// let t2 = { loading: true };
// console.log(compareArrayToObject(t2, t1));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function populateObjectFromArray_(target: any, string: any) {
  const splitString = string.split(".");
  let res;
  if (splitString.length < 2) {
    res = target[splitString[0]];
    return { res, name: splitString[0] };
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    splitString.forEach((x: any, i: number) => {
      if (target[x] && splitString[i + 1]) {
        res = populateObjectFromArray_(
          target[x],
          splitString.slice(1).join(".")
        );
      }
    });
  }
  return res;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getStateSlice(data: any, array: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const returnData: any = {};

  if (array) {
    array.forEach((string: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { res, name } = populateObjectFromArray_(data, string) as any;
      returnData[name] = res;
    });
  }

  return returnData;
}

//   const obj2 = {
//     name: "msx",
//     addr: {
//       s1: "119",
//       s2: "nagars",
//       s3: [1, 3, 5],
//       s4: "am",
//       s5: [],
//     },
//     tit: "sirs",
//     res: {
//       pos: {
//         new: "oops",
//       },
//     },
//   };
// console.log(compareArrayToObject(obj2, arr1));
// const testObj = deepCopyObject({}, obj2);
// console.log(deepCopyObject({}, obj2));
// console.log(testObj === obj2);
// console.log(obj2.addr.s5.prop[1].arr[3] === testObj.addr.s5.prop[1].arr[3]);
// console.log(obj2.addr.s5.prop[1].arr[3]);
// console.log(testObj.addr.s5.prop[1].arr[3]);
// console.log(testObj.addr === obj2.addr);
// console.log(testObj);
// setNestedKeys(obj2, ["hello", "hi", "bye", "wassup"], "finalKey");
//   const obj1 = {
//     name: "msx",
//     addr: {
//       s1: "119",
//       s2: "nagar",
//       s3: [1, 2, 4],
//     },
//   };
//   const obj4 = {
//     name: "ms",
//     addr: {
//       s1: "11",
//       s2: "nagarss",
//       s3: [1, 3, 5],
//       s4: "am",
//       s5: [
//         {
//           wow: "nice",
//           oop: "soo",
//           pren: "lo",
//         },
//         {
//           wow: "nice",
//           oop: "soo",
//           pren: "lo",
//         },
//         {
//           wow: "nice",
//           oop: "soo",
//           pren: "lo",
//         },
//         {
//           wow: "nice",
//           oop: "soo",
//           pren: "lo",
//         },
//       ],
//     },
//     tit: "sirs",
//     auth: {
//       admin: {
//         isadmin: false,
//       },
//       isUser: true,
//     },
//   };
// const arr1 = ["name", "addr.s4", "auth.admin"];
// console.log(getStateSlice(obj4, arr1));
// let { objDiff, diffState } = objectComparator();

// console.log(objDiff(obj4, obj2));
// objDiff(obj2, obj4);
// console.log(diffState);
// obj1.log();
// let i = 0;
// function Test() {
//   console.log(Test.caller);
//   Check();
// }
// function Check() {
//   if (i === 0) {
//     i++;
//     Check.caller();
//   }
//   console.log("called");
// }
// Test();
