# listselect.js

Listselect.js is a small jQuery plugin for dynamic selection of items in a list including advanced interaction using
mouse clicks, CTRL, Shift, Space and arrow keys.

## Usage

Preconditions:
* Items must be tagged with a class, by default `.ls-item`
* All items must be wrapped inside the list element
* All items must be siblings in the DOM tree, but needn't to be direct children of the list element

Example:
```
<div id="example-list">
    <div>
        <div class="ls-item">Item 1</div>
        <div class="ls-item">Item 2</div>
        <div class="ls-item">Item 3</div>
    </div>
</div>
```

To enable listselect.js on this list just call the jQuery function on the list element. You may pass a list of options
to the constructor.
```
<script type="text/javascript">
    $('#example-list').listSelect({
        keyboard: false
    });
</script>
```

## Options

Option | Type | Meaning | Default Value
------ | ---- | ------- | -------------
`mouse` | Boolean | enable/disable mouse interaction | `true`
`keyboard` | Boolean | enable/disable keyboard interaction | `true`
`itemClass` | String | class used to tag items | `'ls-item'`
`selectedClass` | String | class to mark selected items | `'ls-selected'`
`cursorClass` | String | class to mark cursor item | `'ls-cursor'`
`startClass` | String | class to mark selection start pointer item | `'ls-start'`
`focusFirst` | Boolean | focus first item at initialization | true
`callback` | Function | callback function to be called after an interaction | `function() {}`
`rowCallback` | Function | callback function to be called on every changed item | `function() {}`

## API

To access the list programmatically, use the public methods of the listSelect object, which is stored in the data
attributes of the list element:
```
<script type="text/javascript">
    $('#example-list').data('listSelect').selectAll();
</script>
```

The following public methods are available:
Method | Meaning
------ | -------
`selectAll()` | select all items of the list
`selectNone()` | clear selection
`invertSelection()` | toggle selection of all items

The above mentioned methods will also call the appropriate callback functions after changing selection.

To select/unselect a single item just add/remove the `selectClass` to/from the item element. listselect.js will consider
the item as selected; still, the callback function isn't called.
