
export default interface IUser {
    Id: Number;
    username:String;
    passwords: String;
    Role: String;
    Status:Number;
    CreatedDate?:Date;
    CreatedBy:String;
    ModifiedDate?:Date;
    ModifiedBy:String
};

export class UserDTO implements IUser {
    Id: Number=0;
    username: String='';
    passwords: String = '';
    Role: String = '';
    Status: Number;
    CreatedDate?: Date;
    CreatedBy: String = '';
    ModifiedDate?: Date;
    ModifiedBy: String
}
export default class User extends UserDTO{
    // constructor(dto: UserDTO) {
    //     super();
    //     Object.assign(this, dto);
    // }    
}