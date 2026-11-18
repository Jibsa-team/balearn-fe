# Balearn 프런트엔드 작업 안내

- 작업 전에 인접한 백엔드 저장소의 [프로젝트 정의와 유지보수 가이드](../balearn-be/docs/PROJECT.md)를 읽는다. 백엔드가 로컬에 없으면 [GitHub 저장소](https://github.com/Jibsa-team/balearn-be)의 같은 개발 브랜치에서 `docs/PROJECT.md`를 확인한다.
- API, 인증, 일정, 채팅 계약을 바꿀 때는 백엔드 DTO 및 처리 로직을 확인한다.
- 제품 범위나 실행·배포 방식이 달라지면 백엔드의 프로젝트 가이드를 함께 갱신한다.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
