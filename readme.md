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

## Arguments

