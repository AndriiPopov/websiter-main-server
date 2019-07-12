import _ from 'lodash'
import serverObj from '../index'
import request from 'supertest'
import { User } from '../models/user'
import { Website } from '../models/website'
import { Page } from '../models/page'
import {
    getDBStructure,
    populateTestDB,
    pure,
} from '../utils/testPopulateDBandReadStructure'
import { findDescendants } from '../utils/pagesStructure'
import { testTokenAndCurrentAction } from '../utils/testTokenAndCurrentAction.test'

let server

describe('/api/pages', () => {
    beforeEach(() => {
        server = serverObj
    })

    afterEach(async () => {
        server.close()
        await Page.remove({})
        await Website.remove({})
        await User.remove({})
    })

    describe('POST /', () => {
        it('should respond error 400/401/412 if no token in headers, wrong token, no current action or wrong currentaction', async () => {
            const headersAreGood = await testTokenAndCurrentAction(
                server,
                'post',
                'pages'
            )
            expect(headersAreGood).toBeTruthy()
        })

        it('should respond error 401/400/404 wrong data, or wrong user, wrong page or wrong website', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0,
            })

            const structure = await getDBStructure()

            let res = await request(server)
                .post('/api/pages}')
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[0])
                .send({
                    currentPageId: structure[1].websites[2].pages[0],
                    websiteId: structure[1].websites[2]._id,
                    duplicate: true,
                })
            expect(res.status).toBe(404)

            res = await request(server)
                .post('/api/pages')
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[1])
                .send({
                    currentPageId: 'dsdfds',
                    websiteId: structure[1].websites[2]._id,
                    duplicate: true,
                })
            expect(res.status).toBe(400)

            res = await request(server)
                .post('/api/pages')
                .set('Current-Action', '11')
                .set('X-Auth-Token', tokens[1])
                .send({
                    currentPageId: structure[1].websites[2].pages[0],
                    websiteId: 'structure[1].websites[2]._id',
                    duplicate: true,
                })
            expect(res.status).toBe(400)

            res = await request(server)
                .post('/api/pages')
                .set('Current-Action', '12')
                .set('X-Auth-Token', tokens[1])
                .send({
                    currentPageId: structure[1].websites[2].pages[0],
                    websiteId: structure[1].websites[2]._id,
                    duplicate: 'truedfsfds',
                })
            expect(res.status).toBe(400)

            res = await request(server)
                .post('/api/pages')
                .set('Current-Action', '13')
                .set('X-Auth-Token', tokens[1])
                .send({
                    currentPageId: structure[0].websites[2].pages[0],
                    websiteId: structure[1].websites[2]._id,
                    duplicate: true,
                })
            expect(res.status).toBe(404)

            res = await request(server)
                .post('/api/pages')
                .set('Current-Action', '14')
                .set('X-Auth-Token', tokens[1])
                .send({
                    currentPageId: structure[1].websites[1].pages[0],
                    websiteId: structure[1].websites[2]._id,
                    duplicate: true,
                })
            expect(res.status).toBe(404)

            res = await request(server)
                .post('/api/pages')
                .set('Current-Action', '15')
                .set('X-Auth-Token', tokens[1])
                .send({
                    currentPageId: structure[1].websites[2].pages[0],
                    websiteId: structure[1].websites[1]._id,
                    duplicate: true,
                })
            expect(res.status).toBe(404)
        })

        it('should respond with page and pagesStructure for duplicate false', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0,
            })

            const oldStructure = await getDBStructure()

            const res = await request(server)
                .post('/api/pages')
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[1])
                .send({
                    currentPageId: oldStructure[1].websites[2].pages[0],
                    websiteId: oldStructure[1].websites[2]._id,
                })
            expect(res.status).toBe(200)

            const result = JSON.parse(res.text)
            const structure = await getDBStructure()
            const website = await Website.findById(structure[1].websites[2])
            const sourcePage = await Page.findById(website.pagesStructure[0].id)
            const page = await Page.findById(website.pagesStructure[11].id)

            expect(
                oldStructure[1].websites[2].pages.length -
                    website.pagesStructure.length
            ).toEqual(-1)
            expect(result.page).toEqual(pure(page))
            expect(result.pagesStructure).toEqual(pure(website.pagesStructure))
            const sourcePageLean = _.omit(sourcePage.toJSON(), ['_id'])
            const pageLean = _.omit(page.toJSON(), ['_id'])
            expect(sourcePageLean).not.toEqual(pageLean)
        })

        it('should respond with page and pagesStructure for duplicate true', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0,
            })

            const oldStructure = await getDBStructure()

            const res = await request(server)
                .post('/api/pages')
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[1])
                .send({
                    currentPageId: oldStructure[1].websites[2].pages[0],
                    websiteId: oldStructure[1].websites[2]._id,
                    duplicate: true,
                })
            expect(res.status).toBe(200)

            const result = JSON.parse(res.text)
            const structure = await getDBStructure()
            const website = await Website.findById(structure[1].websites[2])
            const sourcePage = await Page.findById(website.pagesStructure[0].id)
            const page = await Page.findById(website.pagesStructure[11].id)

            expect(
                oldStructure[1].websites[2].pages.length -
                    website.pagesStructure.length
            ).toEqual(-1)
            expect(result.page).toEqual(pure(page))
            expect(result.pagesStructure).toEqual(pure(website.pagesStructure))
            const sourcePageLean = _.omit(sourcePage.toJSON(), ['_id'])
            const pageLean = _.omit(page.toJSON(), ['_id'])
            expect(sourcePageLean).toEqual(pageLean)
        })
    })

    describe('PUT /', () => {
        it('should respond error 400/401/412 if no token in headers, wrong token, no current action or wrong currentaction', async () => {
            const headersAreGood = await testTokenAndCurrentAction(
                server,
                'put',
                'pages/12'
            )
            expect(headersAreGood).toBeTruthy()
        })

        it('should respond error 401/400/404 if wrong data, or wrong user, wrong page or wrong website', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0,
            })

            const structure = await getDBStructure()
            const website = await Website.findById(structure[1].websites[2]._id)
            const pagesStructure = pure(website.pagesStructure)

            let res = await request(server)
                .put(`/api/pages/${structure[1].websites[2].pages[0]}`)
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[0])
                .send({
                    content: { content: 'is new' },
                    pagesStructure: pagesStructure,
                })
            expect(res.status).toBe(404)

            res = await request(server)
                .put(`/api/pages/${structure[1].websites[2].pages[0]}`)
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[1])
                .send({
                    content: 'asdasdasd',
                    pagesStructure: pagesStructure,
                })
            expect(res.status).toBe(400)

            res = await request(server)
                .put(`/api/pages/${structure[1].websites[2].pages[0]}`)
                .set('Current-Action', '11')
                .set('X-Auth-Token', tokens[1])
                .send({
                    content: { content: 'is new' },
                    pagesStructure: 'pagesStructure',
                })
            expect(res.status).toBe(400)

            res = await request(server)
                .put(`/api/pages/${structure[1].websites[2].pages[0]}`)
                .set('Current-Action', '12')
                .set('X-Auth-Token', tokens[1])
                .send({
                    content: { content: 'is new' },
                    pagesStructure: [
                        ...pagesStructure,
                        {
                            url: 'dfklfsdlf',
                            id: structure[1].websites[1].pages[0],
                        },
                    ],
                })
            expect(res.status).toBe(404)
        })

        it('should respond with status true', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0,
            })

            const structure = await getDBStructure()
            const website = await Website.findById(structure[1].websites[2]._id)
            const pagesStructure = pure(website.pagesStructure)
            pagesStructure[0] = {
                ...pagesStructure[0],
                title: 'super',
            }

            const res = await request(server)
                .put(`/api/pages/${structure[1].websites[2].pages[0]}`)
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[1])
                .send({
                    content: { content: 'is new' },
                    pagesStructure: pagesStructure,
                })
            expect(res.status).toBe(200)

            const result = JSON.parse(res.text)
            const newWebsite = await Website.findById(
                structure[1].websites[2]._id
            )
            const page = await Page.findById(structure[1].websites[2].pages[0])
            const newPagesStructure = pure(newWebsite.pagesStructure)

            expect(newPagesStructure).toEqual(pagesStructure)
            expect(newPagesStructure[0].title).toEqual('super')
            expect(page.content).toEqual({ content: 'is new' })
        })
    })

    describe('DELETE /', () => {
        it('should respond error 400/401/412 if no token in headers, wrong token, no current action or wrong currentaction', async () => {
            const headersAreGood = await testTokenAndCurrentAction(
                server,
                'delete',
                'pages/12'
            )
            expect(headersAreGood).toBeTruthy()
        })

        it('should respond error 401/400/404 wrong data, or wrong user, wrong page or wrong website', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0,
            })

            const structure = await getDBStructure()

            let res = await request(server)
                .delete(`/api/pages/${structure[1].websites[2].pages[0]}`)
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[0])
            expect(res.status).toBe(404)
        })

        it('should respond with pagesStructure and currentPage', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0,
            })

            const structure = await getDBStructure()
            const website = await Website.findById(structure[1].websites[2]._id)
            const pagesStructure = pure(website.pagesStructure)
            const descedants = findDescendants(
                pagesStructure,
                structure[1].websites[2].pages[0]
            ).map(item => item.id)
            descedants.push(structure[1].websites[2].pages[0])

            const res = await request(server)
                .delete(`/api/pages/${structure[1].websites[2].pages[0]}`)
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[1])
            expect(res.status).toBe(200)

            const result = JSON.parse(res.text)
            const newStructure = await getDBStructure()
            const newWebsite = await Website.findById(
                newStructure[1].websites[2]._id
            )
            const newPagesStructure = pure(newWebsite.pagesStructure)

            expect(newPagesStructure).not.toEqual(pagesStructure)
            expect(newPagesStructure[0]).not.toEqual(pagesStructure[0])
            expect(newPagesStructure[0].isHomePage).toBeTruthy()
            expect(newPagesStructure[0].id).toEqual(result.currentPage)
            expect(result.pagesStructure).toEqual(newPagesStructure)
            expect(result.pagesStructure.length).toEqual(
                pagesStructure.length - descedants.length
            )
        })
    })

    describe('POST/PUBLISH /', () => {
        it('should respond error 400/401/412 if no token in headers, wrong token, no current action or wrong currentaction', async () => {
            const headersAreGood = await testTokenAndCurrentAction(
                server,
                'post',
                'pages/publish'
            )
            expect(headersAreGood).toBeTruthy()
        })

        it('should respond error 401/400/404 wrong data, or wrong user, wrong page or wrong website', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0,
            })

            const structure = await getDBStructure()
            const website = await Website.findById(structure[1].websites[2]._id)
            const pagesStructure = pure(website.pagesStructure)
            const sampleData = {
                currentPageId: structure[1].websites[2].pages[0],
                websiteId: structure[1].websites[2]._id,
                pagesStructure: pagesStructure,
                publishOne: true,
            }

            let res = await request(server)
                .post(`/api/pages/publish`)
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[0])
                .send(sampleData)
            expect(res.status).toBe(404)

            res = await request(server)
                .post(`/api/pages/publish`)
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[1])
                .send({
                    ...sampleData,
                    currentPage: structure[1].websites[1].pages[0],
                })
            expect(res.status).toBe(400)

            res = await request(server)
                .post(`/api/pages/publish`)
                .set('Current-Action', '11')
                .set('X-Auth-Token', tokens[1])
                .send({
                    ...sampleData,
                    currentPage: structure[0].websites[1].pages[0],
                })
            expect(res.status).toBe(400)

            res = await request(server)
                .post(`/api/pages/publish`)
                .set('Current-Action', '12')
                .set('X-Auth-Token', tokens[1])
                .send({
                    ...sampleData,
                    websiteId: structure[1].websites[1]._id,
                })
            expect(res.status).toBe(404)

            const updatedPagesStructure = [...pagesStructure]
            updatedPagesStructure[3] = {
                id: structure[0].websites[1].pages[3],
                url: 'sdasdasd',
            }
            res = await request(server)
                .post(`/api/pages/publish`)
                .set('Current-Action', '13')
                .set('X-Auth-Token', tokens[1])
                .send({
                    ...sampleData,
                    pagesStructure: updatedPagesStructure,
                })
            expect(res.status).toBe(404)

            res = await request(server)
                .post(`/api/pages/publish`)
                .set('Current-Action', '14')
                .set('X-Auth-Token', tokens[1])
                .send({
                    ...sampleData,
                    publishOne: 'one',
                })
            expect(res.status).toBe(400)
        })

        it('should respond with success true when publishOne is true', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0,
            })

            const structure = await getDBStructure()
            const website = await Website.findById(structure[1].websites[2]._id)
            const pagesStructure = pure(website.pagesStructure)
            pagesStructure[0].title = 'updated'
            const page = await Page.findById(structure[1].websites[2].pages[0])
            const page2 = await Page.findById(structure[1].websites[2].pages[2])

            expect(pure(page.content)).not.toEqual(
                pure(page.publishedVersion.content)
            )
            expect(pure(page.publishedVersion.content)).toEqual({
                key_1: 'User_1 Website 2_Page_0_value_1_key_1_old',
                key_2: 'User_1 Website 2_Page_0_value_2_key_2_old',
            })

            expect(pure(page2.content)).not.toEqual(
                pure(page2.publishedVersion.content)
            )
            expect(pure(page2.publishedVersion.content)).toEqual({
                key_1: 'User_1 Website 2_Page_2_value_1_key_1_old',
                key_2: 'User_1 Website 2_Page_2_value_2_key_2_old',
            })

            const res = await request(server)
                .post(`/api/pages/publish`)
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[1])
                .send({
                    currentPageId: structure[1].websites[2].pages[0],
                    websiteId: structure[1].websites[2]._id,
                    pagesStructure: pagesStructure,
                    publishOne: true,
                })
            expect(res.status).toBe(200)

            const result = JSON.parse(res.text)
            const newStructure = await getDBStructure()
            const newWebsite = await Website.findById(
                newStructure[1].websites[2]._id
            )
            const newPagesStructure = pure(newWebsite.pagesStructure)
            const newPage = await Page.findById(
                structure[1].websites[2].pages[0]
            )
            const newPage2 = await Page.findById(
                structure[1].websites[2].pages[2]
            )

            expect(newPagesStructure[0].title).toBe('updated')
            expect(pure(newPage.content)).toEqual(
                pure(newPage.publishedVersion.content)
            )
            expect(pure(newPage.content)).toEqual(pure(page.content))
            expect(pure(newPage.publishedVersion.content)).toEqual({
                key_1: 'User_1 Website 2_Page_0_value_1_key_1',
                key_2: 'User_1 Website 2_Page_0_value_2_key_2',
            })
            expect(pure(newPage2.content)).not.toEqual(
                pure(newPage2.publishedVersion.content)
            )
            expect(pure(newPage2.content)).toEqual(pure(page2.content))
            expect(pure(newPage2.publishedVersion.content)).toEqual({
                key_1: 'User_1 Website 2_Page_2_value_1_key_1_old',
                key_2: 'User_1 Website 2_Page_2_value_2_key_2_old',
            })
            expect(result.success).toBeTruthy()
        })

        it('should respond with success true when publishOne is true', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0,
            })

            const structure = await getDBStructure()
            const website = await Website.findById(structure[1].websites[2]._id)
            const pagesStructure = pure(website.pagesStructure)
            pagesStructure[0].title = 'updated'
            const page = await Page.findById(structure[1].websites[2].pages[0])
            const page2 = await Page.findById(structure[1].websites[2].pages[2])

            expect(pure(page.content)).not.toEqual(
                pure(page.publishedVersion.content)
            )
            expect(pure(page.publishedVersion.content)).toEqual({
                key_1: 'User_1 Website 2_Page_0_value_1_key_1_old',
                key_2: 'User_1 Website 2_Page_0_value_2_key_2_old',
            })

            expect(pure(page2.content)).not.toEqual(
                pure(page2.publishedVersion.content)
            )
            expect(pure(page2.publishedVersion.content)).toEqual({
                key_1: 'User_1 Website 2_Page_2_value_1_key_1_old',
                key_2: 'User_1 Website 2_Page_2_value_2_key_2_old',
            })

            const res = await request(server)
                .post(`/api/pages/publish`)
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[1])
                .send({
                    currentPageId: structure[1].websites[2].pages[0],
                    websiteId: structure[1].websites[2]._id,
                    pagesStructure: pagesStructure,
                    publishOne: false,
                })
            expect(res.status).toBe(200)

            const result = JSON.parse(res.text)
            const newStructure = await getDBStructure()
            const newWebsite = await Website.findById(
                newStructure[1].websites[2]._id
            )
            const newPagesStructure = pure(newWebsite.pagesStructure)
            const newPage = await Page.findById(
                structure[1].websites[2].pages[0]
            )
            const newPage2 = await Page.findById(
                structure[1].websites[2].pages[2]
            )

            expect(newPagesStructure[0].title).toBe('updated')
            expect(pure(newPage.content)).toEqual(
                pure(newPage.publishedVersion.content)
            )
            expect(pure(newPage.content)).toEqual(pure(page.content))
            expect(pure(newPage.publishedVersion.content)).toEqual({
                key_1: 'User_1 Website 2_Page_0_value_1_key_1',
                key_2: 'User_1 Website 2_Page_0_value_2_key_2',
            })
            expect(pure(newPage2.content)).toEqual(
                pure(newPage2.publishedVersion.content)
            )
            expect(pure(newPage2.content)).toEqual(pure(page2.content))
            expect(pure(newPage2.publishedVersion.content)).toEqual({
                key_1: 'User_1 Website 2_Page_2_value_1_key_1',
                key_2: 'User_1 Website 2_Page_2_value_2_key_2',
            })
            expect(result.success).toBeTruthy()
        })
    })

    describe('POST/REVERT /', () => {
        it('should respond error 400/401/412 if no token in headers, wrong token, no current action or wrong currentaction', async () => {
            const headersAreGood = await testTokenAndCurrentAction(
                server,
                'post',
                'pages/revert'
            )
            expect(headersAreGood).toBeTruthy()
        })

        it('should respond error 401/400/404 if wrong data, or wrong user, wrong page or wrong website', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0,
            })

            const structure = await getDBStructure()
            const website = await Website.findById(structure[1].websites[2]._id)
            const pagesStructure = pure(website.pagesStructure)
            const sampleData = {
                currentPageId: structure[1].websites[2].pages[0],
                websiteId: structure[1].websites[2]._id,
                pagesStructure: pagesStructure,
                publishOne: true,
            }

            let res = await request(server)
                .post(`/api/pages/revert`)
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[0])
                .send(sampleData)
            expect(res.status).toBe(404)

            res = await request(server)
                .post(`/api/pages/revert`)
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[1])
                .send({
                    ...sampleData,
                    currentPage: structure[1].websites[1].pages[0],
                })
            expect(res.status).toBe(400)

            res = await request(server)
                .post(`/api/pages/revert`)
                .set('Current-Action', '11')
                .set('X-Auth-Token', tokens[1])
                .send({
                    ...sampleData,
                    currentPage: structure[0].websites[1].pages[0],
                })
            expect(res.status).toBe(400)

            res = await request(server)
                .post(`/api/pages/revert`)
                .set('Current-Action', '12')
                .set('X-Auth-Token', tokens[1])
                .send({
                    ...sampleData,
                    websiteId: structure[1].websites[1]._id,
                })
            expect(res.status).toBe(404)

            const updatedPagesStructure = [...pagesStructure]
            updatedPagesStructure[3] = {
                id: structure[0].websites[1].pages[3],
                url: 'sdasdasd',
            }
            res = await request(server)
                .post(`/api/pages/revert`)
                .set('Current-Action', '13')
                .set('X-Auth-Token', tokens[1])
                .send({
                    ...sampleData,
                    pagesStructure: updatedPagesStructure,
                })
            expect(res.status).toBe(404)

            res = await request(server)
                .post(`/api/pages/revert`)
                .set('Current-Action', '14')
                .set('X-Auth-Token', tokens[1])
                .send({
                    ...sampleData,
                    publishOne: 'one',
                })
            expect(res.status).toBe(400)
        })

        it('should respond with success true when publishOne is true', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0,
            })

            const structure = await getDBStructure()
            const website = await Website.findById(structure[1].websites[2]._id)
            const pagesStructure = pure(website.pagesStructure)
            pagesStructure[0].title = 'updated'
            const page = await Page.findById(structure[1].websites[2].pages[0])
            const page2 = await Page.findById(structure[1].websites[2].pages[2])

            expect(pure(page.content)).not.toEqual(
                pure(page.publishedVersion.content)
            )
            expect(pure(page.content)).toEqual({
                key_1: 'User_1 Website 2_Page_0_value_1_key_1',
                key_2: 'User_1 Website 2_Page_0_value_2_key_2',
            })

            expect(pure(page2.content)).not.toEqual(
                pure(page2.publishedVersion.content)
            )
            expect(pure(page2.content)).toEqual({
                key_1: 'User_1 Website 2_Page_2_value_1_key_1',
                key_2: 'User_1 Website 2_Page_2_value_2_key_2',
            })

            const res = await request(server)
                .post(`/api/pages/revert`)
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[1])
                .send({
                    currentPageId: structure[1].websites[2].pages[0],
                    websiteId: structure[1].websites[2]._id,
                    pagesStructure: pagesStructure,
                    publishOne: true,
                })
            expect(res.status).toBe(200)

            const result = JSON.parse(res.text)
            const newStructure = await getDBStructure()
            const newWebsite = await Website.findById(
                newStructure[1].websites[2]._id
            )
            const newPagesStructure = pure(newWebsite.pagesStructure)
            const newPage = await Page.findById(
                structure[1].websites[2].pages[0]
            )
            const newPage2 = await Page.findById(
                structure[1].websites[2].pages[2]
            )
            const pagesObjects = {
                [structure[1].websites[2].pages[0]]: newPage,
            }

            expect(newPagesStructure[0].title).toBe('updated')
            expect(pure(newPage.content)).toEqual(
                pure(newPage.publishedVersion.content)
            )
            expect(pure(newPage.publishedVersion.content)).toEqual(
                pure(page.publishedVersion.content)
            )
            expect(pure(newPage.content)).toEqual({
                key_1: 'User_1 Website 2_Page_0_value_1_key_1_old',
                key_2: 'User_1 Website 2_Page_0_value_2_key_2_old',
            })
            expect(pure(newPage2.content)).not.toEqual(
                pure(newPage2.publishedVersion.content)
            )
            expect(pure(newPage2.content)).toEqual(pure(page2.content))
            expect(pure(newPage2.content)).toEqual({
                key_1: 'User_1 Website 2_Page_2_value_1_key_1',
                key_2: 'User_1 Website 2_Page_2_value_2_key_2',
            })
            expect(result.pagesObjects).toEqual(pure(pagesObjects))
        })

        it('should respond with success true when publishOne is true', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0,
            })

            const structure = await getDBStructure()
            const website = await Website.findById(structure[1].websites[2]._id)
            const pagesStructure = pure(website.pagesStructure)
            pagesStructure[0].title = 'updated'
            const page = await Page.findById(structure[1].websites[2].pages[0])
            const page2 = await Page.findById(structure[1].websites[2].pages[2])

            expect(pure(page.content)).not.toEqual(
                pure(page.publishedVersion.content)
            )
            expect(pure(page.content)).toEqual({
                key_1: 'User_1 Website 2_Page_0_value_1_key_1',
                key_2: 'User_1 Website 2_Page_0_value_2_key_2',
            })

            expect(pure(page2.content)).not.toEqual(
                pure(page2.publishedVersion.content)
            )
            expect(pure(page2.content)).toEqual({
                key_1: 'User_1 Website 2_Page_2_value_1_key_1',
                key_2: 'User_1 Website 2_Page_2_value_2_key_2',
            })

            const res = await request(server)
                .post(`/api/pages/revert`)
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[1])
                .send({
                    currentPageId: structure[1].websites[2].pages[0],
                    websiteId: structure[1].websites[2]._id,
                    pagesStructure: pagesStructure,
                    publishOne: false,
                })
            expect(res.status).toBe(200)

            const result = JSON.parse(res.text)
            const newStructure = await getDBStructure()
            const newWebsite = await Website.findById(
                newStructure[1].websites[2]._id
            )
            const newPagesStructure = pure(newWebsite.pagesStructure)
            const newPage = await Page.findById(
                structure[1].websites[2].pages[0]
            )
            const newPage2 = await Page.findById(
                structure[1].websites[2].pages[2]
            )
            const pagesObjects = {}
            await Promise.all(
                website.pagesStructure.map(async item => {
                    pagesObjects[item.id] = await Page.findById(item.id)
                })
            )

            expect(newPagesStructure[0].title).toBe('updated')
            expect(pure(newPage.content)).toEqual(
                pure(newPage.publishedVersion.content)
            )
            expect(pure(newPage.publishedVersion.content)).toEqual(
                pure(page.publishedVersion.content)
            )
            expect(pure(newPage.content)).toEqual({
                key_1: 'User_1 Website 2_Page_0_value_1_key_1_old',
                key_2: 'User_1 Website 2_Page_0_value_2_key_2_old',
            })
            expect(pure(newPage2.content)).toEqual(
                pure(newPage2.publishedVersion.content)
            )
            expect(pure(newPage2.publishedVersion.content)).toEqual(
                pure(page2.publishedVersion.content)
            )
            expect(pure(newPage2.content)).toEqual({
                key_1: 'User_1 Website 2_Page_2_value_1_key_1_old',
                key_2: 'User_1 Website 2_Page_2_value_2_key_2_old',
            })
            expect(result.pagesObjects).toEqual(pure(pagesObjects))
        })
    })
})
