const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')
const { Page } = require('../models/page')
const { findDescendants } = require('../utils/pagesStructure')

const websiteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 255,
    },
    header: {},
    footer: {},
    domain: {
        type: String,
        minlength: 1,
        maxlength: 255,
        lowercase: true,
        trim: true,
        unique: true,
        sparse: true,
    },
    bufferElements: {
        type: String,
        minlength: 1,
    },
    pagesStructure: [],
    currentPage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pages',
    },
})

const blankPageContent = {
    sectionsOnPage: ['element_0', 'element_4'],
    currentId: 6,
    element_0: {
        type: 'section',
        height: 200,
        space: 50,
        background: 'rgba(200, 100, 30)',
        header: false,
        footer: false,
        allPages: false,
        children: ['element_3', 'element_1', 'element_6'],
        styles: [],
    },
    element_1: {
        type: 'box',
        height: 100,
        width: 100,
        left: 200,
        top: 100,
        background: 'rgba(100, 0, 80)',
        zIndex: 0,
        children: ['element_2'],
        parent: 'element_0',
        styles: ['element_1_element_0_hover'],
    },
    element_6: {
        type: 'menu',
        height: 50,
        width: 300,
        left: 500,
        top: 100,
        background: 'rgba(100, 0, 80)',
        zIndex: 0,
        children: [],
        parent: 'element_0',
        styles: [],
        itemsList: [
            {
                id: '0',
                name: 'All pages',
                type: 'page',
                all: true,
                newTab: false,
                hidden: false,
                path: [],
                pageId: '',
            },
        ],
        currentMenuId: 0,
    },
    element_2: {
        type: 'box',
        height: 50,
        width: 50,
        left: 100,
        top: 200,
        background: 'rgba(10, 200, 90)',
        zIndex: 0,
        children: [],
        parent: 'element_1',
        styles: [],
    },
    element_3: {
        type: 'box',
        height: 50,
        width: 50,
        left: 200,
        top: 200,
        background: 'rgba(170, 100, 200)',
        zIndex: 1,
        children: [],
        parent: 'element_0',
        styles: [],
    },
    element_1_element_0_hover: {
        type: 'hover',
        influencer: 'element_0',
        left: 0,
        top: 0,
    },
    element_4: {
        type: 'section',
        height: 500,
        space: 50,
        background: 'rgba(200, 100, 30)',
        backgroundOn: true,
        header: false,
        footer: false,
        allPages: false,
        children: ['element_5'],
        styles: [],
    },
    element_5: {
        type: 'text',
        height: 400,
        width: 400,
        left: 500,
        top: 40,
        background: 'rgba(170, 100, 200)',
        backgroundOn: true,
        zIndex: 1,
        children: [],
        parent: 'element_4',
        styles: [],
        textContent: {
            object: 'value',
            document: {
                object: 'document',
                data: {},
                nodes: [
                    {
                        object: 'block',
                        type: 'paragraph',
                        data: {},
                        nodes: [
                            {
                                object: 'text',
                                leaves: [
                                    {
                                        object: 'leaf',
                                        text:
                                            'A line of tsdfdsfsdfdsds;lkfsd;kfsd;lfk.',
                                        marks: [],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        },
    },
}

websiteSchema.methods.createPage = async function(currentPage, duplicate) {
    const generateNewPageName = (name, attr, divider, i) => {
        let currentName = name
        while (this.pagesStructure.some(item => item[attr] === currentName)) {
            i++
            currentName = name + divider + i
        }
        return i
    }

    const prepareDataCreteNewPage = async () => {
        let page = new Page()
        page.website = this
        page.publishedVersion = {}
        page.content = blankPageContent
        page.markModified('content')
        page.markModified('publishedVersion')
        page = await page.save()

        this.currentPage = page
        const pageData = {}

        let max = 0,
            nameIndex = 0,
            urlIndex = 0
        do {
            nameIndex = generateNewPageName('New page', 'name', ' ', max)
            urlIndex = generateNewPageName('new-page', 'url', '-', max)
            max = Math.max(nameIndex, urlIndex)
        } while (nameIndex !== urlIndex)

        let nameAdd = ''
        let urlAdd = ''
        if (max > 0) {
            nameAdd = ' ' + max
            urlAdd = '-' + max
        }

        pageData.name = 'New page' + nameAdd
        pageData.url = 'new-page' + urlAdd
        pageData.isHidden = false
        pageData.title = 'New page on my website'
        pageData.description = 'This my new page description'

        return { page, pageData }
    }
    const prepareDataDuplicate = async () => {
        const currentPageObject = await Page.findById(currentPage)
        const currentPageDataArray = this.pagesStructure.filter(
            item => item.id.toString() === currentPage
        )
        if (!currentPageObject || currentPageDataArray.length !== 1) {
            return { page: null, pageData: null }
        }
        let currentPageData
        currentPageData = currentPageDataArray[0]

        let page = new Page()
        page.website = this
        page.publishedVersion = currentPageObject.publishedVersion
        page.content = currentPageObject.content
        page.markModified('content')
        page.markModified('publishedVersion')
        page = await page.save()

        this.currentPage = page
        const pageData = {}

        let max = 0,
            nameIndex = 0,
            urlIndex = 0
        do {
            nameIndex = generateNewPageName(
                currentPageData.name,
                'name',
                ' ',
                max
            )
            urlIndex = generateNewPageName(currentPageData.url, 'url', '-', max)
            max = Math.max(nameIndex, urlIndex)
        } while (nameIndex !== urlIndex)

        pageData.name = currentPageData.name + ' ' + max
        pageData.url = currentPageData.url + '-' + max
        pageData.isHidden = currentPageData.isHidden
        pageData.title = currentPageData.title
        pageData.description = currentPageData.description

        return { page, pageData }
    }

    const { page, pageData } = duplicate
        ? await prepareDataDuplicate()
        : await prepareDataCreteNewPage()

    if (!page || !pageData) return

    if (this.pagesStructure.length > 0) {
        pageData.isHomePage = false
    } else {
        pageData.isHomePage = true
    }

    let newPageStructureElement
    if (!currentPage) {
        this.pagesStructure.push({
            id: page._id.toString(),
            path: [],
            ...pageData,
        })
    } else {
        const currentPageObjectArray = this.pagesStructure.filter(
            page => page.id.toString() === currentPage.toString()
        )
        if (currentPageObjectArray.length > 0) {
            const currentPageObject = currentPageObjectArray[0]
            const currentIndex = this.pagesStructure.indexOf(currentPageObject)

            const descendants = findDescendants(
                this.pagesStructure,
                currentPageObject.id
            )
            newPageStructureElement = {
                id: page._id.toString(),
                path: [...currentPageObject.path],
                ...pageData,
            }
            this.pagesStructure.splice(
                currentIndex + descendants.length + 1,
                0,
                newPageStructureElement
            )
        } else {
            this.pagesStructure.push({
                id: page._id.toString(),
                path: [],
                ...pageData,
            })
        }
    }
    this.markModified('pagesStructure')
    return {
        page,
        pagesStructure: this.pagesStructure,
    }
}

websiteSchema.methods.deletePage = async function(pageId) {
    const descedants = findDescendants(this.pagesStructure, pageId).map(
        item => item.id
    )
    descedants.push(pageId)

    await Promise.all(
        descedants.map(async id => {
            this.pagesStructure = this.pagesStructure.filter(
                item => item.id.toString() != id.toString()
            )
            await Page.findByIdAndRemove(id)
        })
    )

    if (!this.pagesStructure.some(item => item.isHomePage)) {
        if (this.pagesStructure.length > 0) {
            this.pagesStructure[0].isHomePage = true
        }
    }

    if (
        descedants.some(page => page.toString() === this.currentPage.toString())
    ) {
        if (this.pagesStructure.length > 0) {
            this.currentPage = this.pagesStructure[0].id
        } else {
            this.currentPage = null
        }
    }

    this.markModified('pagesStructure')
}

module.exports.Website = mongoose.model('Website', websiteSchema)

module.exports.validateWebsite = website => {
    const schema = {
        title: Joi.string()
            .min(1)
            .max(50),
        header: Joi.string().min(1),
        footer: Joi.string().min(1),
        domain: Joi.string()
            .min(1)
            .max(255),
        bufferElements: Joi.string(),
        pagesStructure: Joi.array(),
        currentPage: Joi.objectId(),
    }

    return Joi.validate(website, schema)
}
