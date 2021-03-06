import Link from 'next/link';

export default function Home({ posts }) {
	console.log(posts);
	return (
		<main className='main-contain'>
			<h1>My Next/Strapi Blog!</h1>
			<hr />
			<h3>Blog Posts</h3>
			<ul>
				{posts.map((post) => (
					<li key={post.id}>
						<h4>
							<Link href={`/posts/${post.id}`}>{post.title}</Link>
						</h4>
					</li>
				))}
			</ul>
		</main>
	);
}

export async function getStaticProps(context) {
	const data = await fetch(`http://localhost:1337/posts`);
	const posts = await data.json();

	return {
		props: {
			posts,
		},
	};
}
