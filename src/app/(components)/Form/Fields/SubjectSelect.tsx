import { AutoComplete } from '@ims/component-library';
import React, { useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { SubjectForAutoComplete } from '@/app/(user-management)/(profile-group-common)/Helpers';
import { Subject } from '@/models/Entities/Subject';
import { SubjectService } from '@/services/Subject';
import { Response } from "@/services/Helpers";

interface SubjectSelectProps {
    name?: string;
    label?: string;
    handleChange?:  (event: React.SyntheticEvent<Element, Event>, subject: Subject) => void;
}

export default function SubjectSelect(props: SubjectSelectProps) {
    
    const [subjectsData, setSubjectsData] = useState<SubjectForAutoComplete[]>([]);
    const [inputFetchLoading, setInputFetchLoading] = useState<boolean>(false);
    
    const handleSubjectInputChange = async (_: React.SyntheticEvent<Element, Event>, query: string) => {
        setInputFetchLoading(true);
        if (!query.trim()) {
            setSubjectsData([]);
            setInputFetchLoading(false);
            return;
        }
        const subjects: Response<Subject[]> = await SubjectService.searchSubjects(query);
        const updatedSubjects = subjects.data.map(subject => {
            if (subject.domainName === "") {
                return { ...subject, domainName: "Local groups" };
            }
            return subject;
        });
        setSubjectsData(updatedSubjects);
        setInputFetchLoading(false);
    }
    
    return (
        <AutoComplete
            id={"subjectSearch"}
            label={props.label}
            placeholder="Type to search subjects"
            startIcon={<SearchOutlinedIcon />}
            onInputChange={handleSubjectInputChange}
            loading={inputFetchLoading}
            onChange={props.handleChange}
            options={subjectsData}
            groupBy={option => option.domainName}
            getOptionLabel={option => option.displayName}
            defaultValue=""
            name={props.name}
            className="mb-16"
        />
    )
}
