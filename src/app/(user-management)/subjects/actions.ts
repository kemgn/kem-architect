'use server'

import { Subject, SubjectForCreate, SubjectForUpdate } from "@/models/Entities/Subject"
import { Response } from "@/services/Helpers";
import { SubjectService } from "@/services/Subject"

export async function updateSubject(subject: SubjectForUpdate) {
    try {
        const response = await SubjectService.updateSubject(subject)
        return response
    }
    catch(error){
        const response = {data:null , isSuccess: false}
        return response;
    }
}

export async function createSubject(subject: SubjectForCreate) { 
    try {
        const response = await SubjectService.createSubject(subject);
        return response
    }
    catch(error){
        const response = {data:null , isSuccess: false}
        return response;
    }
}

export async function updatePassword(subject: SubjectForUpdate) {
    try {
        const response = await SubjectService.updatePassword(subject);
        return response
    }
    catch(error){
        const response = {data:null , isSuccess: false}
        return response;
    }
}