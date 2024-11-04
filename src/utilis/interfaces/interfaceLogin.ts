export interface UserInformation {
    UserId: number;
    UserName: string;
    UserEmail: string;
    UserPassword: string | null;
    UserPasswordSalt: string | null;
    UserPasswordHash: string | null;
    UserPasswordIteration: number;
    UserPasswordChangeDate: string;
    UserFirstName: string;
    UserLastName: string;
    UserMothersLastName: string;
    UserCreationDate: string;
    UserStatus: boolean;
    UserPhone: string | null;
    UserCompanyName: string;
    UserTaxIdNumber: string;
    UserLogo: string;
    Office: number;
    Siglas: string; 
    token: string;
    expirationDate: Date;
  }
