import React from 'react';
import { useRouter } from 'next/router';

const Post = () => {
  const router = useRouter();
  const { pid } = router.query;

  return <p>Post: {pid}</p>;
};
export function getStaticProps() {
  return {
    props: {
      pip: 'ciao',
    },
  };
}
export async function getStaticPaths() {
  return {
    paths: [
      { params: { pid: 'pid' } }, // See the "paths" section below
    ],
    fallback: true, // See the "fallback" section below
  };
}

export default Post;
