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
    paginationLoading: boolean;
  };
  modalStates: {
    profile: boolean;
  };
  nextPageId: string;
  activeSub: string;
  user: ProfileData;
}
