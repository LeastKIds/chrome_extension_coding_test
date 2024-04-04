import { defineConfig } from 'vite'
import { crx, defineManifest } from '@crxjs/vite-plugin'

const manifest = defineManifest({
// 매니페스트 버전
  manifest_version: 3,
  // 확장 프로그램 이름
  name: 'coding test automatic push',
  // 설명
  description: 'coding test automatic push description',
  // 확장 프로그램 버전
  version: '1.0',
  // 여기서 부터가 코드
//   content_scripts: [
//     {
//       js: ['scripts/content.ts'], // 拡張子を .ts に変更する
//       matches: [
//         'https://developer.chrome.com/docs/extensions/*',
//         'https://developer.chrome.com/docs/webstore/*',
//       ]
//     }
//   ],

    action: {
        default_popup: 'index.html',
    },
    background: {
      service_worker: './src/background.ts', // 백그라운드 스크립트로 사용할 파일 지정
    },
    content_scripts: [
      {
        matches: ["https://leetcode.com/problems/*"],
        js: ["./src/contentScript.ts"],
        run_at: "document_idle"
      }
    ],
    permissions: [
      "storage"
    ],

})

// 나중에 매니페스트로 사용할 수 있게 바꿔주는 곳
export default defineConfig({
  plugins: [crx({ manifest })],
})