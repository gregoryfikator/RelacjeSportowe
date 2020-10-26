import { environment } from "src/environments/environment";

export class Constants {

  public static readonly ApiAddress: string = environment.apiAddress;

  public static readonly Routing = class {
    public static readonly BasicPaths = class {
      public static readonly Empty = "";
      public static readonly Administration = "Administration";
      public static readonly Home = "Home";
      public static readonly Leaderboard = "Leaderboard";
      public static readonly Login = "Login";
      public static readonly Register = "Register";
      public static readonly Transmission = "Transmission";
      public static readonly User = "User";
    }

    public static readonly UserPaths = class {

    }

    public static readonly TransmissionPaths = class {
      public static readonly AllTransmissions = "AllTransmissions";
      public static readonly Dashboard = "Dashboard";
    }

    public static readonly AdministrationPaths = class {

    }
  }

  public static readonly Endpoints = class {
    public static readonly User = class {
      public static readonly Get = "User/Get";
      public static readonly Login = "User/Login";
      public static readonly Register = "User/Register";
      public static readonly SilentLogin = "User/SilentLogin";
    }
  }

  public static readonly StatusCodes = class {
    public static readonly BusinessLogicException = 470;
    public static readonly RedirectToLoginPage = 474;
    public static readonly NewAccessTokenCreated = 475;
  }
}