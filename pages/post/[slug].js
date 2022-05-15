/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { client, urlFor } from '../../lib/client';
import Header from '../../components/Header';
import PortableText from 'react-portable-text';
import { useForm } from 'react-hook-form';


const Post = ({ postDetails }) => {


    const { register, handleSubmit, formState: { errors } } = useForm();
    const [submit, setSubmit] = useState(false);

    const formSubmit = async (data) => {

        try {
            const { json } = await fetch('/api/createComment', {
                method: "POST",
                body: JSON.stringify(data)
            });
            console.log(json);
            setSubmit(true);
        } catch (error) {
            console.log(error);
            setSubmit(false);
        }
    }

    return (
        <main>
            <Header />
            <img className='w-full h-40 object-cover' src={urlFor(postDetails?.mainImage)} alt="mainImage" />

            <article className='max-w-3xl mx-auto p-5'>
                <h1 className='text-3xl mt-10 mb-3'>{postDetails?.title}</h1>
                <h2 className='text-xl font-light text-gray-500 mb-2'>{postDetails?.description}</h2>

                <div className='flex items-center space-x-3'>
                    <img className='h-10 w-10 rounded-full' src={urlFor(postDetails?.author?.image)} alt="auImage" />
                    <p className='text-sm font-extralight'>
                        Blog Post by {" "} <span className='text-green-600'>{postDetails?.author?.name}</span> - Published at {new Date(postDetails?.publishedAt).toLocaleString()}
                    </p>
                </div>

                <div>
                    <PortableText
                        dataset='production'
                        projectId='k1hhjn90'
                        content={postDetails.body}
                        serializers={{
                            h1: (props) => (
                                <h1 className='text-2xl font-bold my-5' {...props} />
                            ),
                            h2: (props) => (
                                <h1 className='text-2xl font-bold my-5' {...props} />
                            ),
                            li: ({ children }) => (
                                <li className='ml-4 list-disc'>{children}</li>
                            ),
                            link: ({ href, children }) => (
                                <a href={href} className="text-blue-500 hover:underline">{children}</a>
                            )
                        }}
                    />
                </div>

            </article>
            <hr className='max-w-lg border border-yellow-500 my-5 mx-auto' />
            {submit ? (
                <div className='max-w-2xl bg-yellow-500 mx-auto p-5 border-full mb-2'>
                    <h3 className='text-3xl text-white'>Thank you for submitting your comment</h3>
                    <p className='text-sm text-white'>Once it has approved it shown here..</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit(formSubmit)} className='flex flex-col p-5 md:max-w-3xl mx-auto'>
                    <h3 className='text-sm text-yellow-500'>Enjoy this article</h3>
                    <h4 className='font-bold text-3xl'>Leave a comment below!</h4>
                    <hr className='py-3 mt-2' />
                    <label className='block mb-5'>
                        <input type="hidden" {...register('_id')} name='_id' value={postDetails?._id} />
                        <span className='text-gray-700'>Name</span>
                        <input {...register("name", { required: true })} className='w-full shadow ring-yellow-500 focus:ring border-none outline-none py-2 px-3 rounded' placeholder='Your name' type="text" />
                    </label>
                    <label className='block mb-5'>
                        <span className='text-gray-700'>Email</span>
                        <input {...register("mail", { required: true })} className='shadow w-full ring-yellow-500 border-none outline-none focus:ring py-2 px-3' type="email" placeholder='xyz@gmail.com' />
                    </label>
                    <label className='block mb-5'>
                        <span className='text-gray-700'>Comment</span>
                        <textarea {...register("comment", { required: true })} className='w-full shadow ring-yellow-500 px-3 py-2 outline-none border-none focus:ring' placeholder='Enter somethings.....' rows="8"></textarea>
                    </label>
                    <div className='flex flex-col p-5'>
                        {errors.name && (
                            <span className='text-red-500'>- The name is Required</span>
                        )}
                        {errors.mail && (
                            <span className='text-red-500'>- The email is Required</span>
                        )}
                        {errors.comment && (
                            <span className='text-red-500'>- The comment is Required</span>
                        )}
                    </div>

                    <input className='bg-yellow-500 px-3 py-2 text-white focus:text-yellow-400 cursor-pointer rounded' type="submit" value="Submit" />
                </form >
            )}

            <div className='flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2'>
                <h3 className='text-4xl'>Comments</h3>
                <hr className='pb-2' />
                {postDetails?.comments?.map((comment, index) => (
                    <div key={index}>
                        <span className='text-yellow-500 '>{comment.name}</span> {comment.comment}
                    </div>
                ))}
            </div>

        </main >
    )
}

export default Post

export async function getStaticPaths() {
    const query = `*[_type=="post" ]{
        _id,
        slug{
        current
      }
      }`;
    const postDetailsSlug = await client.fetch(query);
    const paths = postDetailsSlug.map((item) => ({
        params: {
            slug: item?.slug?.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps({ params: { slug } }) {

    const query = `*[_type=="post" && slug.current =="${slug}"][0]{
        _id,
        title,
        slug,
        author -> {
            name,
            image
        },
        "comments":*[
            _type=='comment' && 
           post._ref ==^._id && 
           approved == true
         ],
        description,
        mainImage,
        publishedAt,
        body
} `;

    const postDetails = await client.fetch(query);
    if (!postDetails) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            postDetails
        },
        revalidate: 60,
    }
}


