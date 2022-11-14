import { PhotoType } from "./users.model";

export type PostType = {
    id: number;
    text: string;
    likesCount: number;
}
export type ProfileType = {
    aboutMe?: string | null;
    contacts?: { [social in string]: string | null };
    fullName?: string;
    lookingForAJob?: boolean;
    lookingForAJobDescription?: string;
    photos: PhotoType;
    userId?: number | null;
}
