export interface ReducerAction {
  type?: string;
  payload?: unknown;
}
export interface ProfileData {
  dob?: {
    age?: number;
    date?: string;
  };
  email?: string;
  gender?: string;
  id?: string;
  identifier?: {
    name: string;
    value: string;
  };
  location?: {
    city: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    country: string;
    postcode: number;
    state: string;
    street: {
      name: string;
      number: number;
    };
    timezone: {
      description: string;
      offset: string;
    };
  };
  login?: {
    md5: string;
    password: string;
    salt: string;
    sha1: string;
    sha256: string;
    username: string;
    uuid: string;
  };
  name?: {
    first: string;
    last: string;
    title: string;
  };
  nat?: string;
  phone?: string;
  picture?: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  registered?: {
    age: number;
    date: string;
  };
}
export interface StoreState {
  isAuth: boolean;
  posts: Array<unknown>;
  loading: {
    authLoading: boolean;
    postsLoading: boolean;
  };
  user: ProfileData;
}
export type Reducer = (state: StoreState, action: ReducerAction) => StoreState;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StateSlice = (state: StoreState) => StoreState | any;

export interface listeners {
  // eslint-disable-next-line @typescript-eslint/ban-types
  listener: React.Dispatch<React.SetStateAction<{}>>;
  reduxState: Array<string>;
}
