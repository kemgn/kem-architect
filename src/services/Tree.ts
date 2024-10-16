import { NodeCreate, NodeUpdate, TreeNode, TreeRoot, TreeRootCreate, TreeRootUpdate } from "@/models/Entities/Tree";
import { ServiceCaller, CatchHttpError, Response } from "./Helpers";
import { IForDelete, deleteResponse } from "@/models/Entities/Service";
import { json } from "stream/consumers";

const BASE_URL = process.env.BASE_URL + "trees/";

export const TreeService = {
    getTreeRoots: async (): Promise<TreeRoot[]> => {
        try {
            const response = await ServiceCaller<TreeRoot[]>(
                `${BASE_URL}getallasync`,
                {
                    method: "GET"
                }
            );
            return response.data;
        }
        catch(error){
            throw CatchHttpError(error, "TreeRoot", "fetching");
        }
    },

    updateTreeRoot: async (data: TreeRootUpdate): Promise<Response<TreeRoot>> => {
        try {   
            const response = await ServiceCaller<TreeRoot>(
                `${BASE_URL}updateasync`,
                {
                    method: "PUT" ,
                    body: JSON.stringify(data)
                }
            );
            return response;
        }
        catch(error){
            throw CatchHttpError(error, "TreeRoot", "updating");
        }
    },

    createTreeRoot: async (data: TreeRootCreate): Promise<Response<TreeRoot>> => {
        try {
            const response = await ServiceCaller<TreeRoot>(
                `${BASE_URL}createasync`,
                {
                    method: "POST" ,
                    body: JSON.stringify(data)
                }
            )
            return response;
        }
        catch(error){
            throw CatchHttpError(error, "TreeRoot" , "creating");
        }
    },

    deleteTreeRoot: async (data: IForDelete): Promise<deleteResponse> => {
        try{
            const response = await ServiceCaller<deleteResponse>(
                `${BASE_URL}deleteasync`,
                {
                    method: "DELETE" ,
                    body: JSON.stringify(data)
                }
            )
            return response.data
        }
        
        catch(error){
            throw CatchHttpError(error, "TreeRoot" , "deleting");
        }
    },
    getTreeRoot: async (treeRootId: string): Promise<TreeRoot> => {
        try {
            const response = await ServiceCaller<TreeRoot>(
                `${BASE_URL}GetAsync?uiId=${treeRootId}`,
                {
                    method: "GET"
                }
            );
            return response.data;
        }
        catch(error){
            throw CatchHttpError(error, "TreeRoot", "fetching");
        }
    },
    createNode: async (data: NodeCreate , treeId:string): Promise<Response<TreeNode>> => {
        try{
            const response = await ServiceCaller<TreeNode>(
                `${BASE_URL}createNodeAsync?treeId=${treeId}`,
                {
                    method: "POST" ,
                    body: JSON.stringify(data)
                }
            )
            return response
        }
        catch(error){
            throw CatchHttpError(error, "Node" , "creating");
        }
    },

    updateNode: async (data: NodeUpdate): Promise<Response<TreeNode>> => {
        try{
            const response = await ServiceCaller<TreeNode>(
                `${BASE_URL}updatenodeasync`,
                {
                    method: "PUT",
                    body: JSON.stringify(data)
                }
            )
            return response
        }
        catch(error){
            throw CatchHttpError(error, "Node" , "updating");
        }
    },

    deleteNode: async (data: IForDelete): Promise<deleteResponse> => {
        try{
            const response = await ServiceCaller<deleteResponse>(
                `${BASE_URL}deletenodeasync`,
                {
                    method: "DELETE",
                    body: JSON.stringify(data)
                }
            )
            return response.data
        }
        catch(error){
            throw CatchHttpError(error, "Node" , "deleting");
        }
    }
    
    
}
