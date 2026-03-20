# First Uploader

가짜뉴스와 미확인 정보의 최초 발원지를 AI로 분석하는 오픈소스 웹 도구

---

## Vercel 배포 방법

### 1단계 - GitHub에 파일 올리기

아래 파일들을 GitHub 저장소에 업로드하세요:

```
index.html
vercel.json
README.md
api/analyze.js       (api 폴더째로 업로드)
```

gitignore.txt 와 env.txt 는 올리기 전에 아래처럼 이름을 바꾸세요:
- gitignore.txt  ->  .gitignore
- env.txt  ->  .env.local  (API 키 입력 후)

### 2단계 - Vercel 배포

1. vercel.com 접속 -> GitHub로 로그인
2. "Add New Project" -> GitHub 저장소 선택
3. Environment Variables 항목에서 추가:
   - Key: ANTHROPIC_API_KEY
   - Value: sk-ant-... (본인 API 키)
4. Deploy 클릭

---

## 분석 대상 플랫폼

- 공식: 정부/공공기관, 국회, 청와대, 각 부처
- 언론: 연합뉴스, KBS, MBC, SBS, 조선/중앙/한겨레/경향 등
- 커뮤니티: 디씨인사이드, 에펨코리아, 루리웹, 클리앙, 뽐뿌, 블라인드
- SNS: X(트위터), 인스타그램, 페이스북, 유튜브, 틱톡, 카카오스토리
- 메신저: 카카오톡, 텔레그램

---

MIT License
