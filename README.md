# 🔍 First Uploader

> 가짜뉴스와 미확인 정보의 최초 발원지를 AI로 분석하는 오픈소스 웹 도구

---

## Vercel 배포 방법 (5분)

### 1단계 — GitHub에 올리기

```bash
git clone https://github.com/YOUR_USERNAME/first-uploader.git
cd first-uploader
# 이 폴더 안의 파일들을 GitHub 저장소에 업로드
```

또는 GitHub 웹에서 파일을 드래그앤드롭으로 업로드하세요.

### 2단계 — Vercel 배포

1. [vercel.com](https://vercel.com) 접속 → GitHub로 로그인
2. **"Add New Project"** → GitHub 저장소 선택
3. **"Environment Variables"** 항목에서 아래 값 추가:
   - Key: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-...` (본인 API 키)
4. **"Deploy"** 클릭

배포 완료 후 `https://first-uploader-xxx.vercel.app` 주소가 생성됩니다.

---

## 로컬에서 실행하기

```bash
# Vercel CLI 설치
npm install -g vercel

# 로컬 실행 (.env.local 파일에 API 키 필요)
vercel dev
```

`.env.local` 파일 생성:
```
ANTHROPIC_API_KEY=sk-ant-여기에_키를_입력하세요
```

---

## 프로젝트 구조

```
first-uploader/
├── index.html          # 프론트엔드 (UI 전체)
├── api/
│   └── analyze.js      # Vercel 서버리스 함수 (API 프록시)
├── vercel.json         # Vercel 설정
├── README.md
└── .env.example        # API 키 설정 예시
```

---

## 기술 스택

- **Frontend**: 순수 HTML / CSS / JavaScript
- **Backend**: Vercel Serverless Functions (Node.js)
- **AI**: Anthropic Claude API (`claude-sonnet-4-20250514`)
- **배포**: Vercel (무료)

---

## 분석 대상 플랫폼

| 분류 | 플랫폼 |
|------|--------|
| 공식 | 정부·공공기관, 국회, 청와대, 각 부처 |
| 언론 | 연합뉴스, KBS, MBC, SBS, 조선·중앙·한겨레·경향 등 |
| 커뮤니티 | 디씨인사이드, 에펨코리아, 루리웹, 클리앙, 뽐뿌, 블라인드 |
| SNS | X(트위터), 인스타그램, 페이스북, 유튜브, 틱톡, 카카오스토리 |
| 메신저 | 카카오톡, 텔레그램 |

---

## 한계 및 주의사항

- AI 추론 기반 분석입니다. 실제 DB 검색이 아닙니다.
- 삭제된 게시글, 카카오톡 내부 정보는 추적 불가합니다.
- **공식 팩트체크를 대체하지 않습니다.**

공식 팩트체크: [SNU](https://factcheck.snu.ac.kr/) · [JTBC](https://factcheck.jtbc.com/) · [연합뉴스](https://www.yna.co.kr/factcheck/)

---

## 라이선스

[MIT License](LICENSE)
