import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

const marked = require('marked');

export const getAllPosts = (): { id: number; slug: string; category: string; title: string; description: string; content: string; timestamp: number }[] =>
  readdirSync(join(process.cwd(), 'posts'))
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const rawContent = readFileSync(join(process.cwd(), 'posts', filename), 'utf-8');
      const slug = filename.slice(0, '.md'.length * -1);

      const { data, content: MDContent } = matter(rawContent);
      const content = marked.parse(MDContent);

      return { slug, category: data.category ?? '카테고리 없음', title: data.title ?? '제목 없음', description: data.description ?? '', content, timestamp: data.timestamp };
    })
    .sort((a, b) => a.timestamp - b.timestamp)
    .map((data, id) => ({ id: id + 1, ...data }));

export const getPost = (slug: string) => getAllPosts().find((post) => post.slug === slug);
