var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

var util = {

	randomId: function() {
		return (Math.floor(Math.random()*345346342235)).toString();
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
		$('#toggle-all').on('change', this.toggleAll.bind(this));
		$('#addBtn').on('click', this.create.bind(this));
		$('#todo-list').on('click', '.deleteBtn', this.destroy.bind(this));
		$('#todo-list').on('click', '.editBtn', this.editMode.bind(this));
		$('#todo-list').on('dblclick', '.todo-name', this.editMode.bind(this));
		$('#todo-list').on('keyup', '.editing', this.editFinish.bind(this));
		$('#todo-list').on('focusout', '.editing', this.update.bind(this));
	},

	create: function() {
		var $input = $('#new-todo');
		var val = $input.val();
		
		if (!val) {
			return;
		}

		this.todos.push({
			id: util.randomId(),
			title: val,
			completed: false
		});

		$input.val('');
		$input.focus();
		this.render();
	},

	render: function() {
		var todos = this.getFilteredTodos();
		$('#main').toggle(todos.length > 0);
		$('#todo-list').empty();
		var i = 0;

		this.todos.forEach( function(todo) {
			$('#todo-list').append('<li '+'data-id="'+todo.id+'" style="width:100%; height:100%; display:block; float: left; margin:5px" class="left-align"><div '+'data-id="'+todo.id+'" id='+i+' class="input-field hide" style="width:400px;"><i class="material-icons prefix">mode_edit</i><input '+'data-id="'+todo.id+'" id="edit-todo" type="text" class="validate"></div><input id='+i+' type="checkbox" class="filled-in" style="display:inline; float:left"/></input>' + 'Completed: '+ todo.completed + ' | ' + '<p id='+i+' style="display:inline" class="todo-name">' + todo.title + '</p>' + '<button id='+i+' style="float:right" class="deleteBtn">Delete</button><button id='+i+' style="float:right" class="editBtn">Edit</button></li>');
			i++;
		});

		// if (this.todos.length !=== 0) {
		// 	$('#main').removeClass('hide');
		// } else {
		// 	$('#main').addClass('hide');
		// }


				
		this.renderFooter();

		$('#new-todo').focus();
	},


	renderFooter: function() {
		var todoCount;
		this.todos = this.getActiveTodos();
		if (this.todos) {
			todoCount = this.todos.length;
		} else {
			todoCount = 0;
		}
		
		var word = util.pluralize('item', todoCount);

		$('#todo-count').text(todoCount + ' ' + word + ' to do total | ');
		
	},

	editMode: function(e) {
		var i = $(e.target).attr('id');
		$(e.target).siblings().closest('div').find('#'+i).removeClass('hide');
		$(e.target).siblings().closest('div').find('#'+i).addClass('editing');
		$(e.target).siblings().find('#edit-todo').val(this.todos[i].title);

		
		var $input = $(e.target).siblings().find('#edit-todo');
		// modern way to put caret at end of text focus
		$input.focus();
		var tmpStr = $input.val();
		$input.val('');
		$input.val(tmpStr);
	},

	editFinish: function(e) {
		if (e.which === ENTER_KEY) {
			e.target.blur();
		}

		if (e.which === ESCAPE_KEY) {
			$(e.target).data('abort', true).blur();
		}
	},

	update: function(e) {
		var el = e.target;
		var $el = $(el);
		var val = $el.val().trim();

		if (!val) {
			this.destroy(e);
			return;
		}

		if ($el.data('abort')) {
			$el.data('abort', false);
		} else {
			this.todos[this.indexFromEl(el)].title = val;
		}

		this.render();
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

	toggleAll: function(e) {
		var isChecked = $(e.target).prop('checked');

		this.todos.forEach(function(todo) {
			todo.completed = isChecked;
		});

		this.render();
	},

	indexFromEl: function(el) {
		var id = $(el).closest('.input-field').data('id');
		var todos = this.todos;
		var i = todos.length;

		while (i--) {
			if (todos[i].id == id) {
				console.log(i);
				return i;
			}
		}

	},

	getActiveTodos: function() {
		return this.todos.filter(function(todo) {
			return todo;
		})
	},

	getCompletedTodos: function() {
		return this.todos.filter(function(todo) {
			return todo.completed;
		})
	},

	getFilteredTodos: function() {
		if (this.filter === 'active') {
			return getActiveTodos();
		}

		if (this.filter === 'completed') {
			return CompletedTodos();
		}

		return this.todos;
	},



}

App.init();