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
import { testTokenAndCurrentAction } from '../utils/testTokenAndCurrentAction.test'

let server

describe('/api/websites', () => {
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
                'websites'
            )
            expect(headersAreGood).toBeTruthy()
        })

        it('should respond with website, websites, and pagesObjects', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0,
            })

            const oldStructure = await getDBStructure()

            const res = await request(server)
                .post('/api/websites')
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[1])

            const result = JSON.parse(res.text)
            const structure = await getDBStructure()
            const user = await User.findById(structure[1]._id)
            const websites = await Promise.all(
                user.websites.map(async id => {
                    const website = await Website.findById(id)
                    return _.pick(website, ['_id', 'domain', 'title'])
                })
            )
            const website = await Website.findById(user.currentWebsite)
            const pagesObjects = {}
            await Promise.all(
                website.pagesStructure.map(async item => {
                    pagesObjects[item.id] = await Page.findById(item.id)
                })
            )

            expect(result.websites).toEqual(pure(websites))
            expect(result.website).toEqual(pure(website.toObject()))
            expect(result.pagesObjects).toEqual(pure(pagesObjects))
            expect(result.websites.length).toBe(5)
            expect(result.website.title).toBe('New website')
            expect(result.website.pagesStructure.length).toBe(1)
        })
    })

    describe('PUT /:id /', () => {
        it('should respond error 400/401/412 if no token in headers, wrong token, no current action or wrong currentaction', async () => {
            const headersAreGood = await testTokenAndCurrentAction(
                server,
                'put',
                'websites/1'
            )
            expect(headersAreGood).toBeTruthy()
        })

        it('should respond error 401/400 if wrong data, or wrong user', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0,
            })

            const structure = await getDBStructure()

            let res = await request(server)
                .put(`/api/websites/${structure[1].websites[2]._id}`)
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[1])
                .send({
                    title: 1,
                })
            expect(res.status).toBe(400)

            res = await request(server)
                .put(`/api/websites/dskfdjslkwelkj`)
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[0])
                .send({
                    title: 1,
                })
            expect(res.status).toBe(404)

            res = await request(server)
                .put(`/api/websites/${structure[1].websites[2]._id}`)
                .set('Current-Action', '11')
                .set('X-Auth-Token', tokens[0])
                .send({
                    title: 'Updated',
                })
            expect(res.status).toBe(404)
            const website = await Website.findById(structure[1].websites[2]._id)
            expect(website.title).not.toBe('Updated')

            const pagesStructure = pure(website.pagesStructure)
            res = await request(server)
                .put(`/api/websites/${structure[1].websites[2]._id}`)
                .set('Current-Action', '11')
                .set('X-Auth-Token', tokens[1])
                .send({
                    pagesStructure: [
                        ...pagesStructure,
                        {
                            url: 'askjsaas',
                            id: structure[0].websites[2].pages[0],
                        },
                    ],
                })
            expect(res.status).toBe(404)
        })

        it('should update the website and respond with website and websites', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 2,
                currentPage: 0,
            })
            const oldStructure = await getDBStructure()
            const oldUser = await User.findById(oldStructure[1]._id)
            const oldWebsite = await Website.findById(oldUser.currentWebsite)
            const oldPagesStructure = pure(oldWebsite.pagesStructure)
            oldPagesStructure[0].url = 'updated'
            oldPagesStructure[1].url = 'updated2'

            let res = await request(server)
                .put(`/api/websites/${oldStructure[1].websites[2]._id}`)
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[1])
                .set('Content-Type', 'application/json')
                .send({
                    title: 'Updated',
                    pagesStructure: oldPagesStructure,
                })
            expect(res.status).toBe(200)

            const result = JSON.parse(res.text)
            const structure = await getDBStructure()
            const user = await User.findById(structure[1]._id)
            const websites = await Promise.all(
                user.websites.map(async id => {
                    const website = await Website.findById(id)
                    return _.pick(website, ['_id', 'domain', 'title'])
                })
            )
            const website = await Website.findById(user.currentWebsite)

            expect(result.websites).toEqual(pure(websites))
            expect(result.website).toEqual(pure(website.toObject()))
            expect(website.title).toBe('Updated')
            expect(website.pagesStructure[0].url).toBe('updated')
            expect(website.pagesStructure[1].url).toBe('updated2')
        })

        it('should respond with urlNotGood true if url is taken', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 2,
                currentPage: 0,
            })
            const oldStructure = await getDBStructure()
            const oldUser = await User.findById(oldStructure[1]._id)
            const oldWebsites = await Promise.all(
                oldUser.websites.map(async id => {
                    const website = await Website.findById(id)
                    return _.pick(website, ['_id', 'domain', 'title'])
                })
            )
            const oldWebsite = await Website.findById(oldUser.currentWebsite)
            const oldPagesStructure = pure(oldWebsite.pagesStructure)
            oldPagesStructure[0].url = oldPagesStructure[1].url

            let res = await request(server)
                .put(`/api/websites/${oldStructure[1].websites[2]._id}`)
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[1])
                .set('Content-Type', 'application/json')
                .send({
                    title: 'Updated',
                    pagesStructure: oldPagesStructure,
                })
            expect(res.status).toBe(200)

            const result = JSON.parse(res.text)
            const structure = await getDBStructure()
            const user = await User.findById(structure[1]._id)
            const websites = await Promise.all(
                user.websites.map(async id => {
                    const website = await Website.findById(id)
                    return _.pick(website, ['_id', 'domain', 'title'])
                })
            )
            const website = await Website.findById(user.currentWebsite)

            expect(pure(oldWebsites)).toEqual(pure(websites))
            expect(pure(website)).toEqual(pure(website.toObject()))
            expect(result.urlNotOk).toBeTruthy()
        })

        it('should respond with urlNotGood true if url is in wron gformat', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 2,
                currentPage: 0,
            })
            const oldStructure = await getDBStructure()
            const oldUser = await User.findById(oldStructure[1]._id)
            const oldWebsites = await Promise.all(
                oldUser.websites.map(async id => {
                    const website = await Website.findById(id)
                    return _.pick(website, ['_id', 'domain', 'title'])
                })
            )
            const oldWebsite = await Website.findById(oldUser.currentWebsite)
            const oldPagesStructure = pure(oldWebsite.pagesStructure)
            oldPagesStructure[0].url = 'askdjaslj aldjalk'

            let res = await request(server)
                .put(`/api/websites/${oldStructure[1].websites[2]._id}`)
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[1])
                .set('Content-Type', 'application/json')
                .send({
                    title: 'Updated',
                    pagesStructure: oldPagesStructure,
                })
            expect(res.status).toBe(200)

            const result = JSON.parse(res.text)
            const structure = await getDBStructure()
            const user = await User.findById(structure[1]._id)
            const websites = await Promise.all(
                user.websites.map(async id => {
                    const website = await Website.findById(id)
                    return _.pick(website, ['_id', 'domain', 'title'])
                })
            )
            const website = await Website.findById(user.currentWebsite)

            expect(pure(oldWebsites)).toEqual(pure(websites))
            expect(pure(website)).toEqual(pure(website.toObject()))
            expect(result.urlNotOk).toBeTruthy()
        })
    })

    describe('PUT /currentpage/:id /', () => {
        it('should respond error 400/401/412 if no token in headers, wrong token, no current action or wrong currentaction', async () => {
            const headersAreGood = await testTokenAndCurrentAction(
                server,
                'put',
                'websites/currentpage/1'
            )
            expect(headersAreGood).toBeTruthy()
        })
        it('should respond error 401 if  wrong data, or wrong user', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0,
            })

            const structure = await getDBStructure()

            let res = await request(server)
                .put(
                    `/api/websites/currentpage/${structure[1].websites[2]._id}`
                )
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[1])
                .send({
                    title: 1,
                })
            expect(res.status).toBe(400)

            res = await request(server)
                .put(`/api/websites/currentpage/dskfdjslkwelkj`)
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[0])
                .send({
                    title: 1,
                })
            expect(res.status).toBe(404)

            res = await request(server)
                .put(
                    `/api/websites/currentpage/${structure[1].websites[2]._id}`
                )
                .set('Current-Action', '11')
                .set('X-Auth-Token', tokens[0])
                .send({
                    title: 'Updated',
                })
            expect(res.status).toBe(404)
            const website = await Website.findById(structure[1].websites[2]._id)
            expect(website.title).not.toBe('Updated')
        })

        it('should update the website and respond with status true', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 2,
                currentPage: 0,
            })
            const oldStructure = await getDBStructure()
            const oldUser = await User.findById(oldStructure[1]._id)
            const oldWebsite = await Website.findById(oldUser.currentWebsite)

            let res = await request(server)
                .put(
                    `/api/websites/currentpage/${
                        oldStructure[1].websites[2]._id
                    }`
                )
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[1])
                .set('Content-Type', 'application/json')
                .send({
                    currentPage: oldStructure[1].websites[2].pages[2],
                    title: 'Updated',
                })
            expect(res.status).toBe(200)

            const result = JSON.parse(res.text)
            const structure = await getDBStructure()
            const user = await User.findById(structure[1]._id)
            const website = await Website.findById(user.currentWebsite)

            expect(result.status).toBeTruthy()
            expect(oldWebsite.title).toEqual(website.title)
            expect(website.title).not.toBe('Updated')
            expect(pure(oldWebsite.currentPage)).not.toEqual(
                pure(website.currentPage)
            )
            expect(pure(website.currentPage)).toEqual(
                pure(oldStructure[1].websites[2].pages[2])
            )
        })
    })

    describe('GET /:id /', () => {
        it('should respond error 400/401/412 if no token in headers, wrong token, no current action or wrong currentaction', async () => {
            const headersAreGood = await testTokenAndCurrentAction(
                server,
                'get',
                'websites/1'
            )
            expect(headersAreGood).toBeTruthy()
        })
        it('should respond error 401/400 if wrong data, or wrong user', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0,
            })

            const structure = await getDBStructure()

            let res = await request(server)
                .get(`/api/websites/${structure[1].websites[2]._id}`)
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[0])
            expect(res.status).toBe(404)
        })

        it('should website and pagesObjects', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 2,
                currentPage: 0,
            })

            const structure = await getDBStructure()
            const user = await User.findById(structure[1]._id)
            const website = await Website.findById(structure[1].websites[2]._id)
            const pagesObjects = {}
            await Promise.all(
                website.pagesStructure.map(async item => {
                    pagesObjects[item.id] = await Page.findById(item.id)
                })
            )

            let res = await request(server)
                .get(`/api/websites/${structure[1].websites[2]._id}`)
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[1])
                .set('Content-Type', 'application/json')
            expect(res.status).toBe(200)

            const result = JSON.parse(res.text)

            expect(result.website).toEqual(pure(website.toObject()))
            expect(result.pagesObjects).toEqual(pure(pagesObjects))
        })
    })

    describe('DELETE /', () => {
        it('should respond error 400/401/412 if no token in headers, wrong token, no current action or wrong currentaction', async () => {
            const headersAreGood = await testTokenAndCurrentAction(
                server,
                'delete',
                'websites/1'
            )
            expect(headersAreGood).toBeTruthy()
        })

        it('should respond error 401/400 wrong data, or wrong user', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0,
            })

            const structure = await getDBStructure()

            let res = await request(server)
                .delete(`/api/websites/dskfdjslkwelkj`)
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[0])
            expect(res.status).toBe(404)

            res = await request(server)
                .delete(`/api/websites/${structure[1].websites[2]._id}`)
                .set('Current-Action', '11')
                .set('X-Auth-Token', tokens[0])
            expect(res.status).toBe(404)
        })

        it('should delete website and send website, websites and pagesObjects -- delete two websites one by one', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 1,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0,
            })
            const oldStructure = await getDBStructure()
            let res = await request(server)
                .delete(`/api/websites/${oldStructure[1].websites[0]._id}`)
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[1])
            expect(res.status).toBe(200)

            const result = JSON.parse(res.text)
            const structure = await getDBStructure()
            const user = await User.findById(structure[1]._id)
            const website = await Website.findById(user.currentWebsite)
            const pagesObjects = {}
            await Promise.all(
                website.pagesStructure.map(async item => {
                    pagesObjects[item.id] = await Page.findById(item.id)
                })
            )
            const websites = await Promise.all(
                user.websites.map(async id => {
                    const website = await Website.findById(id)
                    return _.pick(website, ['_id', 'domain', 'title'])
                })
            )

            expect(oldStructure[1].websites.length).toBe(2)
            expect(structure[1].websites.length).toBe(1)
            expect(result.websites).toEqual(pure(websites))
            expect(result.website).toEqual(pure(website))
            expect(result.pagesObjects).toEqual(pure(pagesObjects))

            res = await request(server)
                .delete(`/api/websites/${user.currentWebsite}`)
                .set('Current-Action', '11')
                .set('X-Auth-Token', tokens[1])
            expect(res.status).toBe(200)

            const newResult = JSON.parse(res.text)
            const newStructure = await getDBStructure()
            const newUser = await User.findById(structure[1]._id)

            expect(newStructure[1].websites.length).toBe(0)
            expect(newResult.websites).toEqual([])
            expect(newResult.website).toBeNull()
            expect(newResult.pagesObjects).toEqual({})
        })
    })
})
