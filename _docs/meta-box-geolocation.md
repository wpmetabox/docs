---
title: Meta Box Geolocation
---

{% include installation.html %}

## Usage

**Make sure you know how to [register meta boxes](/registering-meta-boxes/) and [define fields](/define-fields/) before continuing!**

### Tell Meta Box that you'll add Geolocation data.

For better performance, Geolocation is disabled by default, and of course, Meta Box doesn't know when to load Meta Box Geolocation script and Google Maps API. So we will have to tell Meta Box to load those scripts first.

Add this line to your Meta Box (not field) array

```php
'geo' => true
```

You can also add options to Geolocation. Which can contains these properties

- An array of `types` specifies an explicit type or a type collection, as listed in the supported types below. If nothing is specified, all types are returned. In general, only a single type is allowed. The exception is that you can safely mix the geocode and establishment types, but note that this will have the same effect as specifying no types. The supported types are:

    - `geocode` instructs the Places service to return only geocoding results, rather than business results.
    - `address` instructs the Places service to return only geocoding results with a precise address.
    - `establishment` instructs the Places service to return only business results.
    - the `(regions)` type collection instructs the Places service to return any result matching the following types:
        - `locality`
        - `sublocality`
        - `postal_code`
        - `country`
        - `administrative_area1`
        - `administrative_area2`
    - the `(cities)` type collection instructs the Places service to return results that match either `locality` or `administrative_area3`.

- `bounds` is a `google.maps.LatLngBounds` object specifying the area in which to search for places. The results are biased towards, but not restricted to, places contained within these bounds.

- `componentRestrictions` can be used to restrict results to specific groups. Currently, you can use `componentRestrictions` to filter by country. The country must be passed as a two-character, ISO 3166-1 Alpha-2 compatible country code.

*For more information, visit [Google Autocomplete Options](https://developers.google.com/maps/documentation/javascript/places-autocomplete#add_autocomplete)*

To add options. Just pass an array of options to `geo` key instead of default `'geo' => true`. For instance:

```php
// Restrict the result in Australia only
'geo' => [
    'componentRestrictions' => [
        'country' => 'au'
    ]
]

// Return only business results
'geo' => [
    'types' => ['establishment']
],

// Return only cities and business results
'geo' => [
    'types' => ['(cities)', 'establishment']
],
```


### Adding Auto Complete field

To add an auto complete field. Simply add a `text` field and set it id starts with `address`. Like `address` or `address_something`... The plugin will treat that field as auto complete address field.

*You can add auto complete to `textarea`, it works but will generate warning messages.*

### Populate Field Data

#### Address Components
When you selected an address from Auto-Complete field. It returns an array of *Address Component Types*. Which you can use it to populate to other fields. The following types are supported by Google:

Type|Description
---|---
`street_address`|indicates a precise street address.
`route`|indicates a named route (such as "US 101").
`intersection`|indicates a major intersection, usually of two major roads.
`political`|indicates a political entity. Usually, this type indicates a polygon of some civil administration.
`country`|indicates the national political entity and is typically the highest order type returned by the Geocoder.
`administrative_area_level_1`|indicates a first-order civil entity below the country level. Within the United States, these administrative levels are states. Not all nations exhibit these administrative levels.
`administrative_area_level_2`|indicates a second-order civil entity below the country level. Within the United States, these administrative levels are counties. Not all nations exhibit these administrative levels.
`administrative_area_level_3`|indicates a third-order civil entity below the country level. This type indicates a minor civil division. Not all nations exhibit these administrative levels.
`administrative_area_level_4`|indicates a fourth-order civil entity below the country level. This type indicates a minor civil division. Not all nations exhibit these administrative levels.
`administrative_area_level_5`|indicates a fifth-order civil entity below the country level. This type indicates a minor civil division. Not all nations exhibit these administrative levels.
`colloquial_area`|indicates a commonly-used alternative name for the entity.
`locality`|indicates an incorporated city or town political entity.
`sublocality`|indicates a first-order civil entity below a locality. For some locations may receive one of the additional types: sublocality_level_1 through to sublocality_level_5. Each `sublocality`|level is a civil entity. Larger numbers indicate a smaller geographic area.
`neighborhood`|indicates a named neighborhood.
`premise`|indicates a named location, usually a building or collection of buildings with a common name
`subpremise`|indicates the first-order entity below a named location, usually a singular building within a collection of buildings with a common name.
`postal_code`|indicates a postal code as used to address postal mail within the country.
`natural_feature`|indicates a prominent natural feature.
`airport`|indicates an airport.
`park`|indicates a named park.
`post_box`|indicates a specific postal box.
`street_number`|indicates the precise street number.
`floor`|indicates the floor of a building address.
`room`|indicates the room of a building address.
`lat`|indicates latitude of the result
`lng`|indicates longitude of the result
`geometry`|same as `latitude,longitude`
`formatted_address`|returns human readable complete address
`id`|unique id of current location
`url`|url of current location

For more information about address components visit: [Google Address Component Types](http://code.google.com/apis/maps/documentation/geocoding/#Types)

#### Auto Populate

To auto populate data to the field. Just set that field's ID same as one of Address Component Type above. For example, you create a `number` field with ID `postal_code`. The postal code type will auto populate to that field if exists.

**Long name and Short Name**

Let's say we have a country named 'Australia'. The long name is 'Australia' and short name is 'AU'. And so on, if we have a state named 'Queensland', so 'Queensland' is the long name and 'QLD' is the short name.

By default, Meta Box Geolocation will populate the long name of the field. But you can use the short name by adding `_short` at the end of field id. For example: `administrative_area_level_1_short`, `country_short`

#### Binding Template

The power of Meta Box Geolocation is you can bind anything into a field. Let's say we have a field with id `dummy_field`, this field id is not in *Address Component Types* list so by default the plugin won't auto populate data to it. Now we'll bind `administrative_area_level_1` to that field. Just add

```php
'binding' => 'administrative_area_level_1'
```

Example Result: `Queensland`

You can tell that field to use short version by prepending `short:` keyword

```php
'binding' => 'short:administrative_area_level_1'
```

Example Result: `QLD`

You can also merge two fields, add any character you want to bind to that field. Like so:

```php
'binding' => 'short:administrative_area_level_1 + " " + country'
```

Example Result: `QLD Australia`

### Adding URL Params

By default, Google Geocoding API has the usage limit. See [here](https://developers.google.com/maps/documentation/geocoding/usage-limits#standard-usage-limits). The free Google Geocoding API works in almost case but sometimes, you need to add API Key, or want to add custom params to URL. Just add a filter to `gmap_api_params` like so:

```php
add_filter( 'gmap_api_params', function( $params ) {
    $params['key'] = 'YOUR API KEY';
    return $params;
});
```

#### Example

The plugin already ships with an example. You can browse it in `examples/example.php`.

Result

![meta box geolocation](https://metabox.io/wp-content/uploads/2016/03/meta-box-geolocation.gif)