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
      public static readonly AddTransmission = "AddTransmission";
      public static readonly AllTransmissions = "AllTransmissions";
      public static readonly Dashboard = "Dashboard";
      public static readonly EditTransmission = "EditTransmission";
      public static readonly LiveTransmission = "LiveTransmission";
      public static readonly MyTransmissions = "MyTransmissions";
    }

    public static readonly AdministrationPaths = class {
      public static readonly TransmissionEventTypes = "TransmissionEventTypes";
      public static readonly AddTransmissionEventTypes = "Add";
      public static readonly EditTransmissionEventTypes = "Edit";
      public static readonly ChangeUserRole = "ChangeUserRole";
      public static readonly Users = "Users";
      public static readonly Transmissions = "Transmissions";
    }
  }

  public static readonly Endpoints = class {
    public static readonly Leaderboard = class {
      public static readonly GetStandings = "Leaderboard/GetStandings";
      public static readonly GetTopStandings = "Leaderboard/GetTopStandings";
    }

    public static readonly Roles = class {
      public static readonly GetAll = "Roles/GetAll";
    }

    public static readonly User = class {
      public static readonly Delete = "User/Delete";
      public static readonly Get = "User/Get";
      public static readonly GetUsers = "User/GetUsers";
      public static readonly LockUserAccount = "User/LockUserAccount";
      public static readonly Login = "User/Login";
      public static readonly Register = "User/Register";
      public static readonly SilentLogin = "User/SilentLogin";
      public static readonly UnlockUserAccount = "User/UnlockUserAccount";
      public static readonly UpdateUserRole = "User/UpdateUserRole";
    }

    public static readonly Transmission = class {
      public static readonly AddTransmissionEventType = "Transmission/AddTransmissionEventType";
      public static readonly EditTransmissionEventType = "Transmission/EditTransmissionEventType";
      public static readonly GetMyTransmissions = "Transmission/GetMyTransmissions";
      public static readonly GetNewestTransmissions = "Transmission/GetNewestTransmissions";
      public static readonly GetTopTransmissions = "Transmission/GetTopTransmissions";
      public static readonly GetTransmissionEventTypes = "Transmission/GetTransmissionEventTypes";
    }
  }

  public static readonly StatusCodes = class {
    public static readonly BusinessLogicException = 470;
    public static readonly RedirectToLoginPage = 474;
    public static readonly NewAccessTokenCreated = 475;
  }
}