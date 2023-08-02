interface FileMetadata {
    filename: string
    ext: string
    mime: string
}

interface FileData {
    metadata: FileMetadata
    content?: any
}

export type {
    FileData
}
