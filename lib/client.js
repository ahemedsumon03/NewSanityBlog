import sanityClient from '@sanity/client';
import imageUrl from '@sanity/image-url';


export const client = sanityClient({
    projectId: 'k1hhjn90',
    dataset: 'production',
    apiVersion: '2022-05-02', // use current UTC date - see "specifying API version"!
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // or leave blank for unauthenticated usage
    useCdn: true,
    ignoreBrowserTokenWarning: true // `false` if you want to ensure fresh data
})

const builder = imageUrl(client);

export const urlFor = (source) => {
    return builder.image(source);
}
