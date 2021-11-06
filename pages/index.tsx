import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Octokit } from '@octokit/core';
import Nav from '../components/Nav';
import { LocationMarkerIcon, MailIcon } from '@heroicons/react/outline';
import { dateString, timeSince } from '../utils';
import { getAllPosts } from '../utils/posts';

const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

const Index = ({ posts }: { posts: { id: number; slug: string; category: string; title: string; description: string; content: string; timestamp: number }[] }) => {
  const [gitHubInfo, setGitHubInfo] = useState<{
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string | null;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string | null;
    company: string | null;
    blog: string | null;
    location: string | null;
    email: string | null;
    hireable: boolean | null;
    bio: string | null;
    twitter_username?: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
    plan?: {
      collaborators: number;
      name: string;
      space: number;
      private_repos: number;
    };
    suspended_at?: string | null;
    private_gists?: number;
    total_private_repos?: number;
    owned_private_repos?: number;
    disk_usage?: number;
    collaborators?: number;
  }>();

  useEffect(() => {
    (async () => {
      const { data, status } = await octokit.request('GET /users/{username}', { username: 'thoratica' });
      if (status !== 200) return;

      setGitHubInfo(data as any);
    })();
  }, []);

  return (
    <div className='h-screen flex flex-col'>
      <div className='h-full px-6 sm:px-10 bg-white dark:bg-gray-900'>
        <div className='max-w-6xl mx-auto'>
          <Head>
            <title>ticaLog</title>
          </Head>
          <Nav />
          <section className='py-10 sm:py-20'>
            <h4 className='text-sm font-medium text-indigo-600'>TICALOG</h4>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-none'>평범한 블로그</h2>
            <div className='mt-2.5 flex'>
              {['개발', '일상', '둣교탐방'].map((tag, index) => (
                <div className={`${index === 0 ? '' : 'ml-1.5 '}px-3 py-1.5 rounded-lg text-sm font-medium bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors cursor-default`}>#{tag}</div>
              ))}
            </div>
          </section>
          <div className='flex pb-8 flex-col md:flex-row'>
            <div className='w-full'>
              <div className='flex items-center'>
                <h4 className='text-sm font-medium text-indigo-600'>POSTS</h4>
                <div className='border-t border-gray-200 w-full ml-2' />
              </div>
              <section className='mt-0.5'>
                {posts.reverse().map((post) => (
                  <Link href={`/posts/${post.slug}`}>
                    <a>
                      <section className='py-4'>
                        <h2 className='text-2xl font-bold leading-none inline'>{post.title}</h2>
                        <h3 className='text-sm font-medium text-indigo-500 leading-none transition-colors inline ml-1 mt-1.5'>#{post.id.toString().padStart(3, '0')}</h3>
                        <h3 className='text-lg'>{post.description}</h3>
                        <h4 className='text-sm font-medium text-indigo-600' title={dateString(Date.now())}>
                          {(post.slug === posts[0].slug ? '최신 글 — ' : '') + timeSince(post.timestamp)}
                        </h4>
                      </section>
                    </a>
                  </Link>
                ))}
              </section>
            </div>
            <div className='w-full md:w-64 flex-shrink-0 mt-4 md:mt-0 md:ml-10'>
              <div className='flex items-center'>
                <h4 className='text-sm font-medium text-indigo-600'>PROFILE</h4>
                <div className='border-t border-gray-200 w-full ml-2' />
              </div>
              <section className='mt-0.5 py-4 w-full flex'>
                <img src={gitHubInfo?.avatar_url ?? ''} className='h-12 w-12 rounded-full border border-gray-200' alt='tica' />
                <div className='flex-col ml-3'>
                  <div className='text-2xl font-bold leading-none'>{gitHubInfo?.name}</div>
                  <div>{gitHubInfo?.bio}</div>
                  <div className='text-sm flex items-center text-gray-600 leading-none mt-0.5'>
                    <LocationMarkerIcon className='h-4 w-4 mr-0.5' />
                    {gitHubInfo?.location}
                  </div>
                  <div className='text-sm flex items-center text-gray-600 leading-none mt-0.5'>
                    <MailIcon className='h-4 w-4 mr-0.5' />
                    <a href='mailto:me@tica.fun'>me@tica.fun</a>
                  </div>
                  <div className='flex mt-1'>
                    <a href={`${gitHubInfo?.html_url}?tab=followers`} className='text-sm text-gray-600' target='_blank'>
                      팔로워 <span className='text-indigo-600 font-semibold'>{gitHubInfo?.followers}</span>
                    </a>
                    <a href={`${gitHubInfo?.html_url}?tab=following`} className='text-sm text-gray-600 ml-2' target='_blank'>
                      팔로잉 <span className='text-indigo-600 font-semibold'>{gitHubInfo?.following}</span>
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = () => ({
  props: {
    posts: getAllPosts(),
  },
});

export default Index;
