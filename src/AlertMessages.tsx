import { alertSeverity } from "./models/Enums/Enums";
import { ToastAlertMessageFormat } from "./ToastAlertProvider";

interface AlertMessage {
    [key:string] : ToastAlertMessageFormat;
}

const contents = {
    createdSuccessfully:  "Created Successfully",
    updatedSuccessfully:  "Updated Successfully",
    deletedSuccessfully:  "Deleted Successsfuly",
    createError:          "Create Error",
    updateError:          "Update Error",
    deleteError:          "Delete Error",
    fetchError:           "Fetch  Error",             
}

const titles = {
    Success:        "Success",
    Error:          "Error",
    couldNotFound:  "Could Not Found"
}

const properties = {
    treeRoot:           "Tree Root ",
    treeNode:           "Tree Node ",
    valueUnitType:      "Value Unit Type ",
    valueUnit:          "Value Unit ",
    subject:            "Subject ",
    group:              "Group ",   
    profile:            "Profile ",    
    module:             "Module ",
    property:           "Property ", 
    view:               "View ",
    systemsetting:      "System Settings",
    form:              "Form ",
}

export const messages: AlertMessage = {
    createTreeRootSuccess: {
        severity: alertSeverity.success,
        content: properties.treeRoot + contents.createdSuccessfully,
        title:   titles.Success
    },
    updateTreeRootSuccess: {
        severity: alertSeverity.success,
        content: properties.treeRoot + contents.updatedSuccessfully,
        title:   titles.Success
    },
    deleteTreeRootSuccess: {
        severity: alertSeverity.success,
        content: properties.treeRoot + contents.deletedSuccessfully,
        title:   titles.Success 
    },
    createTreeNodeSuccess: {
        severity: alertSeverity.success,
        content: properties.treeNode + contents.createdSuccessfully,
        title:   titles.Success
    },
    updateTreeNodeSuccess: {
        severity: alertSeverity.success,
        content: properties.treeNode + contents.updatedSuccessfully,
        title:   titles.Success
    },
    deleteTreeNodeSuccess: {
        severity: alertSeverity.success,
        content: properties.treeNode + contents.deletedSuccessfully,
        title:   titles.Success
    },
    createTreeRootError: {
        severity: alertSeverity.error,
        content:  properties.treeRoot + contents.createError,
        title:    titles.Error
    },
    updateTreeRootError: {
        severity: alertSeverity.error,
        content:  properties.treeRoot + contents.updateError,
        title:    titles.Error
    },
    deleteTreeRootError: {
        severity: alertSeverity.error,
        content:  properties.treeRoot  + contents.deleteError,
        title:    titles.Error
    },
    createTreeNodeError: {
        severity: alertSeverity.error,
        content: properties.treeNode   + contents.createError,
        title:   titles.Error 
    },
    updateTreeNodeError: {
        severity: alertSeverity.error,
        content: properties.treeNode   + contents.updateError,
        title:   titles.Error
    },
    deleteTreeNodeError: {
        severity: alertSeverity.error,
        content: properties.treeNode  + contents.deleteError,
        title:   titles.Error
    },


    createValueUnitTypeSuccess: {
        severity: alertSeverity.success,
        content: properties.valueUnitType + contents.createdSuccessfully,
        title:   titles.Success
    },
    updateValueUnitTypeSuccess: {
        severity: alertSeverity.success,
        content: properties.valueUnitType + contents.updatedSuccessfully,
        title:   titles.Success
    },
    deleteValueUnitTypeSuccess: {
        severity: alertSeverity.success,
        content: properties.valueUnitType + contents.deletedSuccessfully,
        title:   titles.Success
    },
    createValueUnitTypeError: {
        severity:   alertSeverity.error,
        content:    properties.valueUnitType + contents.createError,
        title:      titles.Success
    },
    updateValueUnitTypeError: {
        severity:   alertSeverity.error,
        content:    properties.valueUnitType + contents.updateError,
        title:      titles.Error
    },
    deleteValueUnitTypeError: {
        severity:   alertSeverity.error,
        content:    properties.valueUnitType + contents.deleteError,
        title:      titles.Error
    },
    createValueUnitSuccess: {
        severity:   alertSeverity.success,
        content:    properties.valueUnit + contents.createdSuccessfully,
        title:      titles.Success
    },
    updateValueUnitSuccess: {
        severity:   alertSeverity.success,
        content:    properties.valueUnit + contents.updatedSuccessfully,
        title:      titles.Success
    },
    deleteValueUnitSuccess: {
        severity:   alertSeverity.success,
        content:    properties.valueUnit + contents.deletedSuccessfully,
        title:      titles.Success
    },
    createValueUnitError: {
        severity:   alertSeverity.error,
        content:    properties.valueUnit + contents.createError,
        title:      titles.Error
    },
    updateValueUnitError: {
        severity:   alertSeverity.error,
        content:    properties.valueUnit + contents.updateError,
        title:      titles.Error
    },
    deleteValueUnitError: {
        severity:   alertSeverity.error,
        content:    properties.valueUnit + contents.deleteError,
        title:      titles.Error
    },


    createSubjectSuccess:   {
        severity:   alertSeverity.success,
        content:    properties.subject + contents.createdSuccessfully,
        title:      titles.Success
    },
    updateSubjectSuccess: {
        severity:   alertSeverity.success,
        content:    properties.subject + contents.updatedSuccessfully,
        title:      titles.Success
    },
    deleteSubjectSuccess: {
        severity:   alertSeverity.success,
        content:    properties.subject + contents.deletedSuccessfully,
        title:      titles.Success
    },
    createSubjectError: {
        severity:   alertSeverity.error,
        content:    properties.subject + contents.createError,
        title:      titles.Error
    },
    updateSubjectError: {
        severity:   alertSeverity.error,
        content:    properties.subject + contents.updateError,
        title:      titles.Error
    },
    deleteSubjectError: {
        severity:   alertSeverity.error,
        content:    properties.subject + contents.deleteError,
        title:      titles.Error
    },


    createGroupSuccess: {
        severity:   alertSeverity.success,
        content:    properties.group + contents.createdSuccessfully,
        title:      titles.Success
    },
    updateGroupSuccess: {
        severity:   alertSeverity.success,
        content:    properties.group + contents.updatedSuccessfully,
        title:      titles.Success
    },
    deleteGroupSuccess: {
        severity:   alertSeverity.success,
        content:    properties.group + contents.deletedSuccessfully,
        title:      titles.Success
    },
    createGroupError: {
        severity:   alertSeverity.error,
        content:    properties.group + contents.createError,
        title:      titles.Error
    },
    updateGroupError: {
        severity:   alertSeverity.error,
        content:    properties.group + contents.updateError,
        title:      titles.Error
    },
    deleteGroupError: {
        severity:   alertSeverity.error,
        content:    properties.group + contents.deleteError,
        title:      titles.Error    
    },


    createProfileSuccess: {
        severity:   alertSeverity.success,
        content:    properties.profile + contents.createdSuccessfully,
        title:      titles.Success
    },
    updateProfileSuccess: {
        severity:   alertSeverity.success,
        content:    properties.profile + contents.updatedSuccessfully,
        title:      titles.Success
    },
    deleteProfileSuccess: {
        severity:   alertSeverity.success,
        content:    properties.profile + contents.deletedSuccessfully,
        title:      titles.Success
    },
    createProfileError: {
        severity:   alertSeverity.error,
        content:    properties.profile + contents.createError,
        title:      titles.Error
    },
    updateProfileError: {
        severity:   alertSeverity.error,
        content:    properties.profile + contents.updateError,
        title:      titles.Error
    },
    deleteProfileError: {
        severity:   alertSeverity.error,
        content:    properties.profile + contents.deleteError,
        title:      titles.Error
    },


    createModuleSuccess: {
        severity:   alertSeverity.success,
        content:    properties.module + contents.createdSuccessfully,
        title:      titles.Success 
    },
    updateModuleSuccess: { 
        severity:   alertSeverity.success,
        content:    properties.module + contents.updatedSuccessfully,
        title:      titles.Success        
    },
    deleteModuleSuccess: { 
        severity:   alertSeverity.success,
        content:    properties.module + contents.deletedSuccessfully,
        title:      titles.Success        
    },
    createModuleError: { 
        severity:   alertSeverity.error,
        content:    properties.module + contents.createError,
        title:      titles.Error
    },
    updateModuleError: { 
        severity:   alertSeverity.error,
        content:    properties.module + contents.updateError,
        title:      titles.Error        
    },
    deleteModuleError: { 
        severity:   alertSeverity.error,
        content:    properties.module + contents.deleteError,
        title:      titles.Error        
    },


    createPropertySuccess: {
        severity:   alertSeverity.success,
        content:    properties.property + contents.createdSuccessfully,
        title:      titles.Success
    },
    updatePropertySuccess: {
        severity:   alertSeverity.success,
        content:    properties.property + contents.updatedSuccessfully,
        title:      titles.Success
    },
    deletePropertySuccess: {
        severity:   alertSeverity.error,
        content:    properties.property + contents.deletedSuccessfully,
        title:      titles.Success
    },
    createPropertyError: {
        severity:   alertSeverity.error,
        content:    properties.property + contents.createError,
        title:      titles.Error
    },
    updatePropertyError: {
        severity:   alertSeverity.error,
        content:    properties.property + contents.updateError,
        title:      titles.Error
    },
    deletePropertyError: {
        severity:   alertSeverity.error,
        content:    properties.property + contents.deleteError,
        title:      titles.Error
    },


    createViewSuccess: {
        severity:   alertSeverity.success,
        content:    properties.view + contents.createdSuccessfully,
        title:      titles.Success
    },
    updateViewSuccess: {
        severity:   alertSeverity.success,
        content:    properties.view + contents.updatedSuccessfully,
        title:      titles.Success
    },
    deleteViewSuccess: {
        severity:   alertSeverity.success,
        content:    properties.view + contents.deletedSuccessfully,
        title:      titles.Success
    },
    createViewError: {
        severity:   alertSeverity.error,
        content:    properties.view + contents.createError,
        title:      titles.Error
    },
    updateViewError: {
        severity:   alertSeverity.error,
        content:    properties.view + contents.updateError,
        title:      titles.Error
    },
    deleteViewError: {
        severity:   alertSeverity.error,
        content:    properties.view + contents.deleteError,
        title:      titles.Error
    },
    updateSystemSettingSuccess: {
        severity:   alertSeverity.success,
        content:    properties.systemsetting + contents.updatedSuccessfully,
        title:      titles.Success
    },
    updateSystemSettingError: {
        severity:   alertSeverity.error,
        content:    properties.systemsetting + contents.updateError,
        title:      titles.Error
    },

    createFormSuccess: {
        severity:   alertSeverity.success,
        content:    properties.form + contents.createdSuccessfully,
        title:      titles.Success
    },
    updateFormSuccess: {
        severity:   alertSeverity.success,
        content:    properties.form + contents.updatedSuccessfully,
        title:      titles.Success
    },
    deleteFormSuccess: {
        severity:   alertSeverity.success,
        content:    properties.form + contents.deletedSuccessfully,
        title:      titles.Success
    },
    createFormError: {
        severity:   alertSeverity.error,
        content:    properties.form + contents.createError,
        title:      titles.Error
    },
    updateFormError: {
        severity:   alertSeverity.error,
        content:    properties.form + contents.updateError,
        title:      titles.Error
    },
    deleteFormError: {
        severity:   alertSeverity.error,
        content:    properties.form + contents.deleteError,
        title:      titles.Error
    },

}