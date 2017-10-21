var util = {

	uuid: function() {
		return;
	},

	pluralize: function(word, count) {
		return count===1 ? word : word+'s';
	},

	store: function() {

	},
}

var App = {
	init: function () {
		this.todos = [];

		this.bindEvents();
	},

	bindEvents: function() {
		$('#addBtn').on('click', this.create.bind(this));
		$('#todo-list').on('click', '.deleteBtn', this.destroy.bind(this));
		$('#todo-list').on('click', '.editBtn', this.editMode.bind(this));
		$('#todo-list').on('keyup', '.editLabel', this.editMode.bind(this));
	},

	create: function() {
		var $input = $('#new-todo');
		var val = $input.val();
		
		if (!val) {
			return;
		}

		this.todos.push({
			title: val,
			completed: false
		});

		$input.val('');
		$input.focus();
		this.render();
	},

	render: function() {
		$('#todo-list').empty();
		var i = 0;

		this.todos.forEach( function(todo) {
			$('#todo-list').append('<li style="width:100%; height:100%; display:block; float: left; margin:5px" class="left-align"><input id='+i+' type="text" class="editLabel" style="display:none"/></input><input id='+i+' type="checkbox" class="filled-in" style="display:inline; float:left"/></input>' + 'Completed: '+ todo.completed + ' | ' + todo.title +'<button id='+i+' style="float:right" class="deleteBtn">Delete</button><button id='+i+' style="float:right" class="editBtn">Edit</button></li>');
			i++;
		});
		
		this.renderFooter();
	},


	renderFooter: function() {
		var todoCount;
		if (this.todos) {
			todoCount = this.todos.length;
		} else {
			todoCount = 0;
		}
		
		var word = util.pluralize('item', todoCount);

		$('#todo-count').text(todoCount + ' ' + word + ' to do total | ');
		
	},

	editMode: function() {

	},

	editFinish: function() {

	},

	destroy: function(e) {
		var i = $(e.target).attr('id');
		this.todos.splice(i, 1);
		this.render();
	},

	destroyCompleted: function() {

	},

	toggle: function() {

	},

	toggleAll: function() {

	},

	indexFromEl: function() {

	},

	getActiveTodos: function() {

	},

	getCompletedTodos: function() {

	},

	getFilteredTodos: function() {

	},



	update: function() {

	},

}

App.init();