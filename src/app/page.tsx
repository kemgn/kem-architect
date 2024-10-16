import { Button, Popover, TextInput } from "@/app/(components)/_IMSComponentLibary/components";
import { CardLink } from "./(components)/_NextComponents/CardLink/CardLink";
import styles from "./page.module.css";
import PageHeader from "@/app/(components)/_NextComponents/PageHeader/PageHeader";

const workspaces = [
    {
        id: "414",
        systemName: "Integrations",
        description: "Includes various integration modules.",
        index: 0,
        color: "#ABDEE6",
    },
    {
        id: "513",
        systemName: "Utilities",
        description: "Utilities like carrying modules.",
        index: 1,
        color: "#FFAEA5",
    },
    {
        id: "533",
        systemName: "Bug Trackers",
        description: "Modules for tracking bugs",
        index: 2,
        color: "#C6DBDA",
    },
    {
        id: "13z",
        systemName: "Product Launch",
        description: "About launch of the project.",
        index: 3,
        color: "#F3B0C3",
    },
    {
        id: "13g",
        systemName: "Instance Management",
        description: "",
        index: 4,
        color: "#FFCCB6",
    },
    {
        id: "13d",
        systemName: "Feature tracker",
        description: "",
        index: 5,
        color: "#FFFFB5",
    },
    {
        id: "132",
        systemName: "Workspace",
        description: "A workspace.",
        index: 6,
        color: "#CBAACB",
    },
]

async function kek(formData: FormData) {
    "use server";
    console.log(formData);
}

export default async function Home() {
   // const [state, formAction] = useActionState(createUser, initialState)

    return (
        <>
            <div className={`flex justify-content-space-between align-items-center`}>
                <PageHeader pageTitle="Workspaces" />
                <Popover elementLabel="Create a workspace" >
                    <form action={kek}>
                        <div className={styles.formContainer}>
                            <TextInput name="workspaceName" id="workspaceName" label="Workspace name" size="medium"/>
                            <div className={styles.buttonGroup}>
                                <Button type="button" autoFocus label="Cancel" />
                                <Button type="submit" autoFocus label="Save" color="primary" />
                            </div>
                        </div>
                    </form>
                </Popover>
            </div>
            <div className={styles.cardsContainer}>
                {
                    workspaces.map((workspace) => (
                        <CardLink
                            key={workspace.id}
                            color={workspace.color}
                            description={workspace.description}
                            title={workspace.systemName}
                            href={`/modules?workspaceId=${workspace.id}`}
                            // href={`/modules/${workspace.id}`}
                        />
                    ))
                }
            </div>
        </>
    );
}
