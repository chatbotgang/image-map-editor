export type FileEventTarget = Event & { target :{files: FileList} } & React.ChangeEvent<HTMLInputElement>;

export type CommonObject = { [key: string]: any };