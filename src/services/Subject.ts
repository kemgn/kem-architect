import { Profile, ProfileForCreate, ProfileForUpdate, ProfileForDelete } from "@/models/Entities/Profile";
import { ServiceCaller, CatchHttpError, Response } from "./Helpers";
import { Subject, SubjectForCreate, SubjectForDelete, SubjectForUpdate, SubjectSearchQuery, SubjectSearchSources, SubjectSearchTypes } from "@/models/Entities/Subject";

const BASE_URL = process.env.BASE_URL + "Subjects/";

export const SubjectService = {
    getAllSubjects: async (): Promise<Subject[]> => {
        try {
            const response = await ServiceCaller<Subject[]>(
                `${BASE_URL}GetAllLocalSubjectsAsync`,
                {
                    method: "GET"
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Subject", "fetching");
        }
    },
    createSubject: async (subjectForCreate: SubjectForCreate): Promise<Response<Subject>> => {
        try {
            debugger
            const response = await ServiceCaller<Subject>(
                `${BASE_URL}CreateLocalUserAsync`,
                {
                    method: "POST",
                    body: JSON.stringify(subjectForCreate)
                }
            );
            return response;
        } catch (error) {
            throw CatchHttpError(error, "Subject", "creating");
        }
    },
    updateSubject: async (subjectForUpdate: SubjectForUpdate): Promise<Response<Subject>> => {
        try {
            const response = await ServiceCaller<Subject>(
                `${BASE_URL}UpdateAsync`,
                {
                    method: "PUT",
                    body: JSON.stringify(subjectForUpdate)
                }
            );
            return response;
        } catch (error) {
            throw CatchHttpError(error, "Subject", "updating");
        }
    },
    deleteSubject: async (subjectForDelete: SubjectForDelete): Promise<Response<SubjectForDelete>> => {
        try {
            const response = await ServiceCaller<SubjectForDelete>(
                `${BASE_URL}DeleteAsync`,
                {
                    method: "DELETE",
                    body: JSON.stringify(subjectForDelete)
                }
            );
            return response;
        } catch (error) {
            throw CatchHttpError(error, "Subject", "deleting");
        }
    },
    searchSubjects: async (query: string): Promise<Response<Subject[]>> => {
        try {
            const subjectSearchDto: SubjectSearchQuery = {
                allowWildCard: true,
                query: query,
                searchType: SubjectSearchTypes.DisplayName,
                subjectSearchSources: SubjectSearchSources.All,
                saveLocalDB: false
            }
            const response = await ServiceCaller<Subject[]>(
                `${BASE_URL}SearchByFieldAsync`,
                {
                    method: "POST",
                    body: JSON.stringify(subjectSearchDto)
                }
            );
            return response;
        } catch (error) {
            throw CatchHttpError(error, "Subject", "searching");
        }
    },
    getSubjectById: async (subjectId: string): Promise<Subject> => {
        try {
            const response = await ServiceCaller<Subject>(
                `${BASE_URL}GetSubjectAsync?id=${subjectId}`,
                {
                    method: "GET"
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Subject", "fetching");
        }
    },
    getSubjectByGuid: async (subjectId: string): Promise<Subject> => {
        try {
            const getSubjByGuidDto = {
                query: subjectId,
                saveLocalDb: false,
                subjectSearchSources: SubjectSearchSources.All
            }
            const response = await ServiceCaller<Subject>(
                `${BASE_URL}GetByGUIDAsync`,
                {
                    method: "POST",
                    body: JSON.stringify(getSubjByGuidDto)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Subject", "fetching");
        }
    },
    updatePassword: async (subjectForUpdate: SubjectForUpdate): Promise<Response<Subject>> => {
        try {
            const response = await ServiceCaller<Subject>(
                `${BASE_URL}ChangeLocalUserPasswordAsync`,
                {
                    method: "PUT",
                    body: JSON.stringify(subjectForUpdate)
                }
            );
            return response;
        } catch (error) {
            throw CatchHttpError(error, "Subject", "updating");
        }
    },
}