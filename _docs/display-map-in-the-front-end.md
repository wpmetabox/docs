---
title: Display map in the front end
---

To display `map` field in the frontend, we still use `rwmb_meta` function (see [this docs](/displaying-fields/)), but we need to add more parameters. Assume we have a `map` field with `id=loc`, this is how we display map:

```php
$args = array(
    'type'         => 'map',
    'width'        => '640px', // Map width, default is 640px. Can be '%' or 'px'
    'height'       => '480px', // Map height, default is 480px. Can be '%' or 'px'
    'zoom'         => 14,  // Map zoom, default is the value set in admin, and if it's omitted - 14
    'marker'       => true, // Display marker? Default is 'true',
    'marker_title' => '', // Marker title when hover
    'info_window'  => '<h3>Info Window Title</h3>Info window content. HTML <strong>allowed</strong>', // Info window content. HTML allowed.
);
echo rwmb_meta( 'loc', $args ); // For current post
echo rwmb_meta( 'loc', $args, $post_id ); // For another post with $post_id
```

All the arguments are self-explained. A good thing here is you can add HTML to `info_window`. In the example above, I wrap the title into `h3` tag, but you can put anything there. Just remember the content will be passed to Javascript, so things like quotes (single or double) **should be avoided**. You should use plain tags like `strong, em, h2, h3, h4`, ... and style them by CSS. If you need more advanced options for the map, use the `js_options` parameter, which accept an array of arguments from [Google Maps API](https://developers.google.com/maps/documentation/javascript/reference#MapOptions). For example:

```php
$args = array(
    'type'         => 'map',
    'width'        => '640px',
    'height'       => '480px',
    'js_options'   => array(
        'mapTypeId'   => 'HYBRID',
        'zoomControl' => false,
        'zoom'        => 10, // You can use 'zoom' inside 'js_options' or as a separated parameter
    )
);
```

You also can display multiple maps on the same page. The function is smart enough to assign different ID (in the form `rwmb-map-canvas-$counter`) to each map displayed.