interface FileMetadata {
    filename: string
    ext: string
    mime: string
}

interface FileData {
    metadata: FileMetadata
    content?: string | object | Array<string>
}

export type {
    FileData
}
