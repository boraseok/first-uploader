export default async function handler(req, res) {
  // CORS 허용
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { query } = req.body;
  if (!query) return res.status(400).json({ error: '분석할 내용을 입력해주세요.' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API 키가 설정되지 않았습니다.' });

  const prompt = `당신은 가짜뉴스·정보 출처 분석 전문가입니다. 입력된 정보의 발원지와 신뢰도를 분석해주세요.

분석 대상 플랫폼 목록 (이 범위 안에서만 판단하세요):
- 공식: 정부·공공기관 보도자료, 국회, 청와대, 각 부처
- 언론: 연합뉴스, KBS, MBC, SBS, 조선일보, 중앙일보, 한겨레, 경향신문 등 등록 언론사
- 커뮤니티: 디씨인사이드, 에펨코리아, 루리웹, 클리앙, 뽐뿌, 블라인드
- SNS: X(트위터), 인스타그램, 페이스북, 유튜브, 틱톡, 카카오스토리
- 메신저: 카카오톡, 텔레그램

입력된 정보:
"${query}"

아래 JSON 형식으로만 응답하세요. 마크다운 코드블록 없이 순수 JSON만:
{
  "trustLevel": "official" 또는 "media" 또는 "community" 또는 "unverified",
  "trustLabel": "신뢰 등급 한글 (공식 발표 / 언론 보도 / 커뮤니티 출처 / 미확인 정보)",
  "originPlatform": "최초 출처 플랫폼명 (위 목록에서 선택)",
  "originColor": "#hex 색상",
  "originWhen": "최초 등장 추정 시점 (예: 2025년 초 추정)",
  "originDesc": "이 정보의 발원지와 확산 경로를 2~3문장으로 설명",
  "keywords": ["키워드1", "키워드2", "키워드3", "키워드4"],
  "spread": [
    {"platform": "플랫폼명 (위 목록에서 선택)", "pct": 정수, "color": "#hex"},
    {"platform": "플랫폼명 (위 목록에서 선택)", "pct": 정수, "color": "#hex"},
    {"platform": "플랫폼명 (위 목록에서 선택)", "pct": 정수, "color": "#hex"},
    {"platform": "플랫폼명 (위 목록에서 선택)", "pct": 정수, "color": "#hex"}
  ],
  "verdict": "이 정보를 어떻게 받아들여야 하는지 구체적 조언을 2~3문장으로."
}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'API 오류' });
    }

    let text = (data.content?.[0]?.text || '').replace(/```json|```/g, '').trim();
    const result = JSON.parse(text);
    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({ error: '분석 중 오류가 발생했습니다.' });
  }
}
