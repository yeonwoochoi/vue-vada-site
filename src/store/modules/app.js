const state = {
    company: 'Vada Partners',
    companyDefaultLogo: require('@/assets/logo/logo_vada_black.png'),
    companyWhiteLogo: require('@/assets/logo/logo_vada_white.png'),
    drawer: false,
    headerStyle: {
        'home': {
            'image': require('@/assets/header/image_home.jpg'),
            'contents':  [
                { content: 'Technology', style: 'font-weight-regular display-4 white--text animate__animated animate__zoomIn'},
                { content: 'Valuation System', style: 'font-weight-regular display-4 white--text animate__animated animate__zoomIn'},
                { content: 'We will find the hidden value of technology.', style: 'ma-3 font-weight-medium display-1 white--text py-2 animate__animated animate__zoomIn' },
            ],
            'mobileContents': [
                { content: 'Technology', style: 'font-weight-regular text-h2 white--text animate__animated animate__zoomIn'},
                { content: 'Valuation', style: 'font-weight-regular text-h2 white--text animate__animated animate__zoomIn'},
                { content: 'System', style: 'font-weight-regular text-h2 white--text animate__animated animate__zoomIn'},
            ]
        },

        'about': {
            'image': require('@/assets/header/image_about.jpg'),
            'contents':  [
                { content: 'About Us', style: 'font-weight-light text-h1 white--text animate__animated animate__backInDown'},
                { content: 'We will find the hidden value of technology.', style: 'font-weight-light display-1 white--text px-1 animate__animated animate__backInUp', },
            ],
            'mobileContents': [
                { content: 'About Us', style: 'font-weight-light text-h1 white--text animate__animated animate__backInDown'},
            ]
        },

        'service': {
            'image': require('@/assets/header/image_service.jpg'),
            'contents':  [
                { content: 'Services', style: 'font-weight-light text-h1 white--text animate__animated animate__zoomIn'},
                { content: 'We are a technology valuation agency', style: 'font-weight-light display-1 white--text px-1 animate__animated animate__zoomIn', },
                { content: 'that evaluates the value of technology in real time.', style: 'font-weight-light display-1 white--text px-1 animate__animated animate__zoomIn', },
            ],
            'mobileContents': [
                { content: 'Services', style: 'font-weight-light text-h1 white--text animate__animated animate__zoomIn'},
            ]
        },

        'support': {
            'image': require('@/assets/header/image_support.jpg'),
            'contents':  [
                { content: 'Contact Us', style: 'font-weight-light text-h1 white--text animate__animated animate__zoomIn'},
                { content: 'Wanna get in touch with the guys and girls at Vada Partners?', style: 'font-weight-light display-1 white--text px-2 animate__animated animate__zoomIn', },
                { content: 'You\'re in the right spot!', style: 'font-weight-light display-1 white--text px-2 animate__animated animate__zoomIn', },
            ],
            'mobileContents': [
                { content: 'Contact Us', style: 'font-weight-light text-h1 white--text animate__animated animate__zoomIn'},
            ]
        }
    },
    drawerItems: [
        { title: 'Home', icon: 'mdi-view-dashboard', to: '/' },
        { title: 'About', icon: 'mdi-menu', to: '/about'},
        { title: 'Service', icon: 'mdi-grid', to: '/service' },
        { title: 'Support', icon: 'mdi-table-settings', items: [
                { title: 'Notice', to: '/support' },
                { title: 'FAQ', to: '/support/faq' },
                { title: 'QnA', to: '/support/qna' },
                { title: 'Privacy policy', to: '/support/privacy-policy' },
                { title: 'Terms of use', to: '/support/terms-of-use' },
            ]
        },
    ],
    toolbarItems: [
        { title: 'About', link: '/about', items: []},
        { title: 'Service', link: '/service', items: []},
        { title: 'Support', link: '/support', items: [
                { title: '공지사항', link: '/support'},
                { title: 'FAQ', link: '/support/faq'},
                { title: '문의하기', link: '/support/qna'},
            ]
        },
    ],
    footerBtnInfo: [
        {
            text: '이용약관',
            link: '/support/terms-of-use'
        },
        {
            text: '개인정보처리방침',
            link: '/support/privacy-policy'
        }
    ],
    copyright: 'COPYRIGHT 바다파트너스 2020. ALL RIGHTS RESERVED'
}

const getters = {
    getDrawer: state => state.drawer
}

const mutations = {
    setDrawer (state, data){
        state.drawer = data
    }
}

const actions = {

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}