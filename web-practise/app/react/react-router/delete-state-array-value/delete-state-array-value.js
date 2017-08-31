'use strict';

// 应用入口
var App = React.createClass({
	getInitialState: function () {
		return {
			arr: '1|2|3|4'
		};
	},
	getAr: function () {
		let answerAreas = document.querySelectorAll('input[data-ar]');
		let answers = [];

		for (let i = 0; i < answerAreas.length; i++) {
			let v = answerAreas[i].value;
			v && answers.push(v);
		}

		return answers.join('|');
	},
	addAr: function () {
		this.setState({
			arr: this.getAr() + '|'
		});
		console.log((this.getAr() + '|').split('|'));
	},
	removeAr: function (index) {
		let arr = this.getAr().split('|');
		arr.splice(index, 1);
		this.setState({
			arr: arr.join('|')
		});
	},
	render: function () {
		var _this = this;
		let arr = this.state.arr && this.state.arr.split('|');
		console.log(this.state.arr.split('|'));

		return (
			<div>
				{arr ?
					arr.map(function (ar, $index) {
						return <div>
							<input type="text" data-ar key={ar} defaultValue={ar}/>
							<button onClick={(function (index) {
						return function () {
							_this.removeAr(index)
						}
					})($index)}>close
							</button>
							{$index == (arr.length - 1) ?
								<button onClick={_this.addAr}>add</button> : ''}
						</div>
					})
					:
					<div><input type="text" data-ar/>
						<button onClick={_this.addAr}>add</button>
					</div>}

				<button onClick={(function () {
						return function () {
							_this.removeAr(2)
						}
					})()}>close
				</button>
			</div>
		);
	}
});

React.render(<App />, document.body);