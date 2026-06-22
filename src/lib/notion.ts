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

    // To handle content safely with Notion's 2000 character limit per block,
    // we split the content into multiple paragraph blocks if necessary.
    const blocks = [];
    const maxLen = 2000;
    for (let i = 0; i < item.content.length; i += maxLen) {
      blocks.push({
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: item.content.substring(i, i + maxLen),
              },
            },
          ],
        },
      });
    }

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
          select: {
            name: categoryLabel,
          },
        },
        '이메일': {
          email: item.authorEmail,
        },
        '비공개': {
          checkbox: item.isPrivate,
        },
      },
      // @ts-ignore - Dynamic blocks structure
      children: blocks,
    });
    console.log('Successfully synced QA to Notion:', item.title);
  } catch (error) {
    console.error('Failed to sync QA to Notion:', error);
  }
}
