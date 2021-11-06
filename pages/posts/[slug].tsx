import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import Comments from '../../components/Comments';
import Nav from '../../components/Nav';
import { getAllPosts, getPost } from '../../utils/posts';

type Params = {
  params: {
    slug: string;
  };
};

const Post = ({ post }: { post: { id: number; slug: string; category: string; title: string; description: string; content: string; timestamp: number; toc: string } | undefined }) => {
  const [content, setContent] = useState('');
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setContent(post?.content ?? '');
  }, []);

  if (post === undefined) return <div></div>;

  return (
    <div className='h-screen flex flex-col'>
      <div className='h-full px-6 sm:px-10 bg-white dark:bg-gray-900'>
        <div className='max-w-6xl mx-auto'>
          <Head>
            <title>{post.title} - ticaLog</title>
          </Head>
          <Nav />
          <div className='max-w-5xl mx-auto'>
            <section className='py-10 sm:py-20'>
              <h4 className='font-medium text-indigo-600 leading-none'>{`#${post.id.toString().padStart(3, '0')}`}</h4>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-none'>{post.title}</h2>
              <h3 className='mt-2 text-lg text-gray-700'>{post.description}</h3>
            </section>
            <div className='flex pb-8 flex-col-reverse md:flex-row'>
              <div className='flex flex-col w-full'>
                <div className='w-full mt-4 md:mt-0'>
                  <article id='article' className='text-lg' dangerouslySetInnerHTML={{ __html: content }} ref={articleRef} />
                </div>
                <div className='w-full mt-4'>
                  <div className='flex items-center'>
                    <h4 className='text-sm font-medium text-indigo-600'>COMMENTS</h4>
                    <div className='border-t border-gray-200 w-full ml-2' />
                  </div>
                  <section className='mt-0.5 py-4 w-full flex'>
                    <Comments />
                  </section>
                </div>
              </div>
              <div className='w-full md:w-64 flex-shrink-0 md:ml-10'>
                <div className='md:sticky md:top-36'>
                  <div className='flex items-center'>
                    <h4 className='text-sm font-medium text-indigo-600 leading-none'>TOC</h4>
                    <div className='border-t border-gray-200 w-full ml-2' />
                  </div>
                  <section className='mt-0.5 py-4 w-full flex'>{post.toc.trim() === '' ? <div className='text-gray-700 font-medium pl-2'>목차가 없습니다.</div> : <div id='toc' dangerouslySetInnerHTML={{ __html: post.toc }} />}</section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = ({ params }: Params) => ({
  props: {
    post: getPost(params.slug),
  },
});

export const getStaticPaths = () => {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

export default Post;
