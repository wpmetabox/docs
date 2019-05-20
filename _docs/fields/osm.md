---
title: Open Street Map
---

## Overview

The `osm` field creates a [OpenStreetMap](https://openstreetmap.org) where you can select a location. This field is very similar to [map](/fields/map) field, and provides an alternative solution for displaying maps, since [Google requires developers to enter credit card ](https://metabox.io/meta-box-weekly-updates-july-2018/) details.

This field supports all features that the [Google Maps](/fields/map) field has. It comes along with a text field for address input, which has the autocomplete feature. The data for address autocomplete is get from [Nominatum](https://wiki.openstreetmap.org/wiki/Nominatim) geocoding service.

You also can pick a location simply by clicking on the map or drag and drop the marker. Note that when you drag and drop the marker, the location (latitude and longitude) is saved automatically in the field value.

This field uses [Leaflet](https://leafletjs.com) library to render the map.

## Screenshot

![map](https://i.imgur.com/jJXmxrw.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`std` | Default location of the map when loaded. Format `'53.346881,-6.258860'` (latitude, longitude). If missing, the field will show Dublin, Ireland.
`language` | Language for more accurate auto-complete results. Accepts standard rfc2616 `accept-language` string or a simple comma separated list of [language codes](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html). Optional.
`region` | Limit search results to a specific country (or a list of countries). Accepts [ISO 3166-1alpha2 code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Optional.
`address_field` | The ID of address field. For multiple address fields, enter field IDs separated by comma. Required.

Note that in order to make the map work, you need to create a [text field](/fields/text/) for the address and pass its ID to the map's `address_field`. Without the address field, the map will still display, but you have to specify the location by draging and droping the marker on the map.

The `address_field` can also use a list of text input fields' IDs, separating by commas. For example: `street,city,state`. But in that case, there's no autocomplete for address. Instead of that, when you click the **Find Address** button (below the map), the field will search for the address combined from values of those fields and set the location for the map.

## Sample code

```php
// Address field.
array(
    'id'   => 'address',
    'name' => 'Address',
    'type' => 'text',
),
// Map field.
array(
    'id'            => 'map',
    'name'          => 'Location',
    'type'          => 'osm',

    // Default location: 'latitude,longitude[,zoom]' (zoom is optional)
    'std'           => '-6.233406,-35.049906,15',

    // Address field ID
    'address_field' => 'address',
),
```

## Data

This field saves the location in the following format `latitude,longitude,zoom`.

## Template usage

### Displaying the map

To display the map field in the frontend, we use the [rwmb_meta()](/rwmb-meta/) helper function, but we need to add more parameters:

```php
$args = array(
    'width'        => '640px',
    'height'       => '480px',
    'zoom'         => 14,
    'marker'       => true,
    'marker_icon'  => 'https://url_to_icon.png',
    'marker_title' => 'Click me',
    'info_window'  => '<h3>Title</h3><p>Content</p>.',
);
echo rwmb_meta( 'field_id', $args );
```

Parameter | Description
---|---
`width` | Map width, default is 640px. Can be '%' or 'px'.
`height` | Map height, default is 480px. Can be '%' or 'px'.
`zoom` | Map zoom, default is the value set in admin, and if it's omitted - 14.
`marker` | Display marker? `true` (default) or `false`.
`marker_icon` | URL to the marker icon. Optional.
`marker_title` | Marker title when hover.
`info_window` | Content for the info window displayed when click the marker. HTML allowed. This content will be passed to JavaScript, so it's better to **avoid quotes**.
`js_options` | Additional map options. Map options are passed into the Leaflet library. See [here](https://leafletjs.com/reference-1.3.2.html#map-option).

The code below shows how to use `js_options` for advanced control how the map is displayed:

```php
$args = array(
    'width'      => '640px',
    'height'     => '480px',
    'js_options' => array(
        'doubleClickZoom' => false,
    )
);
echo rwmb_meta( 'field_id', $args );
```

Read more about [rwmb_meta()](/rwmb-meta/).

### Getting field value

In case you don't want to display the map, but get the location's latitude and longitude, use the code below:

```php
$location = rwmb_get_value( $field_id );
echo $location['latitude'];
echo $location['longitude'];
echo $location['zoom'];
```

Read more about [rwmb_get_value()](/rwmb-get-value/).

### Outputting a map in a group

If you have a map inside a cloneable/non-cloneable group, then the helper functions above doesn't work. In that case, you can use a helper function in the plugin to show the map.

```php
$group_values = rwmb_meta( 'group_id' );
// If group is cloneable
foreach ( $group_values as $group_value ) {
    echo RWMB_Map_Field::render_map( $group_value['map_id'] );
}
```

The helper function `RWMB_Map_Field::render_map` accepts 2 parameters:

Name|Description
`$location`|The location of the map center / marker, in format `latitude,longitude[,zoom]` (zoom is optional). It's the same format of the map field value.
`$args`|Additional parameters for the map. The same as for helper function `rwmb_meta` above.
