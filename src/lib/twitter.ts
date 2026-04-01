import { TwitterApi } from 'twitter-api-v2';

const HASHTAGS = '#수면장애 #불면증 #한방치료 #광주한방병원';

function getClient(): TwitterApi | null {
  const appKey = process.env.X_CLIENT_ID;
  const appSecret = process.env.X_CLIENT_SECRET;
  const accessToken = process.env.X_ACCESS_TOKEN;
  const accessSecret = process.env.X_ACCESS_SECRET;

  if (!appKey || !appSecret || !accessToken || !accessSecret) {
    console.warn('[Twitter] API credentials not configured — skipping tweet');
    return null;
  }

  return new TwitterApi({
    appKey,
    appSecret,
    accessToken,
    accessSecret,
  });
}

export async function postTweet(title: string, url?: string): Promise<string | null> {
  try {
    const client = getClient();
    if (!client) return null;

    const link = url ? `\n${url}` : '';
    const maxTitleLen = 280 - HASHTAGS.length - link.length - 2;
    const truncatedTitle = title.length > maxTitleLen
      ? title.slice(0, maxTitleLen - 1) + '…'
      : title;

    const tweetText = `${truncatedTitle}\n${HASHTAGS}${link}`;

    const result = await client.v2.tweet(tweetText);
    console.log('[Twitter] Tweet posted:', result.data.id);
    return result.data.id;
  } catch (error) {
    console.error('[Twitter] Failed to post tweet:', error);
    return null;
  }
}
