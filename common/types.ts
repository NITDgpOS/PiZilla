export interface IFile {
    extension?: string;
    isDirectory?: boolean;
    mime?: string | null;
    name: string;
    path: string;
}
