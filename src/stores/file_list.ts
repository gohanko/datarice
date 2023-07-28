import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface FileListState {
    file_list: Array<string>
    // eslint-disable-next-line no-unused-vars
    addFile: (file: string) => void
    // eslint-disable-next-line no-unused-vars
    setFileList: (file_list: Array<string>) => void
}

const useFileList = create<FileListState>()(
    devtools(
        persist(
            (set) => ({
                file_list: [],
                addFile: (file: string) => set((state: FileListState) => {
                    if (!state.file_list.includes(file)) {
                        return {
                            file_list: [...state.file_list, file]
                        }
                    }
                }),
                setFileList: (file_list: Array<string>) => set(() => {
                    return {
                        file_list: file_list
                    }
                })
            }),
            {
                name: 'file-list-storage'
            }
        )
    )
);

export default useFileList
