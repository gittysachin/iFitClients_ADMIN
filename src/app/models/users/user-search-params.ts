export class UserSearchParams {
    UserCode: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    Mobile: string;
    Email: string;
    UserTypeId: number;

    constructor() {
        this.UserTypeId = null;
    }
}
