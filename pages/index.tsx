/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import Header from '../components/Header'
import { client, urlFor } from '../lib/client';
import Link from 'next/link';

const index = ({ postData }) => {

  console.log(postData);

  return (
    <div>
      <Header />

      <div className='flex items-center justify-between bg-yellow-400 py-10 lg:py-0 border-b border-black placeholder: max-w-7xl mx-auto'>
        <div className='px-10 space-y-5'>
          <h1 className='text-6xl max-w-xl font-serif'>
            <span className='underline decoration-black decoration-4'>Medium</span> is a Place to write,read and connect
          </h1>
          <h2>
            Its easy and free to post your thinking on any topic and connect with millions of readers
          </h2>
        </div>
        <img
          className='hidden md:inline-flex h-32 lg:h-full'
          src='https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png'
          alt='medium-logo'
        />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
        {postData.map((post) => (
          <Link key={post?._id} href={`/post/${post?.slug?.current}`} passHref>
            <div className='group border rounded-lg cursor-pointer'>
              <img
                className='h-60 w-full object-cover group-hover:scale-105 transition transform duration-200 ease-in-out rounded-lg'
                src={urlFor(post?.mainImage)} alt="mainImage"
              />
              <div className='flex items-center justify-between p-5 bg-white'>
                <div>
                  <p className='text-lg font-bold'>{post?.title}</p>
                  <p className='text-xs'>{post?.description} by {post?.author?.name}</p>
                </div>
                <img
                  src={urlFor(post?.author?.image)}
                  alt="author_image"
                  className='h-12 w-12 rounded-full'
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}

export default index

export async function getServerSideProps() {
  const query = `*[_type=="post"]{
    _id,
    title,
    slug,
    author->{
     name,
     image
   },
   description,
   mainImage,
   publishedAt
  }`;

  const data = await client.fetch(query);
  return {
    props: {
      postData: data
    }
  }
}
