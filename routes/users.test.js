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

describe('/api/users', () => {
    beforeEach(() => {
        server = serverObj
    })

    afterEach(async () => {
        server.close()
        await Page.remove({})
        await Website.remove({})
        await User.remove({})
    })

    describe('GET /', () => {
        it('should respond error 400/401/412 if no token in headers, wrong token, no current action or wrong currentaction', async () => {
            const headersAreGood = await testTokenAndCurrentAction(
                server,
                'get',
                'users'
            )
            expect(headersAreGood).toBeTruthy()
        })

        it('should respond with email, website, websites, and pagesStructure', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0,
            })

            const res = await request(server)
                .get('/api/users')
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

            expect(result.email).toEqual(user.email)
            expect(result.websites).toEqual(pure(websites))
            expect(result.website).toEqual(pure(website.toObject()))
            expect(result.pagesObjects).toEqual(pure(pagesObjects))
        })

        it('should respond with email, website, websites, and pagesStructure for empty website', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 3,
                currentPage: 0,
            })

            const res = await request(server)
                .get('/api/users')
                .set('X-Auth-Token', tokens[0])
                .set('Current-Action', '10')

            const result = JSON.parse(res.text)
            const structure = await getDBStructure()
            const user = await User.findById(structure[0]._id)
            const websites = await Promise.all(
                user.websites.map(async id => {
                    const website = await Website.findById(id)
                    return _.pick(website, ['_id', 'domain', 'title'])
                })
            )
            const website = await Website.findById(user.currentWebsite)

            expect(result.email).toEqual(user.email)
            expect(result.websites).toEqual(pure(websites))
            expect(result.website).toEqual(pure(website.toObject()))
            expect(result.pagesObjects).toEqual({})
        })

        it('should respond with email, website, websites, and pagesStructure for empty user', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 3,
                currentPage: 0,
            })

            const res = await request(server)
                .get('/api/users')
                .set('X-Auth-Token', tokens[2])
                .set('Current-Action', '10')

            const result = JSON.parse(res.text)
            const structure = await getDBStructure()
            const user = await User.findById(structure[2]._id)
            const websites = await Promise.all(
                user.websites.map(async id => {
                    const website = await Website.findById(id)
                    return _.pick(website, ['_id', 'domain', 'title'])
                })
            )

            expect(result.email).toEqual(user.email)
            expect(result.websites).toEqual([])
            expect(result.website).toEqual({})
            expect(result.pagesObjects).toEqual({})
        })
    })

    describe('POST /', () => {
        it('should respond error 400 if not valid data', async () => {
            let res = await request(server)
                .post('/api/users')
                .send({
                    email: 'aaa@aaa.aaa',
                    password: '1',
                })
            expect(res.status).toBe(400)

            res = await request(server)
                .post('/api/users')
                .send({
                    email: 'aaa@aaa',
                    password: '12345',
                })
            expect(res.status).toBe(400)
        })

        it('should respond with email, website, websites, and pagesStructure for valid email and password and reject user create for the same email address', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0,
            })

            let res = await request(server)
                .post('/api/users')
                .send({
                    email: 'aaa@aaa.aaa',
                    password: '123456',
                })

            const result = JSON.parse(res.text)
            const structure = await getDBStructure()
            const user = await User.findById(structure[3]._id)
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

            expect(res.status).toBe(200)
            expect(result._id).toEqual(user._id.toString())
            expect(result.email).toEqual(user.email)
            expect(result.websites).toEqual(pure(websites))
            expect(result.website).toEqual(pure(website.toObject()))
            expect(result.pagesObjects).toEqual(pure(pagesObjects))

            res = await request(server)
                .post('/api/users')
                .send({
                    email: 'aaa@aaa.aaa',
                    password: '123456',
                })
            expect(res.status).toBe(400)
        })
    })

    describe('DELETE /', () => {
        it('should respond error 400/401/412 if no token in headers, wrong token, no current action or wrong currentaction', async () => {
            const headersAreGood = await testTokenAndCurrentAction(
                server,
                'delete',
                'users'
            )
            expect(headersAreGood).toBeTruthy()
        })

        it('should delete user and send status true', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0,
            })
            const oldStructure = await getDBStructure()
            let res = await request(server)
                .delete('/api/users')
                .set('Current-Action', '10')
                .set('X-Auth-Token', tokens[1])
            expect(res.status).toBe(200)

            const newStructure = await getDBStructure()
            expect(oldStructure.length).toBe(3)
            expect(newStructure.length).toBe(2)

            res = await request(server)
                .delete('/api/users')
                .set('Current-Action', '11')
                .set('X-Auth-Token', tokens[1])
            expect(res.status).toBe(400)
        })
    })
})
