import 'styled-components';

// .d.ts : 타입선언파일, TS 코드의 타입 추론을 도움
// 테마에 사용될 변수들의 타입들을 선언
declare module 'styled-components' {
  export interface DefaultTheme {
    isLightTheme: boolean;
    textColor: string;
    bgColor: string;
    accentColor: string;
    boxColor: string;
  }
}
