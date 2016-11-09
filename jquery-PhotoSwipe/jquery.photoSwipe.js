// jQuery Photoswipe http://photoswipe.com/
// jQuery plugin for photoswipe
// version 0.1, March 15th, 2015
// by kadekjayak
// Original: https://github.com/dimsemenov/photoswipe

(function($) {

    $.photoSwipe = function(action, options, element) {

        var defaults = {
            itemSelector: '.item',
            bgOpacity : 1,
            loop : 'true',
            closeOnScroll : false,
			escKey: false,
			history: false,
			//mainClass : 'pswp--minimal--dark',
			barsSize : {top:0,bottom:0},
			bgOpacity : 0.85,
			tapToClose : true,
			tapToToggleControls : false,
			history : false,
			closeOnScroll  : false,
			showHideOpacity:true,
			//Button
			closeEl:true,
			captionEl: true,
			zoomEl: true,
			shareEl: true,
			counterEl: true,
			arrowEl: true,
			preloaderEl: true,
			shareButtons: [
				{id:'facebook', label:'Share on Facebook', url:'https://www.facebook.com/sharer/sharer.php?u={{url}}'},
				{id:'twitter', label:'Tweet', url:'https://twitter.com/intent/tweet?text={{text}}&url={{url}}'},
				{id:'pinterest', label:'Pin it', url:'http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}'},
				{id:'download', label:'Download image', url:'{{raw_image_url}}', download:true}
			],
			
        }

        var plugin = this;
        plugin.settings = {}

        //var  element = element;

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
 
            createDialogElement();
            var itemElements = $(element).find( plugin.settings.itemSelector );
			console.log(itemElements);
            var items = [];
			console.log(itemElements);
			itemElements.unbind('click');
            itemElements.on('click',function(e){
				e.preventDefault();
				
                items = [];
				
                $.each(itemElements, function(i,v){
					console.log(i);
					$(v).data('number', i);
                    items.push({
						original: {
							src: $(v).data('originalUrl'),
							w: $(v).data('originalWidth'),
							h: $(v).data('originalHeight')
						},
						thumb: {
							src: $(v).find('img').attr('src'),
							w: $(v).find('img').attr('width'),
							h: $(v).find('img').attr('height')
						}
					});
                });
				
				var itemIndex = $(this).data('number');
				
                var pswpElement = document.querySelectorAll('.pswp')[0];
	
                var options = {
                    index: itemIndex,
					getThumbBoundsFn: function(index) {
			            var thumbnail = itemElements[itemIndex],
			                pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
			                rect = thumbnail.getBoundingClientRect(); 

			            var coor = {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
						return coor;
			        }
                };
				console.log(plugin.settings);
				plugin.settings = $.extend({}, plugin.settings, options);
				console.log(plugin.settings);
                
				// Initializes and opens PhotoSwipe
                var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, plugin.settings);
				
				// Responsive Image
				var realViewportWidth,
				    useLargeImages = false,
				    firstResize = true,
				    imageSrcWillChange;

				gallery.listen('beforeResize', function() {
					var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
					dpiRatio = Math.min(dpiRatio, 2.5);
				    realViewportWidth = gallery.viewportSize.x * dpiRatio;

				    if(realViewportWidth >= 1200 || (!gallery.likelyTouchDevice && realViewportWidth > 800) || screen.width > 1200 ) {
				    	if(!useLargeImages) {
				    		useLargeImages = true;
				        	imageSrcWillChange = true;
				    	}
				    } else {
				    	if(useLargeImages) {
				    		useLargeImages = false;
				        	imageSrcWillChange = true;
				    	}
				    }

				    if(imageSrcWillChange && !firstResize) {
				        gallery.invalidateCurrItems();
				    }

				    if(firstResize) {
				        firstResize = false;
				    }

				    imageSrcWillChange = false;
				});

				gallery.listen('gettingData', function(index, item) {
				    if( useLargeImages ) {
						item.src = item.original.src;
				        item.w = item.original.w;
				        item.h = item.original.h;
				    } else {
				        item.src = item.thumb.src;
				        item.w = item.thumb.w;
				        item.h = item.thumb.h;
				    }
				});

                gallery.init();
            });
        }
		
		/**
		 *  Create Photoswipe element if not exist
		 *  important, this element should exist if you call photoswipe instance
		 */
        var createDialogElement = function(){
			$('body').find('.pswp').remove();
            if($('body').find('.pswp').length == 0) {
                $('body').prepend(photoSwipeTemplate);
            }
        }
        
        /** PHOTOSWIPE DIALOG ELEMENT **/
        var photoSwipeTemplate = ' <div id="gallery" class="pswp" tabindex="-1" role="dialog" aria-hidden="true">\
            <div class="pswp__bg"></div> \
            <div class="pswp__scroll-wrap"> \
                <div class="pswp__container"> \
                    <div class="pswp__item"></div> \
                    <div class="pswp__item"></div> \
                    <div class="pswp__item"></div> \
                </div>\
                <div class="pswp__ui pswp__ui--hidden"> \
                <div class="pswp__top-bar"> \
                    <div class="pswp__counter"></div> \
                    <button class="pswp__button pswp__button--close" title="Close (Esc)"></button> \
                    <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button> \
                    <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button> \
                    <div class="pswp__preloader"> \
                        <div class="pswp__preloader__icn"> \
                           <div class="pswp__preloader__cut"> \
                                <div class="pswp__preloader__donut"></div> \
                           </div> \
                        </div> \
                    </div> \
                </div>\
                <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"> \
                    <div class="pswp__share-tooltip"> \
                         <a href="#" class="pswp__share--facebook"></a> \
                        <a href="#" class="pswp__share--twitter"></a> \
                        <a href="#" class="pswp__share--pinterest"></a> \
                        <a href="#" download class="pswp__share--download"></a>\
                    </div>\
                </div>\
                <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button> \
                <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button> \
                <div class="pswp__caption"> \
                    <div class="pswp__caption__center"></div> \
                </div> \
              </div> \
            </div> \
        </div>';
        
		if(action == 'open') {
			createDialogElement();
			var pswpElement = document.querySelectorAll('.pswp')[0];
			var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, options.items, plugin.settings );
			gallery.init();
			
		} else if(action == 'reinit') {
			console.log('reinit');
			console.log(plugin.element);
			plugin.init();
		} else {
			plugin.init();
		}
    }

    $.fn.photoSwipe = function(options) {

        return this.each(function() {
            //if (undefined == $(this).data('photoSwipe')) {
                var plugin = new $.photoSwipe('attach', options, this);
                $(this).data('photoSwipe', plugin);
            //}
        });

    }

})(jQuery);