import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { produce } from 'immer'
import { FileData } from '../types/file'

interface FileListState {
    file_list: Array<FileData>
    // eslint-disable-next-line no-unused-vars
    setFileList: (file_list: Array<FileData>) => void
    getFileData
    setFileContent: (filename: string, content) => void
}

const useFileList = create<FileListState>()(
    devtools(
        immer(
            persist(
                (set) => ({
                    file_list: [],
                    setFileList: (file_list: Array<FileData>) => set(
                        produce((draft) => {
                            draft.file_list = file_list
                        })
                    ),
                    getFileData: (filename: string, file_list: Array<FileData>) => {
                        return file_list.find((file_data) => file_data.metadata.filename == filename)
                    },
                    setFileContent: (filename: string, content) => set(
                        produce(draft => {
                            const index = draft.file_list.findIndex((file_data) => file_data.metadata.filename == filename)

                            draft.file_list[index].metadata = content.metadata
                            draft.file_list[index].content = content.content
                        })
                    )
                }),
                {
                    name: 'file-list-storage'
                }
            )
        )
    )
);

export default useFileList
