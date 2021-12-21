---
title: Meta Box Geolocation
---

Meta Box Geolocation helps you fill in address fields (street address, zipcode, city, state and country) quickly by using Geocoding API from Google Maps/Open Street Maps.

![auto suggest geolocation data](https://i1.wp.com/metabox.io/wp-content/uploads/2016/03/meta-box-geolocation.gif)


## Configuration

To make the geolocation work, you need to configure 4 things:

- Enable the geolocation API
- Setup the field group settings
- Setup the ID for the address field to make it suggests addresses from geolocation API
- Setup the ID (or binding ID) for other fields to retrieve data from geolocation API when selecting an address

Follow each step below.

### Geolocation API

If you use **Open Street Maps**, then you can bypass this step. Open Street Maps doesn't require any extra configuration from you.

If you use **Google Maps**, create a project for Google Maps in the [Google Cloud Platform Console](https://console.cloud.google.com/google/maps-apis/overview). And don't forget to enable the following APIs:

- Google Maps API
- Geocoding API
- Places API

And then create an API key for Google Maps. See [here](https://developers.google.com/maps/documentation/javascript/get-api-key) for instruction. You'll need this key to perform any call to Google Maps platform.

### Field group settings

If you use **Open Street Maps**, you need to *add a Open Street Maps field* to your field group. Then add `geo` to your field group custom settings in the Meta Box Builder like this:

![enable geolocation for open street maps](https://i.imgur.com/M5ar5i2.png)

If you use code, then add this line to your field group settings:

```php
'geo' => true,
```

If you use **Google Maps**, it's _not_ required to add a Google Maps field to your field group. To enable geolocation, add the following custom settings in the field group settings in the Meta Box Builder like this:

![enable geolocation for google maps](https://i.imgur.com/XII5Kyw.png)

If you use code, then add this line to your field group settings:

```php
'geo' => [
    'api_key' => 'YOUR API KEY',
],
```

If you has a Google Maps field in your field group, then you can set the Google API key once, either for the Geolocation extension (as above) or for the `map` field. No need to enter the same key for both of them.

If you use Google Maps, you can also add options to Geolocation. Which can contains these properties:

- `types`: array of geocode types:
    - `geocode`: only geocoding results, no business results.
    - `address`: only geocoding results with a precise address.
    - `establishment`: business results.
    - `(cities)`: only results that match either `locality` or `administrative_area3`.
    - `(regions)`: any result matching the following types:
        - `locality`
        - `sublocality`
        - `postal_code`
        - `country`
        - `administrative_area1`
        - `administrative_area2`
- `componentRestrictions`: restrict results to a specific country, must be ISO 3166-1 Alpha-2 compatible country code. You can find code information at [Wikipedia: List of ISO 3166 country codes](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes).

Examples:

```php
// Restrict the result in Australia only
'geo' => [
    'api_key' => 'YOUR API KEY',
    'componentRestrictions' => [
        'country' => 'au'
    ],
],

// Return only business results
'geo' => [
    'api_key' => 'YOUR API KEY',
    'types' => ['establishment'],
],

// Return only cities and business results
'geo' => [
    'api_key' => 'YOUR API KEY',
    'types' => ['(cities)', 'establishment'],
],
```

### Address field

The address field is used to retrieve the suggestions from geolocation API. To add an address field, simply add a text field **with ID starts with `address`** (like `address` or `address_something`)...

### Other fields

When you select an address from autocomplete list, the geolocation API will return a list of address components. To make the field retrieve the data, **set the field's ID same as one of address component**.

For example, you create a text field with ID `city`, when you select an address, the city of the address will be filled into this text field.

Here is the list of components for **Google Maps**:

Component|Description
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

For more information about address components visit: [Google Address Component Types](https://developers.google.com/maps/documentation/geocoding/intro#Types)

Here are the address components for **Open Street Maps** (which are self-explained):

- `building`
- `house_number`
- `aeroway`
- `road`
- `neighbourhood`
- `suburb`
- `village`
- `town`
- `city`
- `county`
- `state`
- `postcode`
- `country`
- `country_code`

## Advanced

Sometimes you don't want the fields to have the *exact* ID as the address components, or you want to combine multiple components into one field, then follow the guides below.

### Long and short names

Let's say we have a country named 'Australia'. The long name is 'Australia' and short name is 'AU'. If we have a state named 'Queensland', so 'Queensland' is the long name and 'QLD' is the short name.

By default, Meta Box Geolocation will populate the long name of the field. But you can use the short name by **adding `_short` at the end of field ID**. For example: `administrative_area_level_1_short`, `country_short`.

Note: this feature is available for **Google Maps** only.

### Custom binding

Let's say we have a field with id `dummy_field`, this field ID is not in *address component* list so the plugin won't auto populate data to it. To make the plugin auto populate data (`administrative_area_level_1`) to that field, add the following parameter to the field:

With Meta Box Builder:

![custom binding](https://i.imgur.com/DuvReWa.png)

or with code:

```php
'binding' => 'administrative_area_level_1', // returns 'Queensland'
```

You can tell that field to use short version by prepending `short:` keyword:

![custom binding short](https://i.imgur.com/Q3mXgMP.png)

```php
'binding' => 'short:administrative_area_level_1', // returns 'QLD'
```

You can also merge two fields, add any character you want to bind to that field. Like so:

![merge fields](https://i.imgur.com/iowxhWs.png)

```php
'binding' => 'city + " " + country', // returns QLD Australia
```

### Multiple addresses

In case you have multiple "group" of address fields, such as address details for head office and address details for a company branch. In each group, there are an autocomplete address field. And it will autopopulate only fields in the group, e.g. the address for head office only populates the fields in the head office group, not in the company branch.

In this case, please set another attribute `'address_field' => 'address_id'` for *each* field in the group. See an example code below:

![specify address field](https://i.imgur.com/azK52Y5.png)

If you do with code, then your field group looks like this:

```php
/**
 * Head office
 */

// Address
[
    'id' => 'address_ho',
    'name' => 'Address - Head Office',
],
// City
[
    'id' => 'city_ho',
    'name' => 'City - Head Office',
    'binding' => 'locality',
    'address_field' => 'address_ho', // THIS
],

/**
 * A company branche
 */

// Address
[
    'id' => 'address_br',
    'name' => 'Address - Branch',
],
// City
[
    'id' => 'city_br',
    'name' => 'City - Branch',
    'binding' => 'locality',
    'address_field' => 'address_br', // THIS
],
```

## Two-way data binding

If you have a map field, then whenever you *change an address or manually change the value of latitude and longitue fields, the pin on the map will change* according to the new location.

And whenever you *change the pin location, the latitude and longitude will change* (if you have these fields).

However, if you change the pin location, the address field will *NOT* change.
