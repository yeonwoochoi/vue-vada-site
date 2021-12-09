<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <div v-if="isDataFetched">
              <div v-for="(data, i) in publicationData" :key="i">
                <publication-card :publication-data="data" :is-admin="isAdmin"/>
              </div>
            </div>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>

import PublicationCard from "@/components/publications/PublicationCard";
import MainCard from "@/components/MainCard";
export default {
  name: "Publications",
  components: {MainCard, PublicationCard},
  data: () => ({
    header: 'Publication',
    isDataFetched: false,
    publicationData: [],
    isAdmin: false,
    /*
    publicationData1: {
      year: '2021',
      data: [
        {
          header: 'arXiv',
          content: [
            {
              title: 'FICGAN: Facial Identity Controllable GAN for De-identification',
              content: 'Yonghyun Jeong, Jooyoung Choi, Sungwon Kim, Youngmin Ro, Tae-Hyun Oh, Doyeon Kim, Heonseok Ha, Sungroh Yoon, arXiv:2110.00740 [cs.CV], October 2021.',
              link: 'https://arxiv.org/abs/2110.00740'
            },
            {
              title: 'Geometry-aware Transformer for molecular property prediction',
              content: 'Bumju Kwak, Jeonghee Jo, Byunghan Lee, Sungroh Yoon, arXiv:2106.15516 [cs.LG], June 2021.',
              link: 'https://arxiv.org/abs/2106.15516'
            },
            {
              title: 'Flexible dual-branched message passing neural network for quantum mechanical property prediction with molecular conformation',
              content: 'Jeonghee Jo, Bumju Kwak, Byunghan Lee, Sungroh Yoon, arXiv:2106.07273 [cs.LG], June 2021.',
              link: 'https://arxiv.org/abs/2106.07273'
            },
            {
              title: 'Energy-efficient Knowledge Distillation for Spiking Neural Networks',
              content: 'Dongjin Lee, Seongsik Park, Jongwan Kim, Wuhyeong Doh, Sungroh Yoon, arXiv:2106.07172 [cs.NE], June 2021.',
              link: 'https://arxiv.org/abs/2106.07172'
            },
            {
              title: 'PriorGrad: Improving Conditional Denoising Diffusion Models with Data-Driven Adaptive Prior',
              content: 'Sang-gil Lee, Heeseung Kim, Chaehun Shin, Xu Tan, Chang Liu, Qi Meng, Tao Qin, Wei Chen, Sungroh Yoon, Tie-Yan Liu, arXiv:2106.06406 [stat.ML], June 2021.',
              link: 'https://arxiv.org/abs/2106.06406'
            },
            {
              title: 'Stein Latent Optimization for GANs',
              content: 'Uiwon Hwang, Heeseung Kim, Dahuin Jung, Hyemi Jang, Hyungyu Lee, Sungroh Yoon, arXiv:2106.05319 [cs.LG], June 2021.',
              link: 'https://arxiv.org/abs/2106.05319'
            },
            {
              title: 'Training Energy-Efficient Deep Spiking Neural Networks with Time-to-First-Spike Coding',
              content: 'Seongsik Park, Sungroh Yoon, arXiv:2106.02568 [cs.NE], June 2021.',
              link: 'https://arxiv.org/abs/2106.02568'
            },
          ]
        },
        {
          header: 'Conference',
          content: [
            {
              title: 'Reducing Information Bottleneck for Weakly Supervised Semantic Segmentation',
              content: 'Jungbeom Lee, Jooyoung Choi, Jisoo Mok, Sungroh Yoon, in Proceedings of the Thirty-fifth Conference on Neural Information Processing Systems (NeurIPS), Virtual, December 2021.',
              link: 'https://neurips.cc/'
            },
            {
              title: 'Variance-stationary Differentiable NAS',
              content: 'Hyeokjun Choe, Byunggook Na, Jisoo Mok, Sungroh Yoon, in Proceedings of the British Machine Vision Conference (BMVC), Virtual, November 2021.',
              link: 'https://britishmachinevisionassociation.github.io/bmvc'
            },
            {
              title: 'Flexible dual-branched message passing neural network for quantum mechanical property prediction with molecular conformation',
              content: 'Jeonghee Jo, Bumju Kwak, Byunghan Lee, Sungroh Yoon, arXiv:2106.07273 [cs.LG], June 2021.',
              link: 'https://arxiv.org/abs/2106.07273'
            },
            {
              title: 'AligNART: Non-autoregressive Neural Machine Translation by Jointly Learning to Estimate Alignment and Translate\n',
              content: 'Jongyoon Song, Sungwon Kim, Sungroh Yoon, in Proceedings of the 2021 Conference on Empirical Methods in Natural Language Processing (EMNLP), Punta Cana, Dominican Republic, November 2021.',
              link: 'https://2021.emnlp.org/'
            },
            {
              title: 'Geometry-aware Transformer for molecular property prediction',
              content: 'Bumju Kwak, Jeonghee Jo, Byunghan Lee, Sungroh Yoon, arXiv:2106.15516 [cs.LG], June 2021.',
              link: 'https://2021.emnlp.org/'
            },
            {
              title: 'Membership Feature Disentanglement Network',
              content: 'Heonseok Ha, Jaehee Jang, Yonghyun Jeong, Sungroh Yoon, in Proceedings of the 17th ACM ASIA Conference on Computer and Communications Security (AsiaCCS 2022), Nagasaki, Japan, May 2022.',
              link: 'https://asiaccs2022.conferenceservice.jp/'
            },
            {
              title: 'ILVR: Conditioning Method for Denoising Diffusion Probabilistic Models',
              content: 'Jooyoung Choi, Sungwon Kim, Yonghyun Jeong, Youngjune Gwon, Sungroh Yoon, in Proceedings of International Conference on Computer Vision (ICCV), Virtual, October 2021.',
              link: 'http://iccv2021.thecvf.com/'
            },
          ]
        },
        {
          header: 'Journal',
          content: [
            {
              title: 'TargetNet: Functional microRNA Target Prediction with Deep Neural Networks',
              content: 'Seonwoo Min, Byunghan Lee, Sungroh Yoon, Bioinformatics, in press.',
              link: 'https://academic.oup.com/bioinformatics'
            },
            {
              title: 'Generation of a more efficient prime editor 2 by addition of the Rad51 DNA-binding domain',
              content: 'Myungjae Song, Jung Min Lim, Seonwoo Min, Jeong-Seok Oh, Dong Young Kim, Jae-Sung Woo, Hiroshi Nishimasu, Sung-Rae Cho, Sungroh Yoon, Hyongbum Henry Kim, Nature Communications 12, 5617, September 2021.',
              link: 'https://www.nature.com/articles/s41467-021-25928-2'
            },
            {
              title: 'Deep Learning for Anomaly Detection in Time-Series Data: Review, Analysis, and Guidelines',
              content: 'Kukjin CHoi, Jihun Yi, Changhwa Park, Sungroh Yoon, IEEE Access, vol. 9, pp. 120043-120065, September 2021.',
              link: 'https://ieeexplore.ieee.org/document/9523565'
            },
            {
              title: 'Pre-training of Deep Bidirectional Protein Sequence Representations with Structural Information',
              content: 'Seonwoo Min, Seunghyun Park, Siwon Kim, Hyun-Soo Choi, Sungroh Yoon, IEEE Access, in press.',
              link: 'https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=6287639'
            },
          ]
        }
      ],
    },
    publicationData2: {
      year: '2020',
      data: [
        {
          header: 'arXiv',
          content: [
            {
              title: 'FICGAN: Facial Identity Controllable GAN for De-identification',
              content: 'Yonghyun Jeong, Jooyoung Choi, Sungwon Kim, Youngmin Ro, Tae-Hyun Oh, Doyeon Kim, Heonseok Ha, Sungroh Yoon, arXiv:2110.00740 [cs.CV], October 2021.',
              link: 'https://arxiv.org/abs/2110.00740'
            },
            {
              title: 'Geometry-aware Transformer for molecular property prediction',
              content: 'Bumju Kwak, Jeonghee Jo, Byunghan Lee, Sungroh Yoon, arXiv:2106.15516 [cs.LG], June 2021.',
              link: 'https://arxiv.org/abs/2106.15516'
            },
            {
              title: 'Flexible dual-branched message passing neural network for quantum mechanical property prediction with molecular conformation',
              content: 'Jeonghee Jo, Bumju Kwak, Byunghan Lee, Sungroh Yoon, arXiv:2106.07273 [cs.LG], June 2021.',
              link: 'https://arxiv.org/abs/2106.07273'
            },
            {
              title: 'Energy-efficient Knowledge Distillation for Spiking Neural Networks',
              content: 'Dongjin Lee, Seongsik Park, Jongwan Kim, Wuhyeong Doh, Sungroh Yoon, arXiv:2106.07172 [cs.NE], June 2021.',
              link: 'https://arxiv.org/abs/2106.07172'
            },
            {
              title: 'PriorGrad: Improving Conditional Denoising Diffusion Models with Data-Driven Adaptive Prior',
              content: 'Sang-gil Lee, Heeseung Kim, Chaehun Shin, Xu Tan, Chang Liu, Qi Meng, Tao Qin, Wei Chen, Sungroh Yoon, Tie-Yan Liu, arXiv:2106.06406 [stat.ML], June 2021.',
              link: 'https://arxiv.org/abs/2106.06406'
            },
            {
              title: 'Stein Latent Optimization for GANs',
              content: 'Uiwon Hwang, Heeseung Kim, Dahuin Jung, Hyemi Jang, Hyungyu Lee, Sungroh Yoon, arXiv:2106.05319 [cs.LG], June 2021.',
              link: 'https://arxiv.org/abs/2106.05319'
            },
            {
              title: 'Training Energy-Efficient Deep Spiking Neural Networks with Time-to-First-Spike Coding',
              content: 'Seongsik Park, Sungroh Yoon, arXiv:2106.02568 [cs.NE], June 2021.',
              link: 'https://arxiv.org/abs/2106.02568'
            },
          ]
        },
        {
          header: 'Conference',
          content: [
            {
              title: 'Reducing Information Bottleneck for Weakly Supervised Semantic Segmentation',
              content: 'Jungbeom Lee, Jooyoung Choi, Jisoo Mok, Sungroh Yoon, in Proceedings of the Thirty-fifth Conference on Neural Information Processing Systems (NeurIPS), Virtual, December 2021.',
              link: 'https://neurips.cc/'
            },
            {
              title: 'Variance-stationary Differentiable NAS',
              content: 'Hyeokjun Choe, Byunggook Na, Jisoo Mok, Sungroh Yoon, in Proceedings of the British Machine Vision Conference (BMVC), Virtual, November 2021.',
              link: 'https://britishmachinevisionassociation.github.io/bmvc'
            },
            {
              title: 'Flexible dual-branched message passing neural network for quantum mechanical property prediction with molecular conformation',
              content: 'Jeonghee Jo, Bumju Kwak, Byunghan Lee, Sungroh Yoon, arXiv:2106.07273 [cs.LG], June 2021.',
              link: 'https://arxiv.org/abs/2106.07273'
            },
            {
              title: 'AligNART: Non-autoregressive Neural Machine Translation by Jointly Learning to Estimate Alignment and Translate\n',
              content: 'Jongyoon Song, Sungwon Kim, Sungroh Yoon, in Proceedings of the 2021 Conference on Empirical Methods in Natural Language Processing (EMNLP), Punta Cana, Dominican Republic, November 2021.',
              link: 'https://2021.emnlp.org/'
            },
            {
              title: 'Geometry-aware Transformer for molecular property prediction',
              content: 'Bumju Kwak, Jeonghee Jo, Byunghan Lee, Sungroh Yoon, arXiv:2106.15516 [cs.LG], June 2021.',
              link: 'https://2021.emnlp.org/'
            },
            {
              title: 'Membership Feature Disentanglement Network',
              content: 'Heonseok Ha, Jaehee Jang, Yonghyun Jeong, Sungroh Yoon, in Proceedings of the 17th ACM ASIA Conference on Computer and Communications Security (AsiaCCS 2022), Nagasaki, Japan, May 2022.',
              link: 'https://asiaccs2022.conferenceservice.jp/'
            },
            {
              title: 'ILVR: Conditioning Method for Denoising Diffusion Probabilistic Models',
              content: 'Jooyoung Choi, Sungwon Kim, Yonghyun Jeong, Youngjune Gwon, Sungroh Yoon, in Proceedings of International Conference on Computer Vision (ICCV), Virtual, October 2021.',
              link: 'http://iccv2021.thecvf.com/'
            },
          ]
        },
        {
          header: 'Journal',
          content: [
            {
              title: 'TargetNet: Functional microRNA Target Prediction with Deep Neural Networks',
              content: 'Seonwoo Min, Byunghan Lee, Sungroh Yoon, Bioinformatics, in press.',
              link: 'https://academic.oup.com/bioinformatics'
            },
            {
              title: 'Generation of a more efficient prime editor 2 by addition of the Rad51 DNA-binding domain',
              content: 'Myungjae Song, Jung Min Lim, Seonwoo Min, Jeong-Seok Oh, Dong Young Kim, Jae-Sung Woo, Hiroshi Nishimasu, Sung-Rae Cho, Sungroh Yoon, Hyongbum Henry Kim, Nature Communications 12, 5617, September 2021.',
              link: 'https://www.nature.com/articles/s41467-021-25928-2'
            },
            {
              title: 'Deep Learning for Anomaly Detection in Time-Series Data: Review, Analysis, and Guidelines',
              content: 'Kukjin CHoi, Jihun Yi, Changhwa Park, Sungroh Yoon, IEEE Access, vol. 9, pp. 120043-120065, September 2021.',
              link: 'https://ieeexplore.ieee.org/document/9523565'
            },
            {
              title: 'Pre-training of Deep Bidirectional Protein Sequence Representations with Structural Information',
              content: 'Seonwoo Min, Seunghyun Park, Siwon Kim, Hyun-Soo Choi, Sungroh Yoon, IEEE Access, in press.',
              link: 'https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=6287639'
            },
          ]
        }
      ]
    },
    publicationData3: {
      year: '2019',
      data: [
        {
          header: 'arXiv',
          content: [
            {
              title: 'FICGAN: Facial Identity Controllable GAN for De-identification',
              content: 'Yonghyun Jeong, Jooyoung Choi, Sungwon Kim, Youngmin Ro, Tae-Hyun Oh, Doyeon Kim, Heonseok Ha, Sungroh Yoon, arXiv:2110.00740 [cs.CV], October 2021.',
              link: 'https://arxiv.org/abs/2110.00740'
            },
            {
              title: 'Geometry-aware Transformer for molecular property prediction',
              content: 'Bumju Kwak, Jeonghee Jo, Byunghan Lee, Sungroh Yoon, arXiv:2106.15516 [cs.LG], June 2021.',
              link: 'https://arxiv.org/abs/2106.15516'
            },
            {
              title: 'Flexible dual-branched message passing neural network for quantum mechanical property prediction with molecular conformation',
              content: 'Jeonghee Jo, Bumju Kwak, Byunghan Lee, Sungroh Yoon, arXiv:2106.07273 [cs.LG], June 2021.',
              link: 'https://arxiv.org/abs/2106.07273'
            },
            {
              title: 'Energy-efficient Knowledge Distillation for Spiking Neural Networks',
              content: 'Dongjin Lee, Seongsik Park, Jongwan Kim, Wuhyeong Doh, Sungroh Yoon, arXiv:2106.07172 [cs.NE], June 2021.',
              link: 'https://arxiv.org/abs/2106.07172'
            },
            {
              title: 'PriorGrad: Improving Conditional Denoising Diffusion Models with Data-Driven Adaptive Prior',
              content: 'Sang-gil Lee, Heeseung Kim, Chaehun Shin, Xu Tan, Chang Liu, Qi Meng, Tao Qin, Wei Chen, Sungroh Yoon, Tie-Yan Liu, arXiv:2106.06406 [stat.ML], June 2021.',
              link: 'https://arxiv.org/abs/2106.06406'
            },
            {
              title: 'Stein Latent Optimization for GANs',
              content: 'Uiwon Hwang, Heeseung Kim, Dahuin Jung, Hyemi Jang, Hyungyu Lee, Sungroh Yoon, arXiv:2106.05319 [cs.LG], June 2021.',
              link: 'https://arxiv.org/abs/2106.05319'
            },
            {
              title: 'Training Energy-Efficient Deep Spiking Neural Networks with Time-to-First-Spike Coding',
              content: 'Seongsik Park, Sungroh Yoon, arXiv:2106.02568 [cs.NE], June 2021.',
              link: 'https://arxiv.org/abs/2106.02568'
            },
          ]
        },
        {
          header: 'Conference',
          content: [
            {
              title: 'Reducing Information Bottleneck for Weakly Supervised Semantic Segmentation',
              content: 'Jungbeom Lee, Jooyoung Choi, Jisoo Mok, Sungroh Yoon, in Proceedings of the Thirty-fifth Conference on Neural Information Processing Systems (NeurIPS), Virtual, December 2021.',
              link: 'https://neurips.cc/'
            },
            {
              title: 'Variance-stationary Differentiable NAS',
              content: 'Hyeokjun Choe, Byunggook Na, Jisoo Mok, Sungroh Yoon, in Proceedings of the British Machine Vision Conference (BMVC), Virtual, November 2021.',
              link: 'https://britishmachinevisionassociation.github.io/bmvc'
            },
            {
              title: 'Flexible dual-branched message passing neural network for quantum mechanical property prediction with molecular conformation',
              content: 'Jeonghee Jo, Bumju Kwak, Byunghan Lee, Sungroh Yoon, arXiv:2106.07273 [cs.LG], June 2021.',
              link: 'https://arxiv.org/abs/2106.07273'
            },
            {
              title: 'AligNART: Non-autoregressive Neural Machine Translation by Jointly Learning to Estimate Alignment and Translate\n',
              content: 'Jongyoon Song, Sungwon Kim, Sungroh Yoon, in Proceedings of the 2021 Conference on Empirical Methods in Natural Language Processing (EMNLP), Punta Cana, Dominican Republic, November 2021.',
              link: 'https://2021.emnlp.org/'
            },
            {
              title: 'Geometry-aware Transformer for molecular property prediction',
              content: 'Bumju Kwak, Jeonghee Jo, Byunghan Lee, Sungroh Yoon, arXiv:2106.15516 [cs.LG], June 2021.',
              link: 'https://2021.emnlp.org/'
            },
            {
              title: 'Membership Feature Disentanglement Network',
              content: 'Heonseok Ha, Jaehee Jang, Yonghyun Jeong, Sungroh Yoon, in Proceedings of the 17th ACM ASIA Conference on Computer and Communications Security (AsiaCCS 2022), Nagasaki, Japan, May 2022.',
              link: 'https://asiaccs2022.conferenceservice.jp/'
            },
            {
              title: 'ILVR: Conditioning Method for Denoising Diffusion Probabilistic Models',
              content: 'Jooyoung Choi, Sungwon Kim, Yonghyun Jeong, Youngjune Gwon, Sungroh Yoon, in Proceedings of International Conference on Computer Vision (ICCV), Virtual, October 2021.',
              link: 'http://iccv2021.thecvf.com/'
            },
          ]
        },
        {
          header: 'Journal',
          content: [
            {
              title: 'TargetNet: Functional microRNA Target Prediction with Deep Neural Networks',
              content: 'Seonwoo Min, Byunghan Lee, Sungroh Yoon, Bioinformatics, in press.',
              link: 'https://academic.oup.com/bioinformatics'
            },
            {
              title: 'Generation of a more efficient prime editor 2 by addition of the Rad51 DNA-binding domain',
              content: 'Myungjae Song, Jung Min Lim, Seonwoo Min, Jeong-Seok Oh, Dong Young Kim, Jae-Sung Woo, Hiroshi Nishimasu, Sung-Rae Cho, Sungroh Yoon, Hyongbum Henry Kim, Nature Communications 12, 5617, September 2021.',
              link: 'https://www.nature.com/articles/s41467-021-25928-2'
            },
            {
              title: 'Deep Learning for Anomaly Detection in Time-Series Data: Review, Analysis, and Guidelines',
              content: 'Kukjin CHoi, Jihun Yi, Changhwa Park, Sungroh Yoon, IEEE Access, vol. 9, pp. 120043-120065, September 2021.',
              link: 'https://ieeexplore.ieee.org/document/9523565'
            },
            {
              title: 'Pre-training of Deep Bidirectional Protein Sequence Representations with Structural Information',
              content: 'Seonwoo Min, Seunghyun Park, Siwon Kim, Hyun-Soo Choi, Sungroh Yoon, IEEE Access, in press.',
              link: 'https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=6287639'
            },
          ]
        }
      ]
    },
     */
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$store.dispatch("publications/readAllContents").then(
          data => {
            this.publicationData = data;
            this.checkAuthor();
          },
          err => {
            alert(err);
            this.$router.push('/')
          }
      )
    },
    checkAuthor () {
      let params = {
        "id" : localStorage.id,
      };
      if (!params.id) {
        this.isAdmin = false;
        this.isDataFetched = true;
      }
      else {
        this.$store.dispatch('user/isAdmin', params).then(
            (isAdmin) => {
              this.isAdmin = isAdmin;
              this.isDataFetched = true;
            },
            () => {
              this.isAdmin = false;
              this.isDataFetched = true;
            }
        )
      }
    },
  }
}
</script>

<style scoped>
</style>