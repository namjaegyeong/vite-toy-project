export interface User {
    userId: string;
    password: string;
    userName: string;
    phoneNumber: string;
    memberType: "USER" | string; // Here you can restrict the member type if needed
}