import pubsub from "../pubsub";
import DummyComments from '../dummy_data/dummy_comments';
import DummyPosts from '../dummy_data/dummy_posts';

let nextId = DummyComments.length;

export default class CommentsController {
	static index(post_id) {
		return new Promise((resolve,reject) => {
			try {
				resolve(post_id ? DummyComments.filter(DummyComment => DummyComment.post_id === post_id) : DummyComments);
			} catch (err) {
				reject(err)
			}
		})
	}

	static show(id) {
		return new Promise((resolve,reject) => {
			try {
				resolve(...DummyComments.filter(comment => comment.id === id));
			} catch (err) {
				reject(err)
			}
		})	
	}

	static create(input) {
		return new Promise((resolve,reject) => {
			try {
				nextId++;
				const comment = Object.assign({}, { id: nextId }, input);
				DummyComments.push(comment);
				resolve(comment);
				pubsub.publish('commentAdded', { commentAdded: comment });
			} catch (err) {
				reject(err);
			}
		})
	}

	static getCommentPost(postId) {
		return new Promise((resolve,reject) => {
			try {
				resolve(...DummyPosts.filter(post => post.id === postId));
			} catch (err) {
				reject(err)
			}
		})	
	}
}