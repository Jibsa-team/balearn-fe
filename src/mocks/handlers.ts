import { http, HttpResponse } from "msw";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const handlers = [
  http.post(`${baseUrl}/group/create`, () => {
    return HttpResponse.json(
      {
        responseCode: "SUCCESS",
        result: {
          team_id: 1,
        },
        timeStamp: "2024-11-13T10:30:00",
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }),

  http.post(`${baseUrl}/group/1`, () => {
    return HttpResponse.json({
      responseCode: "SUCCESS",
      result: {
        team: {
          id: 1,
          name: "String",
          description: "String",
          img_url: "String",
        },
        notice: {
          id: 1,
          title: "매주 화요일 9시에 회의가 진행됩니다",
          detail: "기술 컨벤션 및 스택 생각해오면 됩니다!",
        },
        goal: [
          {
            id: 1,
            detail: "지원 1개하고 공유하기",
            color: "#FFFFFF",
          },
          {
            id: 2,
            detail: "알고리즘 문제 풀기",
            color: "#FFFFFF",
          },
        ],
        team_user: [
          {
            id: 1,
            user_id: 1,
            role: "모임장",
            nickname: "이재인",
            img_url: "/Avatar.png",
          },
          {
            id: 2,
            user_id: 1,
            role: "팀원",
            nickname: "황민우",
            img_url: "/Avatar.png",
          },
        ],
        weekly_schedule: [
          {
            id: 1,
            address: "월요일",
            time: "2024-11-13T10:30:00",
            topic: "알고리즘 문제 풀이",
            mission: [
              {
                id: 1,
                detail: "알고리즘 문제 풀이",
              },
            ],
          },
          {
            id: 2,
            address: "화요일",
            time: "2024-11-13T10:30:00",
            topic: "React 기초 학습",
            mission: [
              {
                id: 1,
                detail: "React 기초 학습",
              },
            ],
          },
          {
            id: 3,
            address: "수요일",
            time: "2024-11-13T10:30:00",
            topic: "React 기초 학습",
            mission: [
              {
                id: 1,
                detail: "React 기초 학습",
              },
            ],
          },
          {
            id: 4,
            address: "목요일",
            time: "2024-11-13T10:30:00",
            topic: "React 기초 학습",
            mission: [
              {
                id: 1,
                detail: "React 기초 학습",
              },
            ],
          },
        ],
      },
      timeStamp: "2024-11-13T10:30:00",
    });
  }),
];
