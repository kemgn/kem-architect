import { DataContract, DataContractForCreate, DataContractForDelete, DataContractForUpdate, DataContractProperty, DataContractPropertyForCreate, DataContractPropertyForUpdate, ViewProperty, ViewPropertyForUpdate } from "@/models/Entities/DataContract";
import { ServiceCaller, CatchHttpError } from "./Helpers";
import { RemoteFilter, RemoteFilterForCreate } from "@/models/Entities/RemoteFilter";
import { RemoteFilterForDelete, RemoteFilterForUpdate, RemoteFilterItem, RemoteFilterItemForCreate, RemoteFilterItemForDelete, RemoteFilterItemForUpdate } from "@/models/Entities/RemoteFilter";
import { RemoteSort, RemoteSortForCreate, RemoteSortForDelete, RemoteSortForUpdate, RemoteSortItem, RemoteSortItemForCreate, RemoteSortItemForDelete, RemoteSortItemForUpdate } from "@/models/Entities/RemoteSort";

const BASE_URL = process.env.BASE_URL + "DataContracts/";

export const DataContractService = {
    getAllDataContracts: async (moduleId: string): Promise<DataContract[]> => {
        try {
            const response = await ServiceCaller<DataContract[]>(
                `${BASE_URL}GetAllAsync?moduleUIId=${moduleId}`,
                {
                    method: "GET"
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "DataContract", "fetching");
        }
    },
    createDataContract: async (dataContractForCreate: DataContractForCreate, moduleId: string): Promise<DataContract> => {
        try {
            const response = await ServiceCaller<DataContract>(
                `${BASE_URL}CreateAsync?moduleId=${moduleId}`,
                {
                    method: "POST",
                    body: JSON.stringify(dataContractForCreate)
                } 
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "DataContract", "creating");
        }
    },
    updateDataContract: async (dataContractForUpdate: DataContractForUpdate): Promise<DataContract> => {
        try {
            const response = await ServiceCaller<DataContract>(
                `${BASE_URL}UpdateAsync`,
                {
                    method: "PUT",
                    body: JSON.stringify(dataContractForUpdate)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "DataContract", "updating");
        }
    },
    updateManyDataContract: async (dataContractsForUpdate: DataContractForUpdate[]): Promise<DataContract[]> => {
        try {
            const response = await ServiceCaller<DataContract[]>(
                `${BASE_URL}UpdateManyAsync`,
                {
                    method: "PUT",
                    body: JSON.stringify(dataContractsForUpdate)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "DataContract", "updating");
        }
    },
    deleteDataContract: async (dataContractForDelete: DataContractForDelete): Promise<DataContractForDelete> => {
        try {
            const response = await ServiceCaller<DataContractForDelete>(
                `${BASE_URL}DeleteAsync`,
                {
                    method: "DELETE",
                    body: JSON.stringify(dataContractForDelete)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "DataContract", "deleting");
        }
    },
    createDataContractProperty: async (dataContractId: string, dataContractPropertyForCreate: DataContractPropertyForCreate): Promise<DataContractProperty> => {
        try {
            const response = await ServiceCaller<DataContractProperty>(
                `${BASE_URL}CreatePropertyAsync?dataContractUIId=${dataContractId}`,
                {
                    method: "POST",
                    body: JSON.stringify(dataContractPropertyForCreate)
                }
            )
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "DataContractProp", "creating");
        }
    },
    updateDataContractProperty: async (dataContractForUpdate: DataContractPropertyForUpdate): Promise<ViewProperty> => {
        try {
            const response = await ServiceCaller<ViewProperty>(
                `${BASE_URL}UpdatePropertyAsync`,
                {
                    method: "PUT",
                    body: JSON.stringify(dataContractForUpdate)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "DataContract", "updating");
        }
    },
    deleteDataContractProperty: async (dataContractForDelete: DataContractForDelete): Promise<DataContractForDelete> => {
        try {
            const response = await ServiceCaller<DataContractForDelete>(
                `${BASE_URL}DeletePropertyAsync`,
                {
                    method: "DELETE",
                    body: JSON.stringify(dataContractForDelete)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "DataContractProp", "deleting");
        }
    },


    createFilter: async (dataContractId: string, filter: RemoteFilterForCreate): Promise<RemoteFilter> => {
        try {
              const response = await ServiceCaller<RemoteFilter>(
                `${BASE_URL}CreateRemoteFilterAsync?dcUIId=${dataContractId}`,
                {
                    method: "POST",
                    body: JSON.stringify(filter)
                }
            )
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Filter", "creating");
        }
    },
    updateFilter: async (filter: RemoteFilterForUpdate): Promise<RemoteFilter> => {
        try {
            const response = await ServiceCaller<RemoteFilter>(
                `${BASE_URL}UpdateRemoteFilterAsync`,
                {
                    method: "PUT",
                    body: JSON.stringify(filter)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Filter", "updating");
        }
    },
    deleteFilter: async (filterForDelete: RemoteFilterForDelete): Promise<RemoteFilterForDelete> => {
        try {
            const response = await ServiceCaller<RemoteFilterForDelete>(
                `${BASE_URL}DeleteRemoteFilterAsync`,
                {
                    method: "DELETE",
                    body: JSON.stringify(filterForDelete)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Sort", "deleting");
        }
    },

    createFilterItem: async (filterId: string, filter: RemoteFilterItemForCreate): Promise<RemoteFilterItem> => {
        try {
            const response = await ServiceCaller<RemoteFilterItem>(
                `${BASE_URL}CreateRemoteFilterItemAsync?filterUIId=${filterId}`,
                {
                    method: "POST",
                    body: JSON.stringify(filter)
                }
            )
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Filter item", "creating");
        }
    },
    updateFilterItem: async (filterItem: RemoteFilterItemForUpdate): Promise<RemoteFilterItem> => {
        try {
            const response = await ServiceCaller<RemoteFilterItem>(
                `${BASE_URL}UpdateRemoteFilterItemAsync`,
                {
                    method: "PUT",
                    body: JSON.stringify(filterItem)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Filter item", "updating");
        }
    },
    deleteFilterItem: async (filterItemForDelete: RemoteFilterItemForDelete): Promise<RemoteFilterItemForDelete> => {
        try {
            const response = await ServiceCaller<RemoteFilterItemForDelete>(
                `${BASE_URL}DeleteRemoteFilterItemAsync`,
                {
                    method: "DELETE",
                    body: JSON.stringify(filterItemForDelete)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Remote filter item", "deleting");
        }
    },



    createSort: async (dataContractId: string, sort: RemoteSortForCreate): Promise<RemoteSort> => {
        try {
              const response = await ServiceCaller<RemoteSort>(
                `${BASE_URL}CreateRemoteSortAsync?dcUIId=${dataContractId}`,
                {
                    method: "POST",
                    body: JSON.stringify(sort)
                }
            )
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Sort", "creating");
        }
    },
    updateSort: async (sort: RemoteSortForUpdate): Promise<RemoteSort> => {
        try {
            const response = await ServiceCaller<RemoteSort>(
                `${BASE_URL}UpdateRemoteSortAsync`,
                {
                    method: "PUT",
                    body: JSON.stringify(sort)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Sort", "updating");
        }
    },
    deleteSort: async (sortForDelete: RemoteSortForDelete): Promise<RemoteSortForDelete> => {
        try {
            const response = await ServiceCaller<RemoteSortForDelete>(
                `${BASE_URL}DeleteRemoteSortAsync`,
                {
                    method: "DELETE",
                    body: JSON.stringify(sortForDelete)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Sort", "deleting");
        }
    },

    createSortItem: async (sortId: string, sort: RemoteSortItemForCreate): Promise<RemoteSortItem> => {
        try {
            const response = await ServiceCaller<RemoteSortItem>(
                `${BASE_URL}CreateRemoteSortItemAsync?sortUIId=${sortId}`,
                {
                    method: "POST",
                    body: JSON.stringify(sort)
                }
            )
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Sort item", "creating");
        }
    },
    updateSortItem: async (sortItem: RemoteSortItemForUpdate): Promise<RemoteSortItem> => {
        try {
            const response = await ServiceCaller<RemoteSortItem>(
                `${BASE_URL}UpdateRemoteSortItemAsync`,
                {
                    method: "PUT",
                    body: JSON.stringify(sortItem)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Sort item", "updating");
        }
    },
    deleteSortItem: async (sortItemForDelete: RemoteSortItemForDelete): Promise<RemoteSortItemForDelete> => {
        try {
            const response = await ServiceCaller<RemoteSortItemForDelete>(
                `${BASE_URL}DeleteRemoteSortItemAsync`,
                {
                    method: "DELETE",
                    body: JSON.stringify(sortItemForDelete)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Remote sort item", "deleting");
        }
    },
}