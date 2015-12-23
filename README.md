# jQuery Photoswipe
This is just a jQuery Wrapper for Photoswipe, the original photosipe was made by Dimsemenov https://github.com/dimsemenov/PhotoSwipe


## Requirements
* jQuery
* Photowipe Plugin (get from official website https://github.com/dimsemenov/PhotoSwipe)

## Instalation
copy all required file into your project folder, and include all assets

	<!-- Photoswipe CSS -->
	<link rel="stylesheet" href="assets/css/photoswipe.css">
	<link rel="stylesheet" href="assets/css/default-skin/default-skin.css">

	<!-- jQuery -->
	<script type="text/javascript" src="assets/js/jquery-1.11.3.js"></script>
	
	<!-- Photoswipe Core -->
	<script type="text/javascript" src="assets/js/photoswipe.min.js"></script>
	<script type="text/javascript" src="assets/js/photoswipe-ui-default.min.js"></script>

	<!-- Photoswipe Wrapper -->
	<script type="text/javascript" src="jquery-PhotoSwipe/jquery.photoSwipe.js"></script>


### Usage
The image information should be declared on data attribute, see example below :

	<div class="col-md-6 main-image item">
		<a href="#" data-original-url="assets/img/1.jpg" data-original-width="1920" data-original-height="1080">
			<img src="assets/img/1.jpg" class="img-responsive">
		</a>
	</div>


to init the plugin, put this code after document ready

	$(document).ready(function(){
		$('.image-container').photoSwipe({
			itemSelector: '.item > a'
		});
	});


for more information looks at the example.