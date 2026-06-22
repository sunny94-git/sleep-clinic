import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID;

export async function syncQaToNotion(item: {
  title: string;
  category: string;
  authorEmail: string;
  content: string;
  isPrivate: boolean;
  createdAt?: Date;
}) {
  if (!databaseId || !process.env.NOTION_API_KEY) {
    console.warn('Notion API Key or Database ID is missing. Skipping Notion sync.');
    return;
  }

  try {
    const categoryLabel = item.category === 'consultation' ? '진료상담' : '치료문의';
    
    // Slice content to fit Notion's rich text limit (2000 chars)
    const truncatedContent = item.content.length > 2000 
      ? item.content.substring(0, 1997) + '...' 
      : item.content;

    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        '제목': {
          title: [
            {
              text: {
                content: item.title,
              },
            },
          ],
        },
        '카테고리': {
          multi_select: [
            {
              name: categoryLabel,
            },
          ],
        },
        '이메일': {
          email: item.authorEmail,
        },
        '비공개': {
          checkbox: item.isPrivate,
        },
        '작성일': {
          date: {
            start: item.createdAt ? item.createdAt.toISOString() : new Date().toISOString(),
          },
        },
        '답변상태': {
          select: {
            name: '대기중',
          },
        },
        '본문': {
          rich_text: [
            {
              text: {
                content: truncatedContent,
              },
            },
          ],
        },
      },
    });
    console.log('Successfully synced QA to Notion:', item.title);
  } catch (error) {
    console.error('Failed to sync QA to Notion:', error);
  }
}

export async function updateQaNotionStatus(title: string, email: string, status: 'answered') {
  if (!databaseId || !process.env.NOTION_API_KEY) return;

  try {
    const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: {
          and: [
            { property: '제목', title: { equals: title } },
            { property: '이메일', email: { equals: email } },
          ],
        },
      }),
    });

    if (!res.ok) {
      throw new Error(`Notion API error: ${res.statusText}`);
    }

    const response = await res.json();

    if (response.results && response.results.length > 0) {
      const pageId = response.results[0].id;
      await notion.pages.update({
        page_id: pageId,
        properties: {
          '답변상태': {
            select: {
              name: '답변완료',
            },
          },
        },
      });
      console.log('Successfully updated QA status in Notion:', title);
    }
  } catch (error) {
    console.error('Failed to update QA status in Notion:', error);
  }
}

export async function deleteQaFromNotion(title: string, email: string) {
  if (!databaseId || !process.env.NOTION_API_KEY) return;

  try {
    const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: {
          and: [
            { property: '제목', title: { equals: title } },
            { property: '이메일', email: { equals: email } },
          ],
        },
      }),
    });

    if (!res.ok) return;
    const response = await res.json();

    if (response.results && response.results.length > 0) {
      const pageId = response.results[0].id;
      // 노션에서 항목 삭제(휴지통으로 이동)는 archived 속성을 true로 변경하는 것입니다.
      await notion.pages.update({
        page_id: pageId,
        archived: true,
      });
      console.log('Successfully deleted QA from Notion:', title);
    }
  } catch (error) {
    console.error('Failed to delete QA from Notion:', error);
  }
}
