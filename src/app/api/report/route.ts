import { NextResponse } from 'next/server';
import { mockActivities } from '@/lib/mockData';

export async function GET() {
  // This is where you would fetch real data in a real application
  const activities = mockActivities;

  const wastedTime: { [category: string]: number } = {};
  let mostWastedCategory: string | null = null;
  let maxWastedTime = 0;

  activities
    .filter(activity => activity.productivity < 0)
    .forEach(activity => {
      const duration = (activity.endTime.getTime() - activity.startTime.getTime()) / (1000 * 60); // in minutes
      wastedTime[activity.category] = (wastedTime[activity.category] || 0) + duration;
    });

  for (const category in wastedTime) {
    if (wastedTime[category] > maxWastedTime) {
      maxWastedTime = wastedTime[category];
      mostWastedCategory = category;
    }
  }

  const getImprovementSuggestion = (category: string | null) => {
    if (!category) {
      return "Great job! No significant unproductive time detected.";
    }
    switch (category) {
      case 'Break':
        return "You\'ve spent a lot of time on breaks. Consider using a timer (like the Pomodoro Technique) to keep them focused and refreshing.";
      case 'Work':
        return "It seems some work activities were unproductive. Are you facing any blockers? Consider breaking down complex tasks.";
      default:
        return `Time in the '${category}' category seems unproductive. Reflect on how you can optimize this area.`;
    }
  };

  const suggestion = getImprovementSuggestion(mostWastedCategory);

  return NextResponse.json({
    wastedTime,
    mostWastedCategory,
    suggestion,
  });
}
