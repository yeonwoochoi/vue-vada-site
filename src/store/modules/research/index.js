const state = {
    researchData: [
        {
            imgSrc: '@/assets/research/research_deep_learning.jpg',
            title: 'Deep Learning',
            content: 'We are interested in innovative deep learning algorithms and applications for large-scale data analysis and data-driven learning that can deliver breakthrough performance.'
        },
        {
            imgSrc: '@/assets/research/research_artificial_intelligence.jpg',
            title: 'Artificial Intelligence',
            content: 'We are creating scalable and accurate artificial intelligence algorithms based on recent breakthroughs in deep learning, machine learning, data mining, and statistical/adaptive signal processing.'
        },
        {
            imgSrc: '@/assets/research/research_system_for_intelligence.jpg',
            title: 'Systems for Intelligence',
            content: 'We are developing technology solutions that can implement and accelerate our analytics engines with emphasis on intelligent memory/storage systems and massively parallel/distributed architectures.'
        },
        {
            imgSrc: '@/assets/research/research_computer_vision.png',
            title: 'Computer Vision',
            content: 'Computer vision is an interdisciplinary scientific field that deals with how computers can gain high-level understanding from digital images or videos. From the perspective of engineering, it seeks to understand and automate tasks that the human visual system can do.'
        }
    ]
}

const getters = {
    getResearchData: state => state.researchData
}

const mutations = {

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