import React, { useEffect, useRef } from 'react';

const Comments = () => {
  const commentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const utterances = document.createElement('script');

    const utterancesConfig = {
      src: 'https://utteranc.es/client.js',
      repo: 'thoratica/ticaLog',
      theme: 'github-light',
      'issue-term': 'pathname',
      async: true,
      crossorigin: 'anonymous',
    };

    Object.entries(utterancesConfig).forEach(([key, value]) => {
      utterances.setAttribute(key, value.toString());
    });

    commentRef.current?.appendChild(utterances);
  }, []);

  return <div className='w-full' ref={commentRef}></div>;
};

export default Comments;
