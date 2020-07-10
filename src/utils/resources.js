const { Resource } = require('../models/resource')
const { pickResourcesObjectsLive } = require('./pickResourcesObjects')

module.exports = async (page, website) => {
    if (!page) return

    let template = website.templatesStructure.find(
        template => template.name === page.template && !template.hidden
    )

    if (!template) return

    const globalSettingsPageItem = website.pagesStructure.find(
        item => item.generalSettings
    )
    const globalSettingsTemplateItem = website.templatesStructure.find(
        item => item.generalSettings
    )
    let globalSettingsPageId = '',
        globalSettingsTemplateId = ''
    if (globalSettingsPageItem && globalSettingsTemplateItem) {
        globalSettingsPageId = globalSettingsPageItem.id
        globalSettingsTemplateId = globalSettingsTemplateItem.id
    }

    const whitelist = [page.id, globalSettingsPageId, globalSettingsTemplateId]

    const pickConnectedResources = resource => {
        whitelist.push(resource.id)
        if (resource.connectedResources)
            resource.connectedResources.forEach(connectedResource => {
                let nextResource
                if (connectedResource.type === 'plugin') {
                    nextResource = website.pluginsStructure.find(
                        item =>
                            item.name === connectedResource.name && !item.hidden
                    )
                }
                if (nextResource) pickConnectedResources(nextResource)
            })
    }
    pickConnectedResources(template)
    const resourcesObjects = await pickResourcesObjectsLive(website, whitelist)

    return {
        resourcesObjects,
        page: page.id,
        template: template.id,
        globalSettingsPageId,
        globalSettingsTemplateId,
        pagesStructure: website.pagesStructure,
        pluginsStructure: website.pluginsStructure,
        filesStructure: website.filesStructure,
        baseUrl: 'http://' + website.customDomain + '/',
    }
}
