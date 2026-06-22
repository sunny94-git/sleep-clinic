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
