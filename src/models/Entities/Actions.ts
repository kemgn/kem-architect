interface Actions {
    main:           ActionRelation;
    onAfterSave:    ActionRelation;
    onError:        ActionRelation;
}

interface Action {
    systemName:         string;
    infix:             string;
    isActive:           boolean;
    id:                 string;
    postfix?:            string;
    UseDefaultValues?:  boolean;
}

interface ActionRelation {
    id:                 string;
    apiEndpointID:      string;
    apiActionID:        string;
    relationType?:      number;
    isActive:           boolean;
} 


