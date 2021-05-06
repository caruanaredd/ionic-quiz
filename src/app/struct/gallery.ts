export interface Photo
{
    filePath: string;

    webViewPath?: string;

    base64Data?: string;

    album?: string;
}

export interface Album
{
    name: string;
    
    photo: string;

    count: number;
}