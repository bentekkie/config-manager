
import { faDiceD6, faFile, faFolder, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

export enum treeNodeTypes {
    APPLICATION = 0,
    FILE,
    FOLDER,
    NEW
}

export function treeNodeIcons(nodeType : treeNodeTypes){
    switch(nodeType){
        case treeNodeTypes.APPLICATION:
            return faDiceD6
        case treeNodeTypes.FILE:
            return faFolder
        case treeNodeTypes.FOLDER:
            return faFile
        case treeNodeTypes.NEW:
            return faPlusCircle
    }
    
}
interface IBaseNode {
    module: string,
}

interface IApplicationNode {
    type : treeNodeTypes.APPLICATION
    collapsed?: boolean
    children: TreeNode[]
}
interface IFolderNode {
    type : treeNodeTypes.FOLDER
    collapsed?: boolean
    children: TreeNode[]
}
interface IFileNode {
    type : treeNodeTypes.FILE
    path: string
}

export type ApplicationNode = IBaseNode & IApplicationNode
export type FolderNode = IBaseNode & IFolderNode
export type FileNode = IBaseNode & IFileNode
export type TreeNode = ApplicationNode | FolderNode | FileNode

