============================
Media Slider - jQuery Plugin
============================

Easy start
==========
Hhtml page::

    <!DOCTYPE html>
    <html>

    <head>
        <title>My page</title>
        <link rel="stylesheet" href="slider/jquery.slider.min.css">
        <script src="jquery-1.7.1.min.js">
        <script src="slider/jquery.slider.min.js">
        <script>
        $(function(){
            $.slider.autoload();
        });
        </script>
    </head>
    
    <body>
        <div class="md-slider" style="width:860px;height:400px">
        <ul class="md-slider-source">
            <li><a href="image1.png"></a></li>
            <li><a href="image2.png"></a></li>
            <li><a href="image3.png"></a></li>
            <li><a href="image4.png"></a></li>
        </ul>
        </div>
    </body>

    </html>

Options
=======

**autoPlay** [bool] default: false

**showTitle** [bool] default: false

**buttonPrev** [selector] default: null

**buttonNext** [selector] default: null

**speedIn** [int] default: 500

**speedOut** [int] default: 500

**interval** [int] default: 3000

**source** [array] default: null.
If source = null, load data of element with selector ``md-slider-source``.
Example array ::

    var arr = [
        {url: 'image1.jpg', title: 'Title 1', html: '<span>Title 1</span>'},
        {url: 'image2.jpg', title: 'Title 2', html: '<span>Title 2</span>'}
    ]

Examples
========

Custom initial slider ::

    <!DOCTYPE html>
    <html>

    <head>
        <title>My page</title>
        <link rel="stylesheet" href="slider/jquery.slider.min.css">
        <script src="jquery-1.7.1.min.js">
        <script src="slider/jquery.slider.min.js">
        <script>

        var arr = [
            {url: 'image1.jpg', title: 'Title 1', html: '<span>Title 1</span>'},
            {url: 'image2.jpg', title: 'Title 2', html: '<span>Title 2</span>'}
        ];

        $(function(){
            $('#mySlider').slider({
                autoPlay: true,
                source: arr
            });
        });
        </script>
    </head>

    <body>
        <div id="mySlider" style="width:860px;height:400px"></div>
    </body>

    </html>


