export type UserType = {
    followed: boolean; 
    id: number;
    name: string;
    photos: PhotoType
    status: string | null;
    uniqueUrlName?: string | null;
}

export type PhotoType = {
    small?: string | null;
    large?: string | null;
}
