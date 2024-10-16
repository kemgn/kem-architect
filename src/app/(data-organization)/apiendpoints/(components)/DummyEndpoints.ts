import { Endpoint } from "@/models/Entities/Endpoint";
import { HTTPMethods, logType, loggerMode } from "@/models/Enums/Enums";

export const DummyEndpoints: Endpoint[] = [
{
    systemName: "endpoint1", isActive: true, method: HTTPMethods.POST,
    loggerMode: loggerMode.Standard, logType: logType.Seperated,  id: "00",
    Actions: {
        main: {
            apiActionID:    "",
            isActive:       false,
            apiEndpointID:  "",
            id:             "",

        },
        onAfterSave: {
            apiActionID:    "",
            isActive:       false,
            apiEndpointID:  "",
            id:             "",
        },
        onError: {
            apiActionID:    "",
            isActive:       false,
            apiEndpointID:  "",
            id:             "",
        }
    }
} ,
{
    systemName: "endpoint2", isActive: false,  method: HTTPMethods.GET,
    loggerMode: loggerMode.Default, logType: logType.Unified, id: "01" , Actions: {
        main: {
            apiActionID:    "",
            isActive:       false,
            apiEndpointID:  "",
            id:             "",
        },
        onAfterSave: {
            apiActionID:    "",
            isActive:       false,
            apiEndpointID:  "",
            id:             "",
        },
        onError: {
            apiActionID:    "",
            isActive:       false,
            apiEndpointID:  "",
            id:             "",
        }
    }
}
]