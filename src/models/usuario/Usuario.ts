export default interface Usuario {
    id: number;
    username: string;
    email: string;
    password: string;
    photo: string;
    posts?: [];
}