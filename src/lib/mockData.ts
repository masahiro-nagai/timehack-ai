export interface Activity {
  id: string;
  startTime: Date;
  endTime: Date;
  type: 'app' | 'location' | 'calendar' | 'web';
  details: string;
  aiSummary: string;
  category: 'Work' | 'Commute' | 'Break' | 'Learning' | 'Meeting';
  productivity: -2 | -1 | 0 | 1 | 2; // -2: Very Unproductive, 2: Very Productive
}

const baseTime = new Date('2024-07-30T12:00:00.000Z');

export const mockActivities: Activity[] = [
  {
    id: '1',
    startTime: new Date(baseTime.getTime() - 3 * 60 * 60 * 1000),
    endTime: new Date(baseTime.getTime() - 2 * 60 * 60 * 1000),
    type: 'web',
    details: 'github.com',
    aiSummary: '開発作業: プロジェクトAのIssue対応',
    category: 'Work',
    productivity: 2,
  },
  {
    id: '2',
    startTime: new Date(baseTime.getTime() - 2 * 60 * 60 * 1000),
    endTime: new Date(baseTime.getTime() - 1.5 * 60 * 60 * 1000),
    type: 'calendar',
    details: 'チーム定例会議',
    aiSummary: '会議: チーム定例',
    category: 'Meeting',
    productivity: 1,
  },
  {
    id: '3',
    startTime: new Date(baseTime.getTime() - 1.5 * 60 * 60 * 1000),
    endTime: new Date(baseTime.getTime() - 1 * 60 * 60 * 1000),
    type: 'app',
    details: 'Slack',
    aiSummary: 'コミュニケーション: Slackでのやり取り',
    category: 'Work',
    productivity: 0,
  },
  {
    id: '4',
    startTime: new Date(baseTime.getTime() - 1 * 60 * 60 * 1000),
    endTime: new Date(baseTime.getTime() - 0.5 * 60 * 60 * 1000),
    type: 'app',
    details: 'X (formerly Twitter)',
    aiSummary: '休憩: SNS閲覧',
    category: 'Break',
    productivity: -2,
  },
  {
    id: '5',
    startTime: new Date(baseTime.getTime() - 0.5 * 60 * 60 * 1000),
    endTime: new Date(baseTime.getTime()),
    type: 'location',
    details: '自宅',
    aiSummary: '移動: 通勤',
    category: 'Commute',
    productivity: 0,
  },
];
