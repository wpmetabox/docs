---
title: Using 2 date formats
---

Assuming you have a `date` field which allow users to choose a date for an event. You want to **display date in a specific format** which matches your country date format (for example *29 September, 2015*) and **store the value in the database in another format** (for example *2015-09-29*) to allow correct ordering and doing queries with dates.

In this case, you can do that using the `rwmb_{$field_id}_value` and `rwmb_{$field_id}_meta` filters (see this [documentation](/filters/)) to change the displayed value and saved value. Here is the sample code:

```php
add_filter( 'rwmb_ID_value', function( $value ) {
    return $value ? date( 'Y-m-d', strtotime( $value ) ) : '';
} );
add_filter( 'rwmb_ID_field_meta', function( $value ) {
    return $value ? date( 'd F, Y', strtotime( $value ) ) : '';
} );
```

Don't forget to change `ID` to your field's ID.

Also note that the code above change the date format in the backend only. To show the date in the frontend in a different format, please use the code below:

```php
$meta = rwmb_meta( 'field_id' );
echo date( 'd F, Y', strtotime( $meta ) );
```