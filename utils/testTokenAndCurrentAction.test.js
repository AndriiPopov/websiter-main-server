import request from 'supertest'
import { populateTestDB } from './testPopulateDBandReadStructure'

export const testTokenAndCurrentAction = async (server: {}, method, url) => {
    const tokens = await populateTestDB({
        users: 2,
        websites: 3,
        pages: 15,
        currentWebsite: 0,
        currentPage: 0,
    })

    let res0, res1, res2, res3

    switch (method) {
        case 'get': {
            res0 = await request(server)
                .get(`/api/${url}`)
                .set('x-auth-token', 'fail_token')
                .set('Current-Action', '10')

            res1 = await request(server)
                .get(`/api/${url}`)
                .set('Current-Action', '10')

            res2 = await request(server)
                .get(`/api/${url}`)
                .set('x-auth-token', tokens[1])

            res3 = await request(server)
                .get(`/api/${url}`)
                .set('x-auth-token', tokens[1])
                .set('Current-Action', '1')
            break
        }

        case 'post': {
            res0 = await request(server)
                .post(`/api/${url}`)
                .set('x-auth-token', 'fail_token')
                .set('Current-Action', '10')

            res1 = await request(server)
                .post(`/api/${url}`)
                .set('Current-Action', '10')

            res2 = await request(server)
                .post(`/api/${url}`)
                .set('x-auth-token', tokens[1])

            res3 = await request(server)
                .post(`/api/${url}`)
                .set('x-auth-token', tokens[1])
                .set('Current-Action', '1')
            break
        }

        case 'put': {
            res0 = await request(server)
                .put(`/api/${url}`)
                .set('x-auth-token', 'fail_token')
                .set('Current-Action', '10')

            res1 = await request(server)
                .put(`/api/${url}`)
                .set('Current-Action', '10')

            res2 = await request(server)
                .put(`/api/${url}`)
                .set('x-auth-token', tokens[1])

            res3 = await request(server)
                .put(`/api/${url}`)
                .set('x-auth-token', tokens[1])
                .set('Current-Action', '1')
            break
        }

        case 'delete': {
            res0 = await request(server)
                .delete(`/api/${url}`)
                .set('x-auth-token', 'fail_token')
                .set('Current-Action', '10')

            res1 = await request(server)
                .delete(`/api/${url}`)
                .set('Current-Action', '10')

            res2 = await request(server)
                .delete(`/api/${url}`)
                .set('x-auth-token', tokens[1])

            res3 = await request(server)
                .delete(`/api/${url}`)
                .set('x-auth-token', tokens[1])
                .set('Current-Action', '1')
            break
        }
    }

    return (
        res0.status === 400 &&
        res1.status === 401 &&
        res2.status === 412 &&
        res3.status === 412
    )
}
