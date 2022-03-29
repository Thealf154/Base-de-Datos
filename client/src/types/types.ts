export interface AuthContextType {
  accessToken: string | null;
  signin: (accessToken: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

export interface tableColumns {
  Header: string;
  accessor: string;
}

export interface tableData {
  id: number;
  name: string;
  lastName: string;
  sex: string;
}

export interface studentsAPIResponse {
  code: number;
  students: Array<students>;
}

export interface students {
  id: number;
  name: string;
  middle_name: string;
  last_name: string;
  sex: string;
  username: string;
  grade: number;
  email: string;
}
