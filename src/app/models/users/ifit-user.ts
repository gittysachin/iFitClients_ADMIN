export class iFItSuperUser {
    id: string;
    user_type_id: string;
    first_name: string;
    last_name: string;
    avatar_uri: File;
    phone: string;
    email: string;
    salutation: string;
    credentials: string;    
    confirmcredentials: string;
    last_login_date: string;
    dob: any;
    about: string;
    sex: string;
    facility_code: string;
    is_deleted: boolean;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipcode: string;
    created_at: string;

    constructor() {
        this.id = "";
        this.user_type_id = "";
        this.first_name = "";
        this.last_name = "";
        this.phone = "";
        this.email = "";
        this.salutation = "";
        this.credentials = "";
        this.confirmcredentials = "";
        this.last_login_date = "";
        this.dob = "";
        this.about = "";
        this.facility_code = "";
        this.address1 = "";
        this.address2 = "";
        this.city = "";
        this.state = "";
        this.zipcode = "";
    }
}