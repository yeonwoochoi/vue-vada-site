<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <publication-card :publication-data="publicationData1"/>
            <publication-card :publication-data="publicationData2"/>
            <publication-card :publication-data="publicationData3"/>
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
  name: "Test",
  components: {MainCard, PublicationCard},
  data: () => ({
    header: 'Publication',
    publicationData1: {
      year: '2021',
      data: [
        {
          header: 'arXiv',
          content: [
              {
                title: 'FICGAN: Facial Identity Controllable GAN for De-identification. FICGAN: Facial Identity Controllable GAN for De-identification FICGAN: Facial Identity Controllable GAN for De-identification FICGAN: Facial Identity Controllable GAN for De-identification FICGAN: Facial Identity Controllable GAN for De-identification',
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
          ]
        },
        {
          header: 'Conference',
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
          ]
        },
        {
          header: 'Journal',
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
          ]
        }
      ]
    },
    publicationData2: {
      year: '2020',
      data: [
        {
          header: 'arXiv',
          content: [
            {
              title: 'Flexible dual-branched message passing neural network for quantum mechanical property prediction with molecular conformation',
              content: 'Jeonghee Jo, Bumju Kwak, Byunghan Lee, Sungroh Yoon, arXiv:2106.07273 [cs.LG], June 2021.',
              link: 'https://arxiv.org/abs/2106.07273'
            },
            {
              title: 'FICGAN: Facial Identity Controllable GAN for De-identification',
              content: 'Yonghyun Jeong, Jooyoung Choi, Sungwon Kim, Youngmin Ro, Tae-Hyun Oh, Doyeon Kim, Heonseok Ha, Sungroh Yoon, arXiv:2110.00740 [cs.CV], October 2021.',
              link: 'https://arxiv.org/abs/2110.00740'
            },
          ]
        },
        {
          header: 'Conference',
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
                title: 'Flexible dual-branched message passing neural network for quantum mechanical property prediction with molecular conformation',
                content: 'Jeonghee Jo, Bumju Kwak, Byunghan Lee, Sungroh Yoon, arXiv:2106.07273 [cs.LG], June 2021.',
                link: 'https://arxiv.org/abs/2106.07273'
              },
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
          ]
        },
        {
          header: 'Journal',
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
                title: 'FICGAN: Facial Identity Controllable GAN for De-identification. FICGAN: Facial Identity Controllable GAN for De-identification',
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
          ]
        },
        {
          header: 'Conference',
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
          ]
        },
        {
          header: 'Journal',
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
          ]
        }
      ]
    },
  }),
  methods: {
    getImg(imgSrc) {
      let fileNames = imgSrc.split('/');
      let newPath = ''
      for (let i = 1; i < fileNames.length; i++) {
        newPath += fileNames[i];
        if (i < fileNames.length - 1) {
          newPath += '/'
        }
      }
      return require(`@/${newPath}`)
    },
  }
}
</script>

<style scoped>
</style>