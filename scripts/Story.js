import React from 'react';
import { Link } from 'react-router';

const Story = React.createClass({
	render() {
		const { post, i, comments } = this.props;
		return (
			<figure className="box">
				<div className="wrap">
					<Link to={`/user/story/${post.code}`}></Link>
					<img src={post.display_src} alt={post.caption} />
				</div>

				<figcaption>
				<p>{post.caption}</p>
				<div className="control-button">
					<button onClick={this.props.increment.bind(null, i)} className="likes">&hearts; {post.likes}</button>
				</div>
				<Link to={`/user/story/${post.code}`}>
				<span className="comments">{comments[post.code] ? comments[post.code].length : 0}</span>
				</Link>
				</figcaption>
			</figure>
		)
	}
});

export default Story;