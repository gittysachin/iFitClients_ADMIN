export class UserMaster {
    UserId: number;
    UserTypeId: number;
    Mobile: string;
    EmailId: string;
    Password: string;
    ConfirmPassword: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    BirthDate: Date;
    PhoneNo: string;
    CompanyName: string;
    GSTNo: string;
    PANNo: string;
    Address1: string;
    Address2: string;
    ZipCode: string;
    CityOrVillageId: number;
    TalukaId: number;
    DistrictId: number;
    StateId: number;
    RenewalFees: number;
    MarketingAllowanceMonthly: number;
    BankName: string;
    BankAccountNo: string;
    BankAccountType: string;
    BankIFSCCode: string;
    BankBranch: string;
    CreatedBy:number;
    UpdatedBy:number;
    isActive: boolean;

    constructor() {
        this.UserTypeId = null;
        this.StateId = null;
        this.DistrictId = null;
        this.TalukaId = null;
        this.CityOrVillageId = null;
        this.isActive = false;
        this.BankAccountType = null;
    }
}