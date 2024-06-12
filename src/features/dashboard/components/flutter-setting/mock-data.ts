import { FlutterSetting } from '../../types/flutter-setting.type';

export const mockData: FlutterSetting = {
  global: {
    /// windowAppTitle 설정
    windowAppTitle: '수원대학교 입학상담앱',

    /// 네비게이션 사이드바에 메뉴 보이기/숨기기 설정
    activeNavigationMenu: {
      result: false, // 학과별 성적 확인
      reference: false, // 자료실
      department: false, // 학과소개
      statistics: false, // 상담통계
      setup: false, // 설정
    },

    /// 상단바에 메뉴 보이기/숨기기 설정
    activeAppbarMenu: {
      paint: true,
      pdf: false,
      capture: false,
    },

    appVersion: '1.2.0',
  },

  scoring: {
    labels: {
      /// 계산식 선택 시 기본 버튼 라벨
      defaultCalcCase: '석차등급',
      /// 계산식 선택 시 예외처리 버튼 라벨
      customCalcCase: '세부등급',
    },
    customInput: {
      /// 계산식에 커스텀 인풋 폼이 필요한 경우 해당 변수를 사용한다.
      isActive: false,
      /// 커스텀 인풋 계산이 필수/선택을 해당 변수를 이용하여 사용한다.
      isRequired: true,
    },
    inputForm: {
      korScore: {
        label: '국어',
        calcType: 'percentage',
      },
      mathScore: {
        label: '수학',
        calcType: 'percentage',
        isActiveMathType: true,
        listMathType: {
          calculus: true,
          statistics: true,
          geometry: true,
        },
        listMathTypeLabel: {
          calculus: '미적분',
          statistics: '통계학',
          geometry: '기하학',
        },
      },
      engScore: {
        label: '영어',
        calcType: 'grade',
      },
      resScore: {
        label: '탐구',
        calcType: 'percentage',
        count: 2,
        isActiveJob: false,
        isActiveResType: true,
        subLabel: {
          isActive: false,
          label: '',
          height: 1.0,
          fontSize: 13.0,
        },
      },
      hisScore: {
        isActive: true,
        label: '한국사',
      },
    },
    isDirect: true,
  },

  result: {
    consultingGraph: {
      tooltipDuration: 120 * 1000.0,
      isNotUseYAxisMax: false,
      isNotUseYAxisMin: false,
      rangeColumnColor: 0xffbcdefe,
      tooltipOrder: ['max', 'avg', 'min'],
      isActiveLineSeries: true,
      scatterColor: 0xffe03131,
    },

    consultingTable: {
      customWidth: {
        gunName: 0.05,
        collegeName: 0.16,
        maximum: 0.08,
        mean: 0.08,
        minimum: 0.08,
        myScore: 0.09,
        scoreDiff: 0.1,
        diagnosis: 0.07,
      },

      /// consulting table custom column을 설정해준다.
      /// index: 배치할 인덱스 위치
      /// label: 컬럼 제목
      /// value: 커스텀 밸류
      /// width: 가로 길이 설정
      customColumns: [
        // {
        //   'index': 3,
        //   'label': '상위70%',
        //   'value': 'ETC3',
        //   'width': 0.09,
        // },
      ],

      /// consulting table custom alignment를 설정해준다.
      alignments: {
        major: 'centerLeft',
      },

      /// 계산 결과 테이블에서 보이는 컬럼에 대한 설정을 합니다.
      displayColumns: {
        gunName: false,
        collegeName: true,
        major: true,
        maximum: true,
        mean: true,
        minimum: true,
        myScore: true,
        scoreDiff: true,
        diagnosis: true,
      },

      // 표의 정렬을 설정합니다.
      columnsOrder: ['gunName', 'collegeName', 'major', 'max', 'avg', 'min', 'myScore', 'scoreDiff', 'diagnosis'],
    },

    gaugeChart: {
      labelPosition: 'end',
      rangeColumnColor: 0xffbcdefe,
      scatterColor: 0xfff36160,
      labels: {
        maxScoreLabel: '최고',
        avgScoreLabel: '평균',
        minScoreLabel: '최저',
      },
    },

    searchBox: {
      labels: {
        gunName: '군 전체선택',
        seltype: '전형 전체선택',
        course: '계열 전체선택',
        college: '대학 전체선택',
        major: '학과 전체선택',
        sortSeltype: '전형명',
        sortMajor: '모집단위명',
      },

      defaultValue: {
        gunName: '',
        seltype: '',
        course: '',
        college: '',
        major: '',
      },
    },

    /// resultPage의 label들에 대한 설정
    labels: {
      maxScoreLabel: '최고점',
      avgScoreLabel: '평균점',
      minScoreLabel: '최저점',
      collegeNameLabel: '단과대학',
      majorLabel: '모집단위',
    },

    topCard: {
      labels: {
        nullLabels: {
          personalCnt: '-',
        },
      },
    },
  },

  data: {
    /// Score Column 매핑에 대한 예외처리를 설정한다.
    scoreColumns: {
      maximum: '',
      minimum: '',
      average: '',
    },

    topCardColumns: {
      // 'thisYearPersonalCntColumn': 'ETC1',
    },
  },
};
