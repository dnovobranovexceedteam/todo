'use strict';

const todoList = document.querySelector("#todoList");
const input = document.querySelector("#input");

const App = {
    items: [],
    addItem: function (item) {
        this.items.push(item);
        this.renderList();
            
    },
    removeItem: function (id) {
        this.items = this.items.filter(function(item) {
            return item.id !== id;
        });
    },
    renderItem: function (item) {
        const itemElement = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.checked;
        itemElement.append(checkbox);
        itemElement.append(item.text);

        return itemElement;
    },
    renderList: function () {
        todoList.innerHTML = '';
        this.items.map(function (item) {
            todoList.append(App.renderItem(item));
        });
    