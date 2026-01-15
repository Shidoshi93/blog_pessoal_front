export default interface Usuario {
    id: number;
    username: string;
    email: string;
    photo: string;
    password: string;
    posts?: [];
}