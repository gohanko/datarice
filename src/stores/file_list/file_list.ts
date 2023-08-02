import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { produce } from 'immer'
import { FileData } from '../../types/file'

export interface FileListState {
    file_list: Array<string>
    file_data_list: Array<FileData>
    setFileList: (file_list: Array<FileData>) => void
    setFileData: (fileData: FileData) => void
}

const useFileList = create<FileListState>()(
    devtools(
        immer(
            persist(
                (set) => ({
                    file_list: [],
                    file_data_list: [],
                    setFileList: (file_list: Array<FileData>) => set(
                        produce((draft) => {
                            draft.file_list = file_list
                        })
                    ),
                    setFileData: (fileData: FileData) => set(
                        produce((draft) => {
                            const index = draft.file_data_list.findIndex((file_data) => file_data.metadata.filename == fileData.metadata.filename)
                            if (index == -1) {
                                draft.file_data_list.push(fileData)
                            } else {
                                draft.file_data_list[index] = fileData
                            }
                            
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
