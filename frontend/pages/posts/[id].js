import Link from 'next/link';
import marked from 'marked';

const Post = ({ post }) => {
	console.log(post);
	return (
		<main className='main-contain'>
			<h1>{post.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: marked(post.body) }}></div>
			<p style={{ textAlign: 'center' }}>
				<Link href='/'>Home</Link>
			</p>
		</main>
	);
};

export async function getStaticPaths() {
	const data = await fetch('http://localhost:1337/posts');
	const posts = await data.json();

	const paths = posts.map((post) => ({
		params: {
			id: post.id.toString(),
		},
	}));

	return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
	const data = await fetch(`http://localhost:1337/posts/${params.id}`);
	const post = await data.json();

	return {
		props: {
			post,
		},
	};
}

export default Post;
