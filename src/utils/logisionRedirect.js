const redirectIndex = [
    {
        old: '/ru/knowledge',
        new: '/ru/blog',
    },
    {
        old: '/knowledge',
        new: '/blog',
    },
    {
        old: '/ru/knowledge/benefits-of-using-route-planning-software',
        new: '/ru/blog/benefits-of-using-route-planning-software',
    },
    {
        old: '/ru/knowledge/why-to-optimize-delivery-routes',
        new: '/ru/blog/why-to-optimize-delivery-routes',
    },
    {
        old: '/ru/knowledge/how-to-choose-and-buy-business-software',
        new: '/ru/blog/how-to-choose-and-buy-business-software',
    },
    {
        old: '/ru/knowledge/buy-vs-build-vs-diy-erp-business-software-solution',
        new: '/ru/blog/buy-vs-build-vs-diy-erp-business-software-solution',
    },
    {
        old: '/ru/knowledge/what-is-diy-business-software',
        new: '/ru/blog/what-is-diy-business-software',
    },
    {
        old: '/ru/knowledge/control-inventory-costs-with-cmms',
        new: '/ru/blog/control-inventory-costs-with-cmms',
    },
    {
        old: '/ru/knowledge/predictive-maintenance-with-cmms',
        new: '/ru/blog/predictive-maintenance-with-cmms',
    },
    {
        old: '/ru/knowledge/preventative-maintenance-strategy-with-cmms',
        new: '/ru/blog/preventative-maintenance-strategy-with-cmms',
    },
    {
        old:
            '/ru/knowledge/benefits-of-cmms-computerized-maintenance-management-system',
        new:
            '/ru/blog/benefits-of-cmms-computerized-maintenance-management-system',
    },
    {
        old:
            '/ru/knowledge/what-is-cmms-computerized-maintenance-management-system',
        new: '/ru/blog/what-is-cmms-computerized-maintenance-management-system',
    },
    {
        old: '/ru/knowledge/sales-rep-order-takers-vs-order-creators',
        new: '/ru/blog/sales-rep-order-takers-vs-order-creators',
    },
    {
        old: '/ru/knowledge/sales-objection-handling',
        new: '/ru/blog/sales-objection-handling',
    },
    {
        old: '/ru/knowledge/bad-signs-for-salesperson-career',
        new: '/ru/blog/bad-signs-for-salesperson-career',
    },
    {
        old: '/ru/knowledge/upselling',
        new: '/ru/blog/upselling',
    },
    {
        old: '/ru/knowledge/cross-selling',
        new: '/ru/blog/cross-selling',
    },
    {
        old: '/ru/knowledge/sales-marketing-terms-glossary',
        new: '/ru/blog/sales-marketing-terms-glossary',
    },
    {
        old: '/ru/knowledge/b2b-sales-rep-prospecting-methods',
        new: '/ru/blog/b2b-sales-rep-prospecting-methods',
    },
    {
        old: '/ru/knowledge/b2b-ecommerce-platform-roi-calculator',
        new: '/ru/blog/b2b-ecommerce-platform-roi-calculator',
    },
    {
        old: '/ru/knowledge/b2b-ecommerce-platform-return-on-investment',
        new: '/ru/blog/b2b-ecommerce-platform-return-on-investment',
    },
    {
        old: '/ru/knowledge/features-of-b2b-ecommerce-platform',
        new: '/ru/blog/features-of-b2b-ecommerce-platform',
    },
    {
        old: '/ru/knowledge/b2b_business_blog_wrap_up_june_2016',
        new: '/ru/blog/b2b_business_blog_wrap_up_june_2016',
    },

    {
        old: '/knowledge/benefits-of-using-route-planning-software',
        new: '/blog/benefits-of-using-route-planning-software',
    },
    {
        old: '/knowledge/why-to-optimize-delivery-routes',
        new: '/blog/why-to-optimize-delivery-routes',
    },
    {
        old: '/knowledge/how-to-choose-and-buy-business-software',
        new: '/blog/how-to-choose-and-buy-business-software',
    },
    {
        old: '/knowledge/buy-vs-build-vs-diy-erp-business-software-solution',
        new: '/blog/buy-vs-build-vs-diy-erp-business-software-solution',
    },
    {
        old: '/knowledge/what-is-diy-business-software',
        new: '/blog/what-is-diy-business-software',
    },
    {
        old: '/knowledge/control-inventory-costs-with-cmms',
        new: '/blog/control-inventory-costs-with-cmms',
    },
    {
        old: '/knowledge/predictive-maintenance-with-cmms',
        new: '/blog/predictive-maintenance-with-cmms',
    },
    {
        old: '/knowledge/preventative-maintenance-strategy-with-cmms',
        new: '/blog/preventative-maintenance-strategy-with-cmms',
    },
    {
        old:
            '/knowledge/benefits-of-cmms-computerized-maintenance-management-system',
        new:
            '/blog/benefits-of-cmms-computerized-maintenance-management-system',
    },
    {
        old:
            '/knowledge/what-is-cmms-computerized-maintenance-management-system',
        new: '/blog/what-is-cmms-computerized-maintenance-management-system',
    },
    {
        old: '/knowledge/sales-rep-order-takers-vs-order-creators',
        new: '/blog/sales-rep-order-takers-vs-order-creators',
    },
    {
        old: '/knowledge/sales-objection-handling',
        new: '/blog/sales-objection-handling',
    },
    {
        old: '/knowledge/bad-signs-for-salesperson-career',
        new: '/blog/bad-signs-for-salesperson-career',
    },
    {
        old: '/knowledge/upselling',
        new: '/blog/upselling',
    },
    {
        old: '/knowledge/cross-selling',
        new: '/blog/cross-selling',
    },
    {
        old: '/knowledge/sales-marketing-terms-glossary',
        new: '/blog/sales-marketing-terms-glossary',
    },
    {
        old: '/knowledge/b2b-sales-rep-prospecting-methods',
        new: '/blog/b2b-sales-rep-prospecting-methods',
    },
    {
        old: '/knowledge/b2b-ecommerce-platform-roi-calculator',
        new: '/blog/b2b-ecommerce-platform-roi-calculator',
    },
    {
        old: '/knowledge/b2b-ecommerce-platform-return-on-investment',
        new: '/blog/b2b-ecommerce-platform-return-on-investment',
    },
    {
        old: '/knowledge/features-of-b2b-ecommerce-platform',
        new: '/blog/features-of-b2b-ecommerce-platform',
    },
    {
        old: '/knowledge/b2b_business_blog_wrap_up_june_2016',
        new: '/blog/b2b_business_blog_wrap_up_june_2016',
    },

    {
        old:
            '/img/knowledge/sales-objection-handling/sales-objections-handling-techniques-slides.pdf',
        new: '/images/blog/sales-objections-handling-techniques-slides.pdf',
    },
    {
        old: '/img/knowledge/upselling/how-to-upsell-slides.pdf',
        new: '/images/blog/how-to-upsell-slides.pdf',
    },
    {
        old:
            '/img/knowledge/salesperson-order-taker-vs-order-creator/order-takers-order-creators-infographic.pdf',
        new: '/images/blog/order-takers-order-creators-infographic.pdf',
    },
    {
        old:
            '/img/knowledge/salesperson-order-taker-vs-order-creator/rus/aktivnye-i-passivnye-prodavcy.pdf',
        new: '/images/blog-ru/aktivnye-i-passivnye-prodavcy.pdf',
    },
    {
        old:
            '/img/knowledge/prospecting-methods/prospecting-methods-infographic.pdf',
        new: '/images/blog/prospecting-methods-infographic.pdf',
    },
    {
        old:
            '/img/knowledge/sales-objection-handling/sales-objection-handling-infographic.pdf',
        new: '/images/blog/sales-objection-handling-infographic.pdf',
    },
    {
        old:
            '/img/knowledge/prospecting-methods/b2b-sales-prospecting-methods-presentation.pdf',
        new: '/images/blog/b2b-sales-prospecting-methods-presentation.pdf',
    },
    {
        old: '/img/knowledge/cross-selling/how-to-cross-sell-infographic.pdf',
        new: '/images/blog/how-to-cross-sell-infographic.pdf',
    },
    {
        old:
            '/img/knowledge/bad-signs-salesperson-career/bad-signs-for-salesperson-career.pdf',
        new: '/images/blog/bad-signs-for-salesperson-career.pdf',
    },
]

module.exports = redirectIndex
