interface FileMetadata {
    filename: string
    ext: string
    mime: string
}

interface File {
    metadata: FileMetadata
    content: string | object | Array<string>
}

export type {
    File
}
