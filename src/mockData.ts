import { Item } from "./models";
import { IColumn } from "./models/IColumn";


export const mockItems: any[] = [
    {
        id: 1,
        TaskName: 'Task 1',
        ResponsibleParty: 'LC',
        LastUpdated: new Date().toLocaleDateString(),
        Doc: 3,
        Com: 1
    },
    {
        id: 2,
        TaskName: 'Task 2',
        ResponsibleParty: 'LC',
        LastUpdated: new Date().toLocaleDateString(),
        Doc: 3,
        Com: 1
    },
    {
        id: 3,
        TaskName: 'Task 3',
        ResponsibleParty: 'LC',
        LastUpdated: new Date().toLocaleDateString(),
        Doc: 3,
        Com: 1
    },
    {
        id: 4,
        TaskName: 'Task 4',
        ResponsibleParty: 'LC',
        LastUpdated: new Date().toLocaleDateString(),
        Doc: 3,
        Com: 1
    },
    {
        id: 5,
        TaskName: 'Task 5',
        ResponsibleParty: 'LC',
        LastUpdated: new Date().toLocaleDateString(),
        Doc: 3,
        Com: 1
    },
    
    
]

export const mockColumns : IColumn[] = [
    {
        id: 1,
        name: 'id'
    },
    {
        id: 2,
        name: 'TaskName'
    },
    {
        id: 3,
        name: 'ResponsibleParty'
    },
    {
        id: 4,
        name: 'LastUpdated'
    },
    {
        id: 5,
        name: 'Doc'
    },
    {
        id: 6,
        name: 'Com'
    }
]