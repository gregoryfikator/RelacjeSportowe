import { environment } from "src/environments/environment";

export class Constants {

  public static readonly ApiAddress: string = environment.apiAddress;

  public static readonly Routing = class {
    public static readonly BasicPaths = class {
      public static readonly Empty: string = "";
      public static readonly Home: string = "";
      public static readonly Login: string = "Login";
      public static readonly Register: string = "Register";
      public static readonly User: string = "User";
      public static readonly Transmission: string = "Transmission";
      public static readonly Administration: string = "Administration";
    }

    public static readonly UserPaths = class {

    }

    public static readonly TransmissionPaths = class {
      public static readonly AllTransmissions: string = "AllTransmissions"
    }

    public static readonly AdministrationPaths = class {

    }
  }

  public static readonly Endpoints = class {
    public static readonly User = class {
      public static readonly Get: string = "User/Get";
      public static readonly Login: string = "User/Login";
      public static readonly Register: string = "User/Register";
    }
  }
}