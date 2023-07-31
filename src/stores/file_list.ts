import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { produce } from 'immer'

interface FileListState {
    file_list: Array<string>
    // eslint-disable-next-line no-unused-vars
    addFile: (file: string) => void
    // eslint-disable-next-line no-unused-vars
    setFileList: (file_list: Array<string>) => void
}

const useFileList = create<FileListState>()(
    devtools(
        immer(
            persist(
                (set) => ({
                    file_list: [],
                    addFile: (file: string) => set(
                        produce((draft) => {
                            if (!draft.file_list.includes(file)) {
                                draft.file_list.push(file)
                            }
                        })
                    ),
                    setFileList: (file_list: Array<string>) => set(
                        produce((draft) => {
                            draft.file_list = file_list
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
