import { UserProps } from "../types/user-types"

export class UserModel {
    readonly id: string;
    public name: string;
    private email: string;
    private password: string;
    public created_at: Date;
    public updated_at: Date;

    constructor (props: UserProps) {
        this.id = props.id;
        this.name = props.name;
        this.email = props.email;
        this.password = props.password;
        this.created_at = props.created_at || new Date();
        this.updated_at = props.updated_at || new Date ();
    }

    getId () {
        return this.id;
    }

    getPassword () {
        return this.password;
    }

    setPassword (newPassword: string) {
        this.password = newPassword;
        this.updated_at = new Date();
    }

    getEmail () {
        return this.email;
    }
}