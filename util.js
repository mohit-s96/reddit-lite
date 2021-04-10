let diffState = {};
const objHeirarchy = [];
const objDiff = (newState, oldState) => {
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
      diffState = setNestedKeys(diffState, objHeirarchy, []);
    } else {
      newState.forEach((item, i) => {
        if (Array.isArray(item)) {
          objDiff(item, oldState[i]);
        } else if (typeof item !== "object") {
          if (item !== oldState[i]) {
            diffState = setNestedKeys(diffState, objHeirarchy, true);
          }
        } else {
          objDiff(item, oldState[i]);
        }
      });
    }
  } else {
    for (const key in newState) {
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
    }
  }
};
function setNestedKeys(state, keys, finalKey) {
  let tempState = { ...state };
  let nextKey = null;
  let n = keys.length;
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

function deepCopyObject(target, obj) {
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

function deepCopyArray(target, array) {
  let copy = target;

  array.forEach((key, i) => {
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

const obj2 = {
  name: "msx",
  addr: {
    s1: "119",
    s2: "nagars",
    s3: [1, 3, 5],
    s4: "am",
    s5: {
      prop: [
        {
          wow: "nice",
          oop: "soo",
          pren: "lo",
        },
        {
          wow: "nice",
          oop: "soo",
          pren: "lo",
        },
        {
          wow: "nice",
          oop: "soo",
          pren: "lo",
        },
      ],
    },
  },
  tit: "sirs",
};

// const testObj = deepCopyObject({}, obj2);
// console.log(deepCopyObject({}, obj2));
// console.log(testObj === obj2);
// console.log(obj2.addr.s5.prop[1].arr[3] === testObj.addr.s5.prop[1].arr[3]);
// console.log(obj2.addr.s5.prop[1].arr[3]);
// console.log(testObj.addr.s5.prop[1].arr[3]);
// console.log(testObj.addr === obj2.addr);
// console.log(testObj);
// setNestedKeys(obj2, ["hello", "hi", "bye", "wassup"], "finalKey");
const obj1 = {
  name: "msx",
  addr: {
    s1: "119",
    s2: "nagar",
    s3: [1, 2, 4],
  },
};
const obj4 = {
  name: "msx",
  addr: {
    s1: "119",
    s2: "nagars",
    s3: [1, 3, 5],
    s4: "am",
    s5: {
      prop: [
        {
          wow: "nice",
          oop: "soo",
          pren: "lo",
        },
        {
          wow: "nice",
          oop: "soo",
          pren: "lo",
        },
        {
          wow: "nice",
          oop: "soo",
          pren: "lo",
        },
        {
          wow: "nice",
          oop: "soo",
          pren: "lo",
        },
      ],
    },
  },
  tit: "sirs",
};

objDiff(obj2, obj4);
console.log(diffState);
// obj1.log();
