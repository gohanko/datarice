import { FileListState } from "./file_list";

export const setFileList = (state: FileListState) => {
    return state.setFileList;
};

export const getFileData = (state: FileListState) => {
    return state.getFileData;
};

export const setFileData = (state: FileListState) => {
    return state.setFileData;
};
