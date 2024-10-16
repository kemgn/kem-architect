import { GroupForCreate, GroupForUpdate, GroupForDelete, Group, GroupForDisplay } from "@/models/Entities/Group";
import { ServiceCaller, CatchHttpError } from "./Helpers";
import { Subject } from "@/models/Entities/Subject";

const BASE_URL = process.env.BASE_URL + "Groups/";

export const GroupService = {
    getAllGroups: async (): Promise<Group[]> => {
        try {
            const response = await ServiceCaller<Group[]>(
                `${BASE_URL}GetAllAsync`,
                {
                    method: "GET"
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Group", "fetching");
        }
    },
    createGroup: async (groupForCreate: GroupForCreate): Promise<Group> => {
        try {
            const response = await ServiceCaller<Group>(
                `${BASE_URL}CreateAsync`,
                {
                    method: "POST",
                    body: JSON.stringify(groupForCreate)
                } 
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Group", "creating");
        }
    },
    updateGroup: async (groupForUpdate: GroupForUpdate): Promise<Group> => {
        try {
            const response = await ServiceCaller<Group>(
                `${BASE_URL}UpdateAsync`,
                {
                    method: "PUT",
                    body: JSON.stringify(groupForUpdate)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Group", "updating");
        }
    },
    deleteGroup: async (groupForDelete: GroupForDelete): Promise<GroupForDelete> => {
        try {
            const response = await ServiceCaller<GroupForDelete>(
                `${BASE_URL}DeleteAsync`,
                {
                    method: "DELETE",
                    body: JSON.stringify(groupForDelete)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Group", "deleting");
        }
    },
    getSubjects: async (groupId: string): Promise<Subject[]> => {
        try {
            const response = await ServiceCaller<Subject[]>(
                `${BASE_URL}GetSubjectsAsync?groupid=${groupId}`,
                {
                    method: "GET",
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Group members", "fetching");
        }
    },
    getGroupMembers: async (groupId: string): Promise<GroupForDisplay> => {
        try {
            const response = await ServiceCaller<GroupForDisplay>(
                `${BASE_URL}GetAsync?uiId=${groupId}`,
                {
                    method: "GET",
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Group members", "fetching");
        }
    }
}