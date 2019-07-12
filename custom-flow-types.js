import type { $Request, $Response } from 'express'

export type userReqType = {
    user: {
        websites: Array<string>,
        currentWebsite: string,
        email: string,
        _id: string,
        save: () => {},
        deleteWebsite: (websiteId: string, res: $Response) => {},
        createWebsite: () => Promise<any>,
        currentAction: number,
    },
}

export type pagesStructureType = Array<{
    url: string,
    id: string,
}>
