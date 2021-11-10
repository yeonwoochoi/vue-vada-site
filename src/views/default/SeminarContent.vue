<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <board-content-card :table-contents="tableData" />
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import MainCard from "@/components/MainCard";
import BoardContentCard from "@/components/board/BoardContentCard";
export default {
  name: "SeminarContent",
  components: { MainCard, BoardContentCard },
  data: () => ({
    tableData: [
      {
        no: 1,
        title: '[Paper Review]Attacking Adversarial Attack as A Defense',
        content: '1. Topic\n' +
            'Adversarial Training 기법과 더불어 Denoising 기반의 Adversarial Defense 방법론을 제안함\n' +
            '\n' +
            '2. Overview\n' +
            'Adversarial Training은 학습 과정 중에 Adversarial Example을 생성하여 이를 학습에 포함시키는 방법론입니다. 본 논문은 이 방법론을 통해 학습한 모델에 Denosing 기법을 추가로 적용하였습니다. 본 논문에서는 Adversarial Noise가 robust 하지 않음을 지적하며 이를 공격하기 위해 Adversarial Attack 기법을 활용하는 Hedge Defense라는 방법론을 제안하여 CIFAR 10, 100 그리고 IMGAENET 데이터 셋에 대하여 Adversarial Defense 분야에서 SOTA의 성능을 달성하였습니다.\n' +
            '\n' +
            '3. 참고자료\n' +
            '[1] 발표자료 [첨부파일]\n' +
            '[2] 발표영상 [추후 업로드 예정]',
        author: 'user01',
        created_at: '2020-11-11',
        view_count: 5,
        comments: [
          {
            'author': 'Donghwa Kim',
            'content': 'Gradient obfuscation이 발생하면 PGD attack이 잘 수행되지 않아 마치 모델의 강건성이 높은 것으로 착각을 일으킬 수 있는 이슈에 대해서 발표해 주셨습니다. 기존의 모델의 공격을 위해 cross-entropy를 기반의 방법을 사용하였으며, KL-divergence를 이용해 문제를 해결할수도 있었습니다. 본 논문에서는 Adversarial Example에 효과적으로 적용될 수 있는 Hedge Defense라는 방법론을 제안하였습니다. Hedge Defense는 균등 분포와의 KL Divergence가 커지도록 noise를 계산하여 input에 추가하는 방법하였습니다. noise를 추가하는 adversarial training을 제외하고는 예측분포의 모양을 바꾸는 temperature scaling, label smoothing, triple loss와 유사한 개념인것 같습니다. Hedge Defense가 작동하는 이유는 ground-truth class 주변의 loss surface가 다른 class에 비해 smoother하기 때문에 더 작동하는 것 같습니다. 연구결과에서 landscaping에 대한 시각적으로 표현한게 있다면 더 좋은 논문이 될 것 같습니다. 좋은 발표 감사합니다.',
            'created_at': '2021-10-23 21:21',
          },
          {
            'author': 'Doyoon Kim',
            'content': '지난 세미나에 이어 금일 세미나에서도 Adversarial Attack 및 Defense와 관련된 방법론이 소개되었습니다. 우선 Adversarial Attack은 이미지에 아주 작은 노이즈를 추가하여 모델의 결과를 훼손 시키는 방법론이고 반대로 Adversarial Defense는 가장 강한 노이즈를 최대한 방어하는 것이 목적입니다. 이를 통해 이루고자하는 궁극적인 목표는 곧 노이즈에 강건한 모델을 개발하는 것일 겁니다. Adversarial Defense의 유일한 방법론으로 Adversarial Training이 존재한다고 합니다. 또한 Adversarial Defense를 두 가지 관점에서 볼 수 있는데 첫 번째는 모델링 관점으로 input loss surface가 평평하도록 하는 모델을 가져야 한다는 것이지만 이는 곧 상수 함수가 되어야 하는동시에 분류문제를 해결하기 위해 일정 수준의 복잡도를 가져야하므로 모순의 상황이 발생하게 됩니다. 두 번째 관점은 denoising으로 노이즈를 다시 없애기 위한 노이즈를 생성하는 방법을 의미합니다. 소개해주신 논문에서는 Adversarial Training과 denoising을 결합한 방법론, 즉 Adversarial attack을 Attacking하는 것이라고도 볼 수 있는 Hedge Defense라는 방법론을 제시하였습니다. Hedge Defense는 모든 class에 대해 adversarial attack을 실시 하지만 adversarial example에만 효과적으로 적용됨을 보여주고 있습니다. 금일 세미나를 통해 다시 한 번 Loss 설정에 대한 중요성을 느꼈습니다. 딥러닝 모델이나 머신러닝 모델들은 모두 수식으로 이루어지고 Loss라고 불리는 것도 결국 모델의 목적식, 함수를 통해 수행하고픈 목표이기 때문에 같은 structure라고 해도 목적식에 따라 모델의 학습방향이 달라질 것이기에 Loss 설정에 큰 고민을 하는 것이 모델 성능의 개선에 큰 효과를 줄 것이라 생각이 듭니다. 언제나 의미있는 세미나 준비해주시는 발표자 분께 감사의 말씀 드립니다.',
            'created_at': '2021-10-25 14:14',
          },
        ],
        attach: [
          {
            title: 'Interactive Features of\n' +
                'Proteins Composing\n' +
                'Eukaryotic Circadian Clocks',
            url: 'http://127.0.0.1:3000/uploads/files-1636358747767.pdf'
          },
          {
            title: '2021_10_21_세미나_박경찬_업로드.pdf',
            url: 'http://dsba.korea.ac.kr/?action=kboard_file_download&uid=1829&file=file1&kboard-file-download-nonce=61a727ab63'
          },
        ],
        importance: true
      },
      {
        no: 2,
        title: 'Welcome to kunsan univ',
        content: 'Content~~~ Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah',
        author: 'user02',
        created_at: '2021-10-31',
        view_count: 4,
        comments: [
          {
            'author': 'user21',
            'content': 'Comment! Comment! Comment! Comment! Comment! ',
            'created_at': '2021-11-01',
          },
          {
            'author': 'user21',
            'content': 'Comment! Comment! Comment! Comment! Comment! ',
            'created_at': '2021-11-01',
          },
        ],
        attach: [],
        importance: false
      },
      {
        no: 3,
        title: 'Welcome to kunsan univ',
        content: 'Content~~~ Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah',
        author: 'David Robert Joseph Beckham',
        created_at: '2020-11-11',
        view_count: 7,
        comments: [],
        attach: [],
        importance: false
      },
      {
        no: 4,
        title: 'Welcome to kunWelcome to kunsan univWelcome to kunsan univWelcome to kunsan univWelcome to kunsan univWelcome to kunsan univWelcome to kunsan univsan univ',
        content: 'Content~~~ Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah',
        author: 'user04',
        created_at: '2021-10-31',
        view_count: 0,
        comments: [],
        attach: [],
        importance: false
      },
      {
        no: 5,
        title: 'Welcome to kunsan unWelcome to kunsan univWelcome to kunsan univWelcome to kunsan univiv',
        content: 'Content~~~ Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah',
        author: 'user05',
        created_at: '2020-04-11',
        view_count: 10,
        comments: [],
        attach: [],
        importance: false
      },
      {
        no: 6,
        title: 'Welcome to korea univ',
        content: 'to check6',
        author: 'user01',
        created_at: '2021-10-31',
        view_count: 0,
        comments: [],
        attach: [],
        importance: false
      },
      {
        no: 7,
        title: 'Welcome to kunsan univ',
        content: 'to check7',
        author: 'user01',
        created_at: '2021-10-31',
        view_count: 0,
        comments: [],
        attach: [],
        importance: true
      },
      {
        no: 8,
        title: 'Welcome to kunsan univ',
        content: 'to check8',
        author: 'user01',
        created_at: '2021-10-31',
        view_count: 0,
        comments: [],
        attach: [],
        importance: false
      },
      {
        no: 9,
        title: 'Welcome to kunsan univ',
        content: 'to check9',
        author: 'user01',
        created_at: '2021-10-31',
        view_count: 0,
        comments: [],
        attach: [],
        importance: false
      },
      {
        no: 10,
        title: 'Welcome to kunsan univ',
        content: 'to check10',
        author: 'user01',
        created_at: '2021-10-31',
        view_count: 0,
        comments: [],
        attach: [],
        importance: true
      },
      {
        no: 11,
        title: 'Welcome to kunsan univ',
        content: 'to check11',
        author: 'user01',
        created_at: '2021-10-31',
        view_count: 0,
        comments: [],
        attach: [],
        importance: false
      },
    ],
    header: 'Seminar',
  }),
}
</script>

<style scoped>

</style>