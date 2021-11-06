import React, { useEffect, useRef } from 'react';

const Comments = () => {
  const commentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const utterances = document.createElement('script');

    const utterancesConfig = {
      src: 'https://utteranc.es/client.js',
      repo: 'user/repo',
      theme: '선택한 테마',
      'issue-term': '포스트 페이지 매핑 방법',
      async: true,
      crossorigin: 'anonymous',
    };

    Object.entries(utterancesConfig).forEach(([key, value]) => {
      utterances.setAttribute(key, value.toString());
    });

    commentRef.current?.appendChild(utterances);
  }, []);

  return <div className='comments' ref={commentRef}></div>;
};

export default Comments;
