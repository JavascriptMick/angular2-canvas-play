/// <reference path="../typings/angular2/angular2.d.ts" />

import {DirectiveAnnotation as Directive} from "angular2/angular2";

/**
 * Decorator responsible for imparting draggable functionality to host component
 *
 * @exportedAs DraggableDecorator ($event, notetext)
 */
@Directive({
    selector: '[draggable]',
    hostListeners: {
      mousedown: 'handleMouseDown($event)',
      mousemove: 'handleMouseMove($event)',
      mouseup: 'handleMouseUp($event)'
    },
    hostProperties: {
      'top': 'style.top',
      'left': 'style.left'
    }
})
class DraggableDecorator {
    _isDragging: boolean = false;
    _originalClientX: number;
    _originalClientY: number;
    _originalTop: number;
    _originalLeft: number;
    _top: number;
    _left: number;

    get top(): string {
      return this._top + 'px';
    }

    get left(): string{
      return this._left + 'px';
    }

    handleMouseDown($event){
      if($event.target.style.position=='absolute'){
        this._isDragging = true;
        this._left = ($event.target.style.left)?parseInt($event.target.style.left, 10):0;
        this._originalLeft = this._left;
        this._top = ($event.target.style.top)?parseInt($event.target.style.top, 10):0;
        this._originalTop = this._top;
        this._originalClientX = $event.clientX;
        this._originalClientY = $event.clientY;
      }else{
        console.log('draggable: Error! the annotated ' + $event.target.nodeName + ' element is not styled with position: absolute; and cannot be made draggable. ' + $event.target.outerHTML );
      }
    }
    
    handleMouseMove($event){
      if(this._isDragging){
        this._left = this._originalLeft + ($event.clientX - this._originalClientX);
        this._top = this._originalTop + ($event.clientY - this._originalClientY);
      }
    }
    
    handleMouseUp($event){
      this._isDragging = false;
    }
}

export default DraggableDecorator;
