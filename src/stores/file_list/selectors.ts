import { FileListState } from "./file_list";

export const setFileList = (state: FileListState) => {
    return state.setFileList;
};

export const getFileData = (state: FileListState) => {
    return state.getFileData;
};

export const setFileContent = (state: FileListState) => {
    return state.setFileContent;
};
