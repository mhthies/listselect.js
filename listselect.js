/*
* MIT License
* 
* Copyright (c) 2016 Michael Thies <mail@mhthies.de>
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
(function($) {
    var ListSelect = function(element,options) {
        var $element = $(element);
        var obj = this;
        var settings = $.extend({
            mouse : true,
            keyboard : true,
            itemClass: 'ls-item',
            selectedClass: 'ls-selected',
            cursorClass: 'ls-cursor',
            startClass: 'ls-start',
            focusFirst: true,
            callback: function() {},
            rowCallback: function() {},
        }, options || {});
        
        /* Private methods */
        /** Unselect all items */
        function clearSelection() {
            $element.find('.'+settings.itemClass+'.'+settings.selectedClass)
                .removeClass(settings.selectedClass)
                .each(settings.rowCallback);
        };
        /** Toggle selection of the given item */
        function toggleSelection($item) {
            $item.toggleClass(settings.selectedClass).each(settings.rowCallback);
        };
        /** Select the given item */
        function selectSingle($item) {
            $item.addClass(settings.selectedClass).each(settings.rowCallback);
        };
        /** Select items between selection start pointer and cursor */
        function selectRange() {
            var $c = $element.find('.'+settings.cursorClass);
            var $s = $element.find('.'+settings.startClass);
            var $list = ($c.index() > $s.index()) ?
                    $s.nextAll('.'+settings.itemClass) : $s.prevAll('.'+settings.itemClass);
            $list.each(function() {
                selectSingle($(this));
                
                // Break when cursor is reached
                return !($(this).hasClass(settings.cursorClass));
            });
        };
        /** Set cursor (and possibly) selection start pointer to given item */
        function setCursor($item,setStart) {
            $element.find('.'+settings.itemClass)
                .removeClass(settings.cursorClass);
            $item.addClass(settings.cursorClass);
            if (setStart) {
                $element.find('.'+settings.startClass)
                    .removeClass(settings.startClass);
                $item
                    .addClass(settings.startClass);
            }
        };
        
        // Add event handlers
        if (settings.mouse)
            /* Mouse event handler */
            $element.find('.'+settings.itemClass)
                .on('click', function(e) {
                    if (!e.shiftKey) {
                        if (!e.ctrlKey) {
                            clearSelection();
                            selectSingle($(this));
                        } else {
                            toggleSelection($(this));
                        }
                        setCursor($(this),true);
                    } else {
                        if (!e.ctrlKey)
                            clearSelection();
                        setCursor($(this),false);
                        selectRange();
                    }
                    settings.callback.call(element);
                });
                
        if (settings.keyboard)
            /* Key event handler */
            $element.on('keydown', function(e) {
                switch(e.keyCode) {
                    case 32: //Leertaste
                        if (e.ctrlKey) {
                            toggleSelection($(this).find('.'+settings.cursorClass));
                            setCursor($(this).find('.'+settings.cursorClass),true);
                            settings.callback.call(element);
                        }
                        break;
                    
                    case 38: //Up
                    case 40: //Down
                        var $c = $element.find('.'+settings.cursorClass);
                        var $list = (e.keyCode == 40) ?
                                $c.nextAll('.'+settings.itemClass) : $c.prevAll('.'+settings.itemClass);
                        // return if no next/previous item
                        if ($list.length < 1)
                            return;
                        var $next = $list.first();
                        
                        if (!e.shiftKey) {
                            if (!e.ctrlKey) {
                                clearSelection();
                                selectSingle($next);
                                setCursor($next,true);
                            } else {
                                setCursor($next,false);
                            }
                        } else {
                            setCursor($next,false);
                            selectRange();
                        }
                        settings.callback.call(element);
                        break;
                }
            });
        
        if (settings.focusFirst)
            $element.find('.'+settings.itemClass).first()
                .addClass(settings.cursorClass);
        
        
        /* Public methods */
        /** For external usage: Clear all selected items */
        this.selectNone = function() {
            clearSelection();
            settings.callback.call(element);
        };
        /** For external usage: Select all items */
        this.selectAll = function() {
            $element.find('.'+settings.itemClass).not('.'+settings.selectedClass)
                .addClass(settings.selectedClass)
                .each(settings.rowCallback);
            settings.callback.call(element);
        };
        /** For external usage: Toggle selection of all items */
        this.invertSelection = function() {
            $element.find('.'+settings.itemClass)
                .toggleClass(settings.selectedClass)
                .each(settings.rowCallback);
            settings.callback.call(element);
        };
    };
    
    /** jQuery Plugin method */
    $.fn.listSelect = function(options) {
        $(this).each(function() {
            if ($(this).data('listSelect'))
                return;
            
            var obj = new ListSelect(this,options);
            
            $(this).data('listSelect',obj).attr('tabindex','0');
        });
        return this;
    };
})(jQuery);
