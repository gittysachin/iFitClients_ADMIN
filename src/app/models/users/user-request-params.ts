export class UserRequestParams {
    PageNo: number;
    PageSize: number;
    SortColumn: string;
    SortOrder: string;
    UserCode: string;
    Mobile: string;
    EmailId: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    isActive: boolean;
    UserTypeId: number;

    constructor() {
        this.PageNo = 1;
        this.PageSize = 5;
        this.SortColumn = "UserCode";
        this.SortOrder = "ASC"
    }
}

