import { ServiceCaller, CatchHttpError, Response } from "./Helpers";

const BASE_URL = process.env.BASE_URL + "Lists/";

export const ListService = {
    getListRoots: async (): Promise<Response<ListRoot[]>> => {
        try {
            const response = await ServiceCaller<ListRoot[]>(
                `${BASE_URL}GetAllAsync`,
                {
                    method: "GET"
                }
            );
            return response;
        } catch (error) {
            throw CatchHttpError(error, "ListRoots", "fetching");
        }
    },
    createListRoot: async (listRootForCreate: ListRootForCreate): Promise<Response<ListRoot>> => {
        try {
            const response = await ServiceCaller<ListRoot>(
                `${BASE_URL}CreateAsync`,
                {
                    method: "POST",
                    body: JSON.stringify(listRootForCreate)
                } 
            );
            return response;
        } catch (error) {
            throw CatchHttpError(error, "ListRoot", "creating");
        }
    },
    updateListRoot: async (listRootForUpdate: ListRootForUpdate): Promise<Response<ListRoot>> => {
        try {
            const response = await ServiceCaller<ListRoot>(
                `${BASE_URL}UpdateAsync`,
                {
                    method: "PUT",
                    body: JSON.stringify(listRootForUpdate)
                }
            );
            return response;
        } catch (error) {
            throw CatchHttpError(error, "ListRoot", "updating");
        }
    },
    deleteListRoot: async (listRootForDelete: ListRootForDelete): Promise<ListRootForDelete> => {
        try {
            const response = await ServiceCaller<ListRootForDelete>(
                `${BASE_URL}DeleteAsync`,
                {
                    method: "DELETE",
                    body: JSON.stringify(listRootForDelete)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "ListRoot", "deleting");
        }
    },

    getListRoot: async (listRootId: string): Promise<Response<ListRoot>> => {
        try {
            const response = await ServiceCaller<ListRoot>(
                `${BASE_URL}GetAsync?uiId=${listRootId}`,
                {
                    method: "GET"
                }
            );
            return response;
        } catch (error) {
            throw CatchHttpError(error, "ListRoot", "fetching");
        }
    },
    
    getListOptions: async (): Promise<ListOption> => {
        try {
            const response = await ServiceCaller<ListOption>(
                `${BASE_URL}GetAllOptionAsync`,
                {
                    method: "GET"
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "ListOption", "fetching");
        }
    },
    createListOption: async (listOptionForCreate: ListOptionForCreate): Promise<ListOptionForCreate> => {
        try {
            const response = await ServiceCaller<ListOptionForCreate>(
                `${BASE_URL}CreateOptionAsync?listId=${listOptionForCreate.listRootId}`,
                {
                    method: "POST",
                    body: JSON.stringify(listOptionForCreate)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "ListOption", "creating");
        }
    },
    updateListOption: async (listOptionForUpdate: ListOptionForUpdate): Promise<ListOptionForUpdate> => {
        try {
            const response = await ServiceCaller<ListOptionForUpdate>(
                `${BASE_URL}UpdateOptionAsync`,
                {
                    method: "PUT",
                    body: JSON.stringify(listOptionForUpdate)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "ListOption", "updating");
        }
    },
    deleteListOption: async (listOptionForDelete: ListOptionForDelete): Promise<ListOptionForDelete> => {
        try {
            const response = await ServiceCaller<ListOptionForDelete>(
                `${BASE_URL}DeleteOptionAsync`,
                {
                    method: "DELETE",
                    body: JSON.stringify(listOptionForDelete)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "ListOption", "deleting");
        }
    },
}
