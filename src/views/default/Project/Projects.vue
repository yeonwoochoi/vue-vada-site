<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <v-row align="start" justify="start" class="px-6 mb-12" v-if="isDataFetched">
              <v-col cols="12" sm="6" md="4" v-for="(project, i) in projects" :key="i">
                <project-card :project-data="project"/>
              </v-col>
              <v-col cols="12" align="end" v-if="isAdmin">
                <v-btn class="font-weight-bold elevation-0 button-border-grey" outlined large to="/projects/input">
                  글쓰기
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import MainCard from "@/components/MainCard";
import ProjectCard from "@/components/projects/ProjectCard";
import VueCookies from "vue-cookies";

export default {
  name: "Projects",
  components: {ProjectCard, MainCard},
  mounted() {
    if (VueCookies.get("accessToken") && localStorage.id) {
      this.$store.dispatch('user/isAdmin', {id: localStorage.id}).then(
          (isAdmin) => {
            this.isAdmin = isAdmin;
          },
          (err) => {
            alert(err)
          }
      )
    }
    else {
      this.isAdmin = false;
    }
    this.$store.dispatch('project/readProjectAll').then(
        (result) => {
          this.projects = result.data.data
          if (this.projects.length > 0) {
            this.isDataFetched = true;
          }
        },
        err => {
          alert(err)
          this.$router.push('/')
        }
    )
  },
  data: () => ({
    header: 'Projects',
    isAdmin: false,
    isDataFetched: false,
    projects: [],
    /*
    projects: [
      {
        no: 1,
        src: require('@/assets/projects/project_image_1.png'),
        title: '모델링&최적화 기반 오류-free 정보인프라 자율제어 기술 개발',
        content: 'ML/DL 기반 오류 탐지· 예측 및 원인 분석 모델 개발\n' +
            'GAN & VAE 생성모델을 활용하여 특징 데이터 증강 모델 개발\n' +
            '이종 시계열 도메인간 효과적 지식 전달을 위한 전이학습 기반 확장 기술 개발',
        from: '2021.07',
        to: '2024.12',
        sponsor: '한국전자기술연구원(KETI)',
      },
      {
        no: 2,
        src: require('@/assets/projects/project_image_2.png'),
        title: '파편화된 데이터의 적극활용을 위한 시계열 기반 통합 플랫폼 기술 개발',
        content: '다양한 도메인의 시계열 데이터를 다루는 통합플랫폼 연구 및 개발\n' +
            '시계열 데이터 전처리/변환/이상치 탐지 방법론 개발\n' +
            '학습 최적화를 위한 알고리즘 및 모델 해석 기법 개발',
        from: '2021.04',
        to: '2023.12',
        sponsor: '한국전자기술연구원(KETI)',
      },
      {
        no: 3,
        src: require('@/assets/projects/project_image_3.png'),
        title: 'Multi-Domain/Multi-Turn 대화 이해 정확도 향상 및 대화 상태 추적 방법 연구',
        content: 'Transformer 기반의 사전 학습 언어 모델을 활용한 대화 상태 추적 모델 개발\n' +
            'Domain간 Knowledge Transfer를 위한 Pretraining 기반 방법론 제안\n' +
            'Domain-slot간 관계성을 고려할 수 있는 대화 상태 추적 모델 개발',
        from: '2021.04',
        to: '2021.11',
        sponsor: 'ETRI, 세종대학교',
      },
      {
        no: 4,
        src: require('@/assets/projects/project_image_4.png'),
        title: 'Optimal window 결정 방법론 개발',
        content: '본 과제에서는 Target Marketing 관련 문제를 해결을 목적으로 시계열적 변수들의 Optimal Window Size 도출 방법론을 개발\n' +
            '군집화 기법을 활용한 optimal window 결정 방법론으로 cluster membership과 target class간의 유사성(purity)을 고려한 특정 window의 optimal score 측정 방법론 연구\n' +
            '딥러닝 생성모델기반으로 target class의 positive, negative class별로 개별적으로 산출되는 reconstructed error의 차이를 특정 window의 optimal score 측정 방법론 연구',
        from: '2021.03',
        to: '2021.08',
        sponsor: '하나금융융합기술원',
      },
      {
        no: 5,
        src: require('@/assets/projects/project_image_5.png'),
        title: 'AI기반 반도체 공정 데이터 Semi-Supervised Anomaly Detection',
        content: 'Labeled 데이터를 활용한 이상치 탐지 모델 구축\n' +
            '이상치 탐지 모델을 통한 Anomaly Score 분포 생성 및 Pesudo Normal 데이터 추출\n' +
            'Semi-Supervised 방법론 기반의 이상치 탐지 모델 구축',
        from: '2021.03',
        to: '2021.06',
        sponsor: 'RTM',
      },
      {
        no: 6,
        src: require('@/assets/projects/project_image_6.png'),
        title: 'Digital Transformation 기반 예지 보전 플랫폼 개발을 위한 데이터 분석 및 모델 개발',
        content: '설비 가동의 지속성 확보를 위한 데이터 기반 예지 정비 시스템 구축\n' +
            '과거 시계열 정상 데이터를 통해 미래 정상 패턴을 생성하는 예측 모델 구축\n' +
            '실제 패턴 및 생성된 정상 패턴을 입력 변수로 고장 진단을 수행하는 이상치 탐지 모델 구축',
        from: '2020.07',
        to: '2020.12',
        sponsor: '한화시스템/ICT',
      },
      {
        no: 7,
        src: require('@/assets/projects/project_image_7.png'),
        title: '문서요약 AI 데이터셋 구축사업',
        content: '뉴스 기사 원본 데이터에 대한 추출 요약문과 생성 요약문이 있는 문서요약 AI 데이터셋 구축\n' +
            '구축된 문서요약 AI 데이터셋을 이용한 추출 및 생성 요약 모델 개발 및 배포\n' +
            '요약 모델의 소스코드, 사용자 매뉴얼 제작 및 배포 \n' +
            '문서 요약 AI 모델 기반 응용서비스 개발 및 검증',
        from: '2020.07',
        to: '2020.11',
        sponsor: '문서요약 AI 데이터셋 구축사업',
      },
      {
        no: 8,
        src: require('@/assets/projects/project_image_8.png'),
        title: 'K-패션 AI 데이터셋 구축사업',
        content: '다양한 패션 이미지 원본 데이터에 대한 속성정보 추출 및 레이블링을 통하여 검증된 K-Fashion 이미지 AI 데이터셋 구축\n' +
            '패션 아이템 Detection 모델을 이용한 스타일 분류 모델 개발\n' +
            '구축된 K-Fashion 이미지 AI 데이터셋을 기반으로 레이블 추천방식(label recommendation)을 도입한 모델 개발\n' +
            'AI 응용서비스 제공을 통한 패션 수요 증대',
        from: '2020.07',
        to: '2020.11',
        sponsor: 'K패션 AI 데이터셋 구축사업',
      },
      {
        no: 9,
        src: require('@/assets/projects/project_image_9.png'),
        title: '삼성전자 딥러닝 기반 신뢰성 Risk 혐의 공정/설비 탐색 고도화',
        content: '반도체 생산 과정에서 진행되는 다양한 공정-설비 조합을 기반으로 고/저수율을 도출하는 golden/worst path의 pattern을 탐지\n' +
            '해당 제안 방법론으로부터 도출된 최적 설비 경로 탐색 결과를 활용하여 기대 수율 및 품질에 따른 적정 설비 조합을 추천함\n' +
            '중요 제품생산과정에서 도출된 Golden Path를 적용, 수율 혹은 품질 관점에서 output을 개선함',
        from: '2020.05',
        to: '2020.11',
        sponsor: '삼성전자',
      },
      {
        no: 10,
        src: require('@/assets/projects/project_image_10.png'),
        title: 'AI 기반 반도체 공정 이상탐지',
        content: '반도체 장비 생산 기업 관점에서의 AI 기반 공정 이상감지 시스템 개발\n' +
            '제한된 데이터셋과 통계기반/단변량 분석을 양산데이터 추가 적용 및 AI 기반 분석 방법론으로 고도화\n' +
            '성능 고도화를 통한 비용 절감과 원인분석 기능 강화를 통한 현장 대응 속도 향상을 추구',
        from: '2019.12',
        to: '',
        sponsor: 'RTM & PSK',
      },
    ],
     */
  })
}
</script>

<style scoped>

</style>