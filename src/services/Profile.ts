import { Profile, ProfileForCreate, ProfileForUpdate, ProfileForDelete, ProfileForDisplay } from "@/models/Entities/Profile";
import { ServiceCaller, CatchHttpError } from "./Helpers";

const BASE_URL = process.env.BASE_URL + "Profiles/";

export const ProfileService = {
    getAllProfiles: async (): Promise<Profile[]> => {
        try {
            const response = await ServiceCaller<Profile[]>(
                `${BASE_URL}GetAllAsync`,
                {
                    method: "GET"
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Profile", "fetching");
        }
    },
    createProfile: async (profileForCreate: ProfileForCreate): Promise<Profile> => {
        try {
            const response = await ServiceCaller<Profile>(
                `${BASE_URL}CreateAsync`,
                {
                    method: "POST",
                    body: JSON.stringify(profileForCreate)
                } 
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Profile", "creating");
        }
    },
    updateProfile: async (profileForUpdate: ProfileForUpdate): Promise<Profile> => {
        debugger
        try {
            const response = await ServiceCaller<Profile>(
                `${BASE_URL}UpdateAsync`,
                {
                    method: "PUT",
                    body: JSON.stringify(profileForUpdate)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Profile", "updating");
        }
    },
    deleteProfile: async (profileForDelete: ProfileForDelete): Promise<ProfileForDelete> => {
        try {
            const response = await ServiceCaller<ProfileForDelete>(
                `${BASE_URL}DeleteAsync`,
                {
                    method: "DELETE",
                    body: JSON.stringify(profileForDelete)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Profile", "deleting");
        }
    },
    getProfileMembers: async (profileId: string): Promise<ProfileForDisplay> => {
        try {
            const response = await ServiceCaller<ProfileForDisplay>(
                `${BASE_URL}GetAsync?uiId=${profileId}`,
                {
                    method: "GET"
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Profile members", "fetching");
        }
    },
}