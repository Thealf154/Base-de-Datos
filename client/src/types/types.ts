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