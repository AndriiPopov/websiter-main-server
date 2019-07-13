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

let server

describe('/api/auth', () => {
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
        it('should respond error 400 if user not found or password is wrong or both', async () => {
            let res = await request(server)
                .post('/api/auth')
                .send({
                    email: 'bbb.bbb@bbb',
                    password: '12345',
                })
            expect(res.status).toBe(400)

            res = await request(server)
                .post('/api/auth')
                .send({
                    email: 'myemail_0@domain0.com',
                    password: '12345',
                })
            expect(res.status).toBe(400)

            res = await request(server)
                .post('/api/auth')
                .send({
                    email: 'myemail@domain.com',
                    password: '12345_0',
                })
            expect(res.status).toBe(400)
        })

        it('should respond with token, email, website, websites, and pageObjects', async () => {
            const tokens = await populateTestDB({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0,
            })

            const res = await request(server)
                .post('/api/auth')
                .send({
                    email: 'myemail_0@domain0.com',
                    password: '12345_0',
                })

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

            const resNew = await request(server)
                .get('/api/users')
                .set('X-Auth-Token', result.token)
            expect(resNew.status).toBe(200)
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
                .post('/api/auth')
                .send({
                    email: 'myemail_0@domain0.com',
                    password: '12345_0',
                })

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

            const resNew = await request(server)
                .get('/api/users')
                .set('X-Auth-Token', result.token)
            expect(resNew.status).toBe(200)
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
                .post('/api/auth')
                .send({
                    email: 'myemail_2@domain2.com',
                    password: '12345_2',
                })

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

            const resNew = await request(server)
                .get('/api/users')
                .set('X-Auth-Token', result.token)
            expect(resNew.status).toBe(200)
        })
    })
})
